import { TransactionResponse } from '@ethersproject/providers';
import { TransactionDetails } from './reducer';
export declare function useTransactionAdder(): (response: TransactionResponse, customData?: {
    summary?: string;
    approval?: {
        tokenAddress: string;
        spender: string;
    };
    claim?: {
        recipient: string;
    };
}) => void;
export declare function useAllTransactions(): {
    [txHash: string]: TransactionDetails;
};
export declare function useIsTransactionPending(transactionHash?: string): boolean;
/**
 * Returns whether a transaction happened in the last day (86400 seconds * 1000 milliseconds / second)
 * @param tx to check for recency
 */
export declare function isTransactionRecent(tx: TransactionDetails): boolean;
export declare function useHasPendingApproval(tokenAddress: string | undefined, spender: string | undefined): boolean;
export declare function useUserHasSubmittedClaim(account?: string): {
    claimSubmitted: boolean;
    claimTxn: TransactionDetails | undefined;
};
