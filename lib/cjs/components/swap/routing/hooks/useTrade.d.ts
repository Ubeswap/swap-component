import { Pair, Percent, Price, Token, TokenAmount, Trade } from '@ubeswap/sdk';
import { MinimaRouterTrade, UbeswapTrade } from '../trade';
/**
 * Uses all common pairs between the two tokens, plus searches the moola duals
 * @param tokenA
 * @param tokenB
 * @returns
 */
export declare function useAllCommonPairsWithMoolaDuals(tokenA?: Token, tokenB?: Token): readonly Pair[];
export declare class MoolaRouterTrade extends UbeswapTrade {
    readonly originalTokenIn: Token | null;
    readonly originalTokenOut: Token | null;
    readonly innerTrade: Trade;
    inputAmount: TokenAmount;
    outputAmount: TokenAmount;
    executionPrice: Price;
    /**
     *
     * @param originalTokenIn If null, the original token is the path token
     * @param originalTokenOut If null, the original token is the path token
     * @param innerTrade
     */
    constructor(originalTokenIn: Token | null, originalTokenOut: Token | null, innerTrade: Trade);
    /**
     * Get the minimum amount that must be received from this trade for the given slippage tolerance
     * @param slippageTolerance tolerance of unfavorable slippage from the execution price of this trade
     */
    minimumAmountOut(slippageTolerance: Percent): TokenAmount;
    /**
     * Get the maximum amount in that can be spent via this trade for the given slippage tolerance
     * @param slippageTolerance tolerance of unfavorable slippage from the execution price of this trade
     */
    maximumAmountIn(slippageTolerance: Percent): TokenAmount;
}
/**
 * Returns the best trade for the exact amount of tokens in to the given token out
 */
export declare function useUbeswapTradeExactIn(tokenAmountIn?: TokenAmount, tokenOut?: Token): UbeswapTrade | null;
/**
 * Returns the best trade for the token in to the exact amount of token out
 */
export declare function useUbeswapTradeExactOut(tokenIn?: Token, tokenAmountOut?: TokenAmount): UbeswapTrade | null;
export declare function useMinimaTrade(tokenAmountIn?: TokenAmount, tokenOut?: Token): MinimaRouterTrade | null | undefined;
