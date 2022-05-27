"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ManageLists = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const Card_1 = __importDefault(require("components/Card"));
const lists_1 = require("constants/lists");
const useColor_1 = require("hooks/useColor");
const react_1 = require("react");
const react_feather_1 = require("react-feather");
const react_ga_1 = __importDefault(require("react-ga"));
const react_popper_1 = require("react-popper");
const react_redux_1 = require("react-redux");
const styled_components_1 = __importDefault(require("styled-components"));
const useFetchListCallback_1 = require("../../hooks/useFetchListCallback");
const useOnClickOutside_1 = require("../../hooks/useOnClickOutside");
const useTheme_1 = __importDefault(require("../../hooks/useTheme"));
const useToggle_1 = __importDefault(require("../../hooks/useToggle"));
const actions_1 = require("../../state/lists/actions");
const hooks_1 = require("../../state/lists/hooks");
const theme_1 = require("../../theme");
const listVersionLabel_1 = __importDefault(require("../../utils/listVersionLabel"));
const parseENSAddress_1 = require("../../utils/parseENSAddress");
const uriToHttp_1 = __importDefault(require("../../utils/uriToHttp"));
const Button_1 = require("../Button");
const Column_1 = __importStar(require("../Column"));
const ListLogo_1 = __importDefault(require("../ListLogo"));
const Row_1 = __importStar(require("../Row"));
const ListToggle_1 = __importDefault(require("../Toggle/ListToggle"));
const CurrencySearchModal_1 = require("./CurrencySearchModal");
const styleds_1 = require("./styleds");
const Wrapper = (0, styled_components_1.default)(Column_1.default) `
  width: 100%;
  height: 100%;
`;
const UnpaddedLinkStyledButton = (0, styled_components_1.default)(theme_1.LinkStyledButton) `
  padding: 0;
  font-size: 1rem;
  opacity: ${({ disabled }) => (disabled ? '0.4' : '1')};
`;
const PopoverContainer = styled_components_1.default.div `
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
const StyledMenu = styled_components_1.default.div `
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border: none;
`;
const StyledTitleText = styled_components_1.default.div `
  font-size: 16px;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 600;
  color: ${({ theme, active }) => (active ? theme.white : theme.text2)};
`;
const StyledListUrlText = (0, styled_components_1.default)(theme_1.TYPE.main) `
  font-size: 12px;
  color: ${({ theme, active }) => (active ? theme.white : theme.text2)};
`;
const RowWrapper = (0, styled_components_1.default)(Row_1.default) `
  background-color: ${({ bgColor, active, theme }) => (active ? bgColor !== null && bgColor !== void 0 ? bgColor : 'transparent' : theme.bg2)};
  transition: 200ms;
  align-items: center;
  padding: 1rem;
  border-radius: 20px;
