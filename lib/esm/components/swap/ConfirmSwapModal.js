import { jsx as _jsx } from "react/jsx-runtime";
import { currencyEquals } from '@ubeswap/sdk';
import { useCallback, useMemo } from 'react';
import TransactionConfirmationModal, { ConfirmationModalContent, TransactionErrorContent, } from '../TransactionConfirmationModal';
import { describeTrade } from './routing/describeTrade';
import SwapModalFooter from './SwapModalFooter';
import SwapModalHeader from './SwapModalHeader';
/**
 * Returns true if the trade requires a confirmation of details before we can submit it
 * @param tradeA trade A
 * @param tradeB trade B
 */
function tradeMeaningfullyDiffers(tradeA, tradeB) {
    return (tradeA.tradeType !== tradeB.tradeType ||
        !currencyEquals(tradeA.inputAmount.currency, tradeB.inputAmount.currency) ||
        !tradeA.inputAmount.equalTo(tradeB.inputAmount) ||
        !currencyEquals(tradeA.outputAmount.currency, tradeB.outputAmount.currency) ||
        !tradeA.outputAmount.equalTo(tradeB.outputAmount));
}
export default function ConfirmSwapModal({ trade, originalTrade, onAcceptChanges, allowedSlippage, onConfirm, onDismiss, recipient, swapErrorMessage, isOpen, attemptingTxn, txHash, }) {
    var _a, _b, _c, _d, _e, _f;
    const showAcceptChanges = useMemo(() => Boolean(trade && originalTrade && tradeMeaningfullyDiffers(trade, originalTrade)), [originalTrade, trade]);
    const { label } = describeTrade(trade);
    const modalHeader = useCallback(() => {
        return trade ? (_jsx(SwapModalHeader, { trade: trade, allowedSlippage: allowedSlippage, recipient: recipient, showAcceptChanges: showAcceptChanges, onAcceptChanges: onAcceptChanges })) : null;
    }, [allowedSlippage, onAcceptChanges, recipient, showAcceptChanges, trade]);
    const modalBottom = useCallback(() => {
        return trade ? (_jsx(SwapModalFooter, { onConfirm: onConfirm, trade: trade, disabledConfirm: showAcceptChanges, swapErrorMessage: swapErrorMessage, allowedSlippage: allowedSlippage })) : null;
    }, [allowedSlippage, onConfirm, showAcceptChanges, swapErrorMessage, trade]);
    // text to show while loading
    const pendingText = `Swapping ${(_a = trade === null || trade === void 0 ? void 0 : trade.inputAmount) === null || _a === void 0 ? void 0 : _a.toSignificant(6)} ${(_c = (_b = trade === null || trade === void 0 ? void 0 : trade.inputAmount) === null || _b === void 0 ? void 0 : _b.currency) === null || _c === void 0 ? void 0 : _c.symbol} for ${(_d = trade === null || trade === void 0 ? void 0 : trade.outputAmount) === null || _d === void 0 ? void 0 : _d.toSignificant(6)} ${(_f = (_e = trade === null || trade === void 0 ? void 0 : trade.outputAmount) === null || _e === void 0 ? void 0 : _e.currency) === null || _f === void 0 ? void 0 : _f.symbol}`;
    const confirmationContent = useCallback(() => swapErrorMessage ? (_jsx(TransactionErrorContent, { onDismiss: onDismiss, message: swapErrorMessage })) : (_jsx(ConfirmationModalContent, { title: `Confirm ${label}`, onDismiss: onDismiss, topContent: modalHeader, bottomContent: modalBottom })), [onDismiss, modalBottom, modalHeader, swapErrorMessage, label]);
    return (_jsx(TransactionConfirmationModal, { isOpen: isOpen, onDismiss: onDismiss, attemptingTxn: attemptingTxn, hash: txHash, content: confirmationContent, pendingText: pendingText }));
}
