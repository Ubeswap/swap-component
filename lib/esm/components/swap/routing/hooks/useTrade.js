var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { useContractKit, useProvider } from '@celo-tools/use-contractkit';
import { currencyEquals, JSBI, Pair, Percent, Price, Token, TokenAmount, TradeType } from '@ubeswap/sdk';
import { BigNumber, ethers } from 'ethers';
import _ from 'lodash';
import flatMap from 'lodash.flatmap';
import React, { useMemo } from 'react';
import { ERC20_ABI } from '../../../../constants/abis/erc20';
import { BASES_TO_CHECK_TRADES_AGAINST, BETTER_TRADE_LESS_HOPS_THRESHOLD, DEXES_TO_EXCLUDE, FETCH_MINIMA_ROUTER_TIMER, MINIMA_API_URL, UBESWAP_MOOLA_ROUTER_ADDRESS, } from '../../../../constants/index';
import { PairState, usePairs } from '../../../../data/Reserves';
import { useAllTokens } from '../../../../hooks/Tokens';
import { useUserDisableSmartRouting, useUserSingleHopOnly, useUserSlippageTolerance, } from '../../../../state/user/hooks';
import { getProviderOrSigner } from '../../../../utils';
import { isTradeBetter } from '../../../../utils/trades';
import { MoolaDirectTrade } from '../moola/MoolaDirectTrade';
import { getMoolaDual } from '../moola/useMoola';
import { useMoolaDirectRoute } from '../moola/useMoolaDirectRoute';
import { MinimaRouterTrade, UbeswapTrade } from '../trade';
import { bestTradeExactIn, bestTradeExactOut } from './calculateBestTrades';
import { useDirectTradeExactIn, useDirectTradeExactOut } from './directTrades';
/**
 * Uses all common pairs between the two tokens, plus searches the moola duals
 * @param tokenA
 * @param tokenB
 * @returns
 */
