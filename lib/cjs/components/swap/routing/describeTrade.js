"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.describeTrade = exports.RoutingMethod = void 0;
const useTrade_1 = require("./hooks/useTrade");
const MoolaDirectTrade_1 = require("./moola/MoolaDirectTrade");
var RoutingMethod;
(function (RoutingMethod) {
    RoutingMethod[RoutingMethod["UBESWAP"] = 0] = "UBESWAP";
    RoutingMethod[RoutingMethod["MOOLA"] = 1] = "MOOLA";
    RoutingMethod[RoutingMethod["MOOLA_ROUTER"] = 2] = "MOOLA_ROUTER";
    RoutingMethod[RoutingMethod["LIMIT"] = 3] = "LIMIT";
})(RoutingMethod = exports.RoutingMethod || (exports.RoutingMethod = {}));
const describeTrade = (trade) => {
    if (trade instanceof MoolaDirectTrade_1.MoolaDirectTrade) {
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
            routingMethod: trade instanceof useTrade_1.MoolaRouterTrade ? RoutingMethod.MOOLA_ROUTER : RoutingMethod.UBESWAP,
            isEstimate: true,
            makeLabel: () => 'swap',
        };
    }
};
exports.describeTrade = describeTrade;
