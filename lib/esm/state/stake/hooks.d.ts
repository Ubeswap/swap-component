import { BigNumber } from '@ethersproject/bignumber';
import { Pair, Token, TokenAmount } from '@ubeswap/sdk';
import { PoolManager } from '../../generated/';
export declare const STAKING_GENESIS = 1619100000;
export interface StakingInfo {
    readonly stakingRewardAddress: string | undefined;
    readonly stakingToken: Token;
    readonly tokens: readonly [Token, Token];
    readonly stakedAmount?: TokenAmount;
    readonly totalStakedAmount: TokenAmount;
    readonly earnedAmounts?: TokenAmount[];
    readonly rewardRates?: TokenAmount[];
    readonly totalRewardRates: TokenAmount[];
    readonly periodFinish: Date | undefined;
    readonly active: boolean;
    readonly getHypotheticalRewardRate: (stakedAmount: TokenAmount, totalStakedAmount: TokenAmount, totalRewardRates: TokenAmount[]) => TokenAmount[];
    readonly nextPeriodRewards: TokenAmount;
    readonly poolInfo: IRawPool;
    readonly rewardTokens: Token[];
}
declare type MultiRewardPool = {
    address: string;
    underlyingPool: string;
    basePool: string;
    numRewards: number;
    active: boolean;
};
export declare const useMultiRewardPools: () => MultiRewardPool[];
export declare const usePairMultiStakingInfo: (stakingInfo: StakingInfo | undefined, stakingAddress: string) => StakingInfo | null;
interface UnclaimedInfo {
    /**
     * Total tokens left in the contract
     */
    balanceRemaining: BigNumber | null;
    /**
     * Earned but unclaimed tokens
     */
    earned: BigNumber | null;
    /**
     * Tokens not in the circulating supply
     */
    noncirculatingSupply: BigNumber | null;
}
export declare const useUnclaimedStakingRewards: () => UnclaimedInfo;
interface IStakingPool {
    stakingRewardAddress: string;
    tokens?: readonly [Token, Token];
    poolInfo: IRawPool;
}
export declare function useStakingPools(pairToFilterBy?: Pair | null, stakingAddress?: string): readonly IStakingPool[];
export declare function useStakingPoolAddresses(poolManagerContract: PoolManager | null, poolsCount: number): readonly string[];
interface IRawPool {
    index: number;
    stakingToken: string;
    poolAddress: string;
    weight: number;
    rewardToken?: string;
    rewardTokenSymbol?: string;
    nextPeriod?: number;
    nextPeriodRewards?: BigNumber | null;
}
export declare function useStakingPoolsInfo(poolManagerContract: PoolManager | null, poolAddresses: readonly string[]): readonly IRawPool[];
export declare function usePairDataFromAddresses(pairAddresses: readonly string[]): readonly (readonly [Token, Token] | undefined)[];
export declare function useTotalUbeEarned(): TokenAmount | undefined;
export declare function useFilteredStakingInfo(stakingAddresses: string[]): readonly StakingInfo[] | undefined;
export declare function useFarmRewardsInfo(stakingAddresses: string[]): readonly StakingInfo[] | undefined;
export declare function useDerivedStakeInfo(typedValue: string, stakingToken: Token | null | undefined, userLiquidityUnstaked: TokenAmount | undefined): {
    parsedAmount?: TokenAmount;
    error?: string;
};
export declare function useDerivedUnstakeInfo(typedValue: string, stakingAmount: TokenAmount): {
    parsedAmount?: TokenAmount;
    error?: string;
};
export {};
