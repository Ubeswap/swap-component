import { Token, TokenAmount } from '@ubeswap/sdk';
import { UbeswapTrade } from '../trade';
/**
 * Returns the best trade for the exact amount of tokens in to the given token out
 */
export declare function useDirectTradeExactIn(currencyAmountIn?: TokenAmount, currencyOut?: Token): UbeswapTrade | null;
/**
 * Returns the best trade for the token in to the exact amount of token out
 */
export declare function useDirectTradeExactOut(currencyIn?: Token, currencyAmountOut?: TokenAmount): UbeswapTrade | null;
