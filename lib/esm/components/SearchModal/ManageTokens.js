import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useContractKit } from '@celo-tools/use-contractkit';
import { useCallback, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { useToken } from '../../hooks/Tokens';
import useTheme from '../../hooks/useTheme';
import { useRemoveUserAddedToken, useUserAddedTokens } from '../../state/user/hooks';
import { ButtonText, ExternalLink, ExternalLinkIcon, TrashIcon, TYPE } from '../../theme';
import { isAddress } from '../../utils';
import Card from '../Card';
import Column from '../Column';
import CurrencyLogo from '../CurrencyLogo';
import Row, { RowBetween, RowFixed } from '../Row';
import { CurrencyModalView } from './CurrencySearchModal';
import ImportRow from './ImportRow';
import { PaddedColumn, SearchInput, Separator } from './styleds';
const Wrapper = styled.div `
  width: 100%;
  height: calc(100% - 60px);
  position: relative;
  padding-bottom: 60px;
`;
const Footer = styled.div `
  position: absolute;
  bottom: 0;
  width: 100%;
  border-radius: 20px;
  border-top-right-radius: 0;
  border-top-left-radius: 0;
  border-top: 1px solid ${({ theme }) => theme.bg3};
  padding: 20px;
  text-align: center;
`;
export default function ManageTokens({ setModalView, setImportToken, }) {
    const { network } = useContractKit();
    const accountInfo = useSelector((state) => state.swap.accountInfo);
    const chainId = (accountInfo ? accountInfo.chainId : network.chainId);
    const explorerUrl = accountInfo ? accountInfo.explorerUrl : network.explorer;
    const [searchQuery, setSearchQuery] = useState('');
    const theme = useTheme();
    const { t } = useTranslation();
    // manage focus on modal show
    const inputRef = useRef();
    const handleInput = useCallback((event) => {
        const input = event.target.value;
        const checksummedInput = isAddress(input);
        setSearchQuery(checksummedInput || input);
    }, []);
    // if they input an address, use it
    const isAddressSearch = isAddress(searchQuery);
    const searchToken = useToken(searchQuery);
    // all tokens for local lisr
    const userAddedTokens = useUserAddedTokens();
    const removeToken = useRemoveUserAddedToken();
    const handleRemoveAll = useCallback(() => {
        if (chainId && userAddedTokens) {
            userAddedTokens.map((token) => {
                return removeToken(chainId, token.address);
            });
        }
    }, [removeToken, userAddedTokens, chainId]);
    const tokenList = useMemo(() => {
        return (chainId &&
            userAddedTokens.map((token) => (_jsxs(RowBetween, Object.assign({ width: "100%" }, { children: [_jsxs(RowFixed, { children: [_jsx(CurrencyLogo, { currency: token, size: '20px' }), _jsx(ExternalLink, Object.assign({ href: `${explorerUrl}/address/${token.address}` }, { children: _jsx(TYPE.main, Object.assign({ ml: '10px', fontWeight: 600 }, { children: token.symbol })) }))] }), _jsxs(RowFixed, { children: [_jsx(TrashIcon, { onClick: () => removeToken(chainId, token.address) }), _jsx(ExternalLinkIcon, { href: `${explorerUrl}/address/${token.address}` })] })] }), token.address))));
    }, [userAddedTokens, removeToken, network, chainId]);
    return (_jsxs(Wrapper, { children: [_jsxs(Column, Object.assign({ style: { width: '100%', flex: '1 1' } }, { children: [_jsxs(PaddedColumn, Object.assign({ gap: "14px" }, { children: [_jsx(Row, { children: _jsx(SearchInput, { type: "text", id: "token-search-input", placeholder: '0x0000', value: searchQuery, autoComplete: "off", ref: inputRef, onChange: handleInput }) }), searchQuery !== '' && !isAddressSearch && (_jsx(TYPE.error, Object.assign({ error: true }, { children: t('EnterValidTokenAddress') }))), searchToken && (_jsx(Card, Object.assign({ backgroundColor: theme.bg2, padding: "10px 0" }, { children: _jsx(ImportRow, { token: searchToken, showImportView: () => setModalView(CurrencyModalView.importToken), setImportToken: setImportToken, style: { height: 'fit-content' } }) })))] })), _jsx(Separator, {}), _jsxs(PaddedColumn, Object.assign({ gap: "lg" }, { children: [_jsxs(RowBetween, { children: [_jsxs(TYPE.main, Object.assign({ fontWeight: 600 }, { children: [userAddedTokens === null || userAddedTokens === void 0 ? void 0 : userAddedTokens.length, " ", t('Custom'), " ", userAddedTokens.length === 1 ? 'Token' : 'Tokens'] })), userAddedTokens.length > 0 && (_jsx(ButtonText, Object.assign({ onClick: handleRemoveAll }, { children: _jsx(TYPE.blue, { children: t('ClearAll') }) })))] }), tokenList] }))] })), _jsx(Footer, { children: _jsx(TYPE.darkGray, { children: t('TipCustomTokensAreStoredLocallyInYourBrowser') }) })] }));
}
