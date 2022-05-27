import { Token } from '@ubeswap/sdk';
import { Tags, TokenInfo, TokenList } from '@uniswap/token-lists';
declare type TagDetails = Tags[keyof Tags];
export interface TagInfo extends TagDetails {
    id: string;
}
/**
 * Token instances created from token info.
 */
export declare class WrappedTokenInfo extends Token {
    readonly tokenInfo: TokenInfo;
    readonly tags: TagInfo[];
    constructor(tokenInfo: TokenInfo, tags: TagInfo[]);
    get logoURI(): string | undefined;
}
export declare type TokenAddressMap = Readonly<{
    [chainId: number]: Readonly<{
        [tokenAddress: string]: {
            token: WrappedTokenInfo;
            list: TokenList;
        };
    }>;
}>;
export declare function listToTokenMap(list: TokenList): TokenAddressMap;
export declare function useAllLists(): {
    readonly [url: string]: {
        readonly current: TokenList | null;
        readonly pendingUpdate: TokenList | null;
        readonly loadingRequestId: string | null;
        readonly error: string | null;
    };
};
export declare function useActiveListUrls(): string[] | undefined;
export declare function useInactiveListUrls(): string[];
export declare function useCombinedActiveList(): TokenAddressMap;
export declare function useCombinedInactiveList(): TokenAddressMap;
export declare function useDefaultTokenList(): TokenAddressMap;
export declare function useUnsupportedTokenList(): TokenAddressMap;
export declare function useIsListActive(url: string): boolean;
export {};
