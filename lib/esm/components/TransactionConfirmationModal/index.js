import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useContractKit } from '@celo-tools/use-contractkit';
import { useContext } from 'react';
import { AlertTriangle, ArrowUpCircle } from 'react-feather';
import { useTranslation } from 'react-i18next';
import { Text } from 'rebass';
import styled, { ThemeContext } from 'styled-components';
import Circle from '../../assets/images/blue-loader.svg';
import { ExternalLink } from '../../theme';
import { CloseIcon, CustomLightSpinner } from '../../theme/components';
import { ButtonPrimary } from '../Button';
import { AutoColumn, ColumnCenter } from '../Column';
import Modal from '../Modal';
import { RowBetween } from '../Row';
const Wrapper = styled.div `
  width: 100%;
`;
const Section = styled(AutoColumn) `
  padding: 24px;
`;
const BottomSection = styled(Section) `
  background-color: ${({ theme }) => theme.bg2};
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
`;
const ConfirmedIcon = styled(ColumnCenter) `
  padding: 60px 0;
`;
function ConfirmationPendingContent({ onDismiss, pendingText }) {
    const { t } = useTranslation();
    return (_jsx(Wrapper, { children: _jsxs(Section, { children: [_jsxs(RowBetween, { children: [_jsx("div", {}, void 0), _jsx(CloseIcon, { onClick: onDismiss }, void 0)] }, void 0), _jsx(ConfirmedIcon, { children: _jsx(CustomLightSpinner, { src: Circle, alt: "loader", size: '90px' }, void 0) }, void 0), _jsxs(AutoColumn, Object.assign({ gap: "12px", justify: 'center' }, { children: [_jsx(Text, Object.assign({ fontWeight: 500, fontSize: 20 }, { children: t('WaitingForConfirmation') }), void 0), _jsx(AutoColumn, Object.assign({ gap: "12px", justify: 'center' }, { children: _jsx(Text, Object.assign({ fontWeight: 600, fontSize: 14, color: "", textAlign: "center" }, { children: pendingText }), void 0) }), void 0), _jsx(Text, Object.assign({ fontSize: 12, color: "#565A69", textAlign: "center" }, { children: t('ConfirmThisTransactionInYourWallet') }), void 0)] }), void 0)] }, void 0) }, void 0));
}
function TransactionSubmittedContent({ onDismiss, chainId, hash, }) {
    const theme = useContext(ThemeContext);
    const { network } = useContractKit();
    const { t } = useTranslation();
    return (_jsx(Wrapper, { children: _jsxs(Section, { children: [_jsxs(RowBetween, { children: [_jsx("div", {}, void 0), _jsx(CloseIcon, { onClick: onDismiss }, void 0)] }, void 0), _jsx(ConfirmedIcon, { children: _jsx(ArrowUpCircle, { strokeWidth: 0.5, size: 90, color: theme.primary1 }, void 0) }, void 0), _jsxs(AutoColumn, Object.assign({ gap: "12px", justify: 'center' }, { children: [_jsx(Text, Object.assign({ fontWeight: 500, fontSize: 20 }, { children: t('TransactionSubmitted') }), void 0), chainId && hash && (_jsx(ExternalLink, Object.assign({ href: `${network.explorer}/tx/${hash}` }, { children: _jsx(Text, Object.assign({ fontWeight: 500, fontSize: 14, color: theme.primary1 }, { children: t('ViewOnCeloExplorer') }), void 0) }), void 0)), _jsx(ButtonPrimary, Object.assign({ onClick: onDismiss, style: { margin: '20px 0 0 0' } }, { children: _jsx(Text, Object.assign({ fontWeight: 500, fontSize: 20 }, { children: t('Close') }), void 0) }), void 0)] }), void 0)] }, void 0) }, void 0));
}
export function ConfirmationModalContent({ title, bottomContent, onDismiss, topContent, }) {
    return (_jsxs(Wrapper, { children: [_jsxs(Section, { children: [_jsxs(RowBetween, { children: [_jsx(Text, Object.assign({ fontWeight: 500, fontSize: 20 }, { children: title }), void 0), _jsx(CloseIcon, { onClick: onDismiss }, void 0)] }, void 0), topContent()] }, void 0), _jsx(BottomSection, Object.assign({ gap: "12px" }, { children: bottomContent() }), void 0)] }, void 0));
}
export function TransactionErrorContent({ message, onDismiss }) {
    const theme = useContext(ThemeContext);
    const { t } = useTranslation();
    return (_jsxs(Wrapper, { children: [_jsxs(Section, { children: [_jsxs(RowBetween, { children: [_jsx(Text, Object.assign({ fontWeight: 500, fontSize: 20 }, { children: t('Error') }), void 0), _jsx(CloseIcon, { onClick: onDismiss }, void 0)] }, void 0), _jsxs(AutoColumn, Object.assign({ style: { marginTop: 20, padding: '2rem 0' }, gap: "24px", justify: "center" }, { children: [_jsx(AlertTriangle, { color: theme.red1, style: { strokeWidth: 1.5 }, size: 64 }, void 0), _jsx(Text, Object.assign({ fontWeight: 500, fontSize: 16, color: theme.red1, style: { textAlign: 'center', width: '85%' } }, { children: message }), void 0)] }), void 0)] }, void 0), _jsx(BottomSection, Object.assign({ gap: "12px" }, { children: _jsx(ButtonPrimary, Object.assign({ onClick: onDismiss }, { children: "Dismiss" }), void 0) }), void 0)] }, void 0));
}
export default function TransactionConfirmationModal({ isOpen, onDismiss, attemptingTxn, hash, pendingText, content, }) {
    const { network } = useContractKit();
    const chainId = network.chainId;
    if (!chainId)
        return null;
    // confirmation screen
    return (_jsx(Modal, Object.assign({ isOpen: isOpen, onDismiss: onDismiss, maxHeight: 90 }, { children: attemptingTxn ? (_jsx(ConfirmationPendingContent, { onDismiss: onDismiss, pendingText: pendingText }, void 0)) : hash ? (_jsx(TransactionSubmittedContent, { chainId: chainId, hash: hash, onDismiss: onDismiss }, void 0)) : (content()) }), void 0));
}
