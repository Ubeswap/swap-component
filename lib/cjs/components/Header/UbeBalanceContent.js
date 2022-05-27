"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const use_contractkit_1 = require("@celo-tools/use-contractkit");
const sdk_1 = require("@ubeswap/sdk");
const Loader_1 = __importDefault(require("components/Loader"));
const react_feather_1 = require("react-feather");
const react_i18next_1 = require("react-i18next");
const styled_components_1 = __importDefault(require("styled-components"));
const relevantDigits_1 = require("utils/relevantDigits");
const useCUSDPrice_1 = require("utils/useCUSDPrice");
const token_logo_png_1 = __importDefault(require("../../assets/images/token-logo.png"));
const constants_1 = require("../../constants");
const TotalSupply_1 = require("../../data/TotalSupply");
const hooks_1 = require("../../state/stake/hooks");
const hooks_2 = require("../../state/wallet/hooks");
const theme_1 = require("../../theme");
const Column_1 = require("../Column");
const styled_1 = require("../earn/styled");
const Row_1 = require("../Row");
const useCirculatingSupply_1 = require("./useCirculatingSupply");
const ContentWrapper = (0, styled_components_1.default)(Column_1.AutoColumn) `
  width: 100%;
`;
const ModalUpper = (0, styled_components_1.default)(styled_1.DataCard) `
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  background: radial-gradient(76.02% 75.41% at 1.84% 0%, ${({ theme }) => theme.primary1} 0%, #021d43 100%), #edeef2;
  padding: 0.5rem;
`;
const StyledClose = (0, styled_components_1.default)(react_feather_1.X) `
  position: absolute;
  right: 16px;
  top: 16px;

  :hover {
    cursor: pointer;
  }
`;
/**
 * Content for balance stats modal
 */
