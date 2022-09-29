var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { useContractKit, useProvider } from '@celo-tools/use-contractkit';
import { ChainId } from '@ubeswap/sdk';
import { useMemo } from 'react';
import { INITIAL_ALLOWED_SLIPPAGE } from '../../../constants';
import useENS from '../../../hooks/useENS';
import { SwapCallbackState, useSwapCallback } from '../../../hooks/useSwapCallback';
import { isAddress, shortenAddress } from '../../../utils';
import { useDoTransaction } from '.';
import { executeMinimaTrade } from './minima/executeMinimaTrade';
import { executeMoolaDirectTrade } from './moola/executeMoolaDirectTrade';
import { MoolaDirectTrade } from './moola/MoolaDirectTrade';
import { MinimaRouterTrade } from './trade';
/**
 * Use callback to allow trading
 * @param trade
 * @param allowedSlippage
 * @param recipientAddressOrName
 * @returns
 */
export const useTradeCallback = (trade, // trade to execute, required
allowedSlippage = INITIAL_ALLOWED_SLIPPAGE, // in bips
recipientAddressOrName // the ENS name or address of the recipient of the trade, or null if swap should be returned to sender
) => {
    const { address: account, network } = useContractKit();
    const library = useProvider();
    const chainId = network.chainId;
    const doTransaction = useDoTransaction();
    const { address: recipientAddress } = useENS(recipientAddressOrName);
    const recipient = recipientAddressOrName === null ? account : recipientAddress;
    const withRecipient = recipient === account
        ? ''
        : ` to ${recipientAddressOrName && isAddress(recipientAddressOrName)
            ? shortenAddress(recipientAddressOrName)
            : recipientAddressOrName}`;
    const { state: swapState, callback: swapCallback, error, } = useSwapCallback(trade, allowedSlippage, recipientAddressOrName);
    return useMemo(() => {
        if (error) {
            return { state: swapState, callback: null, error };
        }
        if (!library || !trade || !account) {
            return { state: SwapCallbackState.INVALID, callback: null, error: 'Missing dependencies' };
        }
        if (chainId === ChainId.BAKLAVA) {
            return { state: SwapCallbackState.INVALID, callback: null, error: 'Baklava is not supported' };
        }
        const signer = library.getSigner(account);
        const env = { signer, chainId, doTransaction };
        if (trade instanceof MinimaRouterTrade) {
            return {
                state: SwapCallbackState.VALID,
                callback: () => __awaiter(void 0, void 0, void 0, function* () { return (yield executeMinimaTrade(Object.assign(Object.assign({}, env), { trade, recipient, withRecipient }))).hash; }),
                error: null,
            };
        }
        else if (trade instanceof MoolaDirectTrade) {
            return {
                state: SwapCallbackState.VALID,
                callback: () => __awaiter(void 0, void 0, void 0, function* () { return (yield executeMoolaDirectTrade(Object.assign(Object.assign({}, env), { trade }))).hash; }),
                error: null,
            };
        }
        else if (swapCallback) {
            return { state: SwapCallbackState.VALID, callback: swapCallback, error: null };
        }
        else {
            return { state: SwapCallbackState.INVALID, callback: null, error: 'Unknown trade type' };
        }
    }, [error, library, trade, account, chainId, doTransaction, swapCallback, swapState, recipient, withRecipient]);
};
