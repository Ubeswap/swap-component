import { BestTradeOptions, Pair, Percent, Token, TokenAmount } from '@ubeswap/sdk';
import { UbeswapTrade } from '../trade';
export declare function isDualTradeBetter(tradeA: UbeswapTrade | undefined | null, tradeB: UbeswapTrade | undefined | null, minimumDelta?: Percent): boolean | undefined;
interface BestUbeswapTradeOptions extends BestTradeOptions {
    minimumDelta?: Percent;
}
export declare const bestTradeExactOut: (pairs: readonly Pair[], tokenIn: Token, tokenAmountOut: TokenAmount, directTrade: UbeswapTrade | null, options?: BestUbeswapTradeOptions | undefined) => UbeswapTrade | null;
export declare const bestTradeExactIn: (pairs: readonly Pair[], tokenAmountIn: TokenAmount, tokenOut: Token, directTrade: UbeswapTrade | null, options?: BestUbeswapTradeOptions | undefined) => UbeswapTrade | null;
export {};
