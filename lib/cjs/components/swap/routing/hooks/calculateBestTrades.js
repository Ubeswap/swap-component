"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bestTradeExactIn = exports.bestTradeExactOut = exports.isDualTradeBetter = void 0;
const sdk_1 = require("@ubeswap/sdk");
const index_1 = require("constants/index");
const useMoola_1 = require("../moola/useMoola");
const useTrade_1 = require("./useTrade");
// returns whether tradeB is better than tradeA by at least a threshold percentage amount
// does not check currency matching
function isDualTradeBetter(tradeA, tradeB, minimumDelta = index_1.ZERO_PERCENT) {
    if (tradeA && !tradeB)
        return false;
    if (tradeB && !tradeA)
        return true;
    if (!tradeA || !tradeB)
        return undefined;
    const inTokenA = tradeA.inputAmount.token;
    const inTokenB = tradeB.inputAmount.token;
    const outTokenA = tradeA.outputAmount.token;
    const outTokenB = tradeB.outputAmount.token;
    if (tradeA.tradeType !== tradeB.tradeType ||
        !(0, sdk_1.currencyEquals)(inTokenA, inTokenB) ||
        !(0, sdk_1.currencyEquals)(outTokenA, outTokenB)) {
        throw new Error('Trades are not comparable');
    }
    if (minimumDelta.equalTo(index_1.ZERO_PERCENT)) {
        return tradeA.executionPrice.lessThan(tradeB.executionPrice);
    }
    else {
        return tradeA.executionPrice.raw.multiply(minimumDelta.add(index_1.ONE_HUNDRED_PERCENT)).lessThan(tradeB.executionPrice);
    }
}
exports.isDualTradeBetter = isDualTradeBetter;
const bestTradeExactOut = (pairs, tokenIn, tokenAmountOut, directTrade, options) => {
    var _a;
    const inDual = tokenIn && (0, useMoola_1.getMoolaDual)(tokenIn);
    const outDual = tokenAmountOut && (0, useMoola_1.getMoolaDual)(tokenAmountOut.token);
    const inDualTrades = inDual
        ? sdk_1.Trade.bestTradeExactOut(pairs.slice(), inDual, tokenAmountOut, options).map((trade) => new useTrade_1.MoolaRouterTrade(tokenIn, null, trade))
        : [];
    const outDualTrades = outDual
        ? sdk_1.Trade.bestTradeExactOut(pairs.slice(), tokenIn, new sdk_1.TokenAmount(outDual, tokenAmountOut.raw), options).map((trade) => new useTrade_1.MoolaRouterTrade(null, tokenAmountOut.token, trade))
        : [];
    const inAndOutDualTrades = inDual && outDual
        ? sdk_1.Trade.bestTradeExactOut(pairs.slice(), inDual, new sdk_1.TokenAmount(outDual, tokenAmountOut.raw), options).map((trade) => new useTrade_1.MoolaRouterTrade(tokenIn, tokenAmountOut.token, trade))
        : [];
    return ((_a = [directTrade, inDualTrades[0], outDualTrades[0], inAndOutDualTrades[0]]
        .filter((x) => !!x)
        .reduce((best, trade) => (isDualTradeBetter(best, trade, options === null || options === void 0 ? void 0 : options.minimumDelta) ? trade : best), null)) !== null && _a !== void 0 ? _a : null);
};
exports.bestTradeExactOut = bestTradeExactOut;
const bestTradeExactIn = (pairs, tokenAmountIn, tokenOut, directTrade, options) => {
    var _a;
    const inDual = tokenAmountIn && (0, useMoola_1.getMoolaDual)(tokenAmountIn.token);
    const outDual = tokenOut && (0, useMoola_1.getMoolaDual)(tokenOut);
    const inDualTrades = inDual
        ? sdk_1.Trade.bestTradeExactIn(pairs.slice(), new sdk_1.TokenAmount(inDual, tokenAmountIn.raw), tokenOut, options).map((trade) => new useTrade_1.MoolaRouterTrade(tokenAmountIn.token, null, trade))
        : [];
    const outDualTrades = outDual
        ? sdk_1.Trade.bestTradeExactIn(pairs.slice(), tokenAmountIn, outDual, options).map((trade) => new useTrade_1.MoolaRouterTrade(null, tokenOut, trade))
        : [];
    const inAndOutDualTrades = inDual && outDual
        ? sdk_1.Trade.bestTradeExactIn(pairs.slice(), new sdk_1.TokenAmount(inDual, tokenAmountIn.raw), outDual, options).map((trade) => new useTrade_1.MoolaRouterTrade(tokenAmountIn.token, tokenOut, trade))
        : [];
    return ((_a = [directTrade, inDualTrades[0], outDualTrades[0], inAndOutDualTrades[0]]
        .filter((x) => !!x)
        .reduce((best, trade) => best === null || isDualTradeBetter(best, trade, options === null || options === void 0 ? void 0 : options.minimumDelta) ? trade : best, null)) !== null && _a !== void 0 ? _a : null);
};
exports.bestTradeExactIn = bestTradeExactIn;
