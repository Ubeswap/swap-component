import { Trade } from '@ubeswap/sdk';
export declare enum RoutingMethod {
    UBESWAP = 0,
    MOOLA = 1,
    MOOLA_ROUTER = 2,
    LIMIT = 3
}
export declare const describeTrade: (trade: Trade | undefined) => {
    label: string;
    makeLabel: (isInverted: boolean) => string;
    routingMethod: RoutingMethod;
    isEstimate: boolean;
};
