import { Token } from '@ubeswap/sdk';
import { LendingPool } from '../../../../generated';
export declare const moolaLendingPools: {
    44787: {
        dataProvider: string;
        lendingPool: string;
        lendingPoolCore: string;
        GoldToken: Token;
        StableToken: Token;
        mcUSD: Token;
        mCREAL: Token;
        mCELO: Token;
    };
    42220: {
        dataProvider: string;
        lendingPool: string;
        lendingPoolCore: string;
        GoldToken: Token;
        StableToken: Token;
        mcUSD: Token;
        mCREAL: Token;
        mCELO: Token;
    };
};
export declare const moolaDuals: (readonly [{
    42220: Token;
    44787: Token;
}, {
    42220: Token;
    44787: Token;
}])[];
/**
 * Gets the Moola token that the token can be converted to/from.
 * @param currency
 * @returns
 */
export declare const getMoolaDual: (currency: Token) => Token | null;
export declare type IMoolaChain = keyof typeof moolaLendingPools;
export declare type MoolaConfig = typeof moolaLendingPools[IMoolaChain];
export declare const useMoolaConfig: () => {
    lendingPoolCore: string;
    lendingPool: string;
} | null;
export declare const useLendingPool: () => LendingPool;