function UbeBalanceContent({ setShowUbeBalanceModal }) {
    var _a, _b, _c;
    const { address: account, network } = (0, use_contractkit_1.useContractKit)();
    const chainId = network.chainId;
    const ube = chainId ? constants_1.UBE[chainId] : undefined;
    const total = (0, hooks_2.useAggregateUbeBalance)();
    const ubeBalance = (0, hooks_2.useTokenBalance)(account !== null && account !== void 0 ? account : undefined, ube);
    const ubeToClaim = (0, hooks_1.useTotalUbeEarned)();
    const totalSupply = (0, TotalSupply_1.useTotalSupply)(ube);
    const ubePrice = (0, useCUSDPrice_1.useCUSDPrice)(ube);
    const circulation = (0, useCirculatingSupply_1.useCirculatingSupply)();
    const { t } = (0, react_i18next_1.useTranslation)();
    return ((0, jsx_runtime_1.jsx)(ContentWrapper, Object.assign({ gap: "lg" }, { children: (0, jsx_runtime_1.jsxs)(ModalUpper, { children: [(0, jsx_runtime_1.jsx)(styled_1.CardNoise, {}, void 0), (0, jsx_runtime_1.jsx)(styled_1.CardSection, Object.assign({ gap: "md" }, { children: (0, jsx_runtime_1.jsxs)(Row_1.RowBetween, { children: [(0, jsx_runtime_1.jsx)(theme_1.TYPE.white, Object.assign({ color: "white" }, { children: "Your UBE Breakdown" }), void 0), (0, jsx_runtime_1.jsx)(StyledClose, { stroke: "white", onClick: () => setShowUbeBalanceModal(false) }, void 0)] }, void 0) }), void 0), (0, jsx_runtime_1.jsx)(styled_1.Break, {}, void 0), account && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)(styled_1.CardSection, Object.assign({ gap: "sm" }, { children: [(0, jsx_runtime_1.jsxs)(Column_1.AutoColumn, Object.assign({ gap: "md", justify: "center" }, { children: [(0, jsx_runtime_1.jsx)(theme_1.UbeTokenAnimated, { width: "48px", src: token_logo_png_1.default }, void 0), ' ', (0, jsx_runtime_1.jsx)(theme_1.TYPE.white, Object.assign({ fontSize: 48, fontWeight: 600, color: "white" }, { children: (0, relevantDigits_1.relevantDigits)(total) }), void 0)] }), void 0), (0, jsx_runtime_1.jsxs)(Column_1.AutoColumn, Object.assign({ gap: "md" }, { children: [(0, jsx_runtime_1.jsxs)(Row_1.RowBetween, { children: [(0, jsx_runtime_1.jsxs)(theme_1.TYPE.white, Object.assign({ color: "white" }, { children: [t('Balance'), ":"] }), void 0), (0, jsx_runtime_1.jsx)(theme_1.TYPE.white, Object.assign({ color: "white" }, { children: ubeBalance === null || ubeBalance === void 0 ? void 0 : ubeBalance.toFixed(2, { groupSeparator: ',' }) }), void 0)] }, void 0), (0, jsx_runtime_1.jsxs)(Row_1.RowBetween, { children: [(0, jsx_runtime_1.jsxs)(theme_1.TYPE.white, Object.assign({ color: "white" }, { children: [t('Unclaimed'), ":"] }), void 0), (0, jsx_runtime_1.jsxs)(theme_1.TYPE.white, Object.assign({ color: "white" }, { children: [ubeToClaim === null || ubeToClaim === void 0 ? void 0 : ubeToClaim.toFixed(4, { groupSeparator: ',' }), ' ', ubeToClaim && ubeToClaim.greaterThan('0') && ((0, jsx_runtime_1.jsxs)(theme_1.StyledInternalLink, Object.assign({ onClick: () => setShowUbeBalanceModal(false), to: "/farm" }, { children: ["(", t('claim'), ")"] }), void 0))] }), void 0)] }, void 0)] }), void 0)] }), void 0), (0, jsx_runtime_1.jsx)(styled_1.Break, {}, void 0)] }, void 0)), (0, jsx_runtime_1.jsx)(styled_1.CardSection, Object.assign({ gap: "sm" }, { children: (0, jsx_runtime_1.jsxs)(Column_1.AutoColumn, Object.assign({ gap: "md" }, { children: [(0, jsx_runtime_1.jsxs)(Row_1.RowBetween, { children: [(0, jsx_runtime_1.jsxs)(theme_1.TYPE.white, Object.assign({ color: "white" }, { children: [t('UbePrice'), ":"] }), void 0), (0, jsx_runtime_1.jsxs)(theme_1.TYPE.white, Object.assign({ color: "white" }, { children: ["$", (_a = ubePrice === null || ubePrice === void 0 ? void 0 : ubePrice.toFixed(2)) !== null && _a !== void 0 ? _a : '-'] }), void 0)] }, void 0), (0, jsx_runtime_1.jsxs)(Row_1.RowBetween, { children: [(0, jsx_runtime_1.jsxs)(theme_1.TYPE.white, Object.assign({ color: "white" }, { children: [t('UbeInCirculation'), ":"] }), void 0), (0, jsx_runtime_1.jsx)(theme_1.TYPE.white, Object.assign({ color: "white" }, { children: (_b = circulation === null || circulation === void 0 ? void 0 : circulation.toFixed(0, { groupSeparator: ',' })) !== null && _b !== void 0 ? _b : (0, jsx_runtime_1.jsx)(Loader_1.default, {}, void 0) }), void 0)] }, void 0), (0, jsx_runtime_1.jsxs)(Row_1.RowBetween, { children: [(0, jsx_runtime_1.jsx)(theme_1.TYPE.white, Object.assign({ color: "white" }, { children: t('TotalSupply') }), void 0), (0, jsx_runtime_1.jsx)(theme_1.TYPE.white, Object.assign({ color: "white" }, { children: (_c = totalSupply === null || totalSupply === void 0 ? void 0 : totalSupply.toFixed(0, { groupSeparator: ',' })) !== null && _c !== void 0 ? _c : (0, jsx_runtime_1.jsx)(Loader_1.default, {}, void 0) }), void 0)] }, void 0), ube && ube.chainId === sdk_1.ChainId.MAINNET ? ((0, jsx_runtime_1.jsx)(theme_1.ExternalLink, Object.assign({ href: `https://info.ubeswap.org/token/${ube.address}` }, { children: t('ViewUbeAnalytics') }), void 0)) : null] }), void 0) }), void 0), (0, jsx_runtime_1.jsx)(styled_1.CardNoise, {}, void 0)] }, void 0) }), void 0));
}
exports.default = UbeBalanceContent;
