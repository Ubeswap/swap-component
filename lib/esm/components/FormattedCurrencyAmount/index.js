import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
import { Fraction, JSBI } from '@ubeswap/sdk';
const CURRENCY_AMOUNT_MIN = new Fraction(JSBI.BigInt(1), JSBI.BigInt(1000000));
export default function FormattedTokenAmount({ currencyAmount, significantDigits = 4, }) {
    return (_jsx(_Fragment, { children: currencyAmount.equalTo(JSBI.BigInt(0))
            ? '0'
            : currencyAmount.greaterThan(CURRENCY_AMOUNT_MIN)
                ? currencyAmount.toSignificant(significantDigits)
                : `<${CURRENCY_AMOUNT_MIN.toSignificant(1)}` }));
}
