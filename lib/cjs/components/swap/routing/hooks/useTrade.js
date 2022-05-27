"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useUbeswapTradeExactOut = exports.useUbeswapTradeExactIn = exports.MoolaRouterTrade = exports.useAllCommonPairsWithMoolaDuals = void 0;
const use_contractkit_1 = require("@celo-tools/use-contractkit");
const sdk_1 = require("@ubeswap/sdk");
const index_1 = require("constants/index");
const Reserves_1 = require("data/Reserves");
const lodash_flatmap_1 = __importDefault(require("lodash.flatmap"));
const react_1 = require("react");
const hooks_1 = require("state/user/hooks");
const trades_1 = require("utils/trades");
const MoolaDirectTrade_1 = require("../moola/MoolaDirectTrade");
const useMoola_1 = require("../moola/useMoola");
const useMoolaDirectRoute_1 = require("../moola/useMoolaDirectRoute");
const trade_1 = require("../trade");
const calculateBestTrades_1 = require("./calculateBestTrades");
const directTrades_1 = require("./directTrades");
/**
 * Uses all common pairs between the two tokens, plus searches the moola duals
 * @param tokenA
 * @param tokenB
 * @returns
 */
function useAllCommonPairsWithMoolaDuals(tokenA, tokenB) {
    const { network } = (0, use_contractkit_1.useContractKit)();
    const chainId = network.chainId;
    const bases = (0, react_1.useMemo)(() => (chainId ? index_1.BASES_TO_CHECK_TRADES_AGAINST[chainId] : []), [chainId]);
    const basePairs = (0, react_1.useMemo)(() => (0, lodash_flatmap_1.default)(bases, (base) => bases.map((otherBase) => [base, otherBase])).filter(([t0, t1]) => {
        var _a, _b;
        return t0.address !== t1.address &&
            // ensure we don't fetch duals
            t0.address !== ((_a = (0, useMoola_1.getMoolaDual)(t1)) === null || _a === void 0 ? void 0 : _a.address) &&
            t1.address !== ((_b = (0, useMoola_1.getMoolaDual)(t0)) === null || _b === void 0 ? void 0 : _b.address);
    }), [bases]);
    const tokenADual = tokenA && (0, useMoola_1.getMoolaDual)(tokenA);
    const tokenBDual = tokenB && (0, useMoola_1.getMoolaDual)(tokenB);
    const allPairCombinations = (0, react_1.useMemo)(() => tokenA && tokenB
        ? [
            // the direct pair
            [tokenA, tokenB],
            // token A against all bases
            ...bases.map((base) => [tokenA, base]),
            // token B against all bases
            ...bases.map((base) => [tokenB, base]),
            // each base against all bases
            ...basePairs,
            // handle duals
            // direct pair
            ...(tokenADual ? [[tokenADual, tokenB]] : []),
            ...(tokenBDual ? [[tokenA, tokenBDual]] : []),
            ...(tokenADual && tokenBDual ? [[tokenADual, tokenBDual]] : []),
            // token A against all bases
            ...bases.map((base) => [tokenA, base]),
            ...(tokenADual ? bases.map((base) => [tokenADual, base]) : []),
            // token B against all bases
            ...bases.map((base) => [tokenB, base]),
            ...(tokenBDual ? bases.map((base) => [tokenBDual, base]) : []),
        ]
            .filter((tokens) => Boolean(tokens[0] && tokens[1]))
            .filter(([t0, t1]) => t0.address !== t1.address)
        : [], [tokenA, tokenB, bases, basePairs, tokenADual, tokenBDual]);
    const allPairs = (0, Reserves_1.usePairs)(allPairCombinations);
    // only pass along valid pairs, non-duplicated pairs
    return (0, react_1.useMemo)(() => Object.values(allPairs
        // filter out invalid pairs
        .filter((result) => Boolean(result[0] === Reserves_1.PairState.EXISTS && result[1]))
        // filter out duplicated pairs
        .reduce((memo, [, curr]) => {
        var _a;
        memo[curr.liquidityToken.address] = (_a = memo[curr.liquidityToken.address]) !== null && _a !== void 0 ? _a : curr;
        return memo;
    }, {})), [allPairs]);
}
exports.useAllCommonPairsWithMoolaDuals = useAllCommonPairsWithMoolaDuals;
const MAX_HOPS = 3;
const moolaRouter = {
    routerAddress: index_1.UBESWAP_MOOLA_ROUTER_ADDRESS,
};
class MoolaRouterTrade extends trade_1.UbeswapTrade {
    /**
     *
     * @param originalTokenIn If null, the original token is the path token
     * @param originalTokenOut If null, the original token is the path token
     * @param innerTrade
     */
    constructor(originalTokenIn, originalTokenOut, innerTrade) {
        super(innerTrade.route, innerTrade.tradeType === sdk_1.TradeType.EXACT_INPUT ? innerTrade.inputAmount : innerTrade.outputAmount, innerTrade.tradeType, moolaRouter, [
            ...(originalTokenIn ? [originalTokenIn] : []),
            ...innerTrade.route.path,
            ...(originalTokenOut ? [originalTokenOut] : []),
        ]);
        this.originalTokenIn = originalTokenIn;
        this.originalTokenOut = originalTokenOut;
        this.innerTrade = innerTrade;
        this.inputAmount = new sdk_1.TokenAmount(originalTokenIn !== null && originalTokenIn !== void 0 ? originalTokenIn : innerTrade.inputAmount.token, innerTrade.inputAmount.raw);
        this.outputAmount = new sdk_1.TokenAmount(originalTokenOut !== null && originalTokenOut !== void 0 ? originalTokenOut : innerTrade.outputAmount.token, innerTrade.outputAmount.raw);
        const baseIsInput = (0, sdk_1.currencyEquals)(innerTrade.executionPrice.baseCurrency, innerTrade.inputAmount.token);
        this.executionPrice = new sdk_1.Price(baseIsInput ? this.inputAmount.token : this.outputAmount.token, !baseIsInput ? this.inputAmount.token : this.outputAmount.token, innerTrade.executionPrice.denominator, innerTrade.executionPrice.numerator);
    }
    /**
     * Get the minimum amount that must be received from this trade for the given slippage tolerance
     * @param slippageTolerance tolerance of unfavorable slippage from the execution price of this trade
     */
    minimumAmountOut(slippageTolerance) {
        var _a;
        const amt = this.innerTrade.minimumAmountOut(slippageTolerance);
        return new sdk_1.TokenAmount((_a = this.originalTokenOut) !== null && _a !== void 0 ? _a : amt.token, amt.raw);
    }
    /**
     * Get the maximum amount in that can be spent via this trade for the given slippage tolerance
     * @param slippageTolerance tolerance of unfavorable slippage from the execution price of this trade
     */
    maximumAmountIn(slippageTolerance) {
        var _a;
        const amt = this.innerTrade.maximumAmountIn(slippageTolerance);
        return new sdk_1.TokenAmount((_a = this.originalTokenIn) !== null && _a !== void 0 ? _a : amt.token, amt.raw);
    }
}
exports.MoolaRouterTrade = MoolaRouterTrade;
/**
 * Converts the trade to a Moola Router trade, if the original tokens are lost
 * @param originalTokenIn
 * @param originalTokenOut
 * @param trade
 * @returns
 */
