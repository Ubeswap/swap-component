import { Trade } from '@ubeswap/sdk';
export declare enum SwapCallbackState {
    INVALID = 0,
    LOADING = 1,
    VALID = 2
}
export declare function useSwapCallback(trade: Trade | undefined, // trade to execute, required
allowedSlippage: number | undefined, // in bips
recipientAddressOrName: string | null): {
    state: SwapCallbackState;
    callback: null | (() => Promise<string>);
    error: string | null;
};
