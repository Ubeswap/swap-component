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
exports.AdvancedSwapDetails = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_i18next_1 = require("react-i18next");
const styled_components_1 = __importStar(require("styled-components"));
const hooks_1 = require("../../state/user/hooks");
const theme_1 = require("../../theme");
const Column_1 = require("../Column");
const QuestionHelper_1 = __importDefault(require("../QuestionHelper"));
const Row_1 = require("../Row");
const TradeDetails_1 = require("./routing/TradeDetails");
const SwapRoute_1 = __importDefault(require("./SwapRoute"));
function TradeSummary({ trade, allowedSlippage }) {
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(Column_1.AutoColumn, Object.assign({ style: { padding: '0 16px' } }, { children: (0, jsx_runtime_1.jsx)(TradeDetails_1.TradeDetails, { trade: trade, allowedSlippage: allowedSlippage }) })) }));
}
const InfoLink = (0, styled_components_1.default)(theme_1.ExternalLink) `
  width: 100%;
  border: 1px solid ${({ theme }) => theme.bg3};
  padding: 6px 6px;
  border-radius: 8px;
  text-align: center;
  font-size: 14px;
  color: ${({ theme }) => theme.text1};
`;
function AdvancedSwapDetails({ trade }) {
    const theme = (0, react_1.useContext)(styled_components_1.ThemeContext);
    const [allowedSlippage] = (0, hooks_1.useUserSlippageTolerance)();
    const path = trade && trade.path;
    const showRoute = Boolean(path && path.length > 2);
    const { t } = (0, react_i18next_1.useTranslation)();
    return ((0, jsx_runtime_1.jsx)(Column_1.AutoColumn, Object.assign({ gap: "0px" }, { children: trade && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(TradeSummary, { trade: trade, allowedSlippage: allowedSlippage }), showRoute && ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsxs)(Row_1.RowBetween, Object.assign({ style: { padding: '0 16px' } }, { children: [(0, jsx_runtime_1.jsxs)("span", Object.assign({ style: { display: 'flex', alignItems: 'center' } }, { children: [(0, jsx_runtime_1.jsx)(theme_1.TYPE.black, Object.assign({ fontSize: 14, fontWeight: 400, color: theme.text2 }, { children: t('Route') })), (0, jsx_runtime_1.jsx)(QuestionHelper_1.default, { text: t('RoutingThroughTheseTokensResultedInTheBestPriceForYourTrade') })] })), (0, jsx_runtime_1.jsx)(SwapRoute_1.default, { trade: trade })] })) })), !trade.hidePairAnalytics && !showRoute && ((0, jsx_runtime_1.jsx)(Column_1.AutoColumn, Object.assign({ style: { padding: '12px 16px 0 16px' } }, { children: (0, jsx_runtime_1.jsxs)(InfoLink, Object.assign({ href: 'https://info.ubeswap.org/pair/' + trade.route.pairs[0].liquidityToken.address, target: "_blank" }, { children: [t('ViewPairAnalytics'), " \u2197"] })) })))] })) })));
}
exports.AdvancedSwapDetails = AdvancedSwapDetails;
