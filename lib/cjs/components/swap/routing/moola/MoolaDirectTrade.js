"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoolaDirectTrade = void 0;
const sdk_1 = require("@ubeswap/sdk");
const trade_1 = require("../trade");
const moolaDirectRouter = {};
/**
 * A trade that directly happens with moola.
 */
class MoolaDirectTrade extends trade_1.UbeswapTrade {
    constructor(route, inputAmount, outputAmount, tradeType) {
        super(route, inputAmount, tradeType, moolaDirectRouter, [inputAmount.token, outputAmount.token]);
        this.inputAmount = inputAmount;
        this.outputAmount = outputAmount;
        this.executionPrice = new sdk_1.Price(inputAmount.token, outputAmount.token, '1', '1');
        this.nextMidPrice = new sdk_1.Price(inputAmount.token, outputAmount.token, '1', '1');
        this.priceImpact = new sdk_1.Percent('0');
        this.hidePairAnalytics = true;
    }
    isWithdrawal() {
        var _a, _b;
        return (_b = (_a = this.inputAmount.currency.symbol) === null || _a === void 0 ? void 0 : _a.startsWith('m')) !== null && _b !== void 0 ? _b : false;
    }
    static fromIn(route, inputAmount) {
        return new MoolaDirectTrade(route, inputAmount, new sdk_1.TokenAmount(route.output, inputAmount.raw), sdk_1.TradeType.EXACT_INPUT);
    }
    static fromOut(route, outputAmount) {
        return new MoolaDirectTrade(route, new sdk_1.TokenAmount(route.output, outputAmount.raw), outputAmount, sdk_1.TradeType.EXACT_OUTPUT);
    }
}
exports.MoolaDirectTrade = MoolaDirectTrade;
