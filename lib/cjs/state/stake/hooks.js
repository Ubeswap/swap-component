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
exports.useDerivedUnstakeInfo = exports.useDerivedStakeInfo = exports.useFarmRewardsInfo = exports.useFilteredStakingInfo = exports.useTotalUbeEarned = exports.usePairDataFromAddresses = exports.useStakingPoolsInfo = exports.useStakingPoolAddresses = exports.useStakingPools = exports.useUnclaimedStakingRewards = exports.usePairMultiStakingInfo = exports.useMultiRewardPools = exports.STAKING_GENESIS = void 0;
const use_contractkit_1 = require("@celo-tools/use-contractkit");
const bignumber_1 = require("@ethersproject/bignumber");
const sdk_1 = require("@ubeswap/sdk");
const zip_1 = __importDefault(require("lodash/zip"));
// Hooks
const react_1 = __importStar(require("react"));
const react_redux_1 = require("react-redux");
const erc20_1 = __importDefault(require("../../constants/abis/erc20"));
const staking_rewards_1 = require("../../constants/abis/staking-rewards");
// Interfaces
const uniswap_v2_pair_1 = require("../../constants/abis/uniswap-v2-pair");
const poolManager_1 = require("../../constants/poolManager");
const tokens_1 = require("../../constants/tokens");
const generated_1 = require("../../generated/");
const Tokens_1 = require("../../hooks/Tokens");
const useContract_1 = require("../../hooks/useContract");
const useCurrentBlockTimestamp_1 = __importDefault(require("../../hooks/useCurrentBlockTimestamp"));
const useFarmRegistry_1 = require("../../pages/Earn/useFarmRegistry");
const hooks_1 = require("../multicall/hooks");
const hooks_2 = require("../swap/hooks");
const useDualStakeRewards_1 = require("./useDualStakeRewards");
const useStakingInfo_1 = __importDefault(require("./useStakingInfo"));
exports.STAKING_GENESIS = 1619100000;
const ACTIVE_CONTRACT_UPDATED_THRESHOLD = 5259492;
const UNPREDICTABLE_GAS_LIMIT_ERROR_CODE = 'UNPREDICTABLE_GAS_LIMIT';
const useMultiRewardPools = () => {
    const accountInfo = (0, react_redux_1.useSelector)((state) => state.swap.accountInfo);
    const library = (0, use_contractkit_1.useProvider)();
    const provider = accountInfo ? accountInfo.provider : library;
    const farmSummaries = (0, useFarmRegistry_1.useFarmRegistry)();
    const [multiRewardPools, setMultiRewardPools] = react_1.default.useState([]);
    const call = react_1.default.useCallback(() => __awaiter(void 0, void 0, void 0, function* () {
        const multiRwdPools = [];
        yield Promise.all(farmSummaries.map((fs) => __awaiter(void 0, void 0, void 0, function* () {
            let poolContract = generated_1.MoolaStakingRewards__factory.connect(fs.stakingAddress, provider);
            const rewardsTokens = [];
            const externalStakingRwdAddresses = [];
            // the first reward token at the top level
            rewardsTokens.push(yield poolContract.rewardsToken());
            // last time the contract was updated - set isActive to false if it has been longer than 2 months
            let periodFinish = yield poolContract.periodFinish();
            let isActive = Math.floor(Date.now() / 1000) - periodFinish.toNumber() < ACTIVE_CONTRACT_UPDATED_THRESHOLD;
            let baseContractFound = false;
            // recursivley find underlying and base pool contracts
            while (!baseContractFound) {
                try {
                    // find the underlying contract if one exists
                    const externalStakingRewardAddr = yield poolContract.externalStakingRewards();
                    externalStakingRwdAddresses.push(externalStakingRewardAddr);
                    // capture the contract's reward token
                    poolContract = generated_1.MoolaStakingRewards__factory.connect(externalStakingRewardAddr, provider);
                    rewardsTokens.push(yield poolContract.rewardsToken());
                    // determine if the underlying contract is active or not
                    periodFinish = yield poolContract.periodFinish();
                    isActive =
                        Math.floor(Date.now() / 1000) - periodFinish.toNumber() < ACTIVE_CONTRACT_UPDATED_THRESHOLD || isActive;
                }
                catch (e) {
                    //if the error is not what is expected - log it
                    if (e.code !== UNPREDICTABLE_GAS_LIMIT_ERROR_CODE) {
                        console.log(e);
                    }
                    //set true when externalStakingRewards() throws an error
                    baseContractFound = true;
                }
            }
            if (externalStakingRwdAddresses.length) {
                multiRwdPools.push({
                    address: fs.stakingAddress,
                    underlyingPool: externalStakingRwdAddresses[0],
                    basePool: externalStakingRwdAddresses[externalStakingRwdAddresses.length - 1],
                    numRewards: rewardsTokens.length,
                    active: isActive,
                });
            }
        })));
        setMultiRewardPools(multiRwdPools);
    }), [farmSummaries, provider]);
    (0, react_1.useEffect)(() => {
        call();
    }, [call]);
    return multiRewardPools;
};
exports.useMultiRewardPools = useMultiRewardPools;
const usePairMultiStakingInfo = (stakingInfo, stakingAddress) => {
    var _a, _b;
    const multiRewardPools = (0, exports.useMultiRewardPools)();
    const multiRewardPool = (0, react_1.useMemo)(() => {
        return multiRewardPools
            .filter((x) => x.address.toLowerCase() === stakingAddress.toLowerCase())
            .find((x) => x.basePool.toLowerCase() === (stakingInfo === null || stakingInfo === void 0 ? void 0 : stakingInfo.poolInfo.poolAddress.toLowerCase()));
    }, [multiRewardPools, stakingAddress, stakingInfo === null || stakingInfo === void 0 ? void 0 : stakingInfo.poolInfo.poolAddress]);
    const isTriple = (multiRewardPool === null || multiRewardPool === void 0 ? void 0 : multiRewardPool.numRewards) === 3;
    const dualPool = (0, useDualStakeRewards_1.useMultiStakeRewards)(isTriple ? multiRewardPool === null || multiRewardPool === void 0 ? void 0 : multiRewardPool.underlyingPool : multiRewardPool === null || multiRewardPool === void 0 ? void 0 : multiRewardPool.address, stakingInfo, 2, isTriple ? true : (_a = multiRewardPool === null || multiRewardPool === void 0 ? void 0 : multiRewardPool.active) !== null && _a !== void 0 ? _a : false);
    const triplePool = (0, useDualStakeRewards_1.useMultiStakeRewards)(isTriple ? multiRewardPool === null || multiRewardPool === void 0 ? void 0 : multiRewardPool.address : undefined, dualPool, 3, (_b = multiRewardPool === null || multiRewardPool === void 0 ? void 0 : multiRewardPool.active) !== null && _b !== void 0 ? _b : false);
    return triplePool || dualPool;
};
exports.usePairMultiStakingInfo = usePairMultiStakingInfo;
const useUnclaimedStakingRewards = () => {
    var _a, _b, _c, _d;
    const accountInfo = (0, react_redux_1.useSelector)((state) => state.swap.accountInfo);
    const { network } = (0, use_contractkit_1.useContractKit)();
    const chainId = accountInfo ? accountInfo.chainId : network.chainId;
    const ube = chainId ? tokens_1.UBE[chainId] : undefined;
    const ubeContract = (0, useContract_1.useTokenContract)(ube === null || ube === void 0 ? void 0 : ube.address);
    const poolManagerContract = (0, useContract_1.usePoolManagerContract)([use_contractkit_1.ChainId.Mainnet, use_contractkit_1.ChainId.Alfajores].includes(chainId) ? poolManager_1.POOL_MANAGER[chainId] : undefined);
    const poolsCountBigNumber = (_a = (0, hooks_1.useSingleCallResult)(poolManagerContract, 'poolsCount').result) === null || _a === void 0 ? void 0 : _a[0];
    const poolsCount = (_b = poolsCountBigNumber === null || poolsCountBigNumber === void 0 ? void 0 : poolsCountBigNumber.toNumber()) !== null && _b !== void 0 ? _b : 0;
    const poolAddresses = useStakingPoolAddresses(poolManagerContract, poolsCount);
    // compute amount that is locked up
    const balancesRaw = (0, hooks_1.useSingleContractMultipleData)(ubeContract, 'balanceOf', poolAddresses.map((addr) => [addr]));
    const balances = balancesRaw.find((b) => !b.result)
        ? null
        : balancesRaw.map((b) => { var _a, _b; return (_b = (_a = b.result) === null || _a === void 0 ? void 0 : _a[0]) !== null && _b !== void 0 ? _b : bignumber_1.BigNumber.from(0); });
    const balanceRemaining = (_c = balances === null || balances === void 0 ? void 0 : balances.reduce((sum, b) => b.add(sum), bignumber_1.BigNumber.from(0))) !== null && _c !== void 0 ? _c : null;
    // tokens per second, constants
    const rewardRates = (0, hooks_1.useMultipleContractSingleData)(poolAddresses, staking_rewards_1.STAKING_REWARDS_INTERFACE, 'rewardRate', undefined, hooks_1.NEVER_RELOAD);
    const periodFinishes = (0, hooks_1.useMultipleContractSingleData)(poolAddresses, staking_rewards_1.STAKING_REWARDS_INTERFACE, 'periodFinish', undefined, hooks_1.NEVER_RELOAD);
    const now = (0, useCurrentBlockTimestamp_1.default)();
    const amounts = now
        ? (0, zip_1.default)(rewardRates, periodFinishes).map(([rate, finish]) => {
            var _a, _b;
            const rawRate = (_a = rate === null || rate === void 0 ? void 0 : rate.result) === null || _a === void 0 ? void 0 : _a[0];
            const finishTime = (_b = finish === null || finish === void 0 ? void 0 : finish.result) === null || _b === void 0 ? void 0 : _b[0];
            if (rawRate && finishTime && finishTime.gt(now)) {
                return rawRate.mul(finishTime.sub(now).toNumber());
            }
            return bignumber_1.BigNumber.from(0);
        })
        : undefined;
    const earned = ((_d = rewardRates === null || rewardRates === void 0 ? void 0 : rewardRates[0]) === null || _d === void 0 ? void 0 : _d.loading) || !amounts ? null : amounts.reduce((sum, amt) => sum.add(amt), bignumber_1.BigNumber.from(0));
    return {
        balanceRemaining,
        earned,
        noncirculatingSupply: balanceRemaining && earned ? balanceRemaining.sub(earned) : null,
    };
};
exports.useUnclaimedStakingRewards = useUnclaimedStakingRewards;
function useStakingPools(pairToFilterBy, stakingAddress) {
    var _a, _b;
    const accountInfo = (0, react_redux_1.useSelector)((state) => state.swap.accountInfo);
    const { network } = (0, use_contractkit_1.useContractKit)();
    const chainId = (accountInfo ? accountInfo.chainId : network.chainId);
    const ube = chainId ? tokens_1.UBE[chainId] : undefined;
    const poolManagerContract = (0, useContract_1.usePoolManagerContract)(chainId !== sdk_1.ChainId.BAKLAVA ? poolManager_1.POOL_MANAGER[chainId] : undefined);
    const poolsCountBigNumber = (_a = (0, hooks_1.useSingleCallResult)(poolManagerContract, 'poolsCount').result) === null || _a === void 0 ? void 0 : _a[0];
    const poolsCount = (_b = poolsCountBigNumber === null || poolsCountBigNumber === void 0 ? void 0 : poolsCountBigNumber.toNumber()) !== null && _b !== void 0 ? _b : 0;
    const poolAddresses = useStakingPoolAddresses(poolManagerContract, poolsCount);
    const pools = useStakingPoolsInfo(poolManagerContract, poolAddresses);
    const stakingTokens = pools.map((p) => p === null || p === void 0 ? void 0 : p.stakingToken);
    const poolPairs = usePairDataFromAddresses(stakingTokens);
    return (0, react_1.useMemo)(() => {
        var _a;
        if (!ube || !pools || !poolPairs)
            return [];
        return ((_a = pools
            .reduce((memo, poolInfo, index) => {
            return [
                ...memo,
                {
                    stakingRewardAddress: poolInfo.poolAddress,
                    tokens: poolPairs[index],
                    poolInfo,
                },
            ];
        }, [])
            .filter((stakingRewardInfo) => {
            if (stakingAddress) {
                return stakingAddress.toLowerCase() === stakingRewardInfo.stakingRewardAddress.toLowerCase();
            }
            if (pairToFilterBy === undefined) {
                return true;
            }
            if (pairToFilterBy === null) {
                return false;
            }
            return (stakingRewardInfo.tokens &&
                pairToFilterBy.involvesToken(stakingRewardInfo.tokens[0]) &&
                pairToFilterBy.involvesToken(stakingRewardInfo.tokens[1]));
        })) !== null && _a !== void 0 ? _a : []);
    }, [ube, pools, poolPairs, pairToFilterBy, stakingAddress]);
}
exports.useStakingPools = useStakingPools;
function useStakingPoolAddresses(poolManagerContract, poolsCount) {
    // Get rewards pools addresses
    const inputs = [...Array(poolsCount).keys()].map((i) => [i]);
    const poolAddresses = (0, hooks_1.useSingleContractMultipleData)(poolManagerContract, 'poolsByIndex', inputs);
    return (0, react_1.useMemo)(() => {
        return !poolAddresses.length || !poolAddresses[0] || poolAddresses[0].loading
            ? []
            : poolAddresses.map((p) => { var _a; return (_a = p === null || p === void 0 ? void 0 : p.result) === null || _a === void 0 ? void 0 : _a[0]; }).filter((x) => !!x);
    }, [poolAddresses]);
}
exports.useStakingPoolAddresses = useStakingPoolAddresses;
const EXTERNAL_POOLS = [
    {
        index: -1,
        poolAddress: '0x33F819986FE80A4f4A9032260A24770918511849',
        stakingToken: '0xF97E6168283e38FC42725082FC63b47B6cD16B18',
        rewardToken: '0x18414Ce6dAece0365f935F3e78A7C1993e77d8Cd',
        rewardTokenSymbol: 'LAPIS',
        weight: 0,
    },
    {
        index: -1,
        poolAddress: '0xD409B7C4F67F5C845c53505b3d3B5aCD44e479AB',
        stakingToken: '0x573bcEBD09Ff805eD32df2cb1A968418DC74DCf7',
        rewardToken: '0x18414Ce6dAece0365f935F3e78A7C1993e77d8Cd',
        rewardTokenSymbol: 'LAPIS',
        weight: 0,
    },
    {
        index: -1,
        poolAddress: '0x478b8D37eE976228d17704d95B5430Cd93a31b87',
        stakingToken: '0x12E42ccf14B283Ef0a36A791892D18BF75Da5c80',
        rewardToken: '0x94140c2eA9D208D8476cA4E3045254169791C59e',
        rewardTokenSymbol: 'PREMIO',
        weight: 0,
    },
];
function useStakingPoolsInfo(poolManagerContract, poolAddresses) {
    const pools = (0, hooks_1.useSingleContractMultipleData)(poolManagerContract, 'pools', poolAddresses.map((addr) => [addr]));
    const rawPools = (0, react_1.useMemo)(() => {
        return !pools || !pools[0] || pools[0].loading
            ? []
            : pools.map((p) => p === null || p === void 0 ? void 0 : p.result).filter((x) => !!x);
    }, [pools]);
    const nextPeriod = (0, hooks_1.useSingleCallResult)(poolManagerContract, 'nextPeriod');
    const poolRewards = (0, hooks_1.useSingleContractMultipleData)(poolManagerContract, 'computeAmountForPool', rawPools.map((p) => { var _a; return [p.stakingToken, (_a = nextPeriod === null || nextPeriod === void 0 ? void 0 : nextPeriod.result) === null || _a === void 0 ? void 0 : _a[0]]; }));
    return rawPools.concat(EXTERNAL_POOLS).map((pool, i) => {
        var _a, _b, _c;
        return (Object.assign(Object.assign({}, pool), { nextPeriodRewards: (_c = (_b = (_a = poolRewards === null || poolRewards === void 0 ? void 0 : poolRewards[i]) === null || _a === void 0 ? void 0 : _a.result) === null || _b === void 0 ? void 0 : _b[0]) !== null && _c !== void 0 ? _c : null }));
    });
}
exports.useStakingPoolsInfo = useStakingPoolsInfo;
function usePairDataFromAddresses(pairAddresses) {
    const accountInfo = (0, react_redux_1.useSelector)((state) => state.swap.accountInfo);
    const { network } = (0, use_contractkit_1.useContractKit)();
    const chainId = (accountInfo ? accountInfo.chainId : network.chainId);
    const token0Data = (0, hooks_1.useMultipleContractSingleData)(pairAddresses, uniswap_v2_pair_1.UNISWAP_V2_PAIR_INTERFACE, 'token0', undefined, hooks_1.NEVER_RELOAD);
    const token1Data = (0, hooks_1.useMultipleContractSingleData)(pairAddresses, uniswap_v2_pair_1.UNISWAP_V2_PAIR_INTERFACE, 'token1', undefined, hooks_1.NEVER_RELOAD);
    const tokens0 = token0Data.map((t) => { var _a; return (_a = t === null || t === void 0 ? void 0 : t.result) === null || _a === void 0 ? void 0 : _a[0]; });
    const tokens1 = token1Data.map((t) => { var _a; return (_a = t === null || t === void 0 ? void 0 : t.result) === null || _a === void 0 ? void 0 : _a[0]; });
    const tokensDb = (0, Tokens_1.useAllTokens)();
    // Construct a set of all the unique token addresses that are not in the tokenlists.
    const tokenAddressesNeededToFetch = (0, react_1.useMemo)(() => [...new Set([...tokens0, ...tokens1])].filter((addr) => addr !== undefined && !tokensDb[addr]), [tokensDb, tokens0, tokens1]);
    const names = (0, hooks_1.useMultipleContractSingleData)(tokenAddressesNeededToFetch, erc20_1.default, 'name', undefined, hooks_1.NEVER_RELOAD);
    const symbols = (0, hooks_1.useMultipleContractSingleData)(tokenAddressesNeededToFetch, erc20_1.default, 'symbol', undefined, hooks_1.NEVER_RELOAD);
    const tokenDecimals = (0, hooks_1.useMultipleContractSingleData)(tokenAddressesNeededToFetch, erc20_1.default, 'decimals', undefined, hooks_1.NEVER_RELOAD);
    // Construct the full token data
    const tokensNeededToFetch = (0, react_1.useMemo)(() => {
        if (!tokenAddressesNeededToFetch.length || !names.length || !symbols.length || !tokenDecimals.length)
            return null;
        if (names[0].loading || tokenDecimals[0].loading || symbols[0].loading)
            return null;
        if (!names[0].result || !tokenDecimals[0].result || !symbols[0].result)
            return null;
        return tokenAddressesNeededToFetch.reduce((memo, address, index) => {
            var _a, _b, _c, _d, _e;
            const decimals = (_a = tokenDecimals[index].result) === null || _a === void 0 ? void 0 : _a[0];
            const name = ((_b = names[index].result) === null || _b === void 0 ? void 0 : _b[0]) === 'Celo Gold' ? 'Celo' : (_c = names[index].result) === null || _c === void 0 ? void 0 : _c[0];
            const symbol = ((_d = symbols[index].result) === null || _d === void 0 ? void 0 : _d[0]) === 'cGLD' ? 'CELO' : (_e = symbols[index].result) === null || _e === void 0 ? void 0 : _e[0]; // todo - remove hardcoded symbol swap for CELO
            // Sometimes, decimals/name/symbol can be undefined, causing an error. TODO: Look into a root cause
            if (chainId && address && decimals && symbol && name) {
                const token = new sdk_1.Token(chainId, address, decimals, symbol, name);
                return [...memo, token];
            }
            return memo;
        }, []);
    }, [chainId, tokenAddressesNeededToFetch, names, symbols, tokenDecimals]);
    const pairsData = (0, react_1.useMemo)(() => {
        const tokens = tokensNeededToFetch !== null && tokensNeededToFetch !== void 0 ? tokensNeededToFetch : [];
        return tokens0.reduce((pairs, token0Address, index) => {
            var _a, _b;
            if (!token0Address) {
                return [...pairs, undefined];
            }
            const token1Address = tokens1[index];
            if (!token1Address) {
                return [...pairs, undefined];
            }
            const token0 = (_a = tokensDb[token0Address]) !== null && _a !== void 0 ? _a : tokens.find((t) => t.address === token0Address);
            const token1 = (_b = tokensDb[token1Address]) !== null && _b !== void 0 ? _b : tokens.find((t) => t.address === token1Address);
            if (!token0 || !token1) {
                return [...pairs, undefined];
            }
            return [...pairs, [token0, token1]];
        }, []);
    }, [tokensNeededToFetch, tokens0, tokens1, tokensDb]);
    return pairsData;
}
exports.usePairDataFromAddresses = usePairDataFromAddresses;
function useTotalUbeEarned() {
    const accountInfo = (0, react_redux_1.useSelector)((state) => state.swap.accountInfo);
    const { network } = (0, use_contractkit_1.useContractKit)();
    const chainId = (accountInfo ? accountInfo.chainId : network.chainId);
    const ube = chainId ? tokens_1.UBE[chainId] : undefined;
    const stakingInfos = (0, useStakingInfo_1.default)();
    return (0, react_1.useMemo)(() => {
        var _a;
        if (!ube)
            return undefined;
        return ((_a = stakingInfos === null || stakingInfos === void 0 ? void 0 : stakingInfos.filter((stakingInfo) => stakingInfo.rewardTokens.includes(ube)).reduce((accumulator, stakingInfo) => {
            var _a, _b;
            return accumulator.add((_b = (_a = stakingInfo.earnedAmounts) === null || _a === void 0 ? void 0 : _a.find((earnedAmount) => earnedAmount.token == ube)) !== null && _b !== void 0 ? _b : new sdk_1.TokenAmount(ube, '0'));
        }, new sdk_1.TokenAmount(ube, '0'))) !== null && _a !== void 0 ? _a : new sdk_1.TokenAmount(ube, '0'));
    }, [stakingInfos, ube]);
}
exports.useTotalUbeEarned = useTotalUbeEarned;
function useFilteredStakingInfo(stakingAddresses) {
    const accountInfo = (0, react_redux_1.useSelector)((state) => state.swap.accountInfo);
    const { network } = (0, use_contractkit_1.useContractKit)();
    const chainId = (accountInfo ? accountInfo.chainId : network.chainId);
    const ube = chainId ? tokens_1.UBE[chainId] : undefined;
    const stakingInfos = (0, useStakingInfo_1.default)();
    return (0, react_1.useMemo)(() => {
        if (!ube)
            return;
        return stakingInfos.filter((stakingInfo) => stakingInfo.stakingToken.address && stakingAddresses.includes(stakingInfo.stakingToken.address));
    }, [stakingInfos, ube, stakingAddresses]);
}
exports.useFilteredStakingInfo = useFilteredStakingInfo;
function useFarmRewardsInfo(stakingAddresses) {
    const accountInfo = (0, react_redux_1.useSelector)((state) => state.swap.accountInfo);
    const { network } = (0, use_contractkit_1.useContractKit)();
    const chainId = (accountInfo ? accountInfo.chainId : network.chainId);
    const ube = chainId ? tokens_1.UBE[chainId] : undefined;
    const stakingInfos = (0, useStakingInfo_1.default)();
    return (0, react_1.useMemo)(() => {
        if (!ube)
            return;
        return stakingInfos.filter((stakingInfo) => stakingInfo.stakingToken.address && stakingAddresses.includes(stakingInfo.stakingToken.address));
    }, [stakingInfos, ube, stakingAddresses]);
}
exports.useFarmRewardsInfo = useFarmRewardsInfo;
// based on typed value
function useDerivedStakeInfo(typedValue, stakingToken, userLiquidityUnstaked) {
    const { address } = (0, use_contractkit_1.useContractKit)();
    const accountInfo = (0, react_redux_1.useSelector)((state) => state.swap.accountInfo);
    const account = accountInfo ? accountInfo.account : address;
    const parsedInput = (0, hooks_2.tryParseAmount)(typedValue, stakingToken !== null && stakingToken !== void 0 ? stakingToken : undefined);
    const parsedAmount = parsedInput && userLiquidityUnstaked && sdk_1.JSBI.lessThanOrEqual(parsedInput.raw, userLiquidityUnstaked.raw)
        ? parsedInput
        : undefined;
    let error;
    if (!account) {
        error = 'Connect Wallet';
    }
    if (!parsedAmount) {
        error = error !== null && error !== void 0 ? error : 'Enter an amount';
    }
    return {
        parsedAmount,
        error,
    };
}
exports.useDerivedStakeInfo = useDerivedStakeInfo;
// based on typed value
function useDerivedUnstakeInfo(typedValue, stakingAmount) {
    const { address } = (0, use_contractkit_1.useContractKit)();
    const accountInfo = (0, react_redux_1.useSelector)((state) => state.swap.accountInfo);
    const account = accountInfo ? accountInfo.account : address;
    const parsedInput = (0, hooks_2.tryParseAmount)(typedValue, stakingAmount.token);
    const parsedAmount = parsedInput && sdk_1.JSBI.lessThanOrEqual(parsedInput.raw, stakingAmount.raw) ? parsedInput : undefined;
    let error;
    if (!account) {
        error = 'Connect Wallet';
    }
    if (!parsedAmount) {
        error = error !== null && error !== void 0 ? error : 'Enter an amount';
    }
    return {
        parsedAmount,
        error,
    };
}
exports.useDerivedUnstakeInfo = useDerivedUnstakeInfo;
