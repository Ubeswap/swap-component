import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useContractKit } from '@celo-tools/use-contractkit';
import { transparentize } from 'polished';
import { useState } from 'react';
import { AlertTriangle, ArrowLeft } from 'react-feather';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import useTheme from '../../hooks/useTheme';
import { useCombinedInactiveList } from '../../state/lists/hooks';
import { useAddUserToken } from '../../state/user/hooks';
import { CloseIcon, TYPE } from '../../theme';
import { ExternalLink } from '../../theme/components';
import { ButtonPrimary } from '../Button';
import Card from '../Card';
import { AutoColumn } from '../Column';
import CurrencyLogo from '../CurrencyLogo';
import ListLogo from '../ListLogo';
import { AutoRow, RowBetween, RowFixed } from '../Row';
import { SectionBreak } from '../swap/styleds';
import { Checkbox, PaddedColumn } from './styleds';
const Wrapper = styled.div `
  position: relative;
  width: 100%;
  overflow: auto;
`;
const WarningWrapper = styled(Card) `
  background-color: ${({ theme, highWarning }) => highWarning ? transparentize(0.8, theme.red1) : transparentize(0.8, theme.yellow2)};
  width: fit-content;
`;
const AddressText = styled(TYPE.blue) `
  font-size: 12px;

  ${({ theme }) => theme.mediaWidth.upToSmall `
    font-size: 10px;
`}
`;
export function ImportToken({ tokens, onBack, onDismiss, handleCurrencySelect }) {
    var _a, _b, _c, _d, _e, _f;
    const theme = useTheme();
    const { network } = useContractKit();
    const chainId = network.chainId;
    const [confirmed, setConfirmed] = useState(false);
    const addToken = useAddUserToken();
    const { t } = useTranslation();
    // use for showing import source on inactive tokens
    const inactiveTokenList = useCombinedInactiveList();
    // higher warning severity if either is not on a list
    const fromLists = (chainId && ((_c = (_a = inactiveTokenList === null || inactiveTokenList === void 0 ? void 0 : inactiveTokenList[chainId]) === null || _a === void 0 ? void 0 : _a[(_b = tokens[0]) === null || _b === void 0 ? void 0 : _b.address]) === null || _c === void 0 ? void 0 : _c.list)) ||
        (chainId && ((_f = (_d = inactiveTokenList === null || inactiveTokenList === void 0 ? void 0 : inactiveTokenList[chainId]) === null || _d === void 0 ? void 0 : _d[(_e = tokens[1]) === null || _e === void 0 ? void 0 : _e.address]) === null || _f === void 0 ? void 0 : _f.list));
    return (_jsxs(Wrapper, { children: [_jsx(PaddedColumn, Object.assign({ gap: "14px", style: { width: '100%', flex: '1 1' } }, { children: _jsxs(RowBetween, { children: [onBack ? _jsx(ArrowLeft, { style: { cursor: 'pointer' }, onClick: onBack }) : _jsx("div", {}), _jsxs(TYPE.mediumHeader, { children: [t('Import'), " ", tokens.length > 1 ? `${t('Tokens')}` : `${t('Token')}`] }), onDismiss ? _jsx(CloseIcon, { onClick: onDismiss }) : _jsx("div", {})] }) })), _jsx(SectionBreak, {}), _jsxs(PaddedColumn, Object.assign({ gap: "md" }, { children: [tokens.map((token) => {
                        var _a, _b;
                        const list = chainId ? (_b = (_a = inactiveTokenList === null || inactiveTokenList === void 0 ? void 0 : inactiveTokenList[chainId]) === null || _a === void 0 ? void 0 : _a[token.address]) === null || _b === void 0 ? void 0 : _b.list : undefined;
                        return (_jsx(Card, Object.assign({ backgroundColor: theme.bg2, className: ".token-warning-container" }, { children: _jsxs(AutoColumn, Object.assign({ gap: "10px" }, { children: [_jsxs(AutoRow, Object.assign({ align: "center" }, { children: [_jsx(CurrencyLogo, { currency: token, size: '24px' }), _jsx(TYPE.body, Object.assign({ ml: "8px", mr: "8px", fontWeight: 500 }, { children: token.symbol })), _jsx(TYPE.darkGray, Object.assign({ fontWeight: 300 }, { children: token.name }))] })), chainId && (_jsx(ExternalLink, Object.assign({ href: `${network.explorer}/address/${token.address}` }, { children: _jsx(AddressText, { children: token.address }) }))), list !== undefined ? (_jsxs(RowFixed, { children: [list.logoURI && _jsx(ListLogo, { logoURI: list.logoURI, size: "12px" }), _jsxs(TYPE.small, Object.assign({ ml: "6px", color: theme.text3 }, { children: ["via ", list.name] }))] })) : (_jsx(WarningWrapper, Object.assign({ borderRadius: "4px", padding: "4px", highWarning: true }, { children: _jsxs(RowFixed, { children: [_jsx(AlertTriangle, { stroke: theme.red1, size: "10px" }), _jsx(TYPE.body, Object.assign({ color: theme.red1, ml: "4px", fontSize: "10px", fontWeight: 500 }, { children: t('UnknownSource') }))] }) })))] })) }), 'import' + token.address));
                    }), _jsxs(Card, Object.assign({ style: { backgroundColor: fromLists ? transparentize(0.8, theme.yellow2) : transparentize(0.8, theme.red1) } }, { children: [_jsxs(AutoColumn, Object.assign({ justify: "center", style: { textAlign: 'center', gap: '16px', marginBottom: '12px' } }, { children: [_jsx(AlertTriangle, { stroke: fromLists ? theme.yellow2 : theme.red1, size: 32 }), _jsx(TYPE.body, Object.assign({ fontWeight: 600, fontSize: 20, color: fromLists ? theme.yellow2 : theme.red1 }, { children: t('TradeAtYourOwnRisk') }))] })), _jsxs(AutoColumn, Object.assign({ style: { textAlign: 'center', gap: '16px', marginBottom: '12px' } }, { children: [_jsx(TYPE.body, Object.assign({ fontWeight: 400, color: fromLists ? theme.yellow2 : theme.red1 }, { children: t('tokenExp') })), _jsx(TYPE.body, Object.assign({ fontWeight: 600, color: fromLists ? theme.yellow2 : theme.red1 }, { children: t('tokenImportRisk') }))] })), _jsxs(AutoRow, Object.assign({ justify: "center", style: { cursor: 'pointer' }, onClick: () => setConfirmed(!confirmed) }, { children: [_jsx(Checkbox, { className: ".understand-checkbox", name: "confirmed", type: "checkbox", checked: confirmed, onChange: () => setConfirmed(!confirmed) }), _jsx(TYPE.body, Object.assign({ ml: "10px", fontSize: "16px", color: fromLists ? theme.yellow2 : theme.red1, fontWeight: 500 }, { children: t('IUnderstand') }))] }))] })), _jsx(ButtonPrimary, Object.assign({ disabled: !confirmed, altDisabledStyle: true, borderRadius: "20px", padding: "10px 1rem", onClick: () => {
                            tokens.map((token) => addToken(token));
                            handleCurrencySelect && handleCurrencySelect(tokens[0]);
                        }, className: ".token-dismiss-button" }, { children: t('Import') }))] }))] }));
}
