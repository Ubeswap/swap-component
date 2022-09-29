import { Contract } from '@ethersproject/contracts';
import { Erc20, LimitOrderProtocol, MoolaStakingRewards, OrderBook, OrderBookRewardDistributor, PoolManager, StakingRewards } from '../generated';
import { ReleaseUbe } from '../generated/ReleaseUbe';
import { StakingInfo } from '../state/stake/hooks';
export declare function useTokenContract(tokenAddress?: string, withSignerIfPossible?: boolean): Erc20 | null;
export declare function useENSRegistrarContract(withSignerIfPossible?: boolean): Contract | null;
export declare function useENSResolverContract(address: string | undefined, withSignerIfPossible?: boolean): Contract | null;
export declare function useBytes32TokenContract(tokenAddress?: string, withSignerIfPossible?: boolean): Contract | null;
export declare function usePairContract(pairAddress?: string, withSignerIfPossible?: boolean): Contract | null;
export declare function useMulticallContract(): Contract | null;
export declare function useStakingContract(stakingAddress?: string, withSignerIfPossible?: boolean): StakingRewards | null;
export declare function useStakingContracts(stakingInfos?: readonly StakingInfo[], withSignerIfPossible?: boolean): StakingRewards[] | null;
export declare function useVotableStakingContract(stakingAddress?: string, withSignerIfPossible?: boolean): StakingRewards | null;
export declare function usePoolManagerContract(poolManagerAddress?: string, withSignerIfPossible?: boolean): PoolManager | null;
export declare function useReleaseUbeContract(withSignerIfPossible?: boolean): ReleaseUbe | null;
export declare function useMultiStakingContract(stakingAddress?: string, withSignerIfPossible?: boolean): MoolaStakingRewards | null;
export declare function useOrderBookContract(address?: string, withSignerIfPossible?: boolean): OrderBook | null;
export declare function useOrderBookRewardDistributorContract(address?: string, withSignerIfPossible?: boolean): OrderBookRewardDistributor | null;
export declare function useLimitOrderProtocolContract(address?: string, withSignerIfPossible?: boolean): LimitOrderProtocol | null;
