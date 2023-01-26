"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const use_contractkit_1 = require("@celo-tools/use-contractkit");
const react_feather_1 = require("react-feather");
const react_redux_1 = require("react-redux");
const styled_components_1 = __importDefault(require("styled-components"));
const Tokens_1 = require("../../hooks/Tokens");
const useTheme_1 = __importDefault(require("../../hooks/useTheme"));
const hooks_1 = require("../../state/lists/hooks");
const theme_1 = require("../../theme");
const Button_1 = require("../Button");
const Column_1 = require("../Column");
const CurrencyLogo_1 = __importDefault(require("../CurrencyLogo"));
const ListLogo_1 = __importDefault(require("../ListLogo"));
const Row_1 = require("../Row");
const TokenSection = styled_components_1.default.div `
  padding: 4px 20px;
  height: 56px;
  display: grid;
  grid-template-columns: auto minmax(auto, 1fr) auto;
  grid-gap: 16px;
  align-items: center;

  opacity: ${({ dim }) => (dim ? '0.6' : '1')};
`;
const CheckIcon = (0, styled_components_1.default)(react_feather_1.CheckCircle) `
  height: 16px;
  width: 16px;
  margin-right: 6px;
  stroke: ${({ theme }) => theme.green1};
`;
const NameOverflow = styled_components_1.default.div `
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 140px;
  font-size: 12px;
`;
function ImportRow({ token, style, dim, showImportView, setImportToken, }) {
    var _a, _b;
    // gloabls
    const { network } = (0, use_contractkit_1.useContractKit)();
    const accountInfo = (0, react_redux_1.useSelector)((state) => state.swap.accountInfo);
    const chainId = accountInfo ? accountInfo.chainId : network.chainId;
    const theme = (0, useTheme_1.default)();
    // check if token comes from list
    const inactiveTokenList = (0, hooks_1.useCombinedInactiveList)();
    const list = chainId && ((_b = (_a = inactiveTokenList === null || inactiveTokenList === void 0 ? void 0 : inactiveTokenList[chainId]) === null || _a === void 0 ? void 0 : _a[token.address]) === null || _b === void 0 ? void 0 : _b.list);
    // check if already active on list or local storage tokens
    const isAdded = (0, Tokens_1.useIsUserAddedToken)(token);
    const isActive = (0, Tokens_1.useIsTokenActive)(token);
    return ((0, jsx_runtime_1.jsxs)(TokenSection, Object.assign({ style: style }, { children: [(0, jsx_runtime_1.jsx)(CurrencyLogo_1.default, { currency: token, size: '24px', style: { opacity: dim ? '0.6' : '1' } }), (0, jsx_runtime_1.jsxs)(Column_1.AutoColumn, Object.assign({ gap: "4px", style: { opacity: dim ? '0.6' : '1' } }, { children: [(0, jsx_runtime_1.jsxs)(Row_1.AutoRow, { children: [(0, jsx_runtime_1.jsx)(theme_1.TYPE.body, Object.assign({ fontWeight: 500 }, { children: token.symbol })), (0, jsx_runtime_1.jsx)(theme_1.TYPE.darkGray, Object.assign({ ml: "8px", fontWeight: 300 }, { children: (0, jsx_runtime_1.jsx)(NameOverflow, Object.assign({ title: token.name }, { children: token.name })) }))] }), list && list.logoURI && ((0, jsx_runtime_1.jsxs)(Row_1.RowFixed, { children: [(0, jsx_runtime_1.jsxs)(theme_1.TYPE.small, Object.assign({ mr: "4px", color: theme.text3 }, { children: ["via ", list.name] })), (0, jsx_runtime_1.jsx)(ListLogo_1.default, { logoURI: list.logoURI, size: "12px" })] }))] })), !isActive && !isAdded ? ((0, jsx_runtime_1.jsx)(Button_1.ButtonPrimary, Object.assign({ width: "fit-content", padding: "6px 12px", fontWeight: 500, fontSize: "14px", onClick: () => {
                    setImportToken && setImportToken(token);
                    showImportView();
                } }, { children: "Import" }))) : ((0, jsx_runtime_1.jsxs)(Row_1.RowFixed, Object.assign({ style: { minWidth: 'fit-content' } }, { children: [(0, jsx_runtime_1.jsx)(CheckIcon, {}), (0, jsx_runtime_1.jsx)(theme_1.TYPE.main, Object.assign({ color: theme.green1 }, { children: "Active" }))] })))] })));
}
exports.default = ImportRow;
