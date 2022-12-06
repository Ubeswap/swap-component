import { Pair, Token } from '@ubeswap/sdk';
import { SwapTheme } from '../../pages/Swap';
export declare function useSwapTheme(): SwapTheme | null;
export declare function useIsExpertMode(): boolean;
export declare function useExpertModeManager(): [boolean, () => void];
export declare function useUserMinApprove(): [boolean, (minApprove: boolean) => void];
export declare function useUserAllowMoolaWithdrawal(): [boolean, (allowMoolaWithdrawal: boolean) => void];
export declare function useUserDisableSmartRouting(): [boolean, (disableSmartRouting: boolean) => void];
export declare function useUserSingleHopOnly(): [boolean, (newSingleHopOnly: boolean) => void];
export declare function useUserSlippageTolerance(): [number, (slippage: number) => void];
export declare function useUserTransactionTTL(): [number, (slippage: number) => void];
export declare function useAddUserToken(): (token: Token) => void;
export declare function useRemoveUserAddedToken(): (chainId: number, address: string) => void;
export declare function useUserAddedTokens(): Token[];
export declare function usePairAdder(): (pair: Pair) => void;
export declare function useURLWarningVisible(): boolean;
export declare function useURLWarningToggle(): () => void;
/**
 * Given two tokens return the liquidity token that represents its liquidity shares
 * @param tokenA one of the two tokens
 * @param tokenB the other token
 */
export declare function toV2LiquidityToken([tokenA, tokenB]: [Token, Token]): Token;
/**
 * Returns all the pairs of tokens that are tracked by the user for the current chain ID.
 */
export declare function useTrackedTokenPairs(): [Token, Token][];
export declare function useIsAprMode(): boolean;