`;
function listUrlRowHTMLId(listUrl) {
    return `list-row-${listUrl.replace(/\./g, '-')}`;
}
const ListRow = (0, react_1.memo)(function ListRow({ listUrl }) {
    const listsByUrl = (0, react_redux_1.useSelector)((state) => state.lists.byUrl);
    const dispatch = (0, react_redux_1.useDispatch)();
    const { current: list, pendingUpdate: pending } = listsByUrl[listUrl];
    const theme = (0, useTheme_1.default)();
    const listColor = (0, useColor_1.useListColor)(list === null || list === void 0 ? void 0 : list.logoURI);
    const isActive = (0, hooks_1.useIsListActive)(listUrl);
    const [open, toggle] = (0, useToggle_1.default)(false);
    const node = (0, react_1.useRef)();
    const [referenceElement, setReferenceElement] = (0, react_1.useState)();
    const [popperElement, setPopperElement] = (0, react_1.useState)();
    const { styles, attributes } = (0, react_popper_1.usePopper)(referenceElement, popperElement, {
        placement: 'auto',
        strategy: 'fixed',
        modifiers: [{ name: 'offset', options: { offset: [8, 8] } }],
    });
    (0, useOnClickOutside_1.useOnClickOutside)(node, open ? toggle : undefined);
    const handleAcceptListUpdate = (0, react_1.useCallback)(() => {
        if (!pending)
            return;
        react_ga_1.default.event({
            category: 'Lists',
            action: 'Update List from List Select',
            label: listUrl,
        });
        dispatch((0, actions_1.acceptListUpdate)(listUrl));
    }, [dispatch, listUrl, pending]);
    const handleRemoveList = (0, react_1.useCallback)(() => {
        react_ga_1.default.event({
            category: 'Lists',
            action: 'Start Remove List',
            label: listUrl,
        });
        if (window.prompt(`Please confirm you would like to remove this list by typing REMOVE`) === `REMOVE`) {
            react_ga_1.default.event({
                category: 'Lists',
                action: 'Confirm Remove List',
                label: listUrl,
            });
            dispatch((0, actions_1.removeList)(listUrl));
        }
    }, [dispatch, listUrl]);
    const handleEnableList = (0, react_1.useCallback)(() => {
        react_ga_1.default.event({
            category: 'Lists',
            action: 'Enable List',
            label: listUrl,
        });
        dispatch((0, actions_1.enableList)(listUrl));
    }, [dispatch, listUrl]);
    const handleDisableList = (0, react_1.useCallback)(() => {
        react_ga_1.default.event({
            category: 'Lists',
            action: 'Disable List',
            label: listUrl,
        });
        dispatch((0, actions_1.disableList)(listUrl));
    }, [dispatch, listUrl]);
    if (!list)
        return null;
    return ((0, jsx_runtime_1.jsxs)(RowWrapper, Object.assign({ active: isActive, bgColor: listColor, id: listUrlRowHTMLId(listUrl) }, { children: [list.logoURI ? ((0, jsx_runtime_1.jsx)(ListLogo_1.default, { size: "40px", style: { marginRight: '1rem' }, logoURI: list.logoURI, alt: `${list.name} list logo` }, void 0)) : ((0, jsx_runtime_1.jsx)("div", { style: { width: '24px', height: '24px', marginRight: '1rem' } }, void 0)), (0, jsx_runtime_1.jsxs)(Column_1.default, Object.assign({ style: { flex: '1' } }, { children: [(0, jsx_runtime_1.jsx)(Row_1.default, { children: (0, jsx_runtime_1.jsx)(StyledTitleText, Object.assign({ active: isActive }, { children: list.name }), void 0) }, void 0), (0, jsx_runtime_1.jsxs)(Row_1.RowFixed, Object.assign({ mt: "4px" }, { children: [(0, jsx_runtime_1.jsxs)(StyledListUrlText, Object.assign({ active: isActive, mr: "6px" }, { children: [list.tokens.length, " tokens"] }), void 0), (0, jsx_runtime_1.jsxs)(StyledMenu, Object.assign({ ref: node }, { children: [(0, jsx_runtime_1.jsx)(Button_1.ButtonEmpty, Object.assign({ onClick: toggle, ref: setReferenceElement, padding: "0" }, { children: (0, jsx_runtime_1.jsx)(react_feather_1.Settings, { stroke: isActive ? theme.bg1 : theme.text1, size: 12 }, void 0) }), void 0), open && ((0, jsx_runtime_1.jsxs)(PopoverContainer, Object.assign({ show: true, ref: setPopperElement, style: styles.popper }, attributes.popper, { children: [(0, jsx_runtime_1.jsx)("div", { children: list && (0, listVersionLabel_1.default)(list.version) }, void 0), (0, jsx_runtime_1.jsx)(styleds_1.SeparatorDark, {}, void 0), (0, jsx_runtime_1.jsx)(theme_1.ExternalLink, Object.assign({ href: `https://tokenlists.org/token-list?url=${listUrl}` }, { children: "View list" }), void 0), (0, jsx_runtime_1.jsx)(UnpaddedLinkStyledButton, Object.assign({ onClick: handleRemoveList, disabled: Object.keys(listsByUrl).length === 1 }, { children: "Remove list" }), void 0), pending && ((0, jsx_runtime_1.jsx)(UnpaddedLinkStyledButton, Object.assign({ onClick: handleAcceptListUpdate }, { children: "Update list" }), void 0))] }), void 0))] }), void 0)] }), void 0)] }), void 0), (0, jsx_runtime_1.jsx)(ListToggle_1.default, { isActive: isActive, bgColor: listColor, toggle: () => {
                    isActive ? handleDisableList() : handleEnableList();
                } }, void 0)] }), listUrl));
});
const ListContainer = styled_components_1.default.div `
  padding: 1rem;
  height: 100%;
  overflow: auto;
  padding-bottom: 80px;
`;
function ManageLists({ setModalView, setImportList, setListUrl, }) {
    const theme = (0, useTheme_1.default)();
    const [listUrlInput, setListUrlInput] = (0, react_1.useState)('');
    const lists = (0, hooks_1.useAllLists)();
    // sort by active but only if not visible
    const activeListUrls = (0, hooks_1.useActiveListUrls)();
    const [activeCopy, setActiveCopy] = (0, react_1.useState)();
    (0, react_1.useEffect)(() => {
        if (!activeCopy && activeListUrls) {
            setActiveCopy(activeListUrls);
        }
    }, [activeCopy, activeListUrls]);
    const handleInput = (0, react_1.useCallback)((e) => {
        setListUrlInput(e.target.value);
    }, []);
    const fetchList = (0, useFetchListCallback_1.useFetchListCallback)();
    const validUrl = (0, react_1.useMemo)(() => {
        return (0, uriToHttp_1.default)(listUrlInput).length > 0 || Boolean((0, parseENSAddress_1.parseENSAddress)(listUrlInput));
    }, [listUrlInput]);
    const sortedLists = (0, react_1.useMemo)(() => {
        const listUrls = Object.keys(lists);
        return listUrls
            .filter((listUrl) => {
            // only show loaded lists, hide unsupported lists
            return Boolean(lists[listUrl].current) && !lists_1.UNSUPPORTED_LIST_URLS.includes(listUrl);
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
    const [tempList, setTempList] = (0, react_1.useState)();
    const [addError, setAddError] = (0, react_1.useState)();
    (0, react_1.useEffect)(() => {
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
    const handleImport = (0, react_1.useCallback)(() => {
        if (!tempList)
            return;
        setImportList(tempList);
        setModalView(CurrencySearchModal_1.CurrencyModalView.importList);
        setListUrl(listUrlInput);
    }, [listUrlInput, setImportList, setListUrl, setModalView, tempList]);
    return ((0, jsx_runtime_1.jsxs)(Wrapper, { children: [(0, jsx_runtime_1.jsxs)(styleds_1.PaddedColumn, Object.assign({ gap: "14px" }, { children: [(0, jsx_runtime_1.jsx)(Row_1.default, { children: (0, jsx_runtime_1.jsx)(styleds_1.SearchInput, { type: "text", id: "list-add-input", placeholder: "https:// or ipfs:// or ENS name", value: listUrlInput, onChange: handleInput }, void 0) }, void 0), addError ? ((0, jsx_runtime_1.jsx)(theme_1.TYPE.error, Object.assign({ title: addError, style: { textOverflow: 'ellipsis', overflow: 'hidden' }, error: true }, { children: addError }), void 0)) : null] }), void 0), tempList && ((0, jsx_runtime_1.jsx)(styleds_1.PaddedColumn, Object.assign({ style: { paddingTop: 0 } }, { children: (0, jsx_runtime_1.jsx)(Card_1.default, Object.assign({ backgroundColor: theme.bg2, padding: "12px 20px" }, { children: (0, jsx_runtime_1.jsxs)(Row_1.RowBetween, { children: [(0, jsx_runtime_1.jsxs)(Row_1.RowFixed, { children: [tempList.logoURI && (0, jsx_runtime_1.jsx)(ListLogo_1.default, { logoURI: tempList.logoURI, size: "40px" }, void 0), (0, jsx_runtime_1.jsxs)(Column_1.AutoColumn, Object.assign({ gap: "4px", style: { marginLeft: '20px' } }, { children: [(0, jsx_runtime_1.jsx)(theme_1.TYPE.body, Object.assign({ fontWeight: 600 }, { children: tempList.name }), void 0), (0, jsx_runtime_1.jsxs)(theme_1.TYPE.main, Object.assign({ fontSize: '12px' }, { children: [tempList.tokens.length, " tokens"] }), void 0)] }), void 0)] }, void 0), isImported ? ((0, jsx_runtime_1.jsxs)(Row_1.RowFixed, { children: [(0, jsx_runtime_1.jsx)(theme_1.IconWrapper, Object.assign({ stroke: theme.text2, size: "16px", marginRight: '10px' }, { children: (0, jsx_runtime_1.jsx)(react_feather_1.CheckCircle, {}, void 0) }), void 0), (0, jsx_runtime_1.jsx)(theme_1.TYPE.body, Object.assign({ color: theme.text2 }, { children: "Loaded" }), void 0)] }, void 0)) : ((0, jsx_runtime_1.jsx)(Button_1.ButtonPrimary, Object.assign({ style: { fontSize: '14px' }, padding: "6px 8px", width: "fit-content", onClick: handleImport }, { children: "Import" }), void 0))] }, void 0) }), void 0) }), void 0)), (0, jsx_runtime_1.jsx)(styleds_1.Separator, {}, void 0), (0, jsx_runtime_1.jsx)(ListContainer, { children: (0, jsx_runtime_1.jsx)(Column_1.AutoColumn, Object.assign({ gap: "md" }, { children: sortedLists.map((listUrl) => ((0, jsx_runtime_1.jsx)(ListRow, { listUrl: listUrl }, listUrl))) }), void 0) }, void 0)] }, void 0));
}
exports.ManageLists = ManageLists;
