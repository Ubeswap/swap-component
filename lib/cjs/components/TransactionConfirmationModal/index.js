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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionErrorContent = exports.ConfirmationModalContent = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const use_contractkit_1 = require("@celo-tools/use-contractkit");
const react_1 = require("react");
const react_feather_1 = require("react-feather");
const react_i18next_1 = require("react-i18next");
const rebass_1 = require("rebass");
const styled_components_1 = __importStar(require("styled-components"));
const blue_loader_svg_1 = __importDefault(require("../../assets/images/blue-loader.svg"));
const theme_1 = require("../../theme");
const components_1 = require("../../theme/components");
const Button_1 = require("../Button");
const Column_1 = require("../Column");
const Modal_1 = __importDefault(require("../Modal"));
const Row_1 = require("../Row");
const Wrapper = styled_components_1.default.div `
  width: 100%;
`;
const Section = (0, styled_components_1.default)(Column_1.AutoColumn) `
  padding: 24px;
`;
const BottomSection = (0, styled_components_1.default)(Section) `
  background-color: ${({ theme }) => theme.bg2};
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
`;
const ConfirmedIcon = (0, styled_components_1.default)(Column_1.ColumnCenter) `
  padding: 60px 0;
`;
function ConfirmationPendingContent({ onDismiss, pendingText }) {
    const { t } = (0, react_i18next_1.useTranslation)();
    return ((0, jsx_runtime_1.jsx)(Wrapper, { children: (0, jsx_runtime_1.jsxs)(Section, { children: [(0, jsx_runtime_1.jsxs)(Row_1.RowBetween, { children: [(0, jsx_runtime_1.jsx)("div", {}, void 0), (0, jsx_runtime_1.jsx)(components_1.CloseIcon, { onClick: onDismiss }, void 0)] }, void 0), (0, jsx_runtime_1.jsx)(ConfirmedIcon, { children: (0, jsx_runtime_1.jsx)(components_1.CustomLightSpinner, { src: blue_loader_svg_1.default, alt: "loader", size: '90px' }, void 0) }, void 0), (0, jsx_runtime_1.jsxs)(Column_1.AutoColumn, Object.assign({ gap: "12px", justify: 'center' }, { children: [(0, jsx_runtime_1.jsx)(rebass_1.Text, Object.assign({ fontWeight: 500, fontSize: 20 }, { children: t('WaitingForConfirmation') }), void 0), (0, jsx_runtime_1.jsx)(Column_1.AutoColumn, Object.assign({ gap: "12px", justify: 'center' }, { children: (0, jsx_runtime_1.jsx)(rebass_1.Text, Object.assign({ fontWeight: 600, fontSize: 14, color: "", textAlign: "center" }, { children: pendingText }), void 0) }), void 0), (0, jsx_runtime_1.jsx)(rebass_1.Text, Object.assign({ fontSize: 12, color: "#565A69", textAlign: "center" }, { children: t('ConfirmThisTransactionInYourWallet') }), void 0)] }), void 0)] }, void 0) }, void 0));
}
function TransactionSubmittedContent({ onDismiss, chainId, hash, }) {
    const theme = (0, react_1.useContext)(styled_components_1.ThemeContext);
    const { network } = (0, use_contractkit_1.useContractKit)();
    const { t } = (0, react_i18next_1.useTranslation)();
    return ((0, jsx_runtime_1.jsx)(Wrapper, { children: (0, jsx_runtime_1.jsxs)(Section, { children: [(0, jsx_runtime_1.jsxs)(Row_1.RowBetween, { children: [(0, jsx_runtime_1.jsx)("div", {}, void 0), (0, jsx_runtime_1.jsx)(components_1.CloseIcon, { onClick: onDismiss }, void 0)] }, void 0), (0, jsx_runtime_1.jsx)(ConfirmedIcon, { children: (0, jsx_runtime_1.jsx)(react_feather_1.ArrowUpCircle, { strokeWidth: 0.5, size: 90, color: theme.primary1 }, void 0) }, void 0), (0, jsx_runtime_1.jsxs)(Column_1.AutoColumn, Object.assign({ gap: "12px", justify: 'center' }, { children: [(0, jsx_runtime_1.jsx)(rebass_1.Text, Object.assign({ fontWeight: 500, fontSize: 20 }, { children: t('TransactionSubmitted') }), void 0), chainId && hash && ((0, jsx_runtime_1.jsx)(theme_1.ExternalLink, Object.assign({ href: `${network.explorer}/tx/${hash}` }, { children: (0, jsx_runtime_1.jsx)(rebass_1.Text, Object.assign({ fontWeight: 500, fontSize: 14, color: theme.primary1 }, { children: t('ViewOnCeloExplorer') }), void 0) }), void 0)), (0, jsx_runtime_1.jsx)(Button_1.ButtonPrimary, Object.assign({ onClick: onDismiss, style: { margin: '20px 0 0 0' } }, { children: (0, jsx_runtime_1.jsx)(rebass_1.Text, Object.assign({ fontWeight: 500, fontSize: 20 }, { children: t('Close') }), void 0) }), void 0)] }), void 0)] }, void 0) }, void 0));
}
function ConfirmationModalContent({ title, bottomContent, onDismiss, topContent, }) {
    return ((0, jsx_runtime_1.jsxs)(Wrapper, { children: [(0, jsx_runtime_1.jsxs)(Section, { children: [(0, jsx_runtime_1.jsxs)(Row_1.RowBetween, { children: [(0, jsx_runtime_1.jsx)(rebass_1.Text, Object.assign({ fontWeight: 500, fontSize: 20 }, { children: title }), void 0), (0, jsx_runtime_1.jsx)(components_1.CloseIcon, { onClick: onDismiss }, void 0)] }, void 0), topContent()] }, void 0), (0, jsx_runtime_1.jsx)(BottomSection, Object.assign({ gap: "12px" }, { children: bottomContent() }), void 0)] }, void 0));
}
exports.ConfirmationModalContent = ConfirmationModalContent;
function TransactionErrorContent({ message, onDismiss }) {
    const theme = (0, react_1.useContext)(styled_components_1.ThemeContext);
    const { t } = (0, react_i18next_1.useTranslation)();
    return ((0, jsx_runtime_1.jsxs)(Wrapper, { children: [(0, jsx_runtime_1.jsxs)(Section, { children: [(0, jsx_runtime_1.jsxs)(Row_1.RowBetween, { children: [(0, jsx_runtime_1.jsx)(rebass_1.Text, Object.assign({ fontWeight: 500, fontSize: 20 }, { children: t('Error') }), void 0), (0, jsx_runtime_1.jsx)(components_1.CloseIcon, { onClick: onDismiss }, void 0)] }, void 0), (0, jsx_runtime_1.jsxs)(Column_1.AutoColumn, Object.assign({ style: { marginTop: 20, padding: '2rem 0' }, gap: "24px", justify: "center" }, { children: [(0, jsx_runtime_1.jsx)(react_feather_1.AlertTriangle, { color: theme.red1, style: { strokeWidth: 1.5 }, size: 64 }, void 0), (0, jsx_runtime_1.jsx)(rebass_1.Text, Object.assign({ fontWeight: 500, fontSize: 16, color: theme.red1, style: { textAlign: 'center', width: '85%' } }, { children: message }), void 0)] }), void 0)] }, void 0), (0, jsx_runtime_1.jsx)(BottomSection, Object.assign({ gap: "12px" }, { children: (0, jsx_runtime_1.jsx)(Button_1.ButtonPrimary, Object.assign({ onClick: onDismiss }, { children: "Dismiss" }), void 0) }), void 0)] }, void 0));
}
exports.TransactionErrorContent = TransactionErrorContent;
function TransactionConfirmationModal({ isOpen, onDismiss, attemptingTxn, hash, pendingText, content, }) {
    const { network } = (0, use_contractkit_1.useContractKit)();
    const chainId = network.chainId;
    if (!chainId)
        return null;
    // confirmation screen
    return ((0, jsx_runtime_1.jsx)(Modal_1.default, Object.assign({ isOpen: isOpen, onDismiss: onDismiss, maxHeight: 90 }, { children: attemptingTxn ? ((0, jsx_runtime_1.jsx)(ConfirmationPendingContent, { onDismiss: onDismiss, pendingText: pendingText }, void 0)) : hash ? ((0, jsx_runtime_1.jsx)(TransactionSubmittedContent, { chainId: chainId, hash: hash, onDismiss: onDismiss }, void 0)) : (content()) }), void 0));
}
exports.default = TransactionConfirmationModal;
