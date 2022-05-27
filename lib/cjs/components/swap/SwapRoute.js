"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_feather_1 = require("react-feather");
const rebass_1 = require("rebass");
const styled_components_1 = require("styled-components");
const theme_1 = require("../../theme");
const trade_1 = require("./routing/trade");
exports.default = (0, react_1.memo)(function SwapRoute({ trade }) {
    const theme = (0, react_1.useContext)(styled_components_1.ThemeContext);
    const path = trade instanceof trade_1.UbeswapTrade ? trade.path : trade.route.path;
    return ((0, jsx_runtime_1.jsx)(rebass_1.Flex, Object.assign({ flexWrap: "wrap", width: "100%", justifyContent: "flex-end", alignItems: "center" }, { children: path.map((token, i, path) => {
            const isLastItem = i === path.length - 1;
            const currency = token;
            return ((0, jsx_runtime_1.jsxs)(react_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(rebass_1.Flex, Object.assign({ alignItems: "end" }, { children: (0, jsx_runtime_1.jsx)(theme_1.TYPE.black, Object.assign({ fontSize: 14, color: theme.text1, ml: "0.125rem", mr: "0.125rem" }, { children: currency.symbol }), void 0) }), void 0), isLastItem ? null : (0, jsx_runtime_1.jsx)(react_feather_1.ChevronRight, { size: 12, color: theme.text2 }, void 0)] }, i));
        }) }), void 0));
});
