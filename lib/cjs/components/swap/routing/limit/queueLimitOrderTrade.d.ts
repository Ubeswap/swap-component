import { ChainId, TokenAmount } from '@ubeswap/sdk';
/**
 * Queues a limit order trade.
 * @returns
 */
export declare const useQueueLimitOrderTrade: () => {
    queueLimitOrderCallback: ({ inputAmount, outputAmount, chainId, }: {
        inputAmount: TokenAmount;
        outputAmount: TokenAmount;
        chainId: ChainId;
    }) => Promise<void>;
    loading: boolean;
};
