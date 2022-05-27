"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoolaRouterTradeDetails = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const UbeswapTradeDetails_1 = require("./UbeswapTradeDetails");
const MoolaRouterTradeDetails = ({ trade, allowedSlippage }) => {
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(UbeswapTradeDetails_1.UbeswapTradeDetails, { trade: trade, allowedSlippage: allowedSlippage }, void 0) }, void 0));
};
exports.MoolaRouterTradeDetails = MoolaRouterTradeDetails;
