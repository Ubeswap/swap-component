import { ChainId } from '@ubeswap/sdk';
export interface SerializableTransactionReceipt {
    to: string;
    from: string;
    contractAddress: string;
    transactionIndex: number;
    blockHash: string;
    transactionHash: string;
    blockNumber: number;
    status?: number;
}
export declare const addTransaction: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
    chainId: ChainId;
    hash: string;
    from: string;
    approval?: {
        tokenAddress: string;
        spender: string;
    } | undefined;
    claim?: {
        recipient: string;
    } | undefined;
    summary?: string | undefined;
}, string>;
export declare const clearAllTransactions: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
    chainId: ChainId;
}, string>;
export declare const finalizeTransaction: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
    chainId: ChainId;
    hash: string;
    receipt: SerializableTransactionReceipt;
}, string>;
export declare const checkedTransaction: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
    chainId: ChainId;
    hash: string;
    blockNumber: number;
}, string>;
