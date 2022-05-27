import { useContractKit } from '@celo-tools/use-contractkit';
import { JSBI, Token, TokenAmount } from '@ubeswap/sdk';
import { STAKING_REWARDS_INTERFACE } from 'constants/abis/staking-rewards';
import { UBE } from 'constants/tokens';
import useCurrentBlockTimestamp from 'hooks/useCurrentBlockTimestamp';
import { useMemo } from 'react';
import { useMultipleContractSingleData } from 'state/multicall/hooks';
import { INT_SECONDS_IN_WEEK } from './../../constants/index';
import { useStakingPools } from './hooks';
// Gets the staking info from the network for the active chain id
export default function useStakingInfo(pairToFilterBy, stakingAddress) {
    const { network, address } = useContractKit();
    const chainId = network.chainId;
    const ube = chainId ? UBE[chainId] : undefined;
    // detect if staking is ended
    const currentBlockTimestamp = useCurrentBlockTimestamp();
    const info = useStakingPools(pairToFilterBy, stakingAddress);
    // These are the staking pools
    const rewardsAddresses = useMemo(() => info.map(({ stakingRewardAddress }) => stakingRewardAddress), [info]);
    const accountArg = useMemo(() => [address !== null && address !== void 0 ? address : undefined], [address]);
    // get all the info from the staking rewards contracts
    const balances = useMultipleContractSingleData(rewardsAddresses, STAKING_REWARDS_INTERFACE, 'balanceOf', accountArg);
    const earnedAmounts = useMultipleContractSingleData(rewardsAddresses, STAKING_REWARDS_INTERFACE, 'earned', accountArg);
    const totalSupplies = useMultipleContractSingleData(rewardsAddresses, STAKING_REWARDS_INTERFACE, 'totalSupply');
    // tokens per second, constants
    const rewardRates = useMultipleContractSingleData(rewardsAddresses, STAKING_REWARDS_INTERFACE, 'rewardRate');
    const periodFinishes = useMultipleContractSingleData(rewardsAddresses, STAKING_REWARDS_INTERFACE, 'periodFinish');
    return useMemo(() => {
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
                    ? new Token(chainId, poolInfo.rewardToken, 18, poolInfo.rewardTokenSymbol)
                    : ube;
                // get the LP token
                const liquidityToken = new Token(chainId, poolInfo.stakingToken, 18, 'ULP', 'Ubeswap LP Token');
                // check for account, if no account set to 0
                const stakedAmount = new TokenAmount(liquidityToken, JSBI.BigInt((_b = (_a = balanceState === null || balanceState === void 0 ? void 0 : balanceState.result) === null || _a === void 0 ? void 0 : _a[0]) !== null && _b !== void 0 ? _b : 0));
                const totalStakedAmount = new TokenAmount(liquidityToken, JSBI.BigInt((_c = totalSupplyState.result) === null || _c === void 0 ? void 0 : _c[0]));
                const nextPeriodRewards = new TokenAmount(ube, (_e = (_d = poolInfo.nextPeriodRewards) === null || _d === void 0 ? void 0 : _d.toString()) !== null && _e !== void 0 ? _e : '0');
                const getHypotheticalRewardRate = (stakedAmount, totalStakedAmount, totalRewardRates) => {
                    return [
                        new TokenAmount(rewardToken, JSBI.greaterThan(totalStakedAmount.raw, JSBI.BigInt(0))
                            ? JSBI.divide(JSBI.multiply(totalRewardRates[0].raw, stakedAmount.raw), totalStakedAmount.raw)
                            : JSBI.BigInt(0)),
                    ];
                };
                const periodFinishSeconds = (_g = (_f = periodFinishState.result) === null || _f === void 0 ? void 0 : _f[0]) === null || _g === void 0 ? void 0 : _g.toNumber();
                const periodFinishMs = periodFinishSeconds * 1000;
                // compare period end timestamp vs current block timestamp (in seconds)
                const active = periodFinishSeconds && currentBlockTimestamp
                    ? periodFinishSeconds > currentBlockTimestamp.toNumber()
                    : false;
                const rewardsFinished = Math.floor(Date.now() / 1000) - periodFinishSeconds > INT_SECONDS_IN_WEEK;
                const totalRewardRate = new TokenAmount(rewardToken, rewardsFinished ? JSBI.BigInt(0) : JSBI.BigInt((_h = rewardRateState.result) === null || _h === void 0 ? void 0 : _h[0]));
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
                    earnedAmounts: [new TokenAmount(rewardToken, JSBI.BigInt((_k = (_j = earnedAmountState === null || earnedAmountState === void 0 ? void 0 : earnedAmountState.result) === null || _j === void 0 ? void 0 : _j[0]) !== null && _k !== void 0 ? _k : 0))],
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
// `stakingAddress` is used to differentiate when there are two different farms with the same LP
export const usePairStakingInfo = (pairToFilterBy, stakingAddress) => {
    var _a;
    return (_a = useStakingInfo(pairToFilterBy, stakingAddress)[0]) !== null && _a !== void 0 ? _a : undefined;
};
