import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment, memo, useContext } from 'react';
import { ChevronRight } from 'react-feather';
import { Flex } from 'rebass';
import { ThemeContext } from 'styled-components';
import { TYPE } from '../../theme';
import { UbeswapTrade } from './routing/trade';
export default memo(function SwapRoute({ trade }) {
    const theme = useContext(ThemeContext);
    const path = trade instanceof UbeswapTrade ? trade.path : trade.route.path;
    return (_jsx(Flex, Object.assign({ flexWrap: "wrap", width: "100%", justifyContent: "flex-end", alignItems: "center" }, { children: path.map((token, i, path) => {
            const isLastItem = i === path.length - 1;
            const currency = token;
            return (_jsxs(Fragment, { children: [_jsx(Flex, Object.assign({ alignItems: "end" }, { children: _jsx(TYPE.black, Object.assign({ fontSize: 14, color: theme.text1, ml: "0.125rem", mr: "0.125rem" }, { children: currency.symbol }), void 0) }), void 0), isLastItem ? null : _jsx(ChevronRight, { size: 12, color: theme.text2 }, void 0)] }, i));
        }) }), void 0));
});
