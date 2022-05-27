var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { useContractKit, useGetConnectedSigner, useProvider } from '@celo-tools/use-contractkit';
import { JSBI, Percent, Router } from '@ubeswap/sdk';
import { MoolaRouterTrade } from 'components/swap/routing/hooks/useTrade';
import { useMemo } from 'react';
import { useTransactionAdder } from 'state/transactions/hooks';
import invariant from 'tiny-invariant';
import { BIPS_BASE, INITIAL_ALLOWED_SLIPPAGE } from '../constants';
import { calculateGasMargin, getMoolaRouterContract, getRouterContract, isAddress, shortenAddress } from '../utils';
import isZero from '../utils/isZero';
import useENS from './useENS';
import useTransactionDeadline from './useTransactionDeadline';
export var SwapCallbackState;
(function (SwapCallbackState) {
    SwapCallbackState[SwapCallbackState["INVALID"] = 0] = "INVALID";
    SwapCallbackState[SwapCallbackState["LOADING"] = 1] = "LOADING";
    SwapCallbackState[SwapCallbackState["VALID"] = 2] = "VALID";
})(SwapCallbackState || (SwapCallbackState = {}));
/**
 * Returns the swap calls that can be used to make the trade
 * @param trade trade to execute
 * @param allowedSlippage user allowed slippage
 * @param recipientAddressOrName
 */
