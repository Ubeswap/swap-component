"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const sdk_1 = require("@ubeswap/sdk");
const react_1 = require("react");
const TransactionConfirmationModal_1 = __importStar(require("../TransactionConfirmationModal"));
const describeTrade_1 = require("./routing/describeTrade");
const SwapModalFooter_1 = __importDefault(require("./SwapModalFooter"));
const SwapModalHeader_1 = __importDefault(require("./SwapModalHeader"));
/**
 * Returns true if the trade requires a confirmation of details before we can submit it
 * @param tradeA trade A
 * @param tradeB trade B
 */
function tradeMeaningfullyDiffers(tradeA, tradeB) {
    return (tradeA.tradeType !== tradeB.tradeType ||
        !(0, sdk_1.currencyEquals)(tradeA.inputAmount.currency, tradeB.inputAmount.currency) ||
        !tradeA.inputAmount.equalTo(tradeB.inputAmount) ||
        !(0, sdk_1.currencyEquals)(tradeA.outputAmount.currency, tradeB.outputAmount.currency) ||
        !tradeA.outputAmount.equalTo(tradeB.outputAmount));
}
function ConfirmSwapModal({ trade, originalTrade, onAcceptChanges, allowedSlippage, onConfirm, onDismiss, recipient, swapErrorMessage, isOpen, attemptingTxn, txHash, }) {
    var _a, _b, _c, _d, _e, _f;
    const showAcceptChanges = (0, react_1.useMemo)(() => Boolean(trade && originalTrade && tradeMeaningfullyDiffers(trade, originalTrade)), [originalTrade, trade]);
    const { label } = (0, describeTrade_1.describeTrade)(trade);
    const modalHeader = (0, react_1.useCallback)(() => {
        return trade ? ((0, jsx_runtime_1.jsx)(SwapModalHeader_1.default, { trade: trade, allowedSlippage: allowedSlippage, recipient: recipient, showAcceptChanges: showAcceptChanges, onAcceptChanges: onAcceptChanges }, void 0)) : null;
    }, [allowedSlippage, onAcceptChanges, recipient, showAcceptChanges, trade]);
    const modalBottom = (0, react_1.useCallback)(() => {
        return trade ? ((0, jsx_runtime_1.jsx)(SwapModalFooter_1.default, { onConfirm: onConfirm, trade: trade, disabledConfirm: showAcceptChanges, swapErrorMessage: swapErrorMessage, allowedSlippage: allowedSlippage }, void 0)) : null;
    }, [allowedSlippage, onConfirm, showAcceptChanges, swapErrorMessage, trade]);
    // text to show while loading
    const pendingText = `Swapping ${(_a = trade === null || trade === void 0 ? void 0 : trade.inputAmount) === null || _a === void 0 ? void 0 : _a.toSignificant(6)} ${(_c = (_b = trade === null || trade === void 0 ? void 0 : trade.inputAmount) === null || _b === void 0 ? void 0 : _b.currency) === null || _c === void 0 ? void 0 : _c.symbol} for ${(_d = trade === null || trade === void 0 ? void 0 : trade.outputAmount) === null || _d === void 0 ? void 0 : _d.toSignificant(6)} ${(_f = (_e = trade === null || trade === void 0 ? void 0 : trade.outputAmount) === null || _e === void 0 ? void 0 : _e.currency) === null || _f === void 0 ? void 0 : _f.symbol}`;
    const confirmationContent = (0, react_1.useCallback)(() => swapErrorMessage ? ((0, jsx_runtime_1.jsx)(TransactionConfirmationModal_1.TransactionErrorContent, { onDismiss: onDismiss, message: swapErrorMessage }, void 0)) : ((0, jsx_runtime_1.jsx)(TransactionConfirmationModal_1.ConfirmationModalContent, { title: `Confirm ${label}`, onDismiss: onDismiss, topContent: modalHeader, bottomContent: modalBottom }, void 0)), [onDismiss, modalBottom, modalHeader, swapErrorMessage, label]);
    return ((0, jsx_runtime_1.jsx)(TransactionConfirmationModal_1.default, { isOpen: isOpen, onDismiss: onDismiss, attemptingTxn: attemptingTxn, hash: txHash, content: confirmationContent, pendingText: pendingText }, void 0));
}
exports.default = ConfirmSwapModal;
