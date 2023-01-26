import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useContractKit } from '@celo-tools/use-contractkit';
import { CheckCircle } from 'react-feather';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { useIsTokenActive, useIsUserAddedToken } from '../../hooks/Tokens';
import useTheme from '../../hooks/useTheme';
import { useCombinedInactiveList } from '../../state/lists/hooks';
import { TYPE } from '../../theme';
import { ButtonPrimary } from '../Button';
import { AutoColumn } from '../Column';
import CurrencyLogo from '../CurrencyLogo';
import ListLogo from '../ListLogo';
import { AutoRow, RowFixed } from '../Row';
const TokenSection = styled.div `
  padding: 4px 20px;
  height: 56px;
  display: grid;
  grid-template-columns: auto minmax(auto, 1fr) auto;
  grid-gap: 16px;
  align-items: center;

  opacity: ${({ dim }) => (dim ? '0.6' : '1')};
`;
const CheckIcon = styled(CheckCircle) `
  height: 16px;
  width: 16px;
  margin-right: 6px;
  stroke: ${({ theme }) => theme.green1};
`;
const NameOverflow = styled.div `
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 140px;
  font-size: 12px;
`;
export default function ImportRow({ token, style, dim, showImportView, setImportToken, }) {
    var _a, _b;
    // gloabls
    const { network } = useContractKit();
    const accountInfo = useSelector((state) => state.swap.accountInfo);
    const chainId = accountInfo ? accountInfo.chainId : network.chainId;
    const theme = useTheme();
    // check if token comes from list
    const inactiveTokenList = useCombinedInactiveList();
    const list = chainId && ((_b = (_a = inactiveTokenList === null || inactiveTokenList === void 0 ? void 0 : inactiveTokenList[chainId]) === null || _a === void 0 ? void 0 : _a[token.address]) === null || _b === void 0 ? void 0 : _b.list);
    // check if already active on list or local storage tokens
    const isAdded = useIsUserAddedToken(token);
    const isActive = useIsTokenActive(token);
    return (_jsxs(TokenSection, Object.assign({ style: style }, { children: [_jsx(CurrencyLogo, { currency: token, size: '24px', style: { opacity: dim ? '0.6' : '1' } }), _jsxs(AutoColumn, Object.assign({ gap: "4px", style: { opacity: dim ? '0.6' : '1' } }, { children: [_jsxs(AutoRow, { children: [_jsx(TYPE.body, Object.assign({ fontWeight: 500 }, { children: token.symbol })), _jsx(TYPE.darkGray, Object.assign({ ml: "8px", fontWeight: 300 }, { children: _jsx(NameOverflow, Object.assign({ title: token.name }, { children: token.name })) }))] }), list && list.logoURI && (_jsxs(RowFixed, { children: [_jsxs(TYPE.small, Object.assign({ mr: "4px", color: theme.text3 }, { children: ["via ", list.name] })), _jsx(ListLogo, { logoURI: list.logoURI, size: "12px" })] }))] })), !isActive && !isAdded ? (_jsx(ButtonPrimary, Object.assign({ width: "fit-content", padding: "6px 12px", fontWeight: 500, fontSize: "14px", onClick: () => {
                    setImportToken && setImportToken(token);
                    showImportView();
                } }, { children: "Import" }))) : (_jsxs(RowFixed, Object.assign({ style: { minWidth: 'fit-content' } }, { children: [_jsx(CheckIcon, {}), _jsx(TYPE.main, Object.assign({ color: theme.green1 }, { children: "Active" }))] })))] })));
}
