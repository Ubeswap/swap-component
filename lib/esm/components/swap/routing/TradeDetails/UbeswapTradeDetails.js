import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { TradeType } from '@ubeswap/sdk';
import { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { Field } from '../../../../state/swap/actions';
import { TYPE } from '../../../../theme';
import { computeSlippageAdjustedAmounts, computeTradePriceBreakdown } from '../../../../utils/prices';
import QuestionHelper from '../../../QuestionHelper';
import { RowBetween, RowFixed } from '../../../Row';
import FormattedPriceImpact from '../../FormattedPriceImpact';
export const UbeswapTradeDetails = ({ trade, allowedSlippage }) => {
    var _a, _b, _c, _d;
    const theme = useContext(ThemeContext);
    const { priceImpactWithoutFee } = computeTradePriceBreakdown(trade);
    const isExactIn = trade.tradeType === TradeType.EXACT_INPUT;
    const slippageAdjustedAmounts = computeSlippageAdjustedAmounts(trade, allowedSlippage);
    return (_jsxs(_Fragment, { children: [_jsxs(RowBetween, { children: [_jsxs(RowFixed, { children: [_jsx(TYPE.black, Object.assign({ fontSize: 14, fontWeight: 400, color: theme.text2 }, { children: isExactIn ? 'Minimum received' : 'Maximum sold' })), _jsx(QuestionHelper, { text: "Your transaction will revert if there is a large, unfavorable price movement before it is confirmed." })] }), _jsx(RowFixed, { children: _jsx(TYPE.black, Object.assign({ color: theme.text1, fontSize: 14 }, { children: isExactIn
                                ? (_b = `${(_a = slippageAdjustedAmounts[Field.OUTPUT]) === null || _a === void 0 ? void 0 : _a.toSignificant(4)} ${trade.outputAmount.currency.symbol}`) !== null && _b !== void 0 ? _b : '-'
                                : (_d = `${(_c = slippageAdjustedAmounts[Field.INPUT]) === null || _c === void 0 ? void 0 : _c.toSignificant(4)} ${trade.inputAmount.currency.symbol}`) !== null && _d !== void 0 ? _d : '-' })) })] }), _jsxs(RowBetween, { children: [_jsxs(RowFixed, { children: [_jsx(TYPE.black, Object.assign({ fontSize: 14, fontWeight: 400, color: theme.text2 }, { children: "Price Impact" })), _jsx(QuestionHelper, { text: "The difference between the market price and estimated price due to trade size." })] }), _jsx(FormattedPriceImpact, { priceImpact: priceImpactWithoutFee })] })] }));
};
