import { Trade } from '@ubeswap/sdk';
import { SwapCallbackState } from '../../../hooks/useSwapCallback';
/**
 * Use callback to allow trading
 * @param trade
 * @param allowedSlippage
 * @param recipientAddressOrName
 * @returns
 */
export declare const useTradeCallback: (trade: Trade | undefined, allowedSlippage: number | undefined, recipientAddressOrName: string | null) => {
    state: SwapCallbackState;
    callback: null | (() => Promise<string>);
    error: string | null;
};
