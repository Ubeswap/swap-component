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
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const use_contractkit_1 = require("@celo-tools/use-contractkit");
const react_1 = require("react");
const react_feather_1 = require("react-feather");
const react_i18next_1 = require("react-i18next");
const react_redux_1 = require("react-redux");
const styled_components_1 = __importStar(require("styled-components"));
const theme_1 = require("../../theme");
const components_1 = require("../../theme/components");
const Column_1 = require("../Column");
const Row_1 = require("../Row");
const RowNoFlex = (0, styled_components_1.default)(Row_1.AutoRow) `
  flex-wrap: nowrap;
`;
function TransactionPopup({ hash, success, summary, }) {
    const { network } = (0, use_contractkit_1.useContractKit)();
    const accountInfo = (0, react_redux_1.useSelector)((state) => state.swap.accountInfo);
    const chainId = (accountInfo ? accountInfo.chainId : network.chainId);
    const explorerUrl = accountInfo ? accountInfo.explorerUrl : network.explorer;
    const theme = (0, react_1.useContext)(styled_components_1.ThemeContext);
    const { t } = (0, react_i18next_1.useTranslation)();
    return ((0, jsx_runtime_1.jsxs)(RowNoFlex, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ style: { paddingRight: 16 } }, { children: success ? (0, jsx_runtime_1.jsx)(react_feather_1.CheckCircle, { color: theme.green1, size: 24 }) : (0, jsx_runtime_1.jsx)(react_feather_1.AlertCircle, { color: theme.red1, size: 24 }) })), (0, jsx_runtime_1.jsxs)(Column_1.AutoColumn, Object.assign({ gap: "8px" }, { children: [(0, jsx_runtime_1.jsx)(theme_1.TYPE.body, Object.assign({ fontWeight: 500 }, { children: summary !== null && summary !== void 0 ? summary : `${t('Hash')}: ` + hash.slice(0, 8) + '...' + hash.slice(58, 65) })), chainId && (0, jsx_runtime_1.jsx)(components_1.ExternalLink, Object.assign({ href: `${explorerUrl}/tx/${hash}` }, { children: t('ViewOnCeloExplorer') }))] }))] }));
}
exports.default = TransactionPopup;
