"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useMultiStakeRewards = void 0;
const use_contractkit_1 = require("@celo-tools/use-contractkit");
const sdk_1 = require("@ubeswap/sdk");
const zip_1 = __importDefault(require("lodash/zip"));
const react_1 = require("react");
const Tokens_1 = require("../../hooks/Tokens");
const useContract_1 = require("../../hooks/useContract");
const hooks_1 = require("../../state/multicall/hooks");
const index_1 = require("./../../constants/index");
const useMultiStakeRewards = (address, underlyingPool, numRewards, active) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
    const { address: owner } = (0, use_contractkit_1.useContractKit)();
    const accountArg = (0, react_1.useMemo)(() => [owner !== null && owner !== void 0 ? owner : undefined], [owner]);
    const stakeRewards = (0, useContract_1.useMultiStakingContract)(address);
    const totalSupply = (_b = (_a = (0, hooks_1.useSingleCallResult)(stakeRewards, 'totalSupply', [])) === null || _a === void 0 ? void 0 : _a.result) === null || _b === void 0 ? void 0 : _b[0];
    const rewardRate = (_d = (_c = (0, hooks_1.useSingleCallResult)(stakeRewards, 'rewardRate', [])) === null || _c === void 0 ? void 0 : _c.result) === null || _d === void 0 ? void 0 : _d[0];
    const rewardsToken = (0, Tokens_1.useToken)((_f = (_e = (0, hooks_1.useSingleCallResult)(stakeRewards, 'rewardsToken', [])) === null || _e === void 0 ? void 0 : _e.result) === null || _f === void 0 ? void 0 : _f[0]);
    const externalRewardsTokens = (_g = (0, hooks_1.useSingleContractMultipleData)(stakeRewards, 'externalRewardsTokens', [...[...Array(numRewards - 2).keys()].map((i) => [i])])) === null || _g === void 0 ? void 0 : _g.map((cr) => cr === null || cr === void 0 ? void 0 : cr.result).reduce((acc, curr, idx) => (Object.assign(Object.assign({}, acc), { [curr]: idx })), {});
    const stakeBalance = (_j = (_h = (0, hooks_1.useSingleCallResult)(stakeRewards, 'balanceOf', accountArg)) === null || _h === void 0 ? void 0 : _h.result) === null || _j === void 0 ? void 0 : _j[0];
    const earned = (_l = (_k = (0, hooks_1.useSingleCallResult)(stakeRewards, 'earned', accountArg)) === null || _k === void 0 ? void 0 : _k.result) === null || _l === void 0 ? void 0 : _l[0];
    const earnedExternal = (_o = (_m = (0, hooks_1.useSingleCallResult)(stakeRewards, 'earnedExternal', accountArg)) === null || _m === void 0 ? void 0 : _m.result) === null || _o === void 0 ? void 0 : _o[0];
    const periodFinish = (_q = (_p = (0, hooks_1.useSingleCallResult)(stakeRewards, 'periodFinish', [])) === null || _p === void 0 ? void 0 : _p.result) === null || _q === void 0 ? void 0 : _q[0];
    const data = (0, react_1.useMemo)(() => ({
        totalSupply,
        rewardRate,
        rewardsToken,
        periodFinish,
        myBalance: stakeBalance,
        earned: [earned, ...(earnedExternal ? earnedExternal : [])],
    }), [earned, earnedExternal, rewardRate, rewardsToken, stakeBalance, totalSupply, periodFinish]);
    return (0, react_1.useMemo)(() => {
        var _a, _b, _c;
        if (!data || !rewardsToken || !underlyingPool) {
            return null;
        }
        const { totalSupply: totalSupplyRaw, rewardRate: totalRewardRateRaw, myBalance, earned, periodFinish } = data;
        const { stakingToken } = underlyingPool;
        const getHypotheticalRewardRate = (stakedAmount, totalStakedAmount, totalRewardRates) => {
            return totalRewardRates.map((totalRewardRate) => {
                return new sdk_1.TokenAmount(totalRewardRate.token, sdk_1.JSBI.greaterThan(totalStakedAmount.raw, sdk_1.JSBI.BigInt(0))
                    ? sdk_1.JSBI.divide(sdk_1.JSBI.multiply(totalRewardRate.raw, stakedAmount.raw), totalStakedAmount.raw)
                    : sdk_1.JSBI.BigInt(0));
            });
        };
        const rewardsFinished = Math.floor(Date.now() / 1000) - periodFinish.toNumber() > index_1.INT_SECONDS_IN_WEEK;
        const stakedAmount = myBalance ? new sdk_1.TokenAmount(stakingToken, (_a = myBalance === null || myBalance === void 0 ? void 0 : myBalance.toString()) !== null && _a !== void 0 ? _a : '0') : undefined;
        const totalStakedAmount = new sdk_1.TokenAmount(stakingToken, (_b = totalSupplyRaw === null || totalSupplyRaw === void 0 ? void 0 : totalSupplyRaw.toString()) !== null && _b !== void 0 ? _b : '0');
        const totalRewardRates = [
            new sdk_1.TokenAmount(rewardsToken, rewardsFinished ? sdk_1.JSBI.BigInt(0) : (_c = totalRewardRateRaw === null || totalRewardRateRaw === void 0 ? void 0 : totalRewardRateRaw.toString()) !== null && _c !== void 0 ? _c : '0'),
            ...underlyingPool.totalRewardRates,
        ].sort((a, b) => { var _a, _b; return (((_a = a.token) === null || _a === void 0 ? void 0 : _a.symbol) && ((_b = b === null || b === void 0 ? void 0 : b.token) === null || _b === void 0 ? void 0 : _b.symbol) ? a.token.symbol.localeCompare(b.token.symbol) : 0); });
        const rewardRates = stakedAmount
            ? getHypotheticalRewardRate(stakedAmount, totalStakedAmount, totalRewardRates)
            : totalRewardRates.map((totalRewardRate) => new sdk_1.TokenAmount(totalRewardRate.token, '0'));
        const underlyingRewardTokens = underlyingPool.rewardTokens.sort((a, b) => externalRewardsTokens[a === null || a === void 0 ? void 0 : a.address] - externalRewardsTokens[b === null || b === void 0 ? void 0 : b.address]);
        const rewardTokens = rewardsToken ? [rewardsToken, ...underlyingRewardTokens] : [...underlyingRewardTokens];
        const earnedAmounts = earned && earned.length === rewardTokens.length
            ? (0, zip_1.default)(earned, rewardTokens)
                .map(([amount, token]) => { var _a; return new sdk_1.TokenAmount(token, (_a = amount === null || amount === void 0 ? void 0 : amount.toString()) !== null && _a !== void 0 ? _a : '0'); })
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
exports.useMultiStakeRewards = useMultiStakeRewards;
