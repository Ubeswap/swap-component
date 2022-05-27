import React from 'react';
export declare function ConfirmationModalContent({ title, bottomContent, onDismiss, topContent, }: {
    title: string;
    onDismiss: () => void;
    topContent: () => React.ReactNode;
    bottomContent: () => React.ReactNode;
}): JSX.Element;
export declare function TransactionErrorContent({ message, onDismiss }: {
    message: string;
    onDismiss: () => void;
}): JSX.Element;
interface ConfirmationModalProps {
    isOpen: boolean;
    onDismiss: () => void;
    hash: string | undefined;
    content: () => React.ReactNode;
    attemptingTxn: boolean;
    pendingText: string;
}
export default function TransactionConfirmationModal({ isOpen, onDismiss, attemptingTxn, hash, pendingText, content, }: ConfirmationModalProps): JSX.Element | null;
export {};
