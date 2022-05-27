import { ChainId } from '@celo-tools/use-contractkit';
import { Token } from '@ubeswap/sdk';
export declare function useDefaultTokens(): {
    [address: string]: Token;
};
export declare function useAllTokens(chainId?: ChainId): {
    [address: string]: Token;
};
export declare function useAllInactiveTokens(): {
    [address: string]: Token;
};
export declare function useUnsupportedTokens(): {
    [address: string]: Token;
};
export declare function useIsTokenActive(token: Token | undefined | null): boolean;
export declare function useFoundOnInactiveList(searchQuery: string): Token[] | undefined;
export declare function useIsUserAddedToken(currency: Token | undefined | null): boolean;
export declare function useToken(tokenAddress?: string): Token | undefined | null;
export declare function useCurrency(currencyId: string | undefined): Token | null | undefined;
