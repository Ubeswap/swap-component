import { Percent, Price, TokenAmount, TradeType } from '@ubeswap/sdk';
import { UbeswapTrade } from '../trade';
const moolaDirectRouter = {};
/**
 * A trade that directly happens with moola.
 */
export class MoolaDirectTrade extends UbeswapTrade {
    constructor(route, inputAmount, outputAmount, tradeType) {
        super(route, inputAmount, tradeType, moolaDirectRouter, [inputAmount.token, outputAmount.token]);
        this.inputAmount = inputAmount;
        this.outputAmount = outputAmount;
        this.executionPrice = new Price(inputAmount.token, outputAmount.token, '1', '1');
        this.nextMidPrice = new Price(inputAmount.token, outputAmount.token, '1', '1');
        this.priceImpact = new Percent('0');
        this.hidePairAnalytics = true;
    }
    isWithdrawal() {
        var _a, _b;
        return (_b = (_a = this.inputAmount.currency.symbol) === null || _a === void 0 ? void 0 : _a.startsWith('m')) !== null && _b !== void 0 ? _b : false;
    }
    static fromIn(route, inputAmount) {
        return new MoolaDirectTrade(route, inputAmount, new TokenAmount(route.output, inputAmount.raw), TradeType.EXACT_INPUT);
    }
    static fromOut(route, outputAmount) {
        return new MoolaDirectTrade(route, new TokenAmount(route.output, outputAmount.raw), outputAmount, TradeType.EXACT_OUTPUT);
    }
}
