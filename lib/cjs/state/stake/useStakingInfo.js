"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usePairStakingInfo = void 0;
const use_contractkit_1 = require("@celo-tools/use-contractkit");
const sdk_1 = require("@ubeswap/sdk");
const staking_rewards_1 = require("constants/abis/staking-rewards");
const tokens_1 = require("constants/tokens");
const useCurrentBlockTimestamp_1 = __importDefault(require("hooks/useCurrentBlockTimestamp"));
const react_1 = require("react");
const hooks_1 = require("state/multicall/hooks");
const index_1 = require("./../../constants/index");
const hooks_2 = require("./hooks");
// Gets the staking info from the network for the active chain id
function useStakingInfo(pairToFilterBy, stakingAddress) {
    const { network, address } = (0, use_contractkit_1.useContractKit)();
    const chainId = network.chainId;
    const ube = chainId ? tokens_1.UBE[chainId] : undefined;
    // detect if staking is ended
    const currentBlockTimestamp = (0, useCurrentBlockTimestamp_1.default)();
    const info = (0, hooks_2.useStakingPools)(pairToFilterBy, stakingAddress);
    // These are the staking pools
    const rewardsAddresses = (0, react_1.useMemo)(() => info.map(({ stakingRewardAddress }) => stakingRewardAddress), [info]);
    const accountArg = (0, react_1.useMemo)(() => [address !== null && address !== void 0 ? address : undefined], [address]);
    // get all the info from the staking rewards contracts
    const balances = (0, hooks_1.useMultipleContractSingleData)(rewardsAddresses, staking_rewards_1.STAKING_REWARDS_INTERFACE, 'balanceOf', accountArg);
    const earnedAmounts = (0, hooks_1.useMultipleContractSingleData)(rewardsAddresses, staking_rewards_1.STAKING_REWARDS_INTERFACE, 'earned', accountArg);
    const totalSupplies = (0, hooks_1.useMultipleContractSingleData)(rewardsAddresses, staking_rewards_1.STAKING_REWARDS_INTERFACE, 'totalSupply');
    // tokens per second, constants
    const rewardRates = (0, hooks_1.useMultipleContractSingleData)(rewardsAddresses, staking_rewards_1.STAKING_REWARDS_INTERFACE, 'rewardRate');
    const periodFinishes = (0, hooks_1.useMultipleContractSingleData)(rewardsAddresses, staking_rewards_1.STAKING_REWARDS_INTERFACE, 'periodFinish');
    return (0, react_1.useMemo)(() => {
        if (!chainId || !ube)
            return [];
        return info.reduce((memo, { stakingRewardAddress: rewardsAddress, poolInfo, tokens }, index) => {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
            // these two are dependent on account
            const balanceState = balances[index];
            const earnedAmountState = earnedAmounts[index];
            // these get fetched regardless of account
            const totalSupplyState = totalSupplies[index];
            const rewardRateState = rewardRates[index];
            const periodFinishState = periodFinishes[index];
            if (
            // these may be undefined if not logged in
            !(balanceState === null || balanceState === void 0 ? void 0 : balanceState.loading) &&
                !(earnedAmountState === null || earnedAmountState === void 0 ? void 0 : earnedAmountState.loading) &&
                // always need these
                totalSupplyState &&
                !totalSupplyState.loading &&
                rewardRateState &&
                !rewardRateState.loading &&
                periodFinishState &&
                !periodFinishState.loading) {
                if ((balanceState === null || balanceState === void 0 ? void 0 : balanceState.error) ||
                    (earnedAmountState === null || earnedAmountState === void 0 ? void 0 : earnedAmountState.error) ||
                    totalSupplyState.error ||
                    rewardRateState.error ||
                    periodFinishState.error) {
                    console.error('Failed to load staking rewards info');
                    return memo;
                }
                const rewardToken = poolInfo.rewardToken
                    ? new sdk_1.Token(chainId, poolInfo.rewardToken, 18, poolInfo.rewardTokenSymbol)
                    : ube;
                // get the LP token
                const liquidityToken = new sdk_1.Token(chainId, poolInfo.stakingToken, 18, 'ULP', 'Ubeswap LP Token');
                // check for account, if no account set to 0
                const stakedAmount = new sdk_1.TokenAmount(liquidityToken, sdk_1.JSBI.BigInt((_b = (_a = balanceState === null || balanceState === void 0 ? void 0 : balanceState.result) === null || _a === void 0 ? void 0 : _a[0]) !== null && _b !== void 0 ? _b : 0));
                const totalStakedAmount = new sdk_1.TokenAmount(liquidityToken, sdk_1.JSBI.BigInt((_c = totalSupplyState.result) === null || _c === void 0 ? void 0 : _c[0]));
                const nextPeriodRewards = new sdk_1.TokenAmount(ube, (_e = (_d = poolInfo.nextPeriodRewards) === null || _d === void 0 ? void 0 : _d.toString()) !== null && _e !== void 0 ? _e : '0');
                const getHypotheticalRewardRate = (stakedAmount, totalStakedAmount, totalRewardRates) => {
                    return [
                        new sdk_1.TokenAmount(rewardToken, sdk_1.JSBI.greaterThan(totalStakedAmount.raw, sdk_1.JSBI.BigInt(0))
                            ? sdk_1.JSBI.divide(sdk_1.JSBI.multiply(totalRewardRates[0].raw, stakedAmount.raw), totalStakedAmount.raw)
                            : sdk_1.JSBI.BigInt(0)),
                    ];
                };
                const periodFinishSeconds = (_g = (_f = periodFinishState.result) === null || _f === void 0 ? void 0 : _f[0]) === null || _g === void 0 ? void 0 : _g.toNumber();
                const periodFinishMs = periodFinishSeconds * 1000;
                // compare period end timestamp vs current block timestamp (in seconds)
                const active = periodFinishSeconds && currentBlockTimestamp
                    ? periodFinishSeconds > currentBlockTimestamp.toNumber()
                    : false;
                const rewardsFinished = Math.floor(Date.now() / 1000) - periodFinishSeconds > index_1.INT_SECONDS_IN_WEEK;
                const totalRewardRate = new sdk_1.TokenAmount(rewardToken, rewardsFinished ? sdk_1.JSBI.BigInt(0) : sdk_1.JSBI.BigInt((_h = rewardRateState.result) === null || _h === void 0 ? void 0 : _h[0]));
                const individualRewardRate = getHypotheticalRewardRate(stakedAmount, totalStakedAmount, [totalRewardRate]);
                if (!tokens) {
                    return memo;
                }
                memo.push({
                    stakingRewardAddress: rewardsAddress,
                    stakingToken: totalStakedAmount.token,
                    tokens,
                    stakedAmount,
                    totalStakedAmount,
                    earnedAmounts: [new sdk_1.TokenAmount(rewardToken, sdk_1.JSBI.BigInt((_k = (_j = earnedAmountState === null || earnedAmountState === void 0 ? void 0 : earnedAmountState.result) === null || _j === void 0 ? void 0 : _j[0]) !== null && _k !== void 0 ? _k : 0))],
                    rewardRates: individualRewardRate,
                    totalRewardRates: [totalRewardRate],
                    periodFinish: periodFinishMs > 0 ? new Date(periodFinishMs) : undefined,
                    active,
                    getHypotheticalRewardRate,
                    nextPeriodRewards,
                    poolInfo,
                    rewardTokens: [rewardToken],
                });
            }
            return memo;
        }, []);
    }, [balances, chainId, currentBlockTimestamp, earnedAmounts, info, periodFinishes, rewardRates, totalSupplies, ube]);
}
exports.default = useStakingInfo;
// `stakingAddress` is used to differentiate when there are two different farms with the same LP
const usePairStakingInfo = (pairToFilterBy, stakingAddress) => {
    var _a;
    return (_a = useStakingInfo(pairToFilterBy, stakingAddress)[0]) !== null && _a !== void 0 ? _a : undefined;
};
exports.usePairStakingInfo = usePairStakingInfo;
