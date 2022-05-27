"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useOwnerStakedPools = void 0;
const use_contractkit_1 = require("@celo-tools/use-contractkit");
const abi_1 = require("@ethersproject/abi");
const partition_1 = __importDefault(require("lodash/partition"));
const react_1 = require("react");
const hooks_1 = require("state/multicall/hooks");
const MoolaStakingRewards_json_1 = __importDefault(require("../../constants/abis/moola/MoolaStakingRewards.json"));
// get all staked pools
const useOwnerStakedPools = (farmSummaries) => {
    const { address: owner } = (0, use_contractkit_1.useContractKit)();
    const data = (0, hooks_1.useMultipleContractSingleData)(farmSummaries.map((farmSummaries) => farmSummaries.stakingAddress), new abi_1.Interface(MoolaStakingRewards_json_1.default), 'balanceOf', [owner || undefined]);
    const isStaked = data.reduce((acc, curr, idx) => {
        var _a;
        acc[farmSummaries[idx].stakingAddress] = (_a = curr === null || curr === void 0 ? void 0 : curr.result) === null || _a === void 0 ? void 0 : _a[0].gt('0');
        return acc;
    }, {});
    const [stakedFarms, featuredFarms, uniqueUnstakedFarms, importedFarms] = (0, react_1.useMemo)(() => {
        const [staked, unstaked] = (0, partition_1.default)(farmSummaries, (farmSummary) => isStaked[farmSummary.stakingAddress]);
        const [featuredFarms, remainingFarms] = (0, partition_1.default)(unstaked, (farmSummary) => farmSummary.isFeatured);
        const [importedFarms, availableFarms] = (0, partition_1.default)(remainingFarms, (farmSummary) => farmSummary.isImported);
        return [staked, unique(featuredFarms), unique(availableFarms), importedFarms];
    }, [farmSummaries, isStaked]);
    return { stakedFarms, featuredFarms, unstakedFarms: uniqueUnstakedFarms, importedFarms };
};
exports.useOwnerStakedPools = useOwnerStakedPools;
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