export function useAllCommonPairsWithMoolaDuals(tokenA, tokenB) {
    const { network } = useContractKit();
    const chainId = network.chainId;
    const bases = useMemo(() => (chainId ? BASES_TO_CHECK_TRADES_AGAINST[chainId] : []), [chainId]);
    const basePairs = useMemo(() => flatMap(bases, (base) => bases.map((otherBase) => [base, otherBase])).filter(([t0, t1]) => {
        var _a, _b;
        return t0.address !== t1.address &&
            // ensure we don't fetch duals
            t0.address !== ((_a = getMoolaDual(t1)) === null || _a === void 0 ? void 0 : _a.address) &&
            t1.address !== ((_b = getMoolaDual(t0)) === null || _b === void 0 ? void 0 : _b.address);
    }), [bases]);
    const tokenADual = tokenA && getMoolaDual(tokenA);
    const tokenBDual = tokenB && getMoolaDual(tokenB);
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
const moolaRouter = {
    routerAddress: UBESWAP_MOOLA_ROUTER_ADDRESS,
};
export class MoolaRouterTrade extends UbeswapTrade {
    /**
     *
     * @param originalTokenIn If null, the original token is the path token
     * @param originalTokenOut If null, the original token is the path token
     * @param innerTrade
     */
    constructor(originalTokenIn, originalTokenOut, innerTrade) {
        super(innerTrade.route, innerTrade.tradeType === TradeType.EXACT_INPUT ? innerTrade.inputAmount : innerTrade.outputAmount, innerTrade.tradeType, moolaRouter, [
            ...(originalTokenIn ? [originalTokenIn] : []),
            ...innerTrade.route.path,
            ...(originalTokenOut ? [originalTokenOut] : []),
        ]);
        this.originalTokenIn = originalTokenIn;
        this.originalTokenOut = originalTokenOut;
        this.innerTrade = innerTrade;
        this.inputAmount = new TokenAmount(originalTokenIn !== null && originalTokenIn !== void 0 ? originalTokenIn : innerTrade.inputAmount.token, innerTrade.inputAmount.raw);
        this.outputAmount = new TokenAmount(originalTokenOut !== null && originalTokenOut !== void 0 ? originalTokenOut : innerTrade.outputAmount.token, innerTrade.outputAmount.raw);
        const baseIsInput = currencyEquals(innerTrade.executionPrice.baseCurrency, innerTrade.inputAmount.token);
        this.executionPrice = new Price(baseIsInput ? this.inputAmount.token : this.outputAmount.token, !baseIsInput ? this.inputAmount.token : this.outputAmount.token, innerTrade.executionPrice.denominator, innerTrade.executionPrice.numerator);
    }
    /**
     * Get the minimum amount that must be received from this trade for the given slippage tolerance
     * @param slippageTolerance tolerance of unfavorable slippage from the execution price of this trade
     */
    minimumAmountOut(slippageTolerance) {
        var _a;
        const amt = this.innerTrade.minimumAmountOut(slippageTolerance);
        return new TokenAmount((_a = this.originalTokenOut) !== null && _a !== void 0 ? _a : amt.token, amt.raw);
    }
    /**
     * Get the maximum amount in that can be spent via this trade for the given slippage tolerance
     * @param slippageTolerance tolerance of unfavorable slippage from the execution price of this trade
     */
    maximumAmountIn(slippageTolerance) {
        var _a;
        const amt = this.innerTrade.maximumAmountIn(slippageTolerance);
        return new TokenAmount((_a = this.originalTokenIn) !== null && _a !== void 0 ? _a : amt.token, amt.raw);
    }
}
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
export function useUbeswapTradeExactIn(tokenAmountIn, tokenOut) {
    const [disableSmartRouting] = useUserDisableSmartRouting();
    const directTrade = useDirectTradeExactIn(tokenAmountIn, tokenOut);
    const allowedPairs = useAllCommonPairsWithMoolaDuals(tokenAmountIn === null || tokenAmountIn === void 0 ? void 0 : tokenAmountIn.token, tokenOut);
    const [singleHopOnly] = useUserSingleHopOnly();
    const moolaRoute = useMoolaDirectRoute(tokenAmountIn === null || tokenAmountIn === void 0 ? void 0 : tokenAmountIn.token, tokenOut);
    return useMemo(() => {
        const bestTrade = (() => {
            if (disableSmartRouting) {
                return directTrade;
            }
            if (tokenAmountIn && tokenOut && allowedPairs.length > 0) {
                if (singleHopOnly) {
                    const singleHopTrade = bestTradeExactIn(allowedPairs.slice(), tokenAmountIn, tokenOut, directTrade, {
                        maxHops: 1,
                        maxNumResults: 1,
                        minimumDelta: BETTER_TRADE_LESS_HOPS_THRESHOLD,
                    });
                    return singleHopTrade
                        ? convertToMoolaRouterTradeIfApplicable(tokenAmountIn.token, tokenOut, singleHopTrade)
                        : null;
                }
                // search through trades with varying hops, find best trade out of them
                let bestTradeSoFar = null;
                for (let i = 1; i <= MAX_HOPS; i++) {
                    const currentTrade = bestTradeExactIn(allowedPairs.slice(), tokenAmountIn, tokenOut, directTrade, {
                        maxHops: i,
                        maxNumResults: 1,
                        minimumDelta: BETTER_TRADE_LESS_HOPS_THRESHOLD,
                    });
                    // if current trade is best yet, save it
                    if (isTradeBetter(bestTradeSoFar, currentTrade, BETTER_TRADE_LESS_HOPS_THRESHOLD)) {
                        bestTradeSoFar = currentTrade;
                    }
                }
                return bestTradeSoFar;
            }
            return null;
        })();
        if (moolaRoute && tokenAmountIn) {
            try {
                const moolaTrade = MoolaDirectTrade.fromIn(moolaRoute, tokenAmountIn);
                if (isTradeBetter(bestTrade, moolaTrade, new Percent('0'))) {
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
/**
 * Returns the best trade for the token in to the exact amount of token out
 */
export function useUbeswapTradeExactOut(tokenIn, tokenAmountOut) {
    const [disableSmartRouting] = useUserDisableSmartRouting();
    const directTrade = useDirectTradeExactOut(tokenIn, tokenAmountOut);
    const allowedPairs = useAllCommonPairsWithMoolaDuals(tokenIn, tokenAmountOut === null || tokenAmountOut === void 0 ? void 0 : tokenAmountOut.token);
    const [singleHopOnly] = useUserSingleHopOnly();
    const moolaRoute = useMoolaDirectRoute(tokenIn, tokenAmountOut === null || tokenAmountOut === void 0 ? void 0 : tokenAmountOut.token);
    return useMemo(() => {
        const bestTrade = (() => {
            if (disableSmartRouting) {
                return directTrade;
            }
            if (tokenIn && tokenAmountOut && allowedPairs.length > 0) {
                if (singleHopOnly) {
                    const singleHopTrade = bestTradeExactOut(allowedPairs.slice(), tokenIn, tokenAmountOut, directTrade, {
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
                    const currentTrade = bestTradeExactOut(allowedPairs.slice(), tokenIn, tokenAmountOut, directTrade, {
                        maxHops: i,
                        maxNumResults: 1,
                    });
                    if (isTradeBetter(bestTradeSoFar, currentTrade, BETTER_TRADE_LESS_HOPS_THRESHOLD)) {
                        bestTradeSoFar = currentTrade;
                    }
                }
                return bestTradeSoFar;
            }
            return null;
        })();
        if (moolaRoute && tokenAmountOut) {
            try {
                const moolaTrade = MoolaDirectTrade.fromOut(moolaRoute, tokenAmountOut);
                if (isTradeBetter(bestTrade, moolaTrade, new Percent('0'))) {
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
export function useMinimaTrade(tokenAmountIn, tokenOut, minimaPartnerId) {
    const [minimaTrade, setMinimaTrade] = React.useState(undefined);
    const [deps, setDeps] = React.useState(undefined);
    const [singleHopOnly] = useUserSingleHopOnly();
    const [allowedSlippage] = useUserSlippageTolerance();
    const [fetchUpdatedData, setFetchUpdatedData] = React.useState(true);
    const [fetchTimeout, setFetchTimeout] = React.useState(undefined);
    const { address: account, network } = useContractKit();
    const { chainId } = network;
    const library = useProvider();
    const provider = getProviderOrSigner(library, account || undefined);
    const tokens = useAllTokens();
    const call = React.useCallback(() => __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c;
        if (!(tokenAmountIn === null || tokenAmountIn === void 0 ? void 0 : tokenAmountIn.currency.address) || !(tokenAmountIn === null || tokenAmountIn === void 0 ? void 0 : tokenAmountIn.raw) || !(tokenOut === null || tokenOut === void 0 ? void 0 : tokenOut.address)) {
            setMinimaTrade(null);
            setDeps(undefined);
            return;
        }
        const curDeps = {
            chainId,
            account,
            allowedSlippage,
            singleHopOnly,
            inputAddr: tokenAmountIn.currency.address,
            outputAddr: tokenOut.address,
            inputAmount: tokenAmountIn.raw.toString(),
        };
        if (_.isEqual(deps, curDeps) && !fetchUpdatedData) {
            return;
        }
        if (!fetchUpdatedData) {
            setMinimaTrade(undefined);
        }
        setDeps(curDeps);
        setFetchUpdatedData(false);
        // fetch information of minima router
        yield fetch(`${MINIMA_API_URL}?exclude=${DEXES_TO_EXCLUDE}&tokenIn=${(_a = tokenAmountIn === null || tokenAmountIn === void 0 ? void 0 : tokenAmountIn.currency.address) !== null && _a !== void 0 ? _a : ''}&tokenOut=${(_b = tokenOut === null || tokenOut === void 0 ? void 0 : tokenOut.address) !== null && _b !== void 0 ? _b : ''}&amountIn=${tokenAmountIn === null || tokenAmountIn === void 0 ? void 0 : tokenAmountIn.raw}&slippage=${allowedSlippage}&maxHops=${singleHopOnly ? 1 : MAX_HOPS}&includeTxn=true&priceImpact=true${account ? '&from=' + account : ''}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-API-KEY': (_c = process.env.REACT_APP_MINIMA_KEY) !== null && _c !== void 0 ? _c : '',
            },
        })
            .then((res) => __awaiter(this, void 0, void 0, function* () {
            if (res.status !== 200) {
                setMinimaTrade(null);
                return;
            }
            yield res
                .json()
                .then((data) => __awaiter(this, void 0, void 0, function* () {
                var _d;
                if (data.details) {
                    const path = yield Promise.all(data.details.path.map((pathItem) => __awaiter(this, void 0, void 0, function* () {
                        if (!tokens[pathItem]) {
                            // in case of a token address cannot be found on Ubeswap or Uniswap tokenlists
                            const tokenContract = new ethers.Contract(pathItem, ERC20_ABI, provider);
                            const [tokenName, symbol, decimals] = yield Promise.all([
                                tokenContract.name(),
                                tokenContract.symbol(),
                                tokenContract.decimals(),
                            ]);
                            return new Token(chainId, pathItem, decimals, symbol, tokenName);
                        }
                        return tokens[pathItem];
                    })));
                    const trade = MinimaRouterTrade.fromMinimaTradePayload([
                        new Pair(new TokenAmount(tokenAmountIn.currency, JSBI.BigInt(10000)), new TokenAmount(tokenOut, JSBI.BigInt(20000))),
                    ], tokenAmountIn, new TokenAmount(tokenOut, JSBI.BigInt(data.details.expectedOutputAmount.toString())), data.routerAddress, new Percent(JSBI.BigInt(data.priceImpact.numerator), JSBI.BigInt(data.priceImpact.denominator)), path, Object.assign(Object.assign({}, data.details), { inputAmount: BigNumber.from(data.details.inputAmount), minOutputAmount: BigNumber.from((_d = data.minimumExpectedOut) !== null && _d !== void 0 ? _d : '0'), expectedOutputAmount: BigNumber.from(data.details.expectedOutputAmount), deadline: BigNumber.from(data.details.deadline), partner: minimaPartnerId !== null && minimaPartnerId !== void 0 ? minimaPartnerId : data.details.partner }));
                    setMinimaTrade(trade);
                    clearTimeout(fetchTimeout);
                    setFetchTimeout(setTimeout(() => {
                        setFetchUpdatedData(true);
                    }, FETCH_MINIMA_ROUTER_TIMER));
                }
            }))
                .catch((e) => {
                console.error(e);
                setMinimaTrade(null);
            });
        }))
            .catch((e) => {
            console.error(e);
            setMinimaTrade(null);
        });
    }), [
        account,
        allowedSlippage,
        chainId,
        deps,
        fetchTimeout,
        fetchUpdatedData,
        provider,
        singleHopOnly,
        tokenAmountIn,
        tokenOut,
        tokens,
    ]);
    React.useEffect(() => {
        call();
    }, [call]);
    return minimaTrade;
}
