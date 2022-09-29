import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useContext, useMemo, useState } from 'react';
import { Repeat } from 'react-feather';
import { Text } from 'rebass';
import { ThemeContext } from 'styled-components';
import { computeTradePriceBreakdown, formatExecutionPrice, warningSeverity } from '../../utils/prices';
import { ButtonError } from '../Button';
import { AutoColumn } from '../Column';
import { AutoRow, RowBetween } from '../Row';
import { describeTrade, RoutingMethod } from './routing/describeTrade';
import { TradeDetails } from './routing/TradeDetails';
import { StyledBalanceMaxMini, SwapCallbackError } from './styleds';
export default function SwapModalFooter({ trade, onConfirm, allowedSlippage, swapErrorMessage, disabledConfirm, }) {
    const { label, routingMethod } = describeTrade(trade);
    const [showInverted, setShowInverted] = useState(false);
    const theme = useContext(ThemeContext);
    const { priceImpactWithoutFee } = useMemo(() => computeTradePriceBreakdown(trade), [trade]);
    const severity = warningSeverity(priceImpactWithoutFee);
    let info = null;
    if (routingMethod === RoutingMethod.MOOLA) {
        info = (_jsxs(AutoColumn, Object.assign({ gap: "0px" }, { children: [_jsxs(RowBetween, Object.assign({ align: "center" }, { children: [_jsx(Text, Object.assign({ fontWeight: 400, fontSize: 14, color: theme.text2 }, { children: "Price" })), _jsxs(Text, Object.assign({ fontWeight: 500, fontSize: 14, color: theme.text1, style: {
                                justifyContent: 'center',
                                alignItems: 'center',
                                display: 'flex',
                                textAlign: 'right',
                                paddingLeft: '10px',
                            } }, { children: [formatExecutionPrice(trade, showInverted), _jsx(StyledBalanceMaxMini, Object.assign({ onClick: () => setShowInverted(!showInverted) }, { children: _jsx(Repeat, { size: 14 }) }))] }))] })), _jsx(TradeDetails, { trade: trade, allowedSlippage: allowedSlippage })] })));
    }
    else if (routingMethod === RoutingMethod.LIMIT) {
        info = (_jsx(AutoColumn, Object.assign({ gap: "0px" }, { children: _jsxs(RowBetween, Object.assign({ align: "center" }, { children: [_jsx(Text, Object.assign({ fontWeight: 400, fontSize: 14, color: theme.text2 }, { children: "Price" })), _jsxs(Text, Object.assign({ fontWeight: 500, fontSize: 14, color: theme.text1, style: {
                            justifyContent: 'center',
                            alignItems: 'center',
                            display: 'flex',
                            textAlign: 'right',
                            paddingLeft: '10px',
                        } }, { children: [formatExecutionPrice(trade, showInverted), _jsx(StyledBalanceMaxMini, Object.assign({ onClick: () => setShowInverted(!showInverted) }, { children: _jsx(Repeat, { size: 14 }) }))] }))] })) })));
    }
    else {
        info = (_jsxs(AutoColumn, Object.assign({ gap: "0px" }, { children: [_jsxs(RowBetween, Object.assign({ align: "center" }, { children: [_jsx(Text, Object.assign({ fontWeight: 400, fontSize: 14, color: theme.text2 }, { children: "Price" })), _jsxs(Text, Object.assign({ fontWeight: 500, fontSize: 14, color: theme.text1, style: {
                                justifyContent: 'center',
                                alignItems: 'center',
                                display: 'flex',
                                textAlign: 'right',
                                paddingLeft: '10px',
                            } }, { children: [formatExecutionPrice(trade, showInverted), _jsx(StyledBalanceMaxMini, Object.assign({ onClick: () => setShowInverted(!showInverted) }, { children: _jsx(Repeat, { size: 14 }) }))] }))] })), _jsx(TradeDetails, { trade: trade, allowedSlippage: allowedSlippage })] })));
    }
    return (_jsxs(_Fragment, { children: [info, _jsxs(AutoRow, { children: [_jsx(ButtonError, Object.assign({ onClick: onConfirm, disabled: disabledConfirm, error: severity > 2, style: { margin: '10px 0 0 0' }, id: "confirm-swap-or-send" }, { children: _jsx(Text, Object.assign({ fontSize: 20, fontWeight: 500 }, { children: severity > 2 ? 'Swap Anyway' : `Confirm ${label}` })) })), swapErrorMessage ? _jsx(SwapCallbackError, { error: swapErrorMessage }) : null] })] }));
}
