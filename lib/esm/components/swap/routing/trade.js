import { Trade, TradeType } from '@ubeswap/sdk';
import { ROUTER_ADDRESS } from 'constants/index';
export const defaultRouter = {
    routerAddress: ROUTER_ADDRESS,
};
export class UbeswapTrade extends Trade {
    constructor(route, amount, tradeType, router, path) {
        super(route, amount, tradeType);
        this.hidePairAnalytics = false;
        this.router = router;
        this.path = path;
    }
    static fromInnerTrade(innerTrade, router, path) {
        return new UbeswapTrade(innerTrade.route, innerTrade.tradeType === TradeType.EXACT_INPUT ? innerTrade.inputAmount : innerTrade.outputAmount, innerTrade.tradeType, router, path);
    }
    static fromNormalTrade(trade) {
        return UbeswapTrade.fromInnerTrade(trade, defaultRouter, trade.route.path);
    }
}
