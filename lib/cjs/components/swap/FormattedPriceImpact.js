"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const constants_1 = require("../../constants");
const prices_1 = require("../../utils/prices");
const styleds_1 = require("./styleds");
/**
 * Formatted version of price impact text with warning colors
 */
function FormattedPriceImpact({ priceImpact }) {
    return ((0, jsx_runtime_1.jsx)(styleds_1.ErrorText, Object.assign({ fontWeight: 500, fontSize: 14, severity: (0, prices_1.warningSeverity)(priceImpact) }, { children: priceImpact ? (priceImpact.lessThan(constants_1.ONE_BIPS) ? '<0.01%' : `${priceImpact.toFixed(2)}%`) : '-' })));
}
exports.default = FormattedPriceImpact;
