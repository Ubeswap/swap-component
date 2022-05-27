import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useContractKit } from '@celo-tools/use-contractkit';
import { currencyEquals, Token } from '@ubeswap/sdk';
import { useCallback } from 'react';
import { FixedSizeList } from 'react-window';
import { Text } from 'rebass';
import styled from 'styled-components';
import { useAllInactiveTokens, useIsUserAddedToken } from '../../hooks/Tokens';
import { useCombinedActiveList, WrappedTokenInfo } from '../../state/lists/hooks';
import { useCurrencyBalance } from '../../state/wallet/hooks';
import { TYPE } from '../../theme';
import { isTokenOnList } from '../../utils';
import Column from '../Column';
import CurrencyLogo from '../CurrencyLogo';
import Loader from '../Loader';
import { RowFixed } from '../Row';
import { MouseoverTooltip } from '../Tooltip';
import ImportRow from './ImportRow';
import { MenuItem } from './styleds';
function currencyKey(currency) {
    return currency instanceof Token ? currency.address : '';
}
const StyledBalanceText = styled(Text) `
  white-space: nowrap;
  overflow: hidden;
  max-width: 5rem;
  text-overflow: ellipsis;
`;
const Tag = styled.div `
  background-color: ${({ theme }) => theme.bg3};
  color: ${({ theme }) => theme.text2};
  font-size: 14px;
  border-radius: 4px;
  padding: 0.25rem 0.3rem 0.25rem 0.3rem;
  max-width: 6rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  justify-self: flex-end;
  margin-right: 4px;
`;
function Balance({ balance }) {
    return _jsx(StyledBalanceText, Object.assign({ title: balance.toExact() }, { children: balance.toSignificant(4) }), void 0);
}
const TagContainer = styled.div `
  display: flex;
  justify-content: flex-end;
`;
function TokenTags({ currency }) {
    if (!(currency instanceof WrappedTokenInfo)) {
        return _jsx("span", {}, void 0);
    }
    const tags = currency.tags;
    if (!tags || tags.length === 0)
        return _jsx("span", {}, void 0);
    const tag = tags[0];
    return (_jsxs(TagContainer, { children: [_jsx(MouseoverTooltip, Object.assign({ text: tag.description }, { children: _jsx(Tag, { children: tag.name }, tag.id) }), void 0), tags.length > 1 ? (_jsx(MouseoverTooltip, Object.assign({ text: tags
                    .slice(1)
                    .map(({ name, description }) => `${name}: ${description}`)
                    .join('; \n') }, { children: _jsx(Tag, { children: "..." }, void 0) }), void 0)) : null] }, void 0));
}
function CurrencyRow({ currency, onSelect, isSelected, otherSelected, style, }) {
    const { address: account } = useContractKit();
    const key = currencyKey(currency);
    const selectedTokenList = useCombinedActiveList();
    const isOnSelectedList = isTokenOnList(selectedTokenList, currency);
    const customAdded = useIsUserAddedToken(currency);
    const balance = useCurrencyBalance(account !== null && account !== void 0 ? account : undefined, currency);
    // only show add or remove buttons if not on selected list
    return (_jsxs(MenuItem, Object.assign({ style: style, className: `token-item-${key}`, onClick: () => (isSelected ? null : onSelect()), disabled: isSelected, selected: otherSelected }, { children: [_jsx(CurrencyLogo, { currency: currency, size: '24px' }, void 0), _jsxs(Column, { children: [_jsx(Text, Object.assign({ title: currency.name, fontWeight: 500 }, { children: currency.symbol }), void 0), _jsxs(TYPE.darkGray, Object.assign({ ml: "0px", fontSize: '12px', fontWeight: 300 }, { children: [currency.name, " ", !isOnSelectedList && customAdded && '• Added by user'] }), void 0)] }, void 0), _jsx(TokenTags, { currency: currency }, void 0), _jsx(RowFixed, Object.assign({ style: { justifySelf: 'flex-end' } }, { children: balance ? _jsx(Balance, { balance: balance }, void 0) : account ? _jsx(Loader, {}, void 0) : null }), void 0)] }), void 0));
}
export default function CurrencyList({ height, currencies, selectedCurrency, onCurrencySelect, otherCurrency, fixedListRef, showImportView, setImportToken, }) {
    const itemData = currencies;
    const inactiveTokens = useAllInactiveTokens();
    const Row = useCallback(({ data, index, style }) => {
        const currency = data[index];
        const isSelected = Boolean(selectedCurrency && currencyEquals(selectedCurrency, currency));
        const otherSelected = Boolean(otherCurrency && currencyEquals(otherCurrency, currency));
        const handleSelect = () => onCurrencySelect(currency);
        const token = currency;
        const showImport = inactiveTokens && token && Object.keys(inactiveTokens).includes(token.address);
        if (showImport && token) {
            return (_jsx(ImportRow, { style: style, token: token, showImportView: showImportView, setImportToken: setImportToken, dim: true }, void 0));
        }
        else {
            return (_jsx(CurrencyRow, { style: style, currency: currency, isSelected: isSelected, onSelect: handleSelect, otherSelected: otherSelected }, void 0));
        }
    }, [inactiveTokens, onCurrencySelect, otherCurrency, selectedCurrency, setImportToken, showImportView]);
    const itemKey = useCallback((index, data) => currencyKey(data[index]), []);
    return (_jsx(FixedSizeList, Object.assign({ height: height, ref: fixedListRef, width: "100%", itemData: itemData, itemCount: itemData.length, itemSize: 56, itemKey: itemKey }, { children: Row }), void 0));
}
