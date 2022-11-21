"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useMinimaTrade = exports.useUbeswapTradeExactOut = exports.useUbeswapTradeExactIn = exports.MoolaRouterTrade = exports.useAllCommonPairsWithMoolaDuals = void 0;
const use_contractkit_1 = require("@celo-tools/use-contractkit");
const sdk_1 = require("@ubeswap/sdk");
const ethers_1 = require("ethers");
const lodash_1 = __importDefault(require("lodash"));
const lodash_flatmap_1 = __importDefault(require("lodash.flatmap"));
const react_1 = __importStar(require("react"));
const erc20_1 = require("../../../../constants/abis/erc20");
const index_1 = require("../../../../constants/index");
const Reserves_1 = require("../../../../data/Reserves");
const Tokens_1 = require("../../../../hooks/Tokens");
const hooks_1 = require("../../../../state/user/hooks");
const utils_1 = require("../../../../utils");
const trades_1 = require("../../../../utils/trades");
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
function useMinimaTrade(tokenAmountIn, tokenOut, minimaPartnerId) {
    const [minimaTrade, setMinimaTrade] = react_1.default.useState(undefined);
    const [deps, setDeps] = react_1.default.useState(undefined);
    const [singleHopOnly] = (0, hooks_1.useUserSingleHopOnly)();
    const [allowedSlippage] = (0, hooks_1.useUserSlippageTolerance)();
    const [fetchUpdatedData, setFetchUpdatedData] = react_1.default.useState(true);
    const [fetchTimeout, setFetchTimeout] = react_1.default.useState(undefined);
    const { address: account, network } = (0, use_contractkit_1.useContractKit)();
    const { chainId } = network;
    const library = (0, use_contractkit_1.useProvider)();
    const provider = (0, utils_1.getProviderOrSigner)(library, account || undefined);
    const tokens = (0, Tokens_1.useAllTokens)();
    const call = react_1.default.useCallback(() => __awaiter(this, void 0, void 0, function* () {
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
        if (lodash_1.default.isEqual(deps, curDeps) && !fetchUpdatedData) {
            return;
        }
        if (!fetchUpdatedData) {
            setMinimaTrade(undefined);
        }
        setDeps(curDeps);
        setFetchUpdatedData(false);
        // fetch information of minima router
        yield fetch(`${index_1.MINIMA_API_URL}?tokenIn=${(_a = tokenAmountIn === null || tokenAmountIn === void 0 ? void 0 : tokenAmountIn.currency.address) !== null && _a !== void 0 ? _a : ''}&tokenOut=${(_b = tokenOut === null || tokenOut === void 0 ? void 0 : tokenOut.address) !== null && _b !== void 0 ? _b : ''}&amountIn=${tokenAmountIn === null || tokenAmountIn === void 0 ? void 0 : tokenAmountIn.raw}&slippage=${allowedSlippage}&maxHops=${singleHopOnly ? 1 : MAX_HOPS}&includeTxn=true&priceImpact=true${account ? '&from=' + account : ''}`, {
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
                            const tokenContract = new ethers_1.ethers.Contract(pathItem, erc20_1.ERC20_ABI, provider);
                            const [tokenName, symbol, decimals] = yield Promise.all([
                                tokenContract.name(),
                                tokenContract.symbol(),
                                tokenContract.decimals(),
                            ]);
                            return new sdk_1.Token(chainId, pathItem, decimals, symbol, tokenName);
                        }
                        return tokens[pathItem];
                    })));
                    const trade = trade_1.MinimaRouterTrade.fromMinimaTradePayload([
                        new sdk_1.Pair(new sdk_1.TokenAmount(tokenAmountIn.currency, sdk_1.JSBI.BigInt(10000)), new sdk_1.TokenAmount(tokenOut, sdk_1.JSBI.BigInt(20000))),
                    ], tokenAmountIn, new sdk_1.TokenAmount(tokenOut, sdk_1.JSBI.BigInt(data.details.expectedOutputAmount.toString())), data.routerAddress, new sdk_1.Percent(sdk_1.JSBI.BigInt(data.priceImpact.numerator), sdk_1.JSBI.BigInt(data.priceImpact.denominator)), path, Object.assign(Object.assign({}, data.details), { inputAmount: ethers_1.BigNumber.from(data.details.inputAmount), minOutputAmount: ethers_1.BigNumber.from((_d = data.minimumExpectedOut) !== null && _d !== void 0 ? _d : '0'), expectedOutputAmount: ethers_1.BigNumber.from(data.details.expectedOutputAmount), deadline: ethers_1.BigNumber.from(data.details.deadline), partner: minimaPartnerId !== null && minimaPartnerId !== void 0 ? minimaPartnerId : data.details.partner }));
                    setMinimaTrade(trade);
                    clearTimeout(fetchTimeout);
                    setFetchTimeout(setTimeout(() => {
                        setFetchUpdatedData(true);
                    }, index_1.FETCH_MINIMA_ROUTER_TIMER));
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
    react_1.default.useEffect(() => {
        call();
    }, [call]);
    return minimaTrade;
}
exports.useMinimaTrade = useMinimaTrade;
