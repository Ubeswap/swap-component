"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UbeswapTradeDetails = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const sdk_1 = require("@ubeswap/sdk");
const react_1 = require("react");
const actions_1 = require("state/swap/actions");
const styled_components_1 = require("styled-components");
const theme_1 = require("../../../../theme");
const prices_1 = require("../../../../utils/prices");
const QuestionHelper_1 = __importDefault(require("../../../QuestionHelper"));
const Row_1 = require("../../../Row");
const FormattedPriceImpact_1 = __importDefault(require("../../FormattedPriceImpact"));
const UbeswapTradeDetails = ({ trade, allowedSlippage }) => {
    var _a, _b, _c, _d;
    const theme = (0, react_1.useContext)(styled_components_1.ThemeContext);
    const { priceImpactWithoutFee, realizedLPFee } = (0, prices_1.computeTradePriceBreakdown)(trade);
    const isExactIn = trade.tradeType === sdk_1.TradeType.EXACT_INPUT;
    const slippageAdjustedAmounts = (0, prices_1.computeSlippageAdjustedAmounts)(trade, allowedSlippage);
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)(Row_1.RowBetween, { children: [(0, jsx_runtime_1.jsxs)(Row_1.RowFixed, { children: [(0, jsx_runtime_1.jsx)(theme_1.TYPE.black, Object.assign({ fontSize: 14, fontWeight: 400, color: theme.text2 }, { children: isExactIn ? 'Minimum received' : 'Maximum sold' }), void 0), (0, jsx_runtime_1.jsx)(QuestionHelper_1.default, { text: "Your transaction will revert if there is a large, unfavorable price movement before it is confirmed." }, void 0)] }, void 0), (0, jsx_runtime_1.jsx)(Row_1.RowFixed, { children: (0, jsx_runtime_1.jsx)(theme_1.TYPE.black, Object.assign({ color: theme.text1, fontSize: 14 }, { children: isExactIn
                                ? (_b = `${(_a = slippageAdjustedAmounts[actions_1.Field.OUTPUT]) === null || _a === void 0 ? void 0 : _a.toSignificant(4)} ${trade.outputAmount.currency.symbol}`) !== null && _b !== void 0 ? _b : '-'
                                : (_d = `${(_c = slippageAdjustedAmounts[actions_1.Field.INPUT]) === null || _c === void 0 ? void 0 : _c.toSignificant(4)} ${trade.inputAmount.currency.symbol}`) !== null && _d !== void 0 ? _d : '-' }), void 0) }, void 0)] }, void 0), (0, jsx_runtime_1.jsxs)(Row_1.RowBetween, { children: [(0, jsx_runtime_1.jsxs)(Row_1.RowFixed, { children: [(0, jsx_runtime_1.jsx)(theme_1.TYPE.black, Object.assign({ fontSize: 14, fontWeight: 400, color: theme.text2 }, { children: "Price Impact" }), void 0), (0, jsx_runtime_1.jsx)(QuestionHelper_1.default, { text: "The difference between the market price and estimated price due to trade size." }, void 0)] }, void 0), (0, jsx_runtime_1.jsx)(FormattedPriceImpact_1.default, { priceImpact: priceImpactWithoutFee }, void 0)] }, void 0), (0, jsx_runtime_1.jsxs)(Row_1.RowBetween, { children: [(0, jsx_runtime_1.jsxs)(Row_1.RowFixed, { children: [(0, jsx_runtime_1.jsx)(theme_1.TYPE.black, Object.assign({ fontSize: 14, fontWeight: 400, color: theme.text2 }, { children: "Liquidity Provider Fee" }), void 0), (0, jsx_runtime_1.jsx)(QuestionHelper_1.default, { text: "A portion of each trade (0.25%) goes to liquidity providers as a protocol incentive. Another portion of each trade (0.05%) buys back UBE and sends it to the community reserve." }, void 0)] }, void 0), (0, jsx_runtime_1.jsx)(theme_1.TYPE.black, Object.assign({ fontSize: 14, color: theme.text1 }, { children: realizedLPFee ? `${realizedLPFee.toSignificant(4)} ${trade.inputAmount.currency.symbol}` : '-' }), void 0)] }, void 0)] }, void 0));
};
exports.UbeswapTradeDetails = UbeswapTradeDetails;
