import { Price, Token } from '@ubeswap/sdk';
/**
 * Returns the price in cUSD of the input currency
 * @param currency currency to compute the cUSD price of
 */
export declare function useCUSDPrices(tokens?: Token[]): (Price | undefined)[] | undefined;
/**
 * Returns the price in cUSD of the input currency
 * @param token the token to get the cUSD price of
 */
export declare function useCUSDPrice(token?: Token): Price | undefined;
/**
 * Returns the price in cUSD of the input currency
 * @param currency currency to compute the cUSD price of
 */
export declare const useCUSDPriceOfULP: (stakingToken: Token | undefined) => Price | undefined;
