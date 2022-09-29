"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrencySearch = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const use_contractkit_1 = require("@celo-tools/use-contractkit");
const sdk_1 = require("@ubeswap/sdk");
const react_1 = require("react");
const react_feather_1 = require("react-feather");
const react_ga_1 = __importDefault(require("react-ga"));
const react_i18next_1 = require("react-i18next");
const react_virtualized_auto_sizer_1 = __importDefault(require("react-virtualized-auto-sizer"));
const rebass_1 = require("rebass");
const styled_components_1 = __importDefault(require("styled-components"));
const Tokens_1 = require("../../hooks/Tokens");
const useOnClickOutside_1 = require("../../hooks/useOnClickOutside");
const useTheme_1 = __importDefault(require("../../hooks/useTheme"));
const useToggle_1 = __importDefault(require("../../hooks/useToggle"));
const theme_1 = require("../../theme");
const utils_1 = require("../../utils");
const Button_1 = require("../Button");
const Column_1 = __importDefault(require("../Column"));
const Row_1 = __importStar(require("../Row"));
const CommonBases_1 = __importDefault(require("./CommonBases"));
const CurrencyList_1 = __importDefault(require("./CurrencyList"));
const filtering_1 = require("./filtering");
const ImportRow_1 = __importDefault(require("./ImportRow"));
const sorting_1 = require("./sorting");
const styleds_1 = require("./styleds");
const ContentWrapper = (0, styled_components_1.default)(Column_1.default) `
  width: 100%;
  flex: 1 1;
  position: relative;
`;
const Footer = styled_components_1.default.div `
  width: 100%;
  border-radius: 20px;
  padding: 20px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  background-color: ${({ theme }) => theme.bg1};
  border-top: 1px solid ${({ theme }) => theme.bg2};
`;
function CurrencySearch({ selectedCurrency, onCurrencySelect, otherSelectedCurrency, showCommonBases, onDismiss, isOpen, showManageView, showImportView, setImportToken, chainId = use_contractkit_1.ChainId.Mainnet, }) {
    const { t } = (0, react_i18next_1.useTranslation)();
    const theme = (0, useTheme_1.default)();
    // refs for fixed size lists
    const fixedList = (0, react_1.useRef)();
    const [searchQuery, setSearchQuery] = (0, react_1.useState)('');
    const [invertSearchOrder] = (0, react_1.useState)(false);
    const allTokens = (0, Tokens_1.useAllTokens)(chainId);
    // const inactiveTokens: Token[] | undefined = useFoundOnInactiveList(searchQuery)
    // if they input an address, use it
    const isAddressSearch = (0, utils_1.isAddress)(searchQuery);
    const searchToken = (0, Tokens_1.useToken)(searchQuery);
    const searchTokenIsAdded = (0, Tokens_1.useIsUserAddedToken)(searchToken);
    (0, react_1.useEffect)(() => {
        if (isAddressSearch) {
            react_ga_1.default.event({
                category: `${t('CurrencySelect')}`,
                action: `${t('SearchByAddress')}`,
                label: isAddressSearch,
            });
        }
    }, [t, isAddressSearch]);
    const showETH = (0, react_1.useMemo)(() => {
        const s = searchQuery.toLowerCase().trim();
        return s === '' || s === 'e' || s === 'et' || s === 'eth';
    }, [searchQuery]);
    const tokenComparator = (0, sorting_1.useTokenComparator)(invertSearchOrder);
    const filteredTokens = (0, react_1.useMemo)(() => {
        return (0, filtering_1.filterTokens)(Object.values(allTokens), searchQuery);
    }, [allTokens, searchQuery]);
    const filteredSortedTokens = (0, react_1.useMemo)(() => {
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
    const handleCurrencySelect = (0, react_1.useCallback)((currency) => {
        onCurrencySelect(currency);
        onDismiss();
    }, [onDismiss, onCurrencySelect]);
    // clear the input on open
    (0, react_1.useEffect)(() => {
        if (isOpen)
            setSearchQuery('');
    }, [isOpen]);
    // manage focus on modal show
    const inputRef = (0, react_1.useRef)();
    const handleInput = (0, react_1.useCallback)((event) => {
        var _a;
        const input = event.target.value;
        const checksummedInput = (0, utils_1.isAddress)(input);
        setSearchQuery(checksummedInput || input);
        (_a = fixedList.current) === null || _a === void 0 ? void 0 : _a.scrollTo(0);
    }, []);
    const handleEnter = (0, react_1.useCallback)((e) => {
        var _a;
        if (e.key === 'Enter') {
            const s = searchQuery.toLowerCase().trim();
            if (s === 'cusd') {
                handleCurrencySelect(sdk_1.cUSD[chainId]);
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
    const [open, toggle] = (0, useToggle_1.default)(false);
    const node = (0, react_1.useRef)();
    (0, useOnClickOutside_1.useOnClickOutside)(node, open ? toggle : undefined);
    // if no results on main list, show option to expand into inactive
    const [showExpanded, setShowExpanded] = (0, react_1.useState)(false);
    const inactiveTokens = (0, Tokens_1.useFoundOnInactiveList)(searchQuery);
    // reset expanded results on query reset
    (0, react_1.useEffect)(() => {
        if (searchQuery === '') {
            setShowExpanded(false);
        }
    }, [setShowExpanded, searchQuery]);
    return ((0, jsx_runtime_1.jsxs)(ContentWrapper, { children: [(0, jsx_runtime_1.jsxs)(styleds_1.PaddedColumn, Object.assign({ gap: "16px" }, { children: [(0, jsx_runtime_1.jsxs)(Row_1.RowBetween, { children: [(0, jsx_runtime_1.jsx)(rebass_1.Text, Object.assign({ fontWeight: 500, fontSize: 16 }, { children: t('selectToken') })), (0, jsx_runtime_1.jsx)(theme_1.CloseIcon, { onClick: onDismiss })] }), (0, jsx_runtime_1.jsx)(Row_1.default, { children: (0, jsx_runtime_1.jsx)(styleds_1.SearchInput, { type: "text", id: "token-search-input", placeholder: t('tokenSearchPlaceholder'), autoComplete: "off", value: searchQuery, ref: inputRef, onChange: handleInput, onKeyDown: handleEnter }) }), showCommonBases && ((0, jsx_runtime_1.jsx)(CommonBases_1.default, { chainId: chainId, onSelect: handleCurrencySelect, selectedCurrency: selectedCurrency }))] })), (0, jsx_runtime_1.jsx)(styleds_1.Separator, {}), searchToken && !searchTokenIsAdded ? ((0, jsx_runtime_1.jsx)(Column_1.default, Object.assign({ style: { padding: '20px 0', height: '100%' } }, { children: (0, jsx_runtime_1.jsx)(ImportRow_1.default, { token: searchToken, showImportView: showImportView, setImportToken: setImportToken }) }))) : (filteredSortedTokens === null || filteredSortedTokens === void 0 ? void 0 : filteredSortedTokens.length) > 0 || (showExpanded && inactiveTokens && inactiveTokens.length > 0) ? ((0, jsx_runtime_1.jsx)("div", Object.assign({ style: { flex: '1' } }, { children: (0, jsx_runtime_1.jsx)(react_virtualized_auto_sizer_1.default, Object.assign({ disableWidth: true }, { children: ({ height }) => ((0, jsx_runtime_1.jsx)(CurrencyList_1.default, { height: height, showETH: showETH, currencies: showExpanded && inactiveTokens ? filteredSortedTokens.concat(inactiveTokens) : filteredSortedTokens, onCurrencySelect: handleCurrencySelect, otherCurrency: otherSelectedCurrency, selectedCurrency: selectedCurrency, fixedListRef: fixedList, showImportView: showImportView, setImportToken: setImportToken })) })) }))) : ((0, jsx_runtime_1.jsxs)(Column_1.default, Object.assign({ style: { padding: '20px', height: '100%' } }, { children: [(0, jsx_runtime_1.jsxs)(theme_1.TYPE.main, Object.assign({ color: theme.text3, textAlign: "center", mb: "20px" }, { children: [t('NoResultsFoundInActiveLists'), "."] })), inactiveTokens &&
                        inactiveTokens.length > 0 &&
                        !(searchToken && !searchTokenIsAdded) &&
                        searchQuery.length > 1 &&
                        (filteredSortedTokens === null || filteredSortedTokens === void 0 ? void 0 : filteredSortedTokens.length) === 0 && (
                    // expand button in line with no results
                    (0, jsx_runtime_1.jsx)(Row_1.default, Object.assign({ align: "center", width: "100%", justify: "center" }, { children: (0, jsx_runtime_1.jsx)(Button_1.ButtonLight, Object.assign({ width: "fit-content", borderRadius: "12px", padding: "8px 12px", onClick: () => setShowExpanded(!showExpanded) }, { children: !showExpanded
                                ? `${t('Show')} ${inactiveTokens.length} ${t('MoreInactive')} ${inactiveTokens.length === 1 ? t('Token') : t('Tokens')}`
                                : `${t('HideExpandedSearch')}` })) })))] }))), inactiveTokens &&
                inactiveTokens.length > 0 &&
                !(searchToken && !searchTokenIsAdded) &&
                (searchQuery.length > 1 || showExpanded) &&
                ((filteredSortedTokens === null || filteredSortedTokens === void 0 ? void 0 : filteredSortedTokens.length) !== 0 || showExpanded) && (
            // button fixed to bottom
            (0, jsx_runtime_1.jsx)(Row_1.default, Object.assign({ align: "center", width: "100%", justify: "center", style: { position: 'absolute', bottom: '80px', left: 0 } }, { children: (0, jsx_runtime_1.jsx)(Button_1.ButtonLight, Object.assign({ width: "fit-content", borderRadius: "12px", padding: "8px 12px", onClick: () => setShowExpanded(!showExpanded) }, { children: !showExpanded
                        ? `${t('Show')} ${inactiveTokens.length} ${t('MoreInactive')} ${inactiveTokens.length === 1 ? t('Token') : t('Tokens')}`
                        : `${t('HideExpandedSearch')}` })) }))), (0, jsx_runtime_1.jsx)(Footer, { children: (0, jsx_runtime_1.jsx)(Row_1.default, Object.assign({ justify: "center" }, { children: (0, jsx_runtime_1.jsx)(theme_1.ButtonText, Object.assign({ onClick: showManageView, color: theme.blue1, className: "list-token-manage-button" }, { children: (0, jsx_runtime_1.jsxs)(Row_1.RowFixed, { children: [(0, jsx_runtime_1.jsx)(theme_1.IconWrapper, Object.assign({ size: "16px", marginRight: "6px" }, { children: (0, jsx_runtime_1.jsx)(react_feather_1.Edit, {}) })), (0, jsx_runtime_1.jsx)(theme_1.TYPE.main, Object.assign({ color: theme.blue1 }, { children: t('manage') }))] }) })) })) })] }));
}
exports.CurrencySearch = CurrencySearch;
