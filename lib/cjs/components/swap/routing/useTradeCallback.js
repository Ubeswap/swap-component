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
exports.useTradeCallback = void 0;
const use_contractkit_1 = require("@celo-tools/use-contractkit");
const sdk_1 = require("@ubeswap/sdk");
const useSwapCallback_1 = require("hooks/useSwapCallback");
const react_1 = require("react");
const constants_1 = require("../../../constants");
const _1 = require(".");
const executeMoolaDirectTrade_1 = require("./moola/executeMoolaDirectTrade");
const MoolaDirectTrade_1 = require("./moola/MoolaDirectTrade");
/**
 * Use callback to allow trading
 * @param trade
 * @param allowedSlippage
 * @param recipientAddressOrName
 * @returns
 */
const useTradeCallback = (trade, // trade to execute, required
allowedSlippage = constants_1.INITIAL_ALLOWED_SLIPPAGE, // in bips
recipientAddressOrName // the ENS name or address of the recipient of the trade, or null if swap should be returned to sender
) => {
    const { address: account, network } = (0, use_contractkit_1.useContractKit)();
    const library = (0, use_contractkit_1.useProvider)();
    const chainId = network.chainId;
    const doTransaction = (0, _1.useDoTransaction)();
    const { state: swapState, callback: swapCallback, error, } = (0, useSwapCallback_1.useSwapCallback)(trade, allowedSlippage, recipientAddressOrName);
    return (0, react_1.useMemo)(() => {
        if (error) {
            return { state: swapState, callback: null, error };
        }
        if (!library || !trade || !account) {
            return { state: useSwapCallback_1.SwapCallbackState.INVALID, callback: null, error: 'Missing dependencies' };
        }
        if (chainId === sdk_1.ChainId.BAKLAVA) {
            return { state: useSwapCallback_1.SwapCallbackState.INVALID, callback: null, error: 'Baklava is not supported' };
        }
        const signer = library.getSigner(account);
        const env = { signer, chainId, doTransaction };
        if (trade instanceof MoolaDirectTrade_1.MoolaDirectTrade) {
            return {
                state: useSwapCallback_1.SwapCallbackState.VALID,
                callback: () => __awaiter(void 0, void 0, void 0, function* () { return (yield (0, executeMoolaDirectTrade_1.executeMoolaDirectTrade)(Object.assign(Object.assign({}, env), { trade }))).hash; }),
                error: null,
            };
        }
        else if (swapCallback) {
            return { state: useSwapCallback_1.SwapCallbackState.VALID, callback: swapCallback, error: null };
        }
        else {
            return { state: useSwapCallback_1.SwapCallbackState.INVALID, callback: null, error: 'Unknown trade type' };
        }
    }, [swapCallback, library, chainId, doTransaction, trade, account, error, swapState]);
};
exports.useTradeCallback = useTradeCallback;
