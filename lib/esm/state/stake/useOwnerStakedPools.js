import { useContractKit } from '@celo-tools/use-contractkit';
import { Interface } from '@ethersproject/abi';
import partition from 'lodash/partition';
import { useMemo } from 'react';
import DUAL_REWARDS_ABI from '../../constants/abis/moola/MoolaStakingRewards.json';
import { useMultipleContractSingleData } from '../../state/multicall/hooks';
// get all staked pools
export const useOwnerStakedPools = (farmSummaries) => {
    const { address: owner } = useContractKit();
    const data = useMultipleContractSingleData(farmSummaries.map((farmSummaries) => farmSummaries.stakingAddress), new Interface(DUAL_REWARDS_ABI), 'balanceOf', [owner || undefined]);
    const isStaked = data.reduce((acc, curr, idx) => {
        var _a;
        acc[farmSummaries[idx].stakingAddress] = (_a = curr === null || curr === void 0 ? void 0 : curr.result) === null || _a === void 0 ? void 0 : _a[0].gt('0');
        return acc;
    }, {});
    const [stakedFarms, featuredFarms, uniqueUnstakedFarms, importedFarms] = useMemo(() => {
        const [staked, unstaked] = partition(farmSummaries, (farmSummary) => isStaked[farmSummary.stakingAddress]);
        const [featuredFarms, remainingFarms] = partition(unstaked, (farmSummary) => farmSummary.isFeatured);
        const [importedFarms, availableFarms] = partition(remainingFarms, (farmSummary) => farmSummary.isImported);
        return [staked, unique(featuredFarms), unique(availableFarms), importedFarms];
    }, [farmSummaries, isStaked]);
    return { stakedFarms, featuredFarms, unstakedFarms: uniqueUnstakedFarms, importedFarms };
};
function unique(farmSummaries) {
    const bestFarms = {};
    farmSummaries.forEach((fs) => {
        if (!bestFarms[fs.lpAddress]) {
            bestFarms[fs.lpAddress] = fs;
        }
        const currentBest = bestFarms[fs.lpAddress];
        if (fs.rewardsUSDPerYear.gt(currentBest.rewardsUSDPerYear)) {
            bestFarms[fs.lpAddress] = fs;
        }
    });
    return Object.values(bestFarms);
}
