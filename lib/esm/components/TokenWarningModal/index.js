import { jsx as _jsx } from "react/jsx-runtime";
import { useCallback } from 'react';
import Modal from '../Modal';
import { ImportToken } from '../SearchModal/ImportToken';
export default function TokenWarningModal({ isOpen, tokens, onConfirm, }) {
    const handleDismiss = useCallback(() => null, []);
    return (_jsx(Modal, Object.assign({ isOpen: isOpen, onDismiss: handleDismiss, maxHeight: 90 }, { children: _jsx(ImportToken, { tokens: tokens, handleCurrencySelect: onConfirm }) })));
}
