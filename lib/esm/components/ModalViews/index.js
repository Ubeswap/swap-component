import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useContractKit } from '@celo-tools/use-contractkit';
import { useContext } from 'react';
import { ArrowUpCircle } from 'react-feather';
import { useTranslation } from 'react-i18next';
import styled, { ThemeContext } from 'styled-components';
import Circle from '../../assets/images/blue-loader.svg';
import { CloseIcon, CustomLightSpinner, TYPE } from '../../theme';
import { ExternalLink } from '../../theme/components';
import { AutoColumn, ColumnCenter } from '../Column';
import { RowBetween } from '../Row';
const ConfirmOrLoadingWrapper = styled.div `
  width: 100%;
  padding: 24px;
`;
const ConfirmedIcon = styled(ColumnCenter) `
  padding: 60px 0;
`;
export function LoadingView({ children, onDismiss }) {
    const { t } = useTranslation();
    return (_jsxs(ConfirmOrLoadingWrapper, { children: [_jsxs(RowBetween, { children: [_jsx("div", {}, void 0), _jsx(CloseIcon, { onClick: onDismiss }, void 0)] }, void 0), _jsx(ConfirmedIcon, { children: _jsx(CustomLightSpinner, { src: Circle, alt: "loader", size: '90px' }, void 0) }, void 0), _jsxs(AutoColumn, Object.assign({ gap: "100px", justify: 'center' }, { children: [children, _jsx(TYPE.subHeader, { children: t('ConfirmThisTransactionInYourWallet') }, void 0)] }), void 0)] }, void 0));
}
export function SubmittedView({ children, onDismiss, hash, }) {
    const theme = useContext(ThemeContext);
    const { network } = useContractKit();
    const chainId = network.chainId;
    const { t } = useTranslation();
    return (_jsxs(ConfirmOrLoadingWrapper, { children: [_jsxs(RowBetween, { children: [_jsx("div", {}, void 0), _jsx(CloseIcon, { onClick: onDismiss }, void 0)] }, void 0), _jsx(ConfirmedIcon, { children: _jsx(ArrowUpCircle, { strokeWidth: 0.5, size: 90, color: theme.primary1 }, void 0) }, void 0), _jsxs(AutoColumn, Object.assign({ gap: "100px", justify: 'center' }, { children: [children, chainId && hash && (_jsx(ExternalLink, Object.assign({ href: `${network.explorer}/tx/${hash}`, style: { marginLeft: '4px' } }, { children: _jsx(TYPE.subHeader, { children: t('ViewTransactionOnCeloExplorer') }, void 0) }), void 0))] }), void 0)] }, void 0));
}
