import { useContractKit } from '@celo-tools/use-contractkit';
import { JSBI, TokenAmount } from '@ubeswap/sdk';
import zip from 'lodash/zip';
import { useMemo } from 'react';
import { useToken } from '../../hooks/Tokens';
import { useMultiStakingContract } from '../../hooks/useContract';
import { useSingleCallResult, useSingleContractMultipleData } from '../../state/multicall/hooks';
import { INT_SECONDS_IN_WEEK } from './../../constants/index';
export const useMultiStakeRewards = (address, underlyingPool, numRewards, active) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
    const { address: owner } = useContractKit();
    const accountArg = useMemo(() => [owner !== null && owner !== void 0 ? owner : undefined], [owner]);
    const stakeRewards = useMultiStakingContract(address);
    const totalSupply = (_b = (_a = useSingleCallResult(stakeRewards, 'totalSupply', [])) === null || _a === void 0 ? void 0 : _a.result) === null || _b === void 0 ? void 0 : _b[0];
    const rewardRate = (_d = (_c = useSingleCallResult(stakeRewards, 'rewardRate', [])) === null || _c === void 0 ? void 0 : _c.result) === null || _d === void 0 ? void 0 : _d[0];
    const rewardsToken = useToken((_f = (_e = useSingleCallResult(stakeRewards, 'rewardsToken', [])) === null || _e === void 0 ? void 0 : _e.result) === null || _f === void 0 ? void 0 : _f[0]);
    const externalRewardsTokens = (_g = useSingleContractMultipleData(stakeRewards, 'externalRewardsTokens', [...[...Array(numRewards - 2).keys()].map((i) => [i])])) === null || _g === void 0 ? void 0 : _g.map((cr) => cr === null || cr === void 0 ? void 0 : cr.result).reduce((acc, curr, idx) => (Object.assign(Object.assign({}, acc), { [curr]: idx })), {});
    const stakeBalance = (_j = (_h = useSingleCallResult(stakeRewards, 'balanceOf', accountArg)) === null || _h === void 0 ? void 0 : _h.result) === null || _j === void 0 ? void 0 : _j[0];
    const earned = (_l = (_k = useSingleCallResult(stakeRewards, 'earned', accountArg)) === null || _k === void 0 ? void 0 : _k.result) === null || _l === void 0 ? void 0 : _l[0];
    const earnedExternal = (_o = (_m = useSingleCallResult(stakeRewards, 'earnedExternal', accountArg)) === null || _m === void 0 ? void 0 : _m.result) === null || _o === void 0 ? void 0 : _o[0];
    const periodFinish = (_q = (_p = useSingleCallResult(stakeRewards, 'periodFinish', [])) === null || _p === void 0 ? void 0 : _p.result) === null || _q === void 0 ? void 0 : _q[0];
    const data = useMemo(() => ({
        totalSupply,
        rewardRate,
        rewardsToken,
        periodFinish,
        myBalance: stakeBalance,
        earned: [earned, ...(earnedExternal ? earnedExternal : [])],
    }), [earned, earnedExternal, rewardRate, rewardsToken, stakeBalance, totalSupply, periodFinish]);
    return useMemo(() => {
        var _a, _b, _c;
        if (!data || !rewardsToken || !underlyingPool) {
            return null;
        }
        const { totalSupply: totalSupplyRaw, rewardRate: totalRewardRateRaw, myBalance, earned, periodFinish } = data;
        const { stakingToken } = underlyingPool;
        const getHypotheticalRewardRate = (stakedAmount, totalStakedAmount, totalRewardRates) => {
            return totalRewardRates.map((totalRewardRate) => {
                return new TokenAmount(totalRewardRate.token, JSBI.greaterThan(totalStakedAmount.raw, JSBI.BigInt(0))
                    ? JSBI.divide(JSBI.multiply(totalRewardRate.raw, stakedAmount.raw), totalStakedAmount.raw)
                    : JSBI.BigInt(0));
            });
        };
        const rewardsFinished = Math.floor(Date.now() / 1000) - periodFinish.toNumber() > INT_SECONDS_IN_WEEK;
        const stakedAmount = myBalance ? new TokenAmount(stakingToken, (_a = myBalance === null || myBalance === void 0 ? void 0 : myBalance.toString()) !== null && _a !== void 0 ? _a : '0') : undefined;
        const totalStakedAmount = new TokenAmount(stakingToken, (_b = totalSupplyRaw === null || totalSupplyRaw === void 0 ? void 0 : totalSupplyRaw.toString()) !== null && _b !== void 0 ? _b : '0');
        const totalRewardRates = [
            new TokenAmount(rewardsToken, rewardsFinished ? JSBI.BigInt(0) : (_c = totalRewardRateRaw === null || totalRewardRateRaw === void 0 ? void 0 : totalRewardRateRaw.toString()) !== null && _c !== void 0 ? _c : '0'),
            ...underlyingPool.totalRewardRates,
        ].sort((a, b) => { var _a, _b; return (((_a = a.token) === null || _a === void 0 ? void 0 : _a.symbol) && ((_b = b === null || b === void 0 ? void 0 : b.token) === null || _b === void 0 ? void 0 : _b.symbol) ? a.token.symbol.localeCompare(b.token.symbol) : 0); });
        const rewardRates = stakedAmount
            ? getHypotheticalRewardRate(stakedAmount, totalStakedAmount, totalRewardRates)
            : totalRewardRates.map((totalRewardRate) => new TokenAmount(totalRewardRate.token, '0'));
        const underlyingRewardTokens = underlyingPool.rewardTokens.sort((a, b) => externalRewardsTokens[a === null || a === void 0 ? void 0 : a.address] - externalRewardsTokens[b === null || b === void 0 ? void 0 : b.address]);
        const rewardTokens = rewardsToken ? [rewardsToken, ...underlyingRewardTokens] : [...underlyingRewardTokens];
        const earnedAmounts = earned && earned.length === rewardTokens.length
            ? zip(earned, rewardTokens)
                .map(([amount, token]) => { var _a; return new TokenAmount(token, (_a = amount === null || amount === void 0 ? void 0 : amount.toString()) !== null && _a !== void 0 ? _a : '0'); })
                .sort((a, b) => { var _a, _b; return (((_a = a === null || a === void 0 ? void 0 : a.token) === null || _a === void 0 ? void 0 : _a.symbol) && ((_b = b === null || b === void 0 ? void 0 : b.token) === null || _b === void 0 ? void 0 : _b.symbol) ? a.token.symbol.localeCompare(b.token.symbol) : 0); })
            : undefined;
        return {
            stakingRewardAddress: address,
            stakingToken,
            tokens: underlyingPool.tokens,
            stakedAmount,
            totalStakedAmount,
            earnedAmounts,
            rewardRates,
            totalRewardRates,
            periodFinish: new Date(),
            active,
            getHypotheticalRewardRate,
            nextPeriodRewards: underlyingPool.nextPeriodRewards,
            poolInfo: underlyingPool.poolInfo,
            rewardTokens,
        };
    }, [data, rewardsToken, underlyingPool, address, active, externalRewardsTokens]);
};
