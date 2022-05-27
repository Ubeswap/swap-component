import { BigNumber } from '@ethersproject/bignumber';
import { Percent, TokenAmount } from '@ubeswap/sdk';
export declare type FarmSummary = {
    farmName: string;
    stakingAddress: string;
    lpAddress: string;
    rewardsUSDPerYear: BigNumber;
    tvlUSD: BigNumber;
    token0Address: string;
    token1Address: string;
    isFeatured: boolean;
    rewardApr?: Percent;
    swapApr?: Percent;
    apr?: Percent;
    apy?: string;
    isImported: boolean;
    totalRewardRates?: TokenAmount[];
};
export interface WarningInfo {
    poolName: string;
    link: string;
}
export declare const useFarmRegistry: () => FarmSummary[];
export declare const useUniqueBestFarms: () => Record<string, FarmSummary>;