const convertToMoolaRouterTradeIfApplicable = (originalTokenIn, originalTokenOut, trade) => {
    const inUnchanged = trade.inputAmount.token.address === originalTokenIn.address;
    const outUnchanged = trade.outputAmount.token.address === originalTokenOut.address;
    if (inUnchanged && outUnchanged) {
        return trade;
    }
    return new MoolaRouterTrade(inUnchanged ? originalTokenIn : null, outUnchanged ? originalTokenOut : null, trade);
};
/**
 * Returns the best trade for the exact amount of tokens in to the given token out
 */
function useUbeswapTradeExactIn(tokenAmountIn, tokenOut) {
    const [disableSmartRouting] = (0, hooks_1.useUserDisableSmartRouting)();
    const directTrade = (0, directTrades_1.useDirectTradeExactIn)(tokenAmountIn, tokenOut);
    const allowedPairs = useAllCommonPairsWithMoolaDuals(tokenAmountIn === null || tokenAmountIn === void 0 ? void 0 : tokenAmountIn.token, tokenOut);
    const [singleHopOnly] = (0, hooks_1.useUserSingleHopOnly)();
    const moolaRoute = (0, useMoolaDirectRoute_1.useMoolaDirectRoute)(tokenAmountIn === null || tokenAmountIn === void 0 ? void 0 : tokenAmountIn.token, tokenOut);
    return (0, react_1.useMemo)(() => {
        const bestTrade = (() => {
            if (disableSmartRouting) {
                return directTrade;
            }
            if (tokenAmountIn && tokenOut && allowedPairs.length > 0) {
                if (singleHopOnly) {
                    const singleHopTrade = (0, calculateBestTrades_1.bestTradeExactIn)(allowedPairs.slice(), tokenAmountIn, tokenOut, directTrade, {
                        maxHops: 1,
                        maxNumResults: 1,
                        minimumDelta: index_1.BETTER_TRADE_LESS_HOPS_THRESHOLD,
                    });
                    return singleHopTrade
                        ? convertToMoolaRouterTradeIfApplicable(tokenAmountIn.token, tokenOut, singleHopTrade)
                        : null;
                }
                // search through trades with varying hops, find best trade out of them
                let bestTradeSoFar = null;
                for (let i = 1; i <= MAX_HOPS; i++) {
                    const currentTrade = (0, calculateBestTrades_1.bestTradeExactIn)(allowedPairs.slice(), tokenAmountIn, tokenOut, directTrade, {
                        maxHops: i,
                        maxNumResults: 1,
                        minimumDelta: index_1.BETTER_TRADE_LESS_HOPS_THRESHOLD,
                    });
                    // if current trade is best yet, save it
                    if ((0, trades_1.isTradeBetter)(bestTradeSoFar, currentTrade, index_1.BETTER_TRADE_LESS_HOPS_THRESHOLD)) {
                        bestTradeSoFar = currentTrade;
                    }
                }
                return bestTradeSoFar;
            }
            return null;
        })();
        if (moolaRoute && tokenAmountIn) {
            try {
                const moolaTrade = MoolaDirectTrade_1.MoolaDirectTrade.fromIn(moolaRoute, tokenAmountIn);
                if ((0, trades_1.isTradeBetter)(bestTrade, moolaTrade, new sdk_1.Percent('0'))) {
                    return moolaTrade;
                }
            }
            catch (e) {
                console.warn(e);
            }
        }
        return bestTrade;
    }, [allowedPairs, tokenAmountIn, tokenOut, singleHopOnly, directTrade, disableSmartRouting, moolaRoute]);
}
exports.useUbeswapTradeExactIn = useUbeswapTradeExactIn;
/**
 * Returns the best trade for the token in to the exact amount of token out
 */