function useSwapCallArguments(trade, // trade to execute, required
allowedSlippage = INITIAL_ALLOWED_SLIPPAGE, // in bips
recipientAddressOrName // the ENS name or address of the recipient of the trade, or null if swap should be returned to sender
) {
    const { address: account, network } = useContractKit();
    const library = useProvider();
    const chainId = network.chainId;
    const { address: recipientAddress } = useENS(recipientAddressOrName);
    const recipient = recipientAddressOrName === null ? account : recipientAddress;
    const deadline = useTransactionDeadline();
    return useMemo(() => {
        if (!trade || !recipient || !library || !account || !chainId || !deadline)
            return [];
        const contract = trade instanceof MoolaRouterTrade
            ? getMoolaRouterContract(chainId, library, account)
            : getRouterContract(chainId, library, account);
        const swapCallParameters = Router.swapCallParameters(trade, {
            feeOnTransfer: false,
            allowedSlippage: new Percent(JSBI.BigInt(allowedSlippage), BIPS_BASE),
            recipient,
            deadline: deadline.toNumber(),
        });
        invariant(Array.isArray(swapCallParameters.args[2]), 'arg 2 not path');
        if (trade instanceof MoolaRouterTrade) {
            swapCallParameters.args[2] = trade.path.map((p) => p.address);
        }
        const swapMethods = [swapCallParameters];
        // TODO(igm): figure out why this is failing
        // if (trade.tradeType === TradeType.EXACT_INPUT) {
        //   swapMethods.push(
        //     Router.swapCallParameters(trade, {
        //       feeOnTransfer: true,
        //       allowedSlippage: new Percent(JSBI.BigInt(allowedSlippage), BIPS_BASE),
        //       recipient,
        //       deadline: deadline.toNumber()
        //     })
        //   )
        // }
        return swapMethods.map((parameters) => ({ parameters, contract }));
    }, [account, allowedSlippage, chainId, deadline, library, recipient, trade]);
}
// returns a function that will execute a swap, if the parameters are all valid
// and the user has approved the slippage adjusted input amount for the trade
export function useSwapCallback(trade, // trade to execute, required
allowedSlippage = INITIAL_ALLOWED_SLIPPAGE, // in bips
recipientAddressOrName // the ENS name or address of the recipient of the trade, or null if swap should be returned to sender
) {
    const { network, address: account } = useContractKit();
    const chainId = network.chainId;
    const library = useProvider();
    const swapCalls = useSwapCallArguments(trade, allowedSlippage, recipientAddressOrName);
    const addTransaction = useTransactionAdder();
    const { address: recipientAddress } = useENS(recipientAddressOrName);
    const recipient = recipientAddressOrName === null ? account : recipientAddress;
    const getConnectedSigner = useGetConnectedSigner();
    return useMemo(() => {
        if (!trade || !library || !account || !chainId) {
            return { state: SwapCallbackState.INVALID, callback: null, error: 'Missing dependencies' };
        }
        if (!recipient) {
            if (recipientAddressOrName !== null) {
                return { state: SwapCallbackState.INVALID, callback: null, error: 'Invalid recipient' };
            }
            else {
                return { state: SwapCallbackState.LOADING, callback: null, error: null };
            }
        }
        return {
            state: SwapCallbackState.VALID,
            callback: function onSwap() {
                return __awaiter(this, void 0, void 0, function* () {
                    const estimatedCalls = yield Promise.all(swapCalls.map((call) => {
                        const { parameters: { methodName, args, value }, contract, } = call;
                        const options = !value || isZero(value) ? {} : { value };
                        return contract.estimateGas[methodName](...args, options)
                            .then((gasEstimate) => {
                            return {
                                call,
                                gasEstimate,
                            };
                        })
                            .catch((gasError) => {
                            console.debug('Gas estimate failed, trying eth_call to extract error', call);
                            return contract.callStatic[methodName](...args, options)
                                .then((result) => {
                                console.debug('Unexpected successful call after failed estimate gas', call, gasError, result);
                                return { call, error: new Error('Unexpected issue with estimating the gas. Please try again.') };
                            })
                                .catch((callError) => {
                                console.debug('Call threw error', call, callError);
                                let errorMessage;
                                switch (callError.reason) {
                                    case 'UniswapV2Router: INSUFFICIENT_OUTPUT_AMOUNT':
                                    case 'UniswapV2Router: EXCESSIVE_INPUT_AMOUNT':
                                        errorMessage =
                                            'This transaction will not succeed either due to price movement or fee on transfer. Try increasing your slippage tolerance.';
                                        break;
                                    default:
                                        errorMessage = `The transaction cannot succeed due to error: ${callError.reason}. This is probably an issue with one of the tokens you are swapping.`;
                                }
                                return { call, error: new Error(errorMessage) };
                            });
                        });
                    }));
                    // a successful estimation is a bignumber gas estimate and the next call is also a bignumber gas estimate
                    const successfulEstimation = estimatedCalls.find((el, ix, list) => 'gasEstimate' in el && (ix === list.length - 1 || 'gasEstimate' in list[ix + 1]));
                    if (!successfulEstimation) {
                        const errorCalls = estimatedCalls.filter((call) => 'error' in call);
                        if (errorCalls.length > 0)
                            throw errorCalls[errorCalls.length - 1].error;
                        throw new Error('Unexpected error. Please contact support: none of the calls threw an error');
                    }
                    const { call: { contract: disconnectedContract, parameters: { methodName, args, value }, }, gasEstimate, } = successfulEstimation;
                    const contract = disconnectedContract.connect(yield getConnectedSigner());
                    return contract[methodName](...args, {
                        gasLimit: calculateGasMargin(gasEstimate),
                    })
                        .then((response) => {
                        const inputSymbol = trade instanceof MoolaRouterTrade ? trade.path[0].symbol : trade.inputAmount.currency.symbol;
                        const outputSymbol = trade instanceof MoolaRouterTrade
                            ? trade.path[trade.path.length - 1].symbol
                            : trade.outputAmount.currency.symbol;
                        const inputAmount = trade.inputAmount.toSignificant(3);
                        const outputAmount = trade.outputAmount.toSignificant(3);
                        const base = `Swap ${inputAmount} ${inputSymbol} for ${outputAmount} ${outputSymbol}`;
                        const withRecipient = recipient === account
                            ? base
                            : `${base} to ${recipientAddressOrName && isAddress(recipientAddressOrName)
                                ? shortenAddress(recipientAddressOrName)
                                : recipientAddressOrName}`;
                        addTransaction(response, {
                            summary: withRecipient,
                        });
                        return response.hash;
                    })
                        .catch((error) => {
                        // if the user rejected the tx, pass this along
                        if ((error === null || error === void 0 ? void 0 : error.code) === 4001) {
                            throw new Error('Transaction rejected.');
                        }
                        else {
                            // otherwise, the error was unexpected and we need to convey that
                            console.error(`Swap failed`, error, methodName, args, value);
                            throw new Error(`Swap failed: ${error.message}`);
                        }
                    });
                });
            },
            error: null,
        };
    }, [
        trade,
        library,
        account,
        chainId,
        recipient,
        recipientAddressOrName,
        swapCalls,
        getConnectedSigner,
        addTransaction,
    ]);
}
