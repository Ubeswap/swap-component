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
exports.useTradeCallback = void 0;
const use_contractkit_1 = require("@celo-tools/use-contractkit");
const sdk_1 = require("@ubeswap/sdk");
const react_1 = require("react");
const react_redux_1 = require("react-redux");
const constants_1 = require("../../../constants");
const useENS_1 = __importDefault(require("../../../hooks/useENS"));
const useSwapCallback_1 = require("../../../hooks/useSwapCallback");
const utils_1 = require("../../../utils");
const _1 = require(".");
const executeMinimaTrade_1 = require("./minima/executeMinimaTrade");
const executeMoolaDirectTrade_1 = require("./moola/executeMoolaDirectTrade");
const MoolaDirectTrade_1 = require("./moola/MoolaDirectTrade");
const trade_1 = require("./trade");
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
    const { network, address } = (0, use_contractkit_1.useContractKit)();
    const accountInfo = (0, react_redux_1.useSelector)((state) => state.swap.accountInfo);
    const account = accountInfo ? accountInfo.account : address;
    const chainId = (accountInfo ? accountInfo.chainId : network.chainId);
    const library = (0, use_contractkit_1.useProvider)();
    const provider = accountInfo ? accountInfo.provider : library;
    const doTransaction = (0, _1.useDoTransaction)();
    const { address: recipientAddress } = (0, useENS_1.default)(recipientAddressOrName);
    const recipient = recipientAddressOrName === null ? account : recipientAddress;
    const withRecipient = recipient === account
        ? ''
        : ` to ${recipientAddressOrName && (0, utils_1.isAddress)(recipientAddressOrName)
            ? (0, utils_1.shortenAddress)(recipientAddressOrName)
            : recipientAddressOrName}`;
    const { state: swapState, callback: swapCallback, error, } = (0, useSwapCallback_1.useSwapCallback)(trade, allowedSlippage, recipientAddressOrName);
    return (0, react_1.useMemo)(() => {
        if (error) {
            return { state: swapState, callback: null, error };
        }
        if (!provider || !trade || !account) {
            return { state: useSwapCallback_1.SwapCallbackState.INVALID, callback: null, error: 'Missing dependencies' };
        }
        if (chainId === sdk_1.ChainId.BAKLAVA) {
            return { state: useSwapCallback_1.SwapCallbackState.INVALID, callback: null, error: 'Baklava is not supported' };
        }
        const signer = provider.getSigner(account);
        const env = { signer, chainId, doTransaction };
        if (trade instanceof trade_1.MinimaRouterTrade) {
            return {
                state: useSwapCallback_1.SwapCallbackState.VALID,
                callback: () => __awaiter(void 0, void 0, void 0, function* () { return (yield (0, executeMinimaTrade_1.executeMinimaTrade)(Object.assign(Object.assign({}, env), { trade, recipient, withRecipient }))).hash; }),
                error: null,
            };
        }
        else if (trade instanceof MoolaDirectTrade_1.MoolaDirectTrade) {
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
    }, [error, provider, trade, account, chainId, doTransaction, swapCallback, swapState, recipient, withRecipient]);
};
exports.useTradeCallback = useTradeCallback;
