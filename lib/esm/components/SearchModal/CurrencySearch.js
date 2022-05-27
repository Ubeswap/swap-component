import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ChainId } from '@celo-tools/use-contractkit';
import { cUSD } from '@ubeswap/sdk';
import { ButtonLight } from 'components/Button';
import { useOnClickOutside } from 'hooks/useOnClickOutside';
import useTheme from 'hooks/useTheme';
import useToggle from 'hooks/useToggle';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Edit } from 'react-feather';
import ReactGA from 'react-ga';
import { useTranslation } from 'react-i18next';
import AutoSizer from 'react-virtualized-auto-sizer';
import { Text } from 'rebass';
import styled from 'styled-components';
import { useAllTokens, useFoundOnInactiveList, useIsUserAddedToken, useToken } from '../../hooks/Tokens';
import { ButtonText, CloseIcon, IconWrapper, TYPE } from '../../theme';
import { isAddress } from '../../utils';
import Column from '../Column';
import Row, { RowBetween, RowFixed } from '../Row';
import CommonBases from './CommonBases';
import CurrencyList from './CurrencyList';
import { filterTokens } from './filtering';
import ImportRow from './ImportRow';
import { useTokenComparator } from './sorting';
import { PaddedColumn, SearchInput, Separator } from './styleds';
const ContentWrapper = styled(Column) `
  width: 100%;
  flex: 1 1;
  position: relative;
`;
const Footer = styled.div `
  width: 100%;
  border-radius: 20px;
  padding: 20px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  background-color: ${({ theme }) => theme.bg1};
  border-top: 1px solid ${({ theme }) => theme.bg2};
`;
export function CurrencySearch({ selectedCurrency, onCurrencySelect, otherSelectedCurrency, showCommonBases, onDismiss, isOpen, showManageView, showImportView, setImportToken, chainId = ChainId.CeloMainnet, }) {
    const { t } = useTranslation();
    const theme = useTheme();
    // refs for fixed size lists
    const fixedList = useRef();
    const [searchQuery, setSearchQuery] = useState('');
    const [invertSearchOrder] = useState(false);
    const allTokens = useAllTokens(chainId);
    // const inactiveTokens: Token[] | undefined = useFoundOnInactiveList(searchQuery)
    // if they input an address, use it
    const isAddressSearch = isAddress(searchQuery);
    const searchToken = useToken(searchQuery);
    const searchTokenIsAdded = useIsUserAddedToken(searchToken);
    useEffect(() => {
        if (isAddressSearch) {
            ReactGA.event({
                category: `${t('CurrencySelect')}`,
                action: `${t('SearchByAddress')}`,
                label: isAddressSearch,
            });
        }
    }, [t, isAddressSearch]);
    const showETH = useMemo(() => {
        const s = searchQuery.toLowerCase().trim();
        return s === '' || s === 'e' || s === 'et' || s === 'eth';
    }, [searchQuery]);
    const tokenComparator = useTokenComparator(invertSearchOrder);
    const filteredTokens = useMemo(() => {
        return filterTokens(Object.values(allTokens), searchQuery);
    }, [allTokens, searchQuery]);
    const filteredSortedTokens = useMemo(() => {
        const sorted = filteredTokens.sort(tokenComparator);
        const symbolMatch = searchQuery
            .toLowerCase()
            .split(/\s+/)
            .filter((s) => s.length > 0);
        if (symbolMatch.length > 1) {
            return sorted;
        }
        return [
            // sort any exact symbol matches first
            ...sorted.filter((token) => { var _a; return ((_a = token.symbol) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === symbolMatch[0]; }),
            // sort by tokens whos symbols start with search substrng
            ...sorted.filter((token) => {
                var _a, _b;
                return ((_a = token.symbol) === null || _a === void 0 ? void 0 : _a.toLowerCase().startsWith(searchQuery.toLowerCase().trim())) &&
                    ((_b = token.symbol) === null || _b === void 0 ? void 0 : _b.toLowerCase()) !== symbolMatch[0];
            }),
            // rest that dont match upove
            ...sorted.filter((token) => {
                var _a, _b;
                return !((_a = token.symbol) === null || _a === void 0 ? void 0 : _a.toLowerCase().startsWith(searchQuery.toLowerCase().trim())) &&
                    ((_b = token.symbol) === null || _b === void 0 ? void 0 : _b.toLowerCase()) !== symbolMatch[0];
            }),
        ];
    }, [filteredTokens, searchQuery, tokenComparator]);
    const handleCurrencySelect = useCallback((currency) => {
        onCurrencySelect(currency);
        onDismiss();
    }, [onDismiss, onCurrencySelect]);
    // clear the input on open
    useEffect(() => {
        if (isOpen)
            setSearchQuery('');
    }, [isOpen]);
    // manage focus on modal show
    const inputRef = useRef();
    const handleInput = useCallback((event) => {
        var _a;
        const input = event.target.value;
        const checksummedInput = isAddress(input);
        setSearchQuery(checksummedInput || input);
        (_a = fixedList.current) === null || _a === void 0 ? void 0 : _a.scrollTo(0);
    }, []);
    const handleEnter = useCallback((e) => {
        var _a;
        if (e.key === 'Enter') {
            const s = searchQuery.toLowerCase().trim();
            if (s === 'cusd') {
                handleCurrencySelect(cUSD[chainId]);
            }
            else if (filteredSortedTokens.length > 0) {
                if (((_a = filteredSortedTokens[0].symbol) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === searchQuery.trim().toLowerCase() ||
                    filteredSortedTokens.length === 1) {
                    handleCurrencySelect(filteredSortedTokens[0]);
                }
            }
        }
    }, [filteredSortedTokens, handleCurrencySelect, searchQuery, chainId]);
    // menu ui
    const [open, toggle] = useToggle(false);
    const node = useRef();
    useOnClickOutside(node, open ? toggle : undefined);
    // if no results on main list, show option to expand into inactive
    const [showExpanded, setShowExpanded] = useState(false);
    const inactiveTokens = useFoundOnInactiveList(searchQuery);
    // reset expanded results on query reset
    useEffect(() => {
        if (searchQuery === '') {
            setShowExpanded(false);
        }
    }, [setShowExpanded, searchQuery]);
    return (_jsxs(ContentWrapper, { children: [_jsxs(PaddedColumn, Object.assign({ gap: "16px" }, { children: [_jsxs(RowBetween, { children: [_jsx(Text, Object.assign({ fontWeight: 500, fontSize: 16 }, { children: t('selectToken') }), void 0), _jsx(CloseIcon, { onClick: onDismiss }, void 0)] }, void 0), _jsx(Row, { children: _jsx(SearchInput, { type: "text", id: "token-search-input", placeholder: t('tokenSearchPlaceholder'), autoComplete: "off", value: searchQuery, ref: inputRef, onChange: handleInput, onKeyDown: handleEnter }, void 0) }, void 0), showCommonBases && (_jsx(CommonBases, { chainId: chainId, onSelect: handleCurrencySelect, selectedCurrency: selectedCurrency }, void 0))] }), void 0), _jsx(Separator, {}, void 0), searchToken && !searchTokenIsAdded ? (_jsx(Column, Object.assign({ style: { padding: '20px 0', height: '100%' } }, { children: _jsx(ImportRow, { token: searchToken, showImportView: showImportView, setImportToken: setImportToken }, void 0) }), void 0)) : (filteredSortedTokens === null || filteredSortedTokens === void 0 ? void 0 : filteredSortedTokens.length) > 0 || (showExpanded && inactiveTokens && inactiveTokens.length > 0) ? (_jsx("div", Object.assign({ style: { flex: '1' } }, { children: _jsx(AutoSizer, Object.assign({ disableWidth: true }, { children: ({ height }) => (_jsx(CurrencyList, { height: height, showETH: showETH, currencies: showExpanded && inactiveTokens ? filteredSortedTokens.concat(inactiveTokens) : filteredSortedTokens, onCurrencySelect: handleCurrencySelect, otherCurrency: otherSelectedCurrency, selectedCurrency: selectedCurrency, fixedListRef: fixedList, showImportView: showImportView, setImportToken: setImportToken }, void 0)) }), void 0) }), void 0)) : (_jsxs(Column, Object.assign({ style: { padding: '20px', height: '100%' } }, { children: [_jsxs(TYPE.main, Object.assign({ color: theme.text3, textAlign: "center", mb: "20px" }, { children: [t('NoResultsFoundInActiveLists'), "."] }), void 0), inactiveTokens &&
                        inactiveTokens.length > 0 &&
                        !(searchToken && !searchTokenIsAdded) &&
                        searchQuery.length > 1 &&
                        (filteredSortedTokens === null || filteredSortedTokens === void 0 ? void 0 : filteredSortedTokens.length) === 0 && (
                    // expand button in line with no results
                    _jsx(Row, Object.assign({ align: "center", width: "100%", justify: "center" }, { children: _jsx(ButtonLight, Object.assign({ width: "fit-content", borderRadius: "12px", padding: "8px 12px", onClick: () => setShowExpanded(!showExpanded) }, { children: !showExpanded
                                ? `${t('Show')} ${inactiveTokens.length} ${t('MoreInactive')} ${inactiveTokens.length === 1 ? t('Token') : t('Tokens')}`
                                : `${t('HideExpandedSearch')}` }), void 0) }), void 0))] }), void 0)), inactiveTokens &&
                inactiveTokens.length > 0 &&
                !(searchToken && !searchTokenIsAdded) &&
                (searchQuery.length > 1 || showExpanded) &&
                ((filteredSortedTokens === null || filteredSortedTokens === void 0 ? void 0 : filteredSortedTokens.length) !== 0 || showExpanded) && (
            // button fixed to bottom
            _jsx(Row, Object.assign({ align: "center", width: "100%", justify: "center", style: { position: 'absolute', bottom: '80px', left: 0 } }, { children: _jsx(ButtonLight, Object.assign({ width: "fit-content", borderRadius: "12px", padding: "8px 12px", onClick: () => setShowExpanded(!showExpanded) }, { children: !showExpanded
                        ? `${t('Show')} ${inactiveTokens.length} ${t('MoreInactive')} ${inactiveTokens.length === 1 ? t('Token') : t('Tokens')}`
                        : `${t('HideExpandedSearch')}` }), void 0) }), void 0)), _jsx(Footer, { children: _jsx(Row, Object.assign({ justify: "center" }, { children: _jsx(ButtonText, Object.assign({ onClick: showManageView, color: theme.blue1, className: "list-token-manage-button" }, { children: _jsxs(RowFixed, { children: [_jsx(IconWrapper, Object.assign({ size: "16px", marginRight: "6px" }, { children: _jsx(Edit, {}, void 0) }), void 0), _jsx(TYPE.main, Object.assign({ color: theme.blue1 }, { children: t('manage') }), void 0)] }, void 0) }), void 0) }), void 0) }, void 0)] }, void 0));
}
