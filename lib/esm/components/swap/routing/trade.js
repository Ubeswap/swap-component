import { Price, Route, Trade, TradeType } from '@ubeswap/sdk';
import { ROUTER_ADDRESS } from '../../../constants/index';
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
export class MinimaRouterTrade extends UbeswapTrade {
    constructor(route, inputAmount, outputAmount, router, priceImpact, path, details) {
        super(route, inputAmount, 0, router, path);
        this.router = router;
        this.inputAmount = inputAmount;
        this.outputAmount = outputAmount;
        this.executionPrice = new Price(inputAmount.token, outputAmount.token, inputAmount.raw, outputAmount.raw);
        this.nextMidPrice = new Price(inputAmount.token, outputAmount.token, inputAmount.raw, outputAmount.raw);
        this.priceImpact = priceImpact;
        this.hidePairAnalytics = true;
        this.details = details;
    }
    static fromMinimaTradePayload(pairs, inputAmount, outputAmount, routerAddress, priceImpact, path, details) {
        return new MinimaRouterTrade(new Route(pairs, inputAmount.currency), inputAmount, outputAmount, { routerAddress }, priceImpact, path, details);
    }
}
