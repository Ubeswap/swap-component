import { Pair } from '@ubeswap/sdk';
import { StakingInfo } from './hooks';
export default function useStakingInfo(pairToFilterBy?: Pair | null, stakingAddress?: string): readonly StakingInfo[];
export declare const usePairStakingInfo: (pairToFilterBy?: Pair | null | undefined, stakingAddress?: string | undefined) => StakingInfo | undefined;
