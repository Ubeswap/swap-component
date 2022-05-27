import { TokenAmount, Trade } from '@ubeswap/sdk';
export declare enum ApprovalState {
    UNKNOWN = 0,
    NOT_APPROVED = 1,
    PENDING = 2,
    APPROVED = 3
}
export declare function useApproveCallback(amountToApprove?: TokenAmount, spender?: string): [ApprovalState, () => Promise<void>];
export declare function useApproveCallbackFromTrade(trade?: Trade, allowedSlippage?: number): [ApprovalState, () => Promise<void>];
