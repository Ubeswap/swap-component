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
Object.defineProperty(exports, "__esModule", { value: true });
exports.useDoTransaction = void 0;
const use_contractkit_1 = require("@celo-tools/use-contractkit");
const sdk_1 = require("@ubeswap/sdk");
const react_1 = require("react");
const hooks_1 = require("../../../state/transactions/hooks");
const utils_1 = require("../../../utils");
const estimateGas = (call) => __awaiter(void 0, void 0, void 0, function* () {
    const { contract, methodName, args, value } = call;
    const fullArgs = value ? [...args, { value }] : args;
    try {
        return yield contract.estimateGas[methodName](...fullArgs);
    }
    catch (gasError) {
        console.debug('Gas estimate failed, trying eth_call to extract error', call);
        try {
            const result = yield contract.callStatic[methodName](...fullArgs);
            console.debug('Unexpected successful call after failed estimate gas', call, gasError, result);
            throw new Error('Unexpected issue with estimating the gas. Please try again.');
        }
        catch (callError) {
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
            throw new Error(errorMessage);
        }
    }
});
/**
 * Allows performing transactions.
 * @returns
 */
const useDoTransaction = () => {
    const addTransaction = (0, hooks_1.useTransactionAdder)();
    const { network } = (0, use_contractkit_1.useContractKit)();
    const getConnectedSigner = (0, use_contractkit_1.useGetConnectedSigner)();
    const chainId = network.chainId;
    return (0, react_1.useCallback)((contractDisconnected, methodName, args) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        if (chainId === sdk_1.ChainId.BAKLAVA) {
            throw new Error('baklava not supported');
        }
        const contract = contractDisconnected.connect(yield getConnectedSigner());
        const call = { contract, methodName, args: args.args, value: (_a = args.overrides) === null || _a === void 0 ? void 0 : _a.value };
        const gasEstimate = yield estimateGas(call);
        try {
            const response = yield contract[methodName](...args.args, Object.assign({ gasLimit: (0, utils_1.calculateGasMargin)(gasEstimate) }, args.overrides));
            addTransaction(response, {
                summary: args.summary,
                approval: args.approval,
                claim: args.claim,
            });
            return response;
        }
        catch (error) {
            // if the user rejected the tx, pass this along
            if ((error === null || error === void 0 ? void 0 : error.code) === 4001 || (error === null || error === void 0 ? void 0 : error.code) === 'ACTION_REJECTED') {
                throw new Error('Transaction rejected.');
            }
            else {
                // otherwise, the error was unexpected and we need to convey that
                console.error(`Transaction failed`, error, methodName, args, call.value);
                throw new Error(`Transaction failed: ${error.message}`);
            }
        }
    }), [addTransaction, chainId, getConnectedSigner]);
};
exports.useDoTransaction = useDoTransaction;
