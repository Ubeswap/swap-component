"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAnnualRewardDollars = void 0;
const use_contractkit_1 = require("@celo-tools/use-contractkit");
const sdk_1 = require("@ubeswap/sdk");
const useCUSDPrice_1 = require("utils/useCUSDPrice");
const constants_1 = require("../../constants");
const useAnnualRewardDollars = (rewardTokens, rewardRates) => {
    const { network } = (0, use_contractkit_1.useContractKit)();
    const chainId = network.chainId;
    const rewardPrices = (0, useCUSDPrice_1.useCUSDPrices)(rewardTokens);
    if (!rewardPrices || !rewardRates) {
        return undefined;
    }
    return rewardPrices.reduce((acc, rewardPrice, idx) => {
        var _a;
        const rewardRate = rewardRates[idx];
        const rewardToken = rewardTokens[idx];
        const rewardTokenPerYear = new sdk_1.TokenAmount(rewardToken, sdk_1.JSBI.multiply(rewardRate.raw, constants_1.BIG_INT_SECONDS_IN_YEAR));
        return acc.add((_a = rewardPrice === null || rewardPrice === void 0 ? void 0 : rewardPrice.quote(rewardTokenPerYear)) !== null && _a !== void 0 ? _a : new sdk_1.TokenAmount(sdk_1.cUSD[chainId], '0'));
    }, new sdk_1.TokenAmount(sdk_1.cUSD[chainId], '0'));
};
exports.useAnnualRewardDollars = useAnnualRewardDollars;
