import { useContractKit } from '@celo-tools/use-contractkit';
import { Trade } from '@ubeswap/sdk';
import flatMap from 'lodash.flatmap';
import { useMemo } from 'react';
import { useUserSingleHopOnly } from 'state/user/hooks';
import { isTradeBetter } from 'utils/trades';
import { BASES_TO_CHECK_TRADES_AGAINST, BETTER_TRADE_LESS_HOPS_THRESHOLD } from '../../../../constants';
import { PairState, usePairs } from '../../../../data/Reserves';
import { UbeswapTrade } from '../trade';
function useAllCommonPairs(tokenA, tokenB) {
    const { network } = useContractKit();
    const chainId = network.chainId;
    const bases = useMemo(() => {
        var _a;
        if (!chainId)
            return [];
        const common = (_a = BASES_TO_CHECK_TRADES_AGAINST[chainId]) !== null && _a !== void 0 ? _a : [];
        return [...common];
    }, [chainId]);
    const basePairs = useMemo(() => flatMap(bases, (base) => bases.map((otherBase) => [base, otherBase])), [bases]);
    const allPairCombinations = useMemo(() => tokenA && tokenB
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
    const allPairs = usePairs(allPairCombinations);
    // only pass along valid pairs, non-duplicated pairs
    return useMemo(() => Object.values(allPairs
        // filter out invalid pairs
        .filter((result) => Boolean(result[0] === PairState.EXISTS && result[1]))
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
export function useDirectTradeExactIn(currencyAmountIn, currencyOut) {
    const allowedPairs = useAllCommonPairs(currencyAmountIn === null || currencyAmountIn === void 0 ? void 0 : currencyAmountIn.currency, currencyOut);
    const [singleHopOnly] = useUserSingleHopOnly();
    return useMemo(() => {
        var _a, _b;
        if (currencyAmountIn && currencyOut && allowedPairs.length > 0) {
            if (singleHopOnly) {
                const bestTrade = (_a = Trade.bestTradeExactIn(allowedPairs, currencyAmountIn, currencyOut, { maxHops: 1, maxNumResults: 1 })[0]) !== null && _a !== void 0 ? _a : null;
                return bestTrade ? UbeswapTrade.fromNormalTrade(bestTrade) : null;
            }
            // search through trades with varying hops, find best trade out of them
            let bestTradeSoFar = null;
            for (let i = 1; i <= MAX_HOPS; i++) {
                const currentTradeRaw = (_b = Trade.bestTradeExactIn(allowedPairs, currencyAmountIn, currencyOut, { maxHops: i, maxNumResults: 1 })[0]) !== null && _b !== void 0 ? _b : null;
                const currentTrade = currentTradeRaw ? UbeswapTrade.fromNormalTrade(currentTradeRaw) : null;
                // if current trade is best yet, save it
                if (isTradeBetter(bestTradeSoFar, currentTrade, BETTER_TRADE_LESS_HOPS_THRESHOLD)) {
                    bestTradeSoFar = currentTrade;
                }
            }
            return bestTradeSoFar;
        }
        return null;
    }, [allowedPairs, currencyAmountIn, currencyOut, singleHopOnly]);
}
/**
 * Returns the best trade for the token in to the exact amount of token out
 */
export function useDirectTradeExactOut(currencyIn, currencyAmountOut) {
    const allowedPairs = useAllCommonPairs(currencyIn, currencyAmountOut === null || currencyAmountOut === void 0 ? void 0 : currencyAmountOut.currency);
    const [singleHopOnly] = useUserSingleHopOnly();
    return useMemo(() => {
        var _a, _b;
        if (currencyIn && currencyAmountOut && allowedPairs.length > 0) {
            if (singleHopOnly) {
                const bestTrade = (_a = Trade.bestTradeExactOut(allowedPairs, currencyIn, currencyAmountOut, { maxHops: 1, maxNumResults: 1 })[0]) !== null && _a !== void 0 ? _a : null;
                return bestTrade ? UbeswapTrade.fromNormalTrade(bestTrade) : null;
            }
            // search through trades with varying hops, find best trade out of them
            let bestTradeSoFar = null;
            for (let i = 1; i <= MAX_HOPS; i++) {
                const currentTradeRaw = (_b = Trade.bestTradeExactOut(allowedPairs, currencyIn, currencyAmountOut, { maxHops: i, maxNumResults: 1 })[0]) !== null && _b !== void 0 ? _b : null;
                const currentTrade = currentTradeRaw ? UbeswapTrade.fromNormalTrade(currentTradeRaw) : null;
                if (isTradeBetter(bestTradeSoFar, currentTrade, BETTER_TRADE_LESS_HOPS_THRESHOLD)) {
                    bestTradeSoFar = currentTrade;
                }
            }
            return bestTradeSoFar;
        }
        return null;
    }, [currencyIn, currencyAmountOut, allowedPairs, singleHopOnly]);
}
