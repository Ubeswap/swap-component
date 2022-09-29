"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MinimaRouterTrade = exports.UbeswapTrade = exports.defaultRouter = void 0;
const sdk_1 = require("@ubeswap/sdk");
const index_1 = require("../../../constants/index");
exports.defaultRouter = {
    routerAddress: index_1.ROUTER_ADDRESS,
};
class UbeswapTrade extends sdk_1.Trade {
    constructor(route, amount, tradeType, router, path) {
        super(route, amount, tradeType);
        this.hidePairAnalytics = false;
        this.router = router;
        this.path = path;
    }
    static fromInnerTrade(innerTrade, router, path) {
        return new UbeswapTrade(innerTrade.route, innerTrade.tradeType === sdk_1.TradeType.EXACT_INPUT ? innerTrade.inputAmount : innerTrade.outputAmount, innerTrade.tradeType, router, path);
    }
    static fromNormalTrade(trade) {
        return UbeswapTrade.fromInnerTrade(trade, exports.defaultRouter, trade.route.path);
    }
}
exports.UbeswapTrade = UbeswapTrade;
class MinimaRouterTrade extends UbeswapTrade {
    constructor(route, inputAmount, outputAmount, router, priceImpact, path, details) {
        super(route, inputAmount, 0, router, path);
        this.router = router;
        this.inputAmount = inputAmount;
        this.outputAmount = outputAmount;
        this.executionPrice = new sdk_1.Price(inputAmount.token, outputAmount.token, inputAmount.raw, outputAmount.raw);
        this.nextMidPrice = new sdk_1.Price(inputAmount.token, outputAmount.token, inputAmount.raw, outputAmount.raw);
        this.priceImpact = priceImpact;
        this.hidePairAnalytics = true;
        this.details = details;
    }
    static fromMinimaTradePayload(pairs, inputAmount, outputAmount, routerAddress, priceImpact, path, details) {
        return new MinimaRouterTrade(new sdk_1.Route(pairs, inputAmount.currency), inputAmount, outputAmount, { routerAddress }, priceImpact, path, details);
    }
}
exports.MinimaRouterTrade = MinimaRouterTrade;
