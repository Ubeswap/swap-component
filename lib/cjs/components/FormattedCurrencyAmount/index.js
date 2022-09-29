"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const sdk_1 = require("@ubeswap/sdk");
const CURRENCY_AMOUNT_MIN = new sdk_1.Fraction(sdk_1.JSBI.BigInt(1), sdk_1.JSBI.BigInt(1000000));
function FormattedTokenAmount({ currencyAmount, significantDigits = 4, }) {
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: currencyAmount.equalTo(sdk_1.JSBI.BigInt(0))
            ? '0'
            : currencyAmount.greaterThan(CURRENCY_AMOUNT_MIN)
                ? currencyAmount.toSignificant(significantDigits)
                : `<${CURRENCY_AMOUNT_MIN.toSignificant(1)}` }));
}
exports.default = FormattedTokenAmount;
