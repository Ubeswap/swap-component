"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TradeDetails = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const describeTrade_1 = require("../describeTrade");
const MoolaDirectTradeDetails_1 = require("./MoolaDirectTradeDetails");
const MoolaRouterTradeDetails_1 = require("./MoolaRouterTradeDetails");
const UbeswapTradeDetails_1 = require("./UbeswapTradeDetails");
const TradeDetails = ({ trade, allowedSlippage }) => {
    const { routingMethod } = (0, describeTrade_1.describeTrade)(trade);
    if (routingMethod === describeTrade_1.RoutingMethod.MOOLA) {
        return (0, jsx_runtime_1.jsx)(MoolaDirectTradeDetails_1.MoolaDirectTradeDetails, { trade: trade }, void 0);
    }
    if (routingMethod === describeTrade_1.RoutingMethod.MOOLA_ROUTER) {
        return (0, jsx_runtime_1.jsx)(MoolaRouterTradeDetails_1.MoolaRouterTradeDetails, { trade: trade, allowedSlippage: allowedSlippage }, void 0);
    }
    return (0, jsx_runtime_1.jsx)(UbeswapTradeDetails_1.UbeswapTradeDetails, { trade: trade, allowedSlippage: allowedSlippage }, void 0);
};
exports.TradeDetails = TradeDetails;
