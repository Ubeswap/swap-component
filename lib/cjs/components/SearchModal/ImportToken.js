"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImportToken = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const use_contractkit_1 = require("@celo-tools/use-contractkit");
const polished_1 = require("polished");
const react_1 = require("react");
const react_feather_1 = require("react-feather");
const react_i18next_1 = require("react-i18next");
const styled_components_1 = __importDefault(require("styled-components"));
const useTheme_1 = __importDefault(require("../../hooks/useTheme"));
const hooks_1 = require("../../state/lists/hooks");
const hooks_2 = require("../../state/user/hooks");
const theme_1 = require("../../theme");
const components_1 = require("../../theme/components");
const Button_1 = require("../Button");
const Card_1 = __importDefault(require("../Card"));
const Column_1 = require("../Column");
const CurrencyLogo_1 = __importDefault(require("../CurrencyLogo"));
const ListLogo_1 = __importDefault(require("../ListLogo"));
const Row_1 = require("../Row");
const styleds_1 = require("../swap/styleds");
const styleds_2 = require("./styleds");
const Wrapper = styled_components_1.default.div `
  position: relative;
  width: 100%;
  overflow: auto;
`;
const WarningWrapper = (0, styled_components_1.default)(Card_1.default) `
  background-color: ${({ theme, highWarning }) => highWarning ? (0, polished_1.transparentize)(0.8, theme.red1) : (0, polished_1.transparentize)(0.8, theme.yellow2)};
  width: fit-content;
`;
const AddressText = (0, styled_components_1.default)(theme_1.TYPE.blue) `
  font-size: 12px;

  ${({ theme }) => theme.mediaWidth.upToSmall `
    font-size: 10px;
