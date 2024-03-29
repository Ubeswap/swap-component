import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { transparentize } from 'polished';
import { useCallback, useState } from 'react';
import { AlertTriangle, ArrowLeft } from 'react-feather';
import ReactGA from 'react-ga';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { useFetchListCallback } from '../../hooks/useFetchListCallback';
import useTheme from '../../hooks/useTheme';
import { enableList, removeList } from '../../state/lists/actions';
import { useAllLists } from '../../state/lists/hooks';
import { CloseIcon, TYPE } from '../../theme';
import { ExternalLink } from '../../theme/components';
import { ButtonPrimary } from '../Button';
import Card from '../Card';
import { AutoColumn } from '../Column';
import ListLogo from '../ListLogo';
import { AutoRow, RowBetween, RowFixed } from '../Row';
import { SectionBreak } from '../swap/styleds';
import { CurrencyModalView } from './CurrencySearchModal';
import { Checkbox, PaddedColumn, TextDot } from './styleds';
const Wrapper = styled.div `
  position: relative;
  width: 100%;
  overflow: auto;
`;
export function ImportList({ listURL, list, setModalView, onDismiss }) {
    var _a;
    const theme = useTheme();
    const dispatch = useDispatch();
    // user must accept
    const [confirmed, setConfirmed] = useState(false);
    const lists = useAllLists();
    const fetchList = useFetchListCallback();
    const { t } = useTranslation();
    // monitor is list is loading
    const adding = Boolean((_a = lists[listURL]) === null || _a === void 0 ? void 0 : _a.loadingRequestId);
    const [addError, setAddError] = useState(null);
    const handleAddList = useCallback(() => {
        if (adding)
            return;
        setAddError(null);
        fetchList(listURL)
            .then(() => {
            ReactGA.event({
                category: 'Lists',
                action: 'Add List',
                label: listURL,
            });
            // turn list on
            dispatch(enableList(listURL));
            // go back to lists
            setModalView(CurrencyModalView.manage);
        })
            .catch((error) => {
            ReactGA.event({
                category: 'Lists',
                action: 'Add List Failed',
                label: listURL,
            });
            setAddError(error.message);
            dispatch(removeList(listURL));
        });
    }, [adding, dispatch, fetchList, listURL, setModalView]);
    return (_jsxs(Wrapper, { children: [_jsx(PaddedColumn, Object.assign({ gap: "14px", style: { width: '100%', flex: '1 1' } }, { children: _jsxs(RowBetween, { children: [_jsx(ArrowLeft, { style: { cursor: 'pointer' }, onClick: () => setModalView(CurrencyModalView.manage) }), _jsx(TYPE.mediumHeader, { children: t('ImportList') }), _jsx(CloseIcon, { onClick: onDismiss })] }) })), _jsx(SectionBreak, {}), _jsx(PaddedColumn, Object.assign({ gap: "md" }, { children: _jsxs(AutoColumn, Object.assign({ gap: "md" }, { children: [_jsx(Card, Object.assign({ backgroundColor: theme.bg2, padding: "12px 20px" }, { children: _jsx(RowBetween, { children: _jsxs(RowFixed, { children: [list.logoURI && _jsx(ListLogo, { logoURI: list.logoURI, size: "40px" }), _jsxs(AutoColumn, Object.assign({ gap: "sm", style: { marginLeft: '20px' } }, { children: [_jsxs(RowFixed, { children: [_jsx(TYPE.body, Object.assign({ fontWeight: 600, mr: "6px" }, { children: list.name })), _jsx(TextDot, {}), _jsxs(TYPE.main, Object.assign({ fontSize: '16px', ml: "6px" }, { children: [list.tokens.length, " ", t('Tokens')] }))] }), _jsx(ExternalLink, Object.assign({ href: `https://tokenlists.org/token-list?url=${listURL}` }, { children: _jsx(TYPE.main, Object.assign({ fontSize: '12px', color: theme.blue1 }, { children: listURL })) }))] }))] }) }) })), _jsxs(Card, Object.assign({ style: { backgroundColor: transparentize(0.8, theme.red1) } }, { children: [_jsxs(AutoColumn, Object.assign({ justify: "center", style: { textAlign: 'center', gap: '16px', marginBottom: '12px' } }, { children: [_jsx(AlertTriangle, { stroke: theme.red1, size: 32 }), _jsxs(TYPE.body, Object.assign({ fontWeight: 500, fontSize: 20, color: theme.red1 }, { children: [t('ImportAtYourOwnRisk'), ' '] }))] })), _jsxs(AutoColumn, Object.assign({ style: { textAlign: 'center', gap: '16px', marginBottom: '12px' } }, { children: [_jsx(TYPE.body, Object.assign({ fontWeight: 500, color: theme.red1 }, { children: t('tokenExpExpl') })), _jsx(TYPE.body, Object.assign({ fontWeight: 600, color: theme.red1 }, { children: t('tokenImportRisk') }))] })), _jsxs(AutoRow, Object.assign({ justify: "center", style: { cursor: 'pointer' }, onClick: () => setConfirmed(!confirmed) }, { children: [_jsx(Checkbox, { name: "confirmed", type: "checkbox", checked: confirmed, onChange: () => setConfirmed(!confirmed) }), _jsx(TYPE.body, Object.assign({ ml: "10px", fontSize: "16px", color: theme.red1, fontWeight: 500 }, { children: t('IUnderstand') }))] }))] })), _jsx(ButtonPrimary, Object.assign({ disabled: !confirmed, altDisabledStyle: true, borderRadius: "20px", padding: "10px 1rem", onClick: handleAddList }, { children: t('Import') })), addError ? (_jsx(TYPE.error, Object.assign({ title: addError, style: { textOverflow: 'ellipsis', overflow: 'hidden' }, error: true }, { children: addError }))) : null] })) }))] }));
}
