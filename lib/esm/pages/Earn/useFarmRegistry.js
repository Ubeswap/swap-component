var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { gql, useApolloClient } from '@apollo/client';
import { useContractKit } from '@celo-tools/use-contractkit';
import { BigNumber } from '@ethersproject/bignumber';
import { formatEther, parseEther } from '@ethersproject/units';
import { Percent } from '@ubeswap/sdk';
import { ethers } from 'ethers';
import React, { useEffect } from 'react';
import farmRegistryAbi from '../../constants/abis/FarmRegistry.json';
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
const pairDataGql = gql `
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
export const useFarmRegistry = () => {
    const { kit } = useContractKit();
    const client = useApolloClient();
    const [farmSummaries, setFarmSummaries] = React.useState([]);
    const call = React.useCallback(() => __awaiter(void 0, void 0, void 0, function* () {
        const farmRegistry = new kit.web3.eth.Contract(farmRegistryAbi, '0xa2bf67e12EeEDA23C7cA1e5a34ae2441a17789Ec');
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
                farmName: ethers.utils.parseBytes32String(e.returnValues.farmName),
                stakingAddress: e.returnValues.stakingAddress,
                lpAddress: e.returnValues.lpAddress,
                token0Address: lps[e.returnValues.lpAddress][0],
                token1Address: lps[e.returnValues.lpAddress][1],
                tvlUSD: BigNumber.from(farmData[e.returnValues.stakingAddress].tvlUSD),
                rewardsUSDPerYear: BigNumber.from(farmData[e.returnValues.stakingAddress].rewardsUSDPerYear),
                isFeatured: !!featuredPoolWhitelist[e.returnValues.stakingAddress],
                isImported: false,
            });
        });
        farmSummaries
            .sort((a, b) => Number(formatEther(b.rewardsUSDPerYear.sub(a.rewardsUSDPerYear))))
            .sort((a, b) => Number(formatEther(b.tvlUSD.sub(a.tvlUSD))));
        const results = yield Promise.all(farmSummaries.map((summary) => {
            return client.query({ query: pairDataGql, variables: { id: summary.lpAddress.toLowerCase() } });
        }));
        const farmInfos = results.map((result, index) => calcAPR(result, farmSummaries[index]));
        setFarmSummaries(farmSummaries.map((summary, index) => (Object.assign(Object.assign({}, summary), farmInfos[index]))));
    }), [kit.web3.eth, client]);
    useEffect(() => {
        call();
    }, [call]);
    return farmSummaries;
};
export const useUniqueBestFarms = () => {
    const farmSummaries = useFarmRegistry();
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
// formula is 1 + ((nom/compoundsPerYear)^compoundsPerYear) - 1
function annualizedPercentageYield(nominal, compounds) {
    const ONE = 1;
    const divideNominalByNAddOne = Number(nominal.divide(BigInt(compounds)).add(BigInt(ONE)).toFixed(10));
    // multiply 100 to turn decimal into percent, to fixed since we only display integer
    return ((Math.pow(divideNominalByNAddOne, compounds) - ONE) * 100).toFixed(0);
}
// calculate rewardAPR, swapAPR, APY & APR from a farmSummary
function calcAPR(result, summary) {
    let swapRewardsUSDPerYear = BigNumber.from(0);
    const { loading, error, data } = result;
    if (!loading && !error && (data === null || data === void 0 ? void 0 : data.pair)) {
        const lastDayVolumeUsd = data.pair.pairHourData.reduce((acc, curr) => acc + Number(curr.hourlyVolumeUSD), 0);
        swapRewardsUSDPerYear = parseEther(Math.floor(lastDayVolumeUsd * 365 * 0.0025).toString());
    }
    const rewardApr = new Percent(summary.rewardsUSDPerYear.toString(), summary.tvlUSD.toString());
    const swapApr = new Percent(swapRewardsUSDPerYear.toString(), summary.tvlUSD.toString());
    const apr = new Percent(swapRewardsUSDPerYear.add(summary.rewardsUSDPerYear).toString(), summary.tvlUSD.toString());
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
