import { Token, TokenAmount } from '@ubeswap/sdk';
/**
 * Returns a map of token addresses to their eventually consistent token balances for a single account.
 */
export declare function useTokenBalancesWithLoadingIndicator(address?: string, tokens?: (Token | undefined)[]): [{
    [tokenAddress: string]: TokenAmount | undefined;
}, boolean];
export declare function useTokenBalances(address?: string, tokens?: (Token | undefined)[]): {
    [tokenAddress: string]: TokenAmount | undefined;
};
export declare function useTokenBalance(account?: string, token?: Token): TokenAmount | undefined;
export declare function useCurrencyBalances(account?: string, currencies?: (Token | undefined)[]): (TokenAmount | undefined)[];
export declare function useCurrencyBalance(account?: string, currency?: Token): TokenAmount | undefined;
export declare function useAllTokenBalances(): {
    [tokenAddress: string]: TokenAmount | undefined;
};
export declare function useAggregateUbeBalance(): TokenAmount | undefined;
