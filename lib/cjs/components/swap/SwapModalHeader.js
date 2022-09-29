"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const sdk_1 = require("@ubeswap/sdk");
const react_1 = require("react");
const react_feather_1 = require("react-feather");
const rebass_1 = require("rebass");
const styled_components_1 = require("styled-components");
const actions_1 = require("../../state/swap/actions");
const theme_1 = require("../../theme");
const utils_1 = require("../../utils");
const prices_1 = require("../../utils/prices");
const Button_1 = require("../Button");
const Column_1 = require("../Column");
const CurrencyLogo_1 = __importDefault(require("../CurrencyLogo"));
const Row_1 = require("../Row");
const MoolaDirectTrade_1 = require("./routing/moola/MoolaDirectTrade");
const styleds_1 = require("./styleds");
function SwapModalHeader({ trade, allowedSlippage, recipient, showAcceptChanges, onAcceptChanges, }) {
    var _a, _b;
    const slippageAdjustedAmounts = (0, react_1.useMemo)(() => (0, prices_1.computeSlippageAdjustedAmounts)(trade, allowedSlippage), [trade, allowedSlippage]);
    const { priceImpactWithoutFee } = (0, react_1.useMemo)(() => (0, prices_1.computeTradePriceBreakdown)(trade), [trade]);
    const priceImpactSeverity = (0, prices_1.warningSeverity)(priceImpactWithoutFee);
    const theme = (0, react_1.useContext)(styled_components_1.ThemeContext);
    return ((0, jsx_runtime_1.jsxs)(Column_1.AutoColumn, Object.assign({ gap: 'md', style: { marginTop: '20px' } }, { children: [(0, jsx_runtime_1.jsxs)(Row_1.RowBetween, Object.assign({ align: "flex-end" }, { children: [(0, jsx_runtime_1.jsxs)(Row_1.RowFixed, Object.assign({ gap: '0px' }, { children: [(0, jsx_runtime_1.jsx)(CurrencyLogo_1.default, { currency: trade.inputAmount.currency, size: '24px', style: { marginRight: '12px' } }), (0, jsx_runtime_1.jsx)(styleds_1.TruncatedText, Object.assign({ fontSize: 24, fontWeight: 500, color: showAcceptChanges && trade.tradeType === sdk_1.TradeType.EXACT_OUTPUT ? theme.primary1 : '' }, { children: trade.inputAmount.toSignificant(6) }))] })), (0, jsx_runtime_1.jsx)(Row_1.RowFixed, Object.assign({ gap: '0px' }, { children: (0, jsx_runtime_1.jsx)(rebass_1.Text, Object.assign({ fontSize: 24, fontWeight: 500, style: { marginLeft: '10px' } }, { children: trade.inputAmount.currency.symbol })) }))] })), (0, jsx_runtime_1.jsx)(Row_1.RowFixed, { children: (0, jsx_runtime_1.jsx)(react_feather_1.ArrowDown, { size: "16", color: theme.text2, style: { marginLeft: '4px', minWidth: '16px' } }) }), (0, jsx_runtime_1.jsxs)(Row_1.RowBetween, Object.assign({ align: "flex-end" }, { children: [(0, jsx_runtime_1.jsxs)(Row_1.RowFixed, Object.assign({ gap: '0px' }, { children: [(0, jsx_runtime_1.jsx)(CurrencyLogo_1.default, { currency: trade.outputAmount.currency, size: '24px', style: { marginRight: '12px' } }), (0, jsx_runtime_1.jsx)(styleds_1.TruncatedText, Object.assign({ fontSize: 24, fontWeight: 500, color: priceImpactSeverity > 2
                                    ? theme.red1
                                    : showAcceptChanges && trade.tradeType === sdk_1.TradeType.EXACT_INPUT
                                        ? theme.primary1
                                        : '' }, { children: trade.outputAmount.toSignificant(6) }))] })), (0, jsx_runtime_1.jsx)(Row_1.RowFixed, Object.assign({ gap: '0px' }, { children: (0, jsx_runtime_1.jsx)(rebass_1.Text, Object.assign({ fontSize: 24, fontWeight: 500, style: { marginLeft: '10px' } }, { children: trade.outputAmount.currency.symbol })) }))] })), showAcceptChanges ? ((0, jsx_runtime_1.jsx)(styleds_1.SwapShowAcceptChanges, Object.assign({ justify: "flex-start", gap: '0px' }, { children: (0, jsx_runtime_1.jsxs)(Row_1.RowBetween, { children: [(0, jsx_runtime_1.jsxs)(Row_1.RowFixed, { children: [(0, jsx_runtime_1.jsx)(react_feather_1.AlertTriangle, { size: 20, style: { marginRight: '8px', minWidth: 24 } }), (0, jsx_runtime_1.jsx)(theme_1.TYPE.main, Object.assign({ color: theme.primary1 }, { children: " Price Updated" }))] }), (0, jsx_runtime_1.jsx)(Button_1.ButtonPrimary, Object.assign({ style: { padding: '.5rem', width: 'fit-content', fontSize: '0.825rem', borderRadius: '12px' }, onClick: onAcceptChanges }, { children: "Accept" }))] }) }))) : null, !(trade instanceof MoolaDirectTrade_1.MoolaDirectTrade) && ((0, jsx_runtime_1.jsx)(Column_1.AutoColumn, Object.assign({ justify: "flex-start", gap: "sm", style: { padding: '12px 0 0 0px' } }, { children: trade.tradeType === sdk_1.TradeType.EXACT_INPUT ? ((0, jsx_runtime_1.jsxs)(theme_1.TYPE.italic, Object.assign({ textAlign: "left", style: { width: '100%' } }, { children: [`Output is estimated. You will receive at least `, (0, jsx_runtime_1.jsxs)("b", { children: [(_a = slippageAdjustedAmounts[actions_1.Field.OUTPUT]) === null || _a === void 0 ? void 0 : _a.toSignificant(6), " ", trade.outputAmount.currency.symbol] }), ' or the transaction will revert.'] }))) : ((0, jsx_runtime_1.jsxs)(theme_1.TYPE.italic, Object.assign({ textAlign: "left", style: { width: '100%' } }, { children: [`Input is estimated. You will sell at most `, (0, jsx_runtime_1.jsxs)("b", { children: [(_b = slippageAdjustedAmounts[actions_1.Field.INPUT]) === null || _b === void 0 ? void 0 : _b.toSignificant(6), " ", trade.inputAmount.currency.symbol] }), ' or the transaction will revert.'] }))) }))), recipient !== null ? ((0, jsx_runtime_1.jsx)(Column_1.AutoColumn, Object.assign({ justify: "flex-start", gap: "sm", style: { padding: '12px 0 0 0px' } }, { children: (0, jsx_runtime_1.jsxs)(theme_1.TYPE.main, { children: ["Output will be sent to", ' ', (0, jsx_runtime_1.jsx)("b", Object.assign({ title: recipient }, { children: (0, utils_1.isAddress)(recipient) ? (0, utils_1.shortenAddress)(recipient) : recipient }))] }) }))) : null] })));
}
exports.default = SwapModalHeader;
