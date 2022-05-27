import { MoolaRouterTrade } from './hooks/useTrade';
import { MoolaDirectTrade } from './moola/MoolaDirectTrade';
export var RoutingMethod;
(function (RoutingMethod) {
    RoutingMethod[RoutingMethod["UBESWAP"] = 0] = "UBESWAP";
    RoutingMethod[RoutingMethod["MOOLA"] = 1] = "MOOLA";
    RoutingMethod[RoutingMethod["MOOLA_ROUTER"] = 2] = "MOOLA_ROUTER";
    RoutingMethod[RoutingMethod["LIMIT"] = 3] = "LIMIT";
})(RoutingMethod || (RoutingMethod = {}));
export const describeTrade = (trade) => {
    if (trade instanceof MoolaDirectTrade) {
        return {
            label: trade.isWithdrawal() ? 'withdraw' : 'deposit',
            makeLabel: (isInverted) => {
                const result = trade.isWithdrawal();
                const resultInverted = isInverted ? !result : result;
                return resultInverted ? 'withdraw' : 'deposit';
            },
            routingMethod: RoutingMethod.MOOLA,
            isEstimate: false,
        };
    }
    else {
        return {
            label: 'swap',
            routingMethod: trade instanceof MoolaRouterTrade ? RoutingMethod.MOOLA_ROUTER : RoutingMethod.UBESWAP,
            isEstimate: true,
            makeLabel: () => 'swap',
        };
    }
};
