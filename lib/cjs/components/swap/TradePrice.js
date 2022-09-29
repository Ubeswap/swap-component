"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const sdk_1 = require("@ubeswap/sdk");
const react_1 = require("react");
const react_feather_1 = require("react-feather");
const rebass_1 = require("rebass");
const styled_components_1 = require("styled-components");
const styleds_1 = require("./styleds");
function TradePrice({ price, showInverted, setShowInverted }) {
    var _a, _b, _c, _d;
    const theme = (0, react_1.useContext)(styled_components_1.ThemeContext);
    let formattedPrice;
    if (price) {
        if (showInverted) {
            if (!sdk_1.JSBI.equal(price.denominator, sdk_1.JSBI.BigInt(0))) {
                formattedPrice = price.toSignificant(6);
            }
        }
        else {
            if (!sdk_1.JSBI.equal(price.numerator, sdk_1.JSBI.BigInt(0))) {
                formattedPrice = price.invert().toSignificant(6);
            }
        }
    }
    const show = Boolean((price === null || price === void 0 ? void 0 : price.baseCurrency) && (price === null || price === void 0 ? void 0 : price.quoteCurrency));
    const label = showInverted
        ? `${(_a = price === null || price === void 0 ? void 0 : price.quoteCurrency) === null || _a === void 0 ? void 0 : _a.symbol} per ${(_b = price === null || price === void 0 ? void 0 : price.baseCurrency) === null || _b === void 0 ? void 0 : _b.symbol}`
        : `${(_c = price === null || price === void 0 ? void 0 : price.baseCurrency) === null || _c === void 0 ? void 0 : _c.symbol} per ${(_d = price === null || price === void 0 ? void 0 : price.quoteCurrency) === null || _d === void 0 ? void 0 : _d.symbol}`;
    return ((0, jsx_runtime_1.jsx)(rebass_1.Text, Object.assign({ fontWeight: 500, fontSize: 14, color: theme.text2, style: { justifyContent: 'center', alignItems: 'center', display: 'flex' } }, { children: show ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [formattedPrice !== null && formattedPrice !== void 0 ? formattedPrice : '-', " ", label, (0, jsx_runtime_1.jsx)(styleds_1.StyledBalanceMaxMini, Object.assign({ onClick: () => setShowInverted(!showInverted) }, { children: (0, jsx_runtime_1.jsx)(react_feather_1.Repeat, { size: 14 }) }))] })) : ('-') })));
}
exports.default = TradePrice;
