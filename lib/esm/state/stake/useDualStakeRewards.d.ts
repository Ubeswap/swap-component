import { Address } from '@celo/contractkit';
import { StakingInfo } from './hooks';
export declare const useMultiStakeRewards: (address: Address | undefined, underlyingPool: StakingInfo | undefined | null, numRewards: number, active: boolean) => StakingInfo | null;