`}
`;
function ImportToken({ tokens, onBack, onDismiss, handleCurrencySelect }) {
    var _a, _b, _c, _d, _e, _f;
    const theme = (0, useTheme_1.default)();
    const { network } = (0, use_contractkit_1.useContractKit)();
    const chainId = network.chainId;
    const [confirmed, setConfirmed] = (0, react_1.useState)(false);
    const addToken = (0, hooks_2.useAddUserToken)();
    const { t } = (0, react_i18next_1.useTranslation)();
    // use for showing import source on inactive tokens
    const inactiveTokenList = (0, hooks_1.useCombinedInactiveList)();
    // higher warning severity if either is not on a list
    const fromLists = (chainId && ((_c = (_a = inactiveTokenList === null || inactiveTokenList === void 0 ? void 0 : inactiveTokenList[chainId]) === null || _a === void 0 ? void 0 : _a[(_b = tokens[0]) === null || _b === void 0 ? void 0 : _b.address]) === null || _c === void 0 ? void 0 : _c.list)) ||
        (chainId && ((_f = (_d = inactiveTokenList === null || inactiveTokenList === void 0 ? void 0 : inactiveTokenList[chainId]) === null || _d === void 0 ? void 0 : _d[(_e = tokens[1]) === null || _e === void 0 ? void 0 : _e.address]) === null || _f === void 0 ? void 0 : _f.list));
    return ((0, jsx_runtime_1.jsxs)(Wrapper, { children: [(0, jsx_runtime_1.jsx)(styleds_2.PaddedColumn, Object.assign({ gap: "14px", style: { width: '100%', flex: '1 1' } }, { children: (0, jsx_runtime_1.jsxs)(Row_1.RowBetween, { children: [onBack ? (0, jsx_runtime_1.jsx)(react_feather_1.ArrowLeft, { style: { cursor: 'pointer' }, onClick: onBack }) : (0, jsx_runtime_1.jsx)("div", {}), (0, jsx_runtime_1.jsxs)(theme_1.TYPE.mediumHeader, { children: [t('Import'), " ", tokens.length > 1 ? `${t('Tokens')}` : `${t('Token')}`] }), onDismiss ? (0, jsx_runtime_1.jsx)(theme_1.CloseIcon, { onClick: onDismiss }) : (0, jsx_runtime_1.jsx)("div", {})] }) })), (0, jsx_runtime_1.jsx)(styleds_1.SectionBreak, {}), (0, jsx_runtime_1.jsxs)(styleds_2.PaddedColumn, Object.assign({ gap: "md" }, { children: [tokens.map((token) => {
                        var _a, _b;
                        const list = chainId ? (_b = (_a = inactiveTokenList === null || inactiveTokenList === void 0 ? void 0 : inactiveTokenList[chainId]) === null || _a === void 0 ? void 0 : _a[token.address]) === null || _b === void 0 ? void 0 : _b.list : undefined;
                        return ((0, jsx_runtime_1.jsx)(Card_1.default, Object.assign({ backgroundColor: theme.bg2, className: ".token-warning-container" }, { children: (0, jsx_runtime_1.jsxs)(Column_1.AutoColumn, Object.assign({ gap: "10px" }, { children: [(0, jsx_runtime_1.jsxs)(Row_1.AutoRow, Object.assign({ align: "center" }, { children: [(0, jsx_runtime_1.jsx)(CurrencyLogo_1.default, { currency: token, size: '24px' }), (0, jsx_runtime_1.jsx)(theme_1.TYPE.body, Object.assign({ ml: "8px", mr: "8px", fontWeight: 500 }, { children: token.symbol })), (0, jsx_runtime_1.jsx)(theme_1.TYPE.darkGray, Object.assign({ fontWeight: 300 }, { children: token.name }))] })), chainId && ((0, jsx_runtime_1.jsx)(components_1.ExternalLink, Object.assign({ href: `${network.explorer}/address/${token.address}` }, { children: (0, jsx_runtime_1.jsx)(AddressText, { children: token.address }) }))), list !== undefined ? ((0, jsx_runtime_1.jsxs)(Row_1.RowFixed, { children: [list.logoURI && (0, jsx_runtime_1.jsx)(ListLogo_1.default, { logoURI: list.logoURI, size: "12px" }), (0, jsx_runtime_1.jsxs)(theme_1.TYPE.small, Object.assign({ ml: "6px", color: theme.text3 }, { children: ["via ", list.name] }))] })) : ((0, jsx_runtime_1.jsx)(WarningWrapper, Object.assign({ borderRadius: "4px", padding: "4px", highWarning: true }, { children: (0, jsx_runtime_1.jsxs)(Row_1.RowFixed, { children: [(0, jsx_runtime_1.jsx)(react_feather_1.AlertTriangle, { stroke: theme.red1, size: "10px" }), (0, jsx_runtime_1.jsx)(theme_1.TYPE.body, Object.assign({ color: theme.red1, ml: "4px", fontSize: "10px", fontWeight: 500 }, { children: t('UnknownSource') }))] }) })))] })) }), 'import' + token.address));
                    }), (0, jsx_runtime_1.jsxs)(Card_1.default, Object.assign({ style: { backgroundColor: fromLists ? (0, polished_1.transparentize)(0.8, theme.yellow2) : (0, polished_1.transparentize)(0.8, theme.red1) } }, { children: [(0, jsx_runtime_1.jsxs)(Column_1.AutoColumn, Object.assign({ justify: "center", style: { textAlign: 'center', gap: '16px', marginBottom: '12px' } }, { children: [(0, jsx_runtime_1.jsx)(react_feather_1.AlertTriangle, { stroke: fromLists ? theme.yellow2 : theme.red1, size: 32 }), (0, jsx_runtime_1.jsx)(theme_1.TYPE.body, Object.assign({ fontWeight: 600, fontSize: 20, color: fromLists ? theme.yellow2 : theme.red1 }, { children: t('TradeAtYourOwnRisk') }))] })), (0, jsx_runtime_1.jsxs)(Column_1.AutoColumn, Object.assign({ style: { textAlign: 'center', gap: '16px', marginBottom: '12px' } }, { children: [(0, jsx_runtime_1.jsx)(theme_1.TYPE.body, Object.assign({ fontWeight: 400, color: fromLists ? theme.yellow2 : theme.red1 }, { children: t('tokenExp') })), (0, jsx_runtime_1.jsx)(theme_1.TYPE.body, Object.assign({ fontWeight: 600, color: fromLists ? theme.yellow2 : theme.red1 }, { children: t('tokenImportRisk') }))] })), (0, jsx_runtime_1.jsxs)(Row_1.AutoRow, Object.assign({ justify: "center", style: { cursor: 'pointer' }, onClick: () => setConfirmed(!confirmed) }, { children: [(0, jsx_runtime_1.jsx)(styleds_2.Checkbox, { className: ".understand-checkbox", name: "confirmed", type: "checkbox", checked: confirmed, onChange: () => setConfirmed(!confirmed) }), (0, jsx_runtime_1.jsx)(theme_1.TYPE.body, Object.assign({ ml: "10px", fontSize: "16px", color: fromLists ? theme.yellow2 : theme.red1, fontWeight: 500 }, { children: t('IUnderstand') }))] }))] })), (0, jsx_runtime_1.jsx)(Button_1.ButtonPrimary, Object.assign({ disabled: !confirmed, altDisabledStyle: true, borderRadius: "20px", padding: "10px 1rem", onClick: () => {
                            tokens.map((token) => addToken(token));
                            handleCurrencySelect && handleCurrencySelect(tokens[0]);
                        }, className: ".token-dismiss-button" }, { children: t('Import') }))] }))] }));
}
exports.ImportToken = ImportToken;
