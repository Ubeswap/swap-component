/// <reference types="react" />
import { Trade } from '@ubeswap/sdk';
export default function ConfirmSwapModal({ trade, originalTrade, onAcceptChanges, allowedSlippage, onConfirm, onDismiss, recipient, swapErrorMessage, isOpen, attemptingTxn, txHash, }: {
    isOpen: boolean;
    trade: Trade | undefined;
    originalTrade: Trade | undefined;
    attemptingTxn: boolean;
    txHash: string | undefined;
    recipient: string | null;
    allowedSlippage: number;
    onAcceptChanges: () => void;
    onConfirm: () => void;
    swapErrorMessage: string | undefined;
    onDismiss: () => void;
}): JSX.Element;
