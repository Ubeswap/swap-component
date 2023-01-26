"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useUniqueBestFarms = exports.useFarmRegistry = void 0;
const client_1 = require("@apollo/client");
const use_contractkit_1 = require("@celo-tools/use-contractkit");
const bignumber_1 = require("@ethersproject/bignumber");
const units_1 = require("@ethersproject/units");
const sdk_1 = require("@ubeswap/sdk");
const ethers_1 = require("ethers");
const react_1 = __importStar(require("react"));
const FarmRegistry_json_1 = __importDefault(require("../../constants/abis/FarmRegistry.json"));
const blacklist = {
    '0x4488682fd16562a68ea0d0f898413e075f42e6da': true,
    '0xC245976Db329Bb0414253376246a367B7c96C762': true,
};
const featuredPoolWhitelist = {
    '0x6F11B6eA70DEe4f167b1A4ED1F01C903f6781960': false,
    '0xEfe2f9d62E45815837b4f20c1F44F0A83605B540': false,
    '0x155DA6F164D925E3a91F510B50DEC08aA03B4071': false,
    '0x3c8e2eB988f0890B68b5667C2FB867249E68E3C7': false, // CELO-SYMM
};
const pairDataGql = (0, client_1.gql) `
  query getPairHourData($id: String!) {
    pair(id: $id) {
      pairHourData(first: 24, orderBy: hourStartUnix, orderDirection: desc) {
        hourStartUnix
        hourlyVolumeUSD
      }
    }
  }
`;
const COMPOUNDS_PER_YEAR = 2;
const CREATION_BLOCK = 9840049;
const LAST_N_BLOCKS = 1440; // Last 2 hours
const useFarmRegistry = () => {
    const { kit } = (0, use_contractkit_1.useContractKit)();
    const client = (0, client_1.useApolloClient)();
    const [farmSummaries, setFarmSummaries] = react_1.default.useState([]);
    const call = react_1.default.useCallback(() => __awaiter(void 0, void 0, void 0, function* () {
        const farmRegistry = new kit.web3.eth.Contract(FarmRegistry_json_1.default, '0xa2bf67e12EeEDA23C7cA1e5a34ae2441a17789Ec');
        const lastBlock = yield kit.web3.eth.getBlockNumber();
        const [farmInfoEvents, lpInfoEvents, farmDataEvents] = yield Promise.all([
            farmRegistry.getPastEvents('FarmInfo', {
                fromBlock: CREATION_BLOCK,
                toBlock: lastBlock,
            }),
            farmRegistry.getPastEvents('LPInfo', { fromBlock: CREATION_BLOCK, toBlock: lastBlock }),
            farmRegistry.getPastEvents('FarmData', {
                fromBlock: lastBlock - LAST_N_BLOCKS,
                toBlock: lastBlock,
            }),
        ]);
        const lps = {};
        lpInfoEvents.forEach((e) => {
            lps[e.returnValues.lpAddress] = [e.returnValues.token0Address, e.returnValues.token1Address];
        });
        const farmData = {};
        farmDataEvents.forEach((e) => {
            farmData[e.returnValues.stakingAddress] = {
                tvlUSD: e.returnValues.tvlUSD,
                rewardsUSDPerYear: e.returnValues.rewardsUSDPerYear,
            };
        });
        const farmSummaries = [];
        farmInfoEvents
            .filter((e) => !blacklist[e.returnValues.stakingAddress.toLowerCase()])
            .forEach((e) => {
            // sometimes there is no farm data for the staking address return early to avoid crash
            if (!farmData[e.returnValues.stakingAddress]) {
                return;
            }
            farmSummaries.push({
                farmName: ethers_1.ethers.utils.parseBytes32String(e.returnValues.farmName),
                stakingAddress: e.returnValues.stakingAddress,
                lpAddress: e.returnValues.lpAddress,
                token0Address: lps[e.returnValues.lpAddress][0],
                token1Address: lps[e.returnValues.lpAddress][1],
                tvlUSD: bignumber_1.BigNumber.from(farmData[e.returnValues.stakingAddress].tvlUSD),
                rewardsUSDPerYear: bignumber_1.BigNumber.from(farmData[e.returnValues.stakingAddress].rewardsUSDPerYear),
                isFeatured: !!featuredPoolWhitelist[e.returnValues.stakingAddress],
                isImported: false,
            });
        });
        farmSummaries
            .sort((a, b) => Number((0, units_1.formatEther)(b.rewardsUSDPerYear.sub(a.rewardsUSDPerYear))))
            .sort((a, b) => Number((0, units_1.formatEther)(b.tvlUSD.sub(a.tvlUSD))));
        const results = yield Promise.all(farmSummaries.map((summary) => {
            return client.query({ query: pairDataGql, variables: { id: summary.lpAddress.toLowerCase() } });
        }));
        const farmInfos = results.map((result, index) => calcAPR(result, farmSummaries[index]));
        setFarmSummaries(farmSummaries.map((summary, index) => (Object.assign(Object.assign({}, summary), farmInfos[index]))));
    }), [kit.web3.eth, client]);
    (0, react_1.useEffect)(() => {
        call();
    }, [call]);
    return farmSummaries;
};
exports.useFarmRegistry = useFarmRegistry;
const useUniqueBestFarms = () => {
    const farmSummaries = (0, exports.useFarmRegistry)();
    const farmsUniqueByBestFarm = farmSummaries.reduce((prev, current) => {
        if (!prev[current.lpAddress]) {
            prev[current.lpAddress] = current;
        }
        else if (current.rewardsUSDPerYear.gt(prev[current.lpAddress].rewardsUSDPerYear)) {
            prev[current.lpAddress] = current;
        }
        return prev;
    }, {});
    return farmsUniqueByBestFarm;
};
exports.useUniqueBestFarms = useUniqueBestFarms;
// formula is 1 + ((nom/compoundsPerYear)^compoundsPerYear) - 1
function annualizedPercentageYield(nominal, compounds) {
    const ONE = 1;
    const divideNominalByNAddOne = Number(nominal.divide(BigInt(compounds)).add(BigInt(ONE)).toFixed(10));
    // multiply 100 to turn decimal into percent, to fixed since we only display integer
    return ((Math.pow(divideNominalByNAddOne, compounds) - ONE) * 100).toFixed(0);
}
// calculate rewardAPR, swapAPR, APY & APR from a farmSummary
function calcAPR(result, summary) {
    let swapRewardsUSDPerYear = bignumber_1.BigNumber.from(0);
    const { loading, error, data } = result;
    if (!loading && !error && (data === null || data === void 0 ? void 0 : data.pair)) {
        const lastDayVolumeUsd = data.pair.pairHourData.reduce((acc, curr) => acc + Number(curr.hourlyVolumeUSD), 0);
        swapRewardsUSDPerYear = (0, units_1.parseEther)(Math.floor(lastDayVolumeUsd * 365 * 0.0025).toString());
    }
    const rewardApr = new sdk_1.Percent(summary.rewardsUSDPerYear.toString(), summary.tvlUSD.toString());
    const swapApr = new sdk_1.Percent(swapRewardsUSDPerYear.toString(), summary.tvlUSD.toString());
    const apr = new sdk_1.Percent(swapRewardsUSDPerYear.add(summary.rewardsUSDPerYear).toString(), summary.tvlUSD.toString());
    let apy = '0';
    if (summary.tvlUSD.gt(0)) {
        try {
            apy = annualizedPercentageYield(apr, COMPOUNDS_PER_YEAR);
        }
        catch (e) {
            console.error('apy calc overflow', summary.farmName, e);
        }
    }
    return {
        rewardApr,
        swapApr,
        apr,
        apy,
    };
}
