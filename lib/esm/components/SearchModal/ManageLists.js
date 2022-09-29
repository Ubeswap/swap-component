var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { CheckCircle, Settings } from 'react-feather';
import ReactGA from 'react-ga';
import { usePopper } from 'react-popper';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { UNSUPPORTED_LIST_URLS } from '../../constants/lists';
import { useListColor } from '../../hooks/useColor';
import { useFetchListCallback } from '../../hooks/useFetchListCallback';
import { useOnClickOutside } from '../../hooks/useOnClickOutside';
import useTheme from '../../hooks/useTheme';
import useToggle from '../../hooks/useToggle';
import { acceptListUpdate, disableList, enableList, removeList } from '../../state/lists/actions';
import { useActiveListUrls, useAllLists, useIsListActive } from '../../state/lists/hooks';
import { ExternalLink, IconWrapper, LinkStyledButton, TYPE } from '../../theme';
import listVersionLabel from '../../utils/listVersionLabel';
import { parseENSAddress } from '../../utils/parseENSAddress';
import uriToHttp from '../../utils/uriToHttp';
import { ButtonEmpty, ButtonPrimary } from '../Button';
import Card from '../Card';
import Column, { AutoColumn } from '../Column';
import ListLogo from '../ListLogo';
import Row, { RowBetween, RowFixed } from '../Row';
import ListToggle from '../Toggle/ListToggle';
import { CurrencyModalView } from './CurrencySearchModal';
import { PaddedColumn, SearchInput, Separator, SeparatorDark } from './styleds';
const Wrapper = styled(Column) `
  width: 100%;
  height: 100%;
`;
const UnpaddedLinkStyledButton = styled(LinkStyledButton) `
  padding: 0;
  font-size: 1rem;
  opacity: ${({ disabled }) => (disabled ? '0.4' : '1')};
`;
const PopoverContainer = styled.div `
  z-index: 100;
  visibility: ${(props) => (props.show ? 'visible' : 'hidden')};
  opacity: ${(props) => (props.show ? 1 : 0)};
  transition: visibility 150ms linear, opacity 150ms linear;
  background: ${({ theme }) => theme.bg2};
  border: 1px solid ${({ theme }) => theme.bg3};
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.01), 0px 4px 8px rgba(0, 0, 0, 0.04), 0px 16px 24px rgba(0, 0, 0, 0.04),
    0px 24px 32px rgba(0, 0, 0, 0.01);
  color: ${({ theme }) => theme.text2};
  border-radius: 0.5rem;
  padding: 1rem;
  display: grid;
  grid-template-rows: 1fr;
  grid-gap: 8px;
  font-size: 1rem;
  text-align: left;
`;
const StyledMenu = styled.div `
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border: none;
`;
const StyledTitleText = styled.div `
  font-size: 16px;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 600;
  color: ${({ theme, active }) => (active ? theme.white : theme.text2)};
`;
const StyledListUrlText = styled(TYPE.main) `
  font-size: 12px;
  color: ${({ theme, active }) => (active ? theme.white : theme.text2)};
`;
const RowWrapper = styled(Row) `
  background-color: ${({ bgColor, active, theme }) => (active ? bgColor !== null && bgColor !== void 0 ? bgColor : 'transparent' : theme.bg2)};
  transition: 200ms;
  align-items: center;
  padding: 1rem;
  border-radius: 20px;
`;
function listUrlRowHTMLId(listUrl) {
    return `list-row-${listUrl.replace(/\./g, '-')}`;
}
const ListRow = memo(function ListRow({ listUrl }) {
    const listsByUrl = useSelector((state) => state.lists.byUrl);
    const dispatch = useDispatch();
    const { current: list, pendingUpdate: pending } = listsByUrl[listUrl];
    const theme = useTheme();
    const listColor = useListColor(list === null || list === void 0 ? void 0 : list.logoURI);
    const isActive = useIsListActive(listUrl);
    const [open, toggle] = useToggle(false);
    const node = useRef();
    const [referenceElement, setReferenceElement] = useState();
    const [popperElement, setPopperElement] = useState();
    const { styles, attributes } = usePopper(referenceElement, popperElement, {
        placement: 'auto',
        strategy: 'fixed',
        modifiers: [{ name: 'offset', options: { offset: [8, 8] } }],
    });
    useOnClickOutside(node, open ? toggle : undefined);
    const handleAcceptListUpdate = useCallback(() => {
        if (!pending)
            return;
        ReactGA.event({
            category: 'Lists',
            action: 'Update List from List Select',
            label: listUrl,
        });
        dispatch(acceptListUpdate(listUrl));
    }, [dispatch, listUrl, pending]);
    const handleRemoveList = useCallback(() => {
        ReactGA.event({
            category: 'Lists',
            action: 'Start Remove List',
            label: listUrl,
        });
        if (window.prompt(`Please confirm you would like to remove this list by typing REMOVE`) === `REMOVE`) {
            ReactGA.event({
                category: 'Lists',
                action: 'Confirm Remove List',
                label: listUrl,
            });
            dispatch(removeList(listUrl));
        }
    }, [dispatch, listUrl]);
    const handleEnableList = useCallback(() => {
        ReactGA.event({
            category: 'Lists',
            action: 'Enable List',
            label: listUrl,
        });
        dispatch(enableList(listUrl));
    }, [dispatch, listUrl]);
    const handleDisableList = useCallback(() => {
        ReactGA.event({
            category: 'Lists',
            action: 'Disable List',
            label: listUrl,
        });
        dispatch(disableList(listUrl));
    }, [dispatch, listUrl]);
    if (!list)
        return null;
    return (_jsxs(RowWrapper, Object.assign({ active: isActive, bgColor: listColor, id: listUrlRowHTMLId(listUrl) }, { children: [list.logoURI ? (_jsx(ListLogo, { size: "40px", style: { marginRight: '1rem' }, logoURI: list.logoURI, alt: `${list.name} list logo` })) : (_jsx("div", { style: { width: '24px', height: '24px', marginRight: '1rem' } })), _jsxs(Column, Object.assign({ style: { flex: '1' } }, { children: [_jsx(Row, { children: _jsx(StyledTitleText, Object.assign({ active: isActive }, { children: list.name })) }), _jsxs(RowFixed, Object.assign({ mt: "4px" }, { children: [_jsxs(StyledListUrlText, Object.assign({ active: isActive, mr: "6px" }, { children: [list.tokens.length, " tokens"] })), _jsxs(StyledMenu, Object.assign({ ref: node }, { children: [_jsx(ButtonEmpty, Object.assign({ onClick: toggle, ref: setReferenceElement, padding: "0" }, { children: _jsx(Settings, { stroke: isActive ? theme.bg1 : theme.text1, size: 12 }) })), open && (_jsxs(PopoverContainer, Object.assign({ show: true, ref: setPopperElement, style: styles.popper }, attributes.popper, { children: [_jsx("div", { children: list && listVersionLabel(list.version) }), _jsx(SeparatorDark, {}), _jsx(ExternalLink, Object.assign({ href: `https://tokenlists.org/token-list?url=${listUrl}` }, { children: "View list" })), _jsx(UnpaddedLinkStyledButton, Object.assign({ onClick: handleRemoveList, disabled: Object.keys(listsByUrl).length === 1 }, { children: "Remove list" })), pending && (_jsx(UnpaddedLinkStyledButton, Object.assign({ onClick: handleAcceptListUpdate }, { children: "Update list" })))] })))] }))] }))] })), _jsx(ListToggle, { isActive: isActive, bgColor: listColor, toggle: () => {
                    isActive ? handleDisableList() : handleEnableList();
                } })] }), listUrl));
});
const ListContainer = styled.div `
  padding: 1rem;
  height: 100%;
  overflow: auto;
  padding-bottom: 80px;
`;
export function ManageLists({ setModalView, setImportList, setListUrl, }) {
    const theme = useTheme();
    const [listUrlInput, setListUrlInput] = useState('');
    const lists = useAllLists();
    // sort by active but only if not visible
    const activeListUrls = useActiveListUrls();
    const [activeCopy, setActiveCopy] = useState();
    useEffect(() => {
        if (!activeCopy && activeListUrls) {
            setActiveCopy(activeListUrls);
        }
    }, [activeCopy, activeListUrls]);
    const handleInput = useCallback((e) => {
        setListUrlInput(e.target.value);
    }, []);
    const fetchList = useFetchListCallback();
    const validUrl = useMemo(() => {
        return uriToHttp(listUrlInput).length > 0 || Boolean(parseENSAddress(listUrlInput));
    }, [listUrlInput]);
    const sortedLists = useMemo(() => {
        const listUrls = Object.keys(lists);
        return listUrls
            .filter((listUrl) => {
            // only show loaded lists, hide unsupported lists
            return Boolean(lists[listUrl].current) && !UNSUPPORTED_LIST_URLS.includes(listUrl);
        })
            .sort((u1, u2) => {
            const { current: l1 } = lists[u1];
            const { current: l2 } = lists[u2];
            // first filter on active lists
            if ((activeCopy === null || activeCopy === void 0 ? void 0 : activeCopy.includes(u1)) && !(activeCopy === null || activeCopy === void 0 ? void 0 : activeCopy.includes(u2))) {
                return -1;
            }
            if (!(activeCopy === null || activeCopy === void 0 ? void 0 : activeCopy.includes(u1)) && (activeCopy === null || activeCopy === void 0 ? void 0 : activeCopy.includes(u2))) {
                return 1;
            }
            if (l1 && l2) {
                return l1.name.toLowerCase() < l2.name.toLowerCase()
                    ? -1
                    : l1.name.toLowerCase() === l2.name.toLowerCase()
                        ? 0
                        : 1;
            }
            if (l1)
                return -1;
            if (l2)
                return 1;
            return 0;
        });
    }, [lists, activeCopy]);
    // temporary fetched list for import flow
    const [tempList, setTempList] = useState();
    const [addError, setAddError] = useState();
    useEffect(() => {
        function fetchTempList() {
            return __awaiter(this, void 0, void 0, function* () {
                fetchList(listUrlInput, false)
                    .then((list) => setTempList(list))
                    .catch(() => setAddError('Error importing list'));
            });
        }
        // if valid url, fetch details for card
        if (validUrl) {
            fetchTempList();
        }
        else {
            setTempList(undefined);
            listUrlInput !== '' && setAddError('Enter valid list location');
        }
        // reset error
        if (listUrlInput === '') {
            setAddError(undefined);
        }
    }, [fetchList, listUrlInput, validUrl]);
    // check if list is already imported
    const isImported = Object.keys(lists).includes(listUrlInput);
    // set list values and have parent modal switch to import list view
    const handleImport = useCallback(() => {
        if (!tempList)
            return;
        setImportList(tempList);
        setModalView(CurrencyModalView.importList);
        setListUrl(listUrlInput);
    }, [listUrlInput, setImportList, setListUrl, setModalView, tempList]);
    return (_jsxs(Wrapper, { children: [_jsxs(PaddedColumn, Object.assign({ gap: "14px" }, { children: [_jsx(Row, { children: _jsx(SearchInput, { type: "text", id: "list-add-input", placeholder: "https:// or ipfs:// or ENS name", value: listUrlInput, onChange: handleInput }) }), addError ? (_jsx(TYPE.error, Object.assign({ title: addError, style: { textOverflow: 'ellipsis', overflow: 'hidden' }, error: true }, { children: addError }))) : null] })), tempList && (_jsx(PaddedColumn, Object.assign({ style: { paddingTop: 0 } }, { children: _jsx(Card, Object.assign({ backgroundColor: theme.bg2, padding: "12px 20px" }, { children: _jsxs(RowBetween, { children: [_jsxs(RowFixed, { children: [tempList.logoURI && _jsx(ListLogo, { logoURI: tempList.logoURI, size: "40px" }), _jsxs(AutoColumn, Object.assign({ gap: "4px", style: { marginLeft: '20px' } }, { children: [_jsx(TYPE.body, Object.assign({ fontWeight: 600 }, { children: tempList.name })), _jsxs(TYPE.main, Object.assign({ fontSize: '12px' }, { children: [tempList.tokens.length, " tokens"] }))] }))] }), isImported ? (_jsxs(RowFixed, { children: [_jsx(IconWrapper, Object.assign({ stroke: theme.text2, size: "16px", marginRight: '10px' }, { children: _jsx(CheckCircle, {}) })), _jsx(TYPE.body, Object.assign({ color: theme.text2 }, { children: "Loaded" }))] })) : (_jsx(ButtonPrimary, Object.assign({ style: { fontSize: '14px' }, padding: "6px 8px", width: "fit-content", onClick: handleImport }, { children: "Import" })))] }) })) }))), _jsx(Separator, {}), _jsx(ListContainer, { children: _jsx(AutoColumn, Object.assign({ gap: "md" }, { children: sortedLists.map((listUrl) => (_jsx(ListRow, { listUrl: listUrl }, listUrl))) })) })] }));
}
