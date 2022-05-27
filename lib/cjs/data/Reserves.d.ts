import { Pair, Token } from '@ubeswap/sdk';
export declare enum PairState {
    LOADING = 0,
    NOT_EXISTS = 1,
    EXISTS = 2,
    INVALID = 3
}
export declare function usePairs(tokens: readonly (readonly [Token | undefined, Token | undefined])[]): readonly (readonly [PairState, Pair | null])[];
export declare function usePair(tokenA?: Token, tokenB?: Token): readonly [PairState, Pair | null];
