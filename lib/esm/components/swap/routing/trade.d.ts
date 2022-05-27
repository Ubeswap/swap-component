import { Route, Token, TokenAmount, Trade, TradeType } from '@ubeswap/sdk';
export interface TradeRouter {
    routerAddress?: string;
}
export declare const defaultRouter: TradeRouter;
export declare class UbeswapTrade extends Trade {
    hidePairAnalytics: boolean;
    router: TradeRouter;
    readonly path: readonly Token[];
    constructor(route: Route, amount: TokenAmount, tradeType: TradeType, router: TradeRouter, path: readonly Token[]);
    static fromInnerTrade(innerTrade: Trade, router: TradeRouter, path: readonly Token[]): UbeswapTrade;
    static fromNormalTrade(trade: Trade): UbeswapTrade;
}
