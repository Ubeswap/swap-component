import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { TradeType } from '@ubeswap/sdk';
import { useContext, useMemo } from 'react';
import { AlertTriangle, ArrowDown } from 'react-feather';
import { Text } from 'rebass';
import { ThemeContext } from 'styled-components';
import { Field } from '../../state/swap/actions';
import { TYPE } from '../../theme';
import { isAddress, shortenAddress } from '../../utils';
import { computeSlippageAdjustedAmounts, computeTradePriceBreakdown, warningSeverity } from '../../utils/prices';
import { ButtonPrimary } from '../Button';
import { AutoColumn } from '../Column';
import CurrencyLogo from '../CurrencyLogo';
import { RowBetween, RowFixed } from '../Row';
import { MoolaDirectTrade } from './routing/moola/MoolaDirectTrade';
import { SwapShowAcceptChanges, TruncatedText } from './styleds';
export default function SwapModalHeader({ trade, allowedSlippage, recipient, showAcceptChanges, onAcceptChanges, }) {
    var _a, _b;
    const slippageAdjustedAmounts = useMemo(() => computeSlippageAdjustedAmounts(trade, allowedSlippage), [trade, allowedSlippage]);
    const { priceImpactWithoutFee } = useMemo(() => computeTradePriceBreakdown(trade), [trade]);
    const priceImpactSeverity = warningSeverity(priceImpactWithoutFee);
    const theme = useContext(ThemeContext);
    return (_jsxs(AutoColumn, Object.assign({ gap: 'md', style: { marginTop: '20px' } }, { children: [_jsxs(RowBetween, Object.assign({ align: "flex-end" }, { children: [_jsxs(RowFixed, Object.assign({ gap: '0px' }, { children: [_jsx(CurrencyLogo, { currency: trade.inputAmount.currency, size: '24px', style: { marginRight: '12px' } }, void 0), _jsx(TruncatedText, Object.assign({ fontSize: 24, fontWeight: 500, color: showAcceptChanges && trade.tradeType === TradeType.EXACT_OUTPUT ? theme.primary1 : '' }, { children: trade.inputAmount.toSignificant(6) }), void 0)] }), void 0), _jsx(RowFixed, Object.assign({ gap: '0px' }, { children: _jsx(Text, Object.assign({ fontSize: 24, fontWeight: 500, style: { marginLeft: '10px' } }, { children: trade.inputAmount.currency.symbol }), void 0) }), void 0)] }), void 0), _jsx(RowFixed, { children: _jsx(ArrowDown, { size: "16", color: theme.text2, style: { marginLeft: '4px', minWidth: '16px' } }, void 0) }, void 0), _jsxs(RowBetween, Object.assign({ align: "flex-end" }, { children: [_jsxs(RowFixed, Object.assign({ gap: '0px' }, { children: [_jsx(CurrencyLogo, { currency: trade.outputAmount.currency, size: '24px', style: { marginRight: '12px' } }, void 0), _jsx(TruncatedText, Object.assign({ fontSize: 24, fontWeight: 500, color: priceImpactSeverity > 2
                                    ? theme.red1
                                    : showAcceptChanges && trade.tradeType === TradeType.EXACT_INPUT
                                        ? theme.primary1
                                        : '' }, { children: trade.outputAmount.toSignificant(6) }), void 0)] }), void 0), _jsx(RowFixed, Object.assign({ gap: '0px' }, { children: _jsx(Text, Object.assign({ fontSize: 24, fontWeight: 500, style: { marginLeft: '10px' } }, { children: trade.outputAmount.currency.symbol }), void 0) }), void 0)] }), void 0), showAcceptChanges ? (_jsx(SwapShowAcceptChanges, Object.assign({ justify: "flex-start", gap: '0px' }, { children: _jsxs(RowBetween, { children: [_jsxs(RowFixed, { children: [_jsx(AlertTriangle, { size: 20, style: { marginRight: '8px', minWidth: 24 } }, void 0), _jsx(TYPE.main, Object.assign({ color: theme.primary1 }, { children: " Price Updated" }), void 0)] }, void 0), _jsx(ButtonPrimary, Object.assign({ style: { padding: '.5rem', width: 'fit-content', fontSize: '0.825rem', borderRadius: '12px' }, onClick: onAcceptChanges }, { children: "Accept" }), void 0)] }, void 0) }), void 0)) : null, !(trade instanceof MoolaDirectTrade) && (_jsx(AutoColumn, Object.assign({ justify: "flex-start", gap: "sm", style: { padding: '12px 0 0 0px' } }, { children: trade.tradeType === TradeType.EXACT_INPUT ? (_jsxs(TYPE.italic, Object.assign({ textAlign: "left", style: { width: '100%' } }, { children: [`Output is estimated. You will receive at least `, _jsxs("b", { children: [(_a = slippageAdjustedAmounts[Field.OUTPUT]) === null || _a === void 0 ? void 0 : _a.toSignificant(6), " ", trade.outputAmount.currency.symbol] }, void 0), ' or the transaction will revert.'] }), void 0)) : (_jsxs(TYPE.italic, Object.assign({ textAlign: "left", style: { width: '100%' } }, { children: [`Input is estimated. You will sell at most `, _jsxs("b", { children: [(_b = slippageAdjustedAmounts[Field.INPUT]) === null || _b === void 0 ? void 0 : _b.toSignificant(6), " ", trade.inputAmount.currency.symbol] }, void 0), ' or the transaction will revert.'] }), void 0)) }), void 0)), recipient !== null ? (_jsx(AutoColumn, Object.assign({ justify: "flex-start", gap: "sm", style: { padding: '12px 0 0 0px' } }, { children: _jsxs(TYPE.main, { children: ["Output will be sent to", ' ', _jsx("b", Object.assign({ title: recipient }, { children: isAddress(recipient) ? shortenAddress(recipient) : recipient }), void 0)] }, void 0) }), void 0)) : null] }), void 0));
}
