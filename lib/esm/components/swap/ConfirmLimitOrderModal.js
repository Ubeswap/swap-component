import { jsx as _jsx } from "react/jsx-runtime";
import { currencyEquals } from '@ubeswap/sdk';
import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import TransactionConfirmationModal, { ConfirmationModalContent, TransactionErrorContent, } from '../TransactionConfirmationModal';
import LimitOrderModalHeader from './LimitOrderModalHeader';
import SwapModalFooter from './SwapModalFooter';
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
export default function ConfirmLimitOrderModal({ trade, originalTrade, onAcceptChanges, allowedSlippage, onConfirm, onDismiss, recipient, swapErrorMessage, isOpen, attemptingTxn, txHash, }) {
    var _a, _b, _c, _d, _e, _f;
    const { t } = useTranslation();
    const showAcceptChanges = useMemo(() => Boolean(trade && originalTrade && tradeMeaningfullyDiffers(trade, originalTrade)), [originalTrade, trade]);
    const modalHeader = useCallback(() => {
        return trade ? (_jsx(LimitOrderModalHeader, { trade: trade, allowedSlippage: allowedSlippage, recipient: recipient, showAcceptChanges: showAcceptChanges, onAcceptChanges: onAcceptChanges }, void 0)) : null;
    }, [allowedSlippage, onAcceptChanges, recipient, showAcceptChanges, trade]);
    const modalBottom = useCallback(() => {
        return trade ? (_jsx(SwapModalFooter, { onConfirm: onConfirm, trade: trade, disabledConfirm: showAcceptChanges, swapErrorMessage: swapErrorMessage, allowedSlippage: allowedSlippage }, void 0)) : null;
    }, [allowedSlippage, onConfirm, showAcceptChanges, swapErrorMessage, trade]);
    // text to show while loading
    const pendingText = `Swapping ${(_a = trade === null || trade === void 0 ? void 0 : trade.inputAmount) === null || _a === void 0 ? void 0 : _a.toSignificant(6)} ${(_c = (_b = trade === null || trade === void 0 ? void 0 : trade.inputAmount) === null || _b === void 0 ? void 0 : _b.currency) === null || _c === void 0 ? void 0 : _c.symbol} for ${(_d = trade === null || trade === void 0 ? void 0 : trade.outputAmount) === null || _d === void 0 ? void 0 : _d.toSignificant(6)} ${(_f = (_e = trade === null || trade === void 0 ? void 0 : trade.outputAmount) === null || _e === void 0 ? void 0 : _e.currency) === null || _f === void 0 ? void 0 : _f.symbol}`;
    const confirmationContent = useCallback(() => swapErrorMessage ? (_jsx(TransactionErrorContent, { onDismiss: onDismiss, message: swapErrorMessage }, void 0)) : (_jsx(ConfirmationModalContent, { title: `Confirm ${t('limitOrder').toLowerCase()}`, onDismiss: onDismiss, topContent: modalHeader, bottomContent: modalBottom }, void 0)), [swapErrorMessage, onDismiss, t, modalHeader, modalBottom]);
    return (_jsx(TransactionConfirmationModal, { isOpen: isOpen, onDismiss: onDismiss, attemptingTxn: attemptingTxn, hash: txHash, content: confirmationContent, pendingText: pendingText }, void 0));
}
