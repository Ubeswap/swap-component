"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const use_contractkit_1 = require("@celo-tools/use-contractkit");
const sdk_1 = require("@ubeswap/sdk");
const react_1 = require("react");
const react_redux_1 = require("react-redux");
const react_window_1 = require("react-window");
const rebass_1 = require("rebass");
const styled_components_1 = __importDefault(require("styled-components"));
const Tokens_1 = require("../../hooks/Tokens");
const hooks_1 = require("../../state/lists/hooks");
const hooks_2 = require("../../state/wallet/hooks");
const theme_1 = require("../../theme");
const utils_1 = require("../../utils");
const Column_1 = __importDefault(require("../Column"));
const CurrencyLogo_1 = __importDefault(require("../CurrencyLogo"));
const Loader_1 = __importDefault(require("../Loader"));
const Row_1 = require("../Row");
const Tooltip_1 = require("../Tooltip");
const ImportRow_1 = __importDefault(require("./ImportRow"));
const styleds_1 = require("./styleds");
function currencyKey(currency) {
    return currency instanceof sdk_1.Token ? currency.address : '';
}
const StyledBalanceText = (0, styled_components_1.default)(rebass_1.Text) `
  white-space: nowrap;
  overflow: hidden;
  max-width: 5rem;
  text-overflow: ellipsis;
`;
const Tag = styled_components_1.default.div `
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
    return (0, jsx_runtime_1.jsx)(StyledBalanceText, Object.assign({ title: balance.toExact() }, { children: balance.toSignificant(4) }));
}
const TagContainer = styled_components_1.default.div `
  display: flex;
  justify-content: flex-end;
`;
function TokenTags({ currency }) {
    if (!(currency instanceof hooks_1.WrappedTokenInfo)) {
        return (0, jsx_runtime_1.jsx)("span", {});
    }
    const tags = currency.tags;
    if (!tags || tags.length === 0)
        return (0, jsx_runtime_1.jsx)("span", {});
    const tag = tags[0];
    return ((0, jsx_runtime_1.jsxs)(TagContainer, { children: [(0, jsx_runtime_1.jsx)(Tooltip_1.MouseoverTooltip, Object.assign({ text: tag.description }, { children: (0, jsx_runtime_1.jsx)(Tag, { children: tag.name }, tag.id) })), tags.length > 1 ? ((0, jsx_runtime_1.jsx)(Tooltip_1.MouseoverTooltip, Object.assign({ text: tags
                    .slice(1)
                    .map(({ name, description }) => `${name}: ${description}`)
                    .join('; \n') }, { children: (0, jsx_runtime_1.jsx)(Tag, { children: "..." }) }))) : null] }));
}
function CurrencyRow({ currency, onSelect, isSelected, otherSelected, style, }) {
    const { address } = (0, use_contractkit_1.useContractKit)();
    const accountInfo = (0, react_redux_1.useSelector)((state) => state.swap.accountInfo);
    const account = accountInfo ? accountInfo.account : address;
    const key = currencyKey(currency);
    const selectedTokenList = (0, hooks_1.useCombinedActiveList)();
    const isOnSelectedList = (0, utils_1.isTokenOnList)(selectedTokenList, currency);
    const customAdded = (0, Tokens_1.useIsUserAddedToken)(currency);
    const balance = (0, hooks_2.useCurrencyBalance)(account !== null && account !== void 0 ? account : undefined, currency);
    // only show add or remove buttons if not on selected list
    return ((0, jsx_runtime_1.jsxs)(styleds_1.MenuItem, Object.assign({ style: style, className: `token-item-${key}`, onClick: () => (isSelected ? null : onSelect()), disabled: isSelected, selected: otherSelected }, { children: [(0, jsx_runtime_1.jsx)(CurrencyLogo_1.default, { currency: currency, size: '24px' }), (0, jsx_runtime_1.jsxs)(Column_1.default, { children: [(0, jsx_runtime_1.jsx)(rebass_1.Text, Object.assign({ title: currency.name, fontWeight: 500 }, { children: currency.symbol })), (0, jsx_runtime_1.jsxs)(theme_1.TYPE.darkGray, Object.assign({ ml: "0px", fontSize: '12px', fontWeight: 300 }, { children: [currency.name, " ", !isOnSelectedList && customAdded && '• Added by user'] }))] }), (0, jsx_runtime_1.jsx)(TokenTags, { currency: currency }), (0, jsx_runtime_1.jsx)(Row_1.RowFixed, Object.assign({ style: { justifySelf: 'flex-end' } }, { children: balance ? (0, jsx_runtime_1.jsx)(Balance, { balance: balance }) : account ? (0, jsx_runtime_1.jsx)(Loader_1.default, {}) : null }))] })));
}
function CurrencyList({ height, currencies, selectedCurrency, onCurrencySelect, otherCurrency, fixedListRef, showImportView, setImportToken, }) {
    const itemData = currencies;
    const inactiveTokens = (0, Tokens_1.useAllInactiveTokens)();
    const Row = (0, react_1.useCallback)(({ data, index, style }) => {
        const currency = data[index];
        const isSelected = Boolean(selectedCurrency && (0, sdk_1.currencyEquals)(selectedCurrency, currency));
        const otherSelected = Boolean(otherCurrency && (0, sdk_1.currencyEquals)(otherCurrency, currency));
        const handleSelect = () => onCurrencySelect(currency);
        const token = currency;
        const showImport = inactiveTokens && token && Object.keys(inactiveTokens).includes(token.address);
        if (showImport && token) {
            return ((0, jsx_runtime_1.jsx)(ImportRow_1.default, { style: style, token: token, showImportView: showImportView, setImportToken: setImportToken, dim: true }));
        }
        else {
            return ((0, jsx_runtime_1.jsx)(CurrencyRow, { style: style, currency: currency, isSelected: isSelected, onSelect: handleSelect, otherSelected: otherSelected }));
        }
    }, [inactiveTokens, onCurrencySelect, otherCurrency, selectedCurrency, setImportToken, showImportView]);
    const itemKey = (0, react_1.useCallback)((index, data) => currencyKey(data[index]), []);
    return ((0, jsx_runtime_1.jsx)(react_window_1.FixedSizeList, Object.assign({ height: height, ref: fixedListRef, width: "100%", itemData: itemData, itemCount: itemData.length, itemSize: 56, itemKey: itemKey }, { children: Row })));
}
exports.default = CurrencyList;