function useUbeswapTradeExactOut(tokenIn, tokenAmountOut) {
    const [disableSmartRouting] = (0, hooks_1.useUserDisableSmartRouting)();
    const directTrade = (0, directTrades_1.useDirectTradeExactOut)(tokenIn, tokenAmountOut);
    const allowedPairs = useAllCommonPairsWithMoolaDuals(tokenIn, tokenAmountOut === null || tokenAmountOut === void 0 ? void 0 : tokenAmountOut.token);
    const [singleHopOnly] = (0, hooks_1.useUserSingleHopOnly)();
    const moolaRoute = (0, useMoolaDirectRoute_1.useMoolaDirectRoute)(tokenIn, tokenAmountOut === null || tokenAmountOut === void 0 ? void 0 : tokenAmountOut.token);
    return (0, react_1.useMemo)(() => {
        const bestTrade = (() => {
            if (disableSmartRouting) {
                return directTrade;
            }
            if (tokenIn && tokenAmountOut && allowedPairs.length > 0) {
                if (singleHopOnly) {
                    const singleHopTrade = (0, calculateBestTrades_1.bestTradeExactOut)(allowedPairs.slice(), tokenIn, tokenAmountOut, directTrade, {
                        maxHops: 1,
                        maxNumResults: 1,
                    });
                    return singleHopTrade
                        ? convertToMoolaRouterTradeIfApplicable(tokenIn, tokenAmountOut.token, singleHopTrade)
                        : null;
                }
                // search through trades with varying hops, find best trade out of them
                let bestTradeSoFar = null;
                for (let i = 1; i <= MAX_HOPS; i++) {
                    const currentTrade = (0, calculateBestTrades_1.bestTradeExactOut)(allowedPairs.slice(), tokenIn, tokenAmountOut, directTrade, {
                        maxHops: i,
                        maxNumResults: 1,
                    });
                    if ((0, trades_1.isTradeBetter)(bestTradeSoFar, currentTrade, index_1.BETTER_TRADE_LESS_HOPS_THRESHOLD)) {
                        bestTradeSoFar = currentTrade;
                    }
                }
                return bestTradeSoFar;
            }
            return null;
        })();
        if (moolaRoute && tokenAmountOut) {
            try {
                const moolaTrade = MoolaDirectTrade_1.MoolaDirectTrade.fromOut(moolaRoute, tokenAmountOut);
                if ((0, trades_1.isTradeBetter)(bestTrade, moolaTrade, new sdk_1.Percent('0'))) {
                    return moolaTrade;
                }
            }
            catch (e) {
                console.warn(e);
            }
        }
        return bestTrade;
    }, [tokenIn, tokenAmountOut, allowedPairs, singleHopOnly, directTrade, disableSmartRouting, moolaRoute]);
}
exports.useUbeswapTradeExactOut = useUbeswapTradeExactOut;
