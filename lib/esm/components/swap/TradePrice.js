import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { JSBI } from '@ubeswap/sdk';
import { useContext } from 'react';
import { Repeat } from 'react-feather';
import { Text } from 'rebass';
import { ThemeContext } from 'styled-components';
import { StyledBalanceMaxMini } from './styleds';
export default function TradePrice({ price, showInverted, setShowInverted }) {
    var _a, _b, _c, _d;
    const theme = useContext(ThemeContext);
    let formattedPrice;
    if (price) {
        if (showInverted) {
            if (!JSBI.equal(price.denominator, JSBI.BigInt(0))) {
                formattedPrice = price.toSignificant(6);
            }
        }
        else {
            if (!JSBI.equal(price.numerator, JSBI.BigInt(0))) {
                formattedPrice = price.invert().toSignificant(6);
            }
        }
    }
    const show = Boolean((price === null || price === void 0 ? void 0 : price.baseCurrency) && (price === null || price === void 0 ? void 0 : price.quoteCurrency));
    const label = showInverted
        ? `${(_a = price === null || price === void 0 ? void 0 : price.quoteCurrency) === null || _a === void 0 ? void 0 : _a.symbol} per ${(_b = price === null || price === void 0 ? void 0 : price.baseCurrency) === null || _b === void 0 ? void 0 : _b.symbol}`
        : `${(_c = price === null || price === void 0 ? void 0 : price.baseCurrency) === null || _c === void 0 ? void 0 : _c.symbol} per ${(_d = price === null || price === void 0 ? void 0 : price.quoteCurrency) === null || _d === void 0 ? void 0 : _d.symbol}`;
    return (_jsx(Text, Object.assign({ fontWeight: 500, fontSize: 14, color: theme.text2, style: { justifyContent: 'center', alignItems: 'center', display: 'flex' } }, { children: show ? (_jsxs(_Fragment, { children: [formattedPrice !== null && formattedPrice !== void 0 ? formattedPrice : '-', " ", label, _jsx(StyledBalanceMaxMini, Object.assign({ onClick: () => setShowInverted(!showInverted) }, { children: _jsx(Repeat, { size: 14 }, void 0) }), void 0)] }, void 0)) : ('-') }), void 0));
}
