import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { diffTokenLists } from '@uniswap/token-lists';
import React, { useCallback, useMemo } from 'react';
import ReactGA from 'react-ga';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Text } from 'rebass';
import styled from 'styled-components';
import { useRemovePopup } from '../../state/application/hooks';
import { acceptListUpdate } from '../../state/lists/actions';
import { TYPE } from '../../theme';
import listVersionLabel from '../../utils/listVersionLabel';
import { ButtonSecondary } from '../Button';
import { AutoColumn } from '../Column';
import { AutoRow } from '../Row';
export const ChangesList = styled.ul `
  max-height: 400px;
  overflow: auto;
`;
export default function ListUpdatePopup({ popKey, listUrl, oldList, newList, auto, }) {
    const removePopup = useRemovePopup();
    const removeThisPopup = useCallback(() => removePopup(popKey), [popKey, removePopup]);
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const handleAcceptUpdate = useCallback(() => {
        if (auto)
            return;
        ReactGA.event({
            category: 'Lists',
            action: 'Update List from Popup',
            label: listUrl,
        });
        dispatch(acceptListUpdate(listUrl));
        removeThisPopup();
    }, [auto, dispatch, listUrl, removeThisPopup]);
    const { added: tokensAdded, changed: tokensChanged, removed: tokensRemoved, } = useMemo(() => {
        return diffTokenLists(oldList.tokens, newList.tokens);
    }, [newList.tokens, oldList.tokens]);
    const numTokensChanged = useMemo(() => Object.keys(tokensChanged).reduce((memo, chainId) => memo + Object.keys(tokensChanged[chainId]).length, 0), [tokensChanged]);
    return (_jsx(AutoRow, { children: _jsx(AutoColumn, Object.assign({ style: { flex: '1' }, gap: "8px" }, { children: auto ? (_jsxs(TYPE.body, Object.assign({ fontWeight: 500 }, { children: [t('TheTokenList'), " \"", oldList.name, "\" ", t('HasBeenUpdatedTo'), ' ', _jsx("strong", { children: listVersionLabel(newList.version) }), "."] }))) : (_jsxs(_Fragment, { children: [_jsxs("div", { children: [_jsxs(Text, { children: [t('AnUpdateIsAvailableForTheTokenList'), " \"", oldList.name, "\" (", listVersionLabel(oldList.version), " to ", listVersionLabel(newList.version), ")."] }), _jsxs(ChangesList, { children: [tokensAdded.length > 0 ? (_jsxs("li", { children: [tokensAdded.map((token, i) => (_jsxs(React.Fragment, { children: [_jsx("strong", Object.assign({ title: token.address }, { children: token.symbol })), i === tokensAdded.length - 1 ? null : ', '] }, `${token.chainId}-${token.address}`))), ' ', t('Added')] })) : null, tokensRemoved.length > 0 ? (_jsxs("li", { children: [tokensRemoved.map((token, i) => (_jsxs(React.Fragment, { children: [_jsx("strong", Object.assign({ title: token.address }, { children: token.symbol })), i === tokensRemoved.length - 1 ? null : ', '] }, `${token.chainId}-${token.address}`))), ' ', t('Removed')] })) : null, numTokensChanged > 0 ? (_jsxs("li", { children: [numTokensChanged, " ", t('TokensUpdated')] })) : null] })] }), _jsxs(AutoRow, { children: [_jsx("div", Object.assign({ style: { flexGrow: 1, marginRight: 12 } }, { children: _jsx(ButtonSecondary, Object.assign({ onClick: handleAcceptUpdate }, { children: t('AcceptUpdate') })) })), _jsx("div", Object.assign({ style: { flexGrow: 1 } }, { children: _jsx(ButtonSecondary, Object.assign({ onClick: removeThisPopup }, { children: t('Dismiss') })) }))] })] })) })) }));
}
