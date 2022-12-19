"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSwapCallback = exports.SwapCallbackState = void 0;
const use_contractkit_1 = require("@celo-tools/use-contractkit");
const sdk_1 = require("@ubeswap/sdk");
const react_1 = require("react");
const react_redux_1 = require("react-redux");
const tiny_invariant_1 = __importDefault(require("tiny-invariant"));
const useTrade_1 = require("../components/swap/routing/hooks/useTrade");
const constants_1 = require("../constants");
const hooks_1 = require("../state/transactions/hooks");
const utils_1 = require("../utils");
const isZero_1 = __importDefault(require("../utils/isZero"));
const useENS_1 = __importDefault(require("./useENS"));
const useTransactionDeadline_1 = __importDefault(require("./useTransactionDeadline"));
var SwapCallbackState;
(function (SwapCallbackState) {
    SwapCallbackState[SwapCallbackState["INVALID"] = 0] = "INVALID";
    SwapCallbackState[SwapCallbackState["LOADING"] = 1] = "LOADING";
    SwapCallbackState[SwapCallbackState["VALID"] = 2] = "VALID";
})(SwapCallbackState = exports.SwapCallbackState || (exports.SwapCallbackState = {}));
/**
 * Returns the swap calls that can be used to make the trade
 * @param trade trade to execute
 * @param allowedSlippage user allowed slippage
 * @param recipientAddressOrName
 */
function useSwapCallArguments(trade, // trade to execute, required
allowedSlippage = constants_1.INITIAL_ALLOWED_SLIPPAGE, // in bips
recipientAddressOrName // the ENS name or address of the recipient of the trade, or null if swap should be returned to sender
) {
    const { address, network } = (0, use_contractkit_1.useContractKit)();
    const accountInfo = (0, react_redux_1.useSelector)((state) => state.swap.accountInfo);
    const library = (0, use_contractkit_1.useProvider)();
    const provider = accountInfo ? accountInfo.provider : library;
    const chainId = accountInfo ? accountInfo.chainId : network.chainId;
    const account = accountInfo ? accountInfo.account : address;
    const { address: recipientAddress } = (0, useENS_1.default)(recipientAddressOrName);
    const recipient = recipientAddressOrName === null ? account : recipientAddress;
    const deadline = (0, useTransactionDeadline_1.default)();
    return (0, react_1.useMemo)(() => {
        if (!trade || !recipient || !provider || !account || !chainId || !deadline)
            return [];
        const contract = trade instanceof useTrade_1.MoolaRouterTrade
            ? (0, utils_1.getMoolaRouterContract)(chainId, provider, account)
            : (0, utils_1.getRouterContract)(chainId, provider, account);
        const swapCallParameters = sdk_1.Router.swapCallParameters(trade, {
            feeOnTransfer: false,
            allowedSlippage: new sdk_1.Percent(sdk_1.JSBI.BigInt(allowedSlippage), constants_1.BIPS_BASE),
            recipient,
            deadline: deadline.toNumber(),
        });
        (0, tiny_invariant_1.default)(Array.isArray(swapCallParameters.args[2]), 'arg 2 not path');
        if (trade instanceof useTrade_1.MoolaRouterTrade) {
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
    }, [account, allowedSlippage, chainId, deadline, provider, recipient, trade]);
}
// returns a function that will execute a swap, if the parameters are all valid
// and the user has approved the slippage adjusted input amount for the trade
function useSwapCallback(trade, // trade to execute, required
allowedSlippage = constants_1.INITIAL_ALLOWED_SLIPPAGE, // in bips
recipientAddressOrName // the ENS name or address of the recipient of the trade, or null if swap should be returned to sender
) {
    const { network, address } = (0, use_contractkit_1.useContractKit)();
    const accountInfo = (0, react_redux_1.useSelector)((state) => state.swap.accountInfo);
    const chainId = accountInfo ? accountInfo.chainId : network.chainId;
    const account = accountInfo ? accountInfo.account : address;
    const library = (0, use_contractkit_1.useProvider)();
    const provider = accountInfo ? accountInfo.provider : library;
    const swapCalls = useSwapCallArguments(trade, allowedSlippage, recipientAddressOrName);
    const addTransaction = (0, hooks_1.useTransactionAdder)();
    const { address: recipientAddress } = (0, useENS_1.default)(recipientAddressOrName);
    const recipient = recipientAddressOrName === null ? account : recipientAddress;
    const providerOrSigner = (0, utils_1.getProviderOrSigner)(provider, account || undefined);
    return (0, react_1.useMemo)(() => {
        if (!trade || !provider || !account || !chainId) {
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
                        const options = !value || (0, isZero_1.default)(value) ? {} : { value };
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
                    const contract = disconnectedContract.connect(providerOrSigner);
                    return contract[methodName](...args, {
                        gasLimit: (0, utils_1.calculateGasMargin)(gasEstimate),
                    })
                        .then((response) => {
                        const inputSymbol = trade instanceof useTrade_1.MoolaRouterTrade ? trade.path[0].symbol : trade.inputAmount.currency.symbol;
                        const outputSymbol = trade instanceof useTrade_1.MoolaRouterTrade
                            ? trade.path[trade.path.length - 1].symbol
                            : trade.outputAmount.currency.symbol;
                        const inputAmount = trade.inputAmount.toSignificant(3);
                        const outputAmount = trade.outputAmount.toSignificant(3);
                        const base = `Swap ${inputAmount} ${inputSymbol} for ${outputAmount} ${outputSymbol}`;
                        const withRecipient = recipient === account
                            ? base
                            : `${base} to ${recipientAddressOrName && (0, utils_1.isAddress)(recipientAddressOrName)
                                ? (0, utils_1.shortenAddress)(recipientAddressOrName)
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
        providerOrSigner,
        account,
        chainId,
        recipient,
        recipientAddressOrName,
        swapCalls,
        addTransaction,
        provider,
    ]);
}
exports.useSwapCallback = useSwapCallback;
