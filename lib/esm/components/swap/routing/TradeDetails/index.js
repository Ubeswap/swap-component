import { jsx as _jsx } from "react/jsx-runtime";
import { describeTrade, RoutingMethod } from '../describeTrade';
import { MoolaDirectTradeDetails } from './MoolaDirectTradeDetails';
import { MoolaRouterTradeDetails } from './MoolaRouterTradeDetails';
import { UbeswapTradeDetails } from './UbeswapTradeDetails';
export const TradeDetails = ({ trade, allowedSlippage }) => {
    const { routingMethod } = describeTrade(trade);
    if (routingMethod === RoutingMethod.MOOLA) {
        return _jsx(MoolaDirectTradeDetails, { trade: trade });
    }
    if (routingMethod === RoutingMethod.MOOLA_ROUTER) {
        return _jsx(MoolaRouterTradeDetails, { trade: trade, allowedSlippage: allowedSlippage });
    }
    return _jsx(UbeswapTradeDetails, { trade: trade, allowedSlippage: allowedSlippage });
};
