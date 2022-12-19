import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useContractKit } from '@celo-tools/use-contractkit';
import { useContext } from 'react';
import { AlertCircle, CheckCircle } from 'react-feather';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import styled, { ThemeContext } from 'styled-components';
import { TYPE } from '../../theme';
import { ExternalLink } from '../../theme/components';
import { AutoColumn } from '../Column';
import { AutoRow } from '../Row';
const RowNoFlex = styled(AutoRow) `
  flex-wrap: nowrap;
`;
export default function TransactionPopup({ hash, success, summary, }) {
    const { network } = useContractKit();
    const accountInfo = useSelector((state) => state.swap.accountInfo);
    const chainId = (accountInfo ? accountInfo.chainId : network.chainId);
    const explorerUrl = accountInfo ? accountInfo.explorerUrl : network.explorer;
    const theme = useContext(ThemeContext);
    const { t } = useTranslation();
    return (_jsxs(RowNoFlex, { children: [_jsx("div", Object.assign({ style: { paddingRight: 16 } }, { children: success ? _jsx(CheckCircle, { color: theme.green1, size: 24 }) : _jsx(AlertCircle, { color: theme.red1, size: 24 }) })), _jsxs(AutoColumn, Object.assign({ gap: "8px" }, { children: [_jsx(TYPE.body, Object.assign({ fontWeight: 500 }, { children: summary !== null && summary !== void 0 ? summary : `${t('Hash')}: ` + hash.slice(0, 8) + '...' + hash.slice(58, 65) })), chainId && _jsx(ExternalLink, Object.assign({ href: `${explorerUrl}/tx/${hash}` }, { children: t('ViewOnCeloExplorer') }))] }))] }));
}
