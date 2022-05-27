import { JsonRpcSigner } from '@ethersproject/providers';
import { ChainId, Trade } from '@ubeswap/sdk';
import { CallOverrides, Contract, ContractTransaction, PayableOverrides } from 'ethers';
declare type Head<T extends any[]> = Required<T> extends [...infer H, any] ? H : never;
declare type Last<T extends Array<unknown>> = Required<T> extends [...unknown[], infer L] ? L : never;
declare type MethodArgs<C extends Contract, M extends keyof C['estimateGas']> = Head<Parameters<C['estimateGas'][M]>>;
export declare type DoTransactionFn = <C extends Contract, M extends string & keyof C['estimateGas'], O extends Last<Parameters<C['estimateGas'][M]>> & (PayableOverrides | CallOverrides)>(contract: C, methodName: M, args: {
    args: MethodArgs<C, M>;
    overrides?: O;
    summary?: string;
    approval?: {
        tokenAddress: string;
        spender: string;
    };
    claim?: {
        recipient: string;
    };
}) => Promise<ContractTransaction>;
export interface TradeExecutor<T extends Trade> {
    (args: {
        trade: T;
        signer: JsonRpcSigner;
        chainId: ChainId.MAINNET | ChainId.ALFAJORES;
        doTransaction: DoTransactionFn;
    }): Promise<{
        hash: string;
    }>;
}
export interface CancelLimitOrderExecutor {
    (args: {
        orderHash: string;
        signer: JsonRpcSigner;
        chainId: ChainId.MAINNET | ChainId.ALFAJORES;
        doTransaction: DoTransactionFn;
    }): Promise<{
        hash: string;
    }>;
}
/**
 * Allows performing transactions.
 * @returns
 */
export declare const useDoTransaction: () => DoTransactionFn;
export {};
