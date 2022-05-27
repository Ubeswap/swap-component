import { TokenAmount } from '@ubeswap/sdk';
import { BigNumber } from 'ethers';
import { FarmSummary } from './useFarmRegistry';
interface IStakingPoolValue {
    valueCUSD?: TokenAmount;
    amountTokenA?: TokenAmount;
    amountTokenB?: TokenAmount;
    userValueCUSD?: TokenAmount;
    userAmountTokenA?: TokenAmount;
    userAmountTokenB?: TokenAmount;
}
export declare const useLPValue: (stakedAmount: BigNumber, farmSummary: FarmSummary | undefined) => IStakingPoolValue;
export {};
