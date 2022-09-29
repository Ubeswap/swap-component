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
exports.SubmittedView = exports.LoadingView = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const use_contractkit_1 = require("@celo-tools/use-contractkit");
const react_1 = require("react");
const react_feather_1 = require("react-feather");
const react_i18next_1 = require("react-i18next");
const styled_components_1 = __importStar(require("styled-components"));
const blue_loader_svg_1 = __importDefault(require("../../assets/images/blue-loader.svg"));
const theme_1 = require("../../theme");
const components_1 = require("../../theme/components");
const Column_1 = require("../Column");
const Row_1 = require("../Row");
const ConfirmOrLoadingWrapper = styled_components_1.default.div `
  width: 100%;
  padding: 24px;
`;
const ConfirmedIcon = (0, styled_components_1.default)(Column_1.ColumnCenter) `
  padding: 60px 0;
`;
function LoadingView({ children, onDismiss }) {
    const { t } = (0, react_i18next_1.useTranslation)();
    return ((0, jsx_runtime_1.jsxs)(ConfirmOrLoadingWrapper, { children: [(0, jsx_runtime_1.jsxs)(Row_1.RowBetween, { children: [(0, jsx_runtime_1.jsx)("div", {}), (0, jsx_runtime_1.jsx)(theme_1.CloseIcon, { onClick: onDismiss })] }), (0, jsx_runtime_1.jsx)(ConfirmedIcon, { children: (0, jsx_runtime_1.jsx)(theme_1.CustomLightSpinner, { src: blue_loader_svg_1.default, alt: "loader", size: '90px' }) }), (0, jsx_runtime_1.jsxs)(Column_1.AutoColumn, Object.assign({ gap: "100px", justify: 'center' }, { children: [children, (0, jsx_runtime_1.jsx)(theme_1.TYPE.subHeader, { children: t('ConfirmThisTransactionInYourWallet') })] }))] }));
}
exports.LoadingView = LoadingView;
function SubmittedView({ children, onDismiss, hash, }) {
    const theme = (0, react_1.useContext)(styled_components_1.ThemeContext);
    const { network } = (0, use_contractkit_1.useContractKit)();
    const chainId = network.chainId;
    const { t } = (0, react_i18next_1.useTranslation)();
    return ((0, jsx_runtime_1.jsxs)(ConfirmOrLoadingWrapper, { children: [(0, jsx_runtime_1.jsxs)(Row_1.RowBetween, { children: [(0, jsx_runtime_1.jsx)("div", {}), (0, jsx_runtime_1.jsx)(theme_1.CloseIcon, { onClick: onDismiss })] }), (0, jsx_runtime_1.jsx)(ConfirmedIcon, { children: (0, jsx_runtime_1.jsx)(react_feather_1.ArrowUpCircle, { strokeWidth: 0.5, size: 90, color: theme.primary1 }) }), (0, jsx_runtime_1.jsxs)(Column_1.AutoColumn, Object.assign({ gap: "100px", justify: 'center' }, { children: [children, chainId && hash && ((0, jsx_runtime_1.jsx)(components_1.ExternalLink, Object.assign({ href: `${network.explorer}/tx/${hash}`, style: { marginLeft: '4px' } }, { children: (0, jsx_runtime_1.jsx)(theme_1.TYPE.subHeader, { children: t('ViewTransactionOnCeloExplorer') }) })))] }))] }));
}
exports.SubmittedView = SubmittedView;
