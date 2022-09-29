"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useDirectTradeExactOut = exports.useDirectTradeExactIn = void 0;
const use_contractkit_1 = require("@celo-tools/use-contractkit");
const sdk_1 = require("@ubeswap/sdk");
const lodash_flatmap_1 = __importDefault(require("lodash.flatmap"));
const react_1 = require("react");
const constants_1 = require("../../../../constants");
const Reserves_1 = require("../../../../data/Reserves");
const hooks_1 = require("../../../../state/user/hooks");
const trades_1 = require("../../../../utils/trades");
const trade_1 = require("../trade");
function useAllCommonPairs(tokenA, tokenB) {
    const { network } = (0, use_contractkit_1.useContractKit)();
    const chainId = network.chainId;
    const bases = (0, react_1.useMemo)(() => {
        var _a;
        if (!chainId)
            return [];
        const common = (_a = constants_1.BASES_TO_CHECK_TRADES_AGAINST[chainId]) !== null && _a !== void 0 ? _a : [];
        return [...common];
    }, [chainId]);
    const basePairs = (0, react_1.useMemo)(() => (0, lodash_flatmap_1.default)(bases, (base) => bases.map((otherBase) => [base, otherBase])), [bases]);
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
        ]
            .filter((tokens) => Boolean(tokens[0] && tokens[1]))
            .filter(([t0, t1]) => t0.address !== t1.address)
        : [], [tokenA, tokenB, bases, basePairs]);
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
const MAX_HOPS = 3;
/**
 * Returns the best trade for the exact amount of tokens in to the given token out
 */
function useDirectTradeExactIn(currencyAmountIn, currencyOut) {
    const allowedPairs = useAllCommonPairs(currencyAmountIn === null || currencyAmountIn === void 0 ? void 0 : currencyAmountIn.currency, currencyOut);
    const [singleHopOnly] = (0, hooks_1.useUserSingleHopOnly)();
    return (0, react_1.useMemo)(() => {
        var _a, _b;
        if (currencyAmountIn && currencyOut && allowedPairs.length > 0) {
            if (singleHopOnly) {
                const bestTrade = (_a = sdk_1.Trade.bestTradeExactIn(allowedPairs, currencyAmountIn, currencyOut, { maxHops: 1, maxNumResults: 1 })[0]) !== null && _a !== void 0 ? _a : null;
                return bestTrade ? trade_1.UbeswapTrade.fromNormalTrade(bestTrade) : null;
            }
            // search through trades with varying hops, find best trade out of them
            let bestTradeSoFar = null;
            for (let i = 1; i <= MAX_HOPS; i++) {
                const currentTradeRaw = (_b = sdk_1.Trade.bestTradeExactIn(allowedPairs, currencyAmountIn, currencyOut, { maxHops: i, maxNumResults: 1 })[0]) !== null && _b !== void 0 ? _b : null;
                const currentTrade = currentTradeRaw ? trade_1.UbeswapTrade.fromNormalTrade(currentTradeRaw) : null;
                // if current trade is best yet, save it
                if ((0, trades_1.isTradeBetter)(bestTradeSoFar, currentTrade, constants_1.BETTER_TRADE_LESS_HOPS_THRESHOLD)) {
                    bestTradeSoFar = currentTrade;
                }
            }
            return bestTradeSoFar;
        }
        return null;
    }, [allowedPairs, currencyAmountIn, currencyOut, singleHopOnly]);
}
exports.useDirectTradeExactIn = useDirectTradeExactIn;
/**
 * Returns the best trade for the token in to the exact amount of token out
 */
function useDirectTradeExactOut(currencyIn, currencyAmountOut) {
    const allowedPairs = useAllCommonPairs(currencyIn, currencyAmountOut === null || currencyAmountOut === void 0 ? void 0 : currencyAmountOut.currency);
    const [singleHopOnly] = (0, hooks_1.useUserSingleHopOnly)();
    return (0, react_1.useMemo)(() => {
        var _a, _b;
        if (currencyIn && currencyAmountOut && allowedPairs.length > 0) {
            if (singleHopOnly) {
                const bestTrade = (_a = sdk_1.Trade.bestTradeExactOut(allowedPairs, currencyIn, currencyAmountOut, { maxHops: 1, maxNumResults: 1 })[0]) !== null && _a !== void 0 ? _a : null;
                return bestTrade ? trade_1.UbeswapTrade.fromNormalTrade(bestTrade) : null;
            }
            // search through trades with varying hops, find best trade out of them
            let bestTradeSoFar = null;
            for (let i = 1; i <= MAX_HOPS; i++) {
                const currentTradeRaw = (_b = sdk_1.Trade.bestTradeExactOut(allowedPairs, currencyIn, currencyAmountOut, { maxHops: i, maxNumResults: 1 })[0]) !== null && _b !== void 0 ? _b : null;
                const currentTrade = currentTradeRaw ? trade_1.UbeswapTrade.fromNormalTrade(currentTradeRaw) : null;
                if ((0, trades_1.isTradeBetter)(bestTradeSoFar, currentTrade, constants_1.BETTER_TRADE_LESS_HOPS_THRESHOLD)) {
                    bestTradeSoFar = currentTrade;
                }
            }
            return bestTradeSoFar;
        }
        return null;
    }, [currencyIn, currencyAmountOut, allowedPairs, singleHopOnly]);
}
exports.useDirectTradeExactOut = useDirectTradeExactOut;
