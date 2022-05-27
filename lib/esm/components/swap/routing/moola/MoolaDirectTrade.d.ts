import { Percent, Price, Route, TokenAmount, TradeType } from '@ubeswap/sdk';
import { UbeswapTrade } from '../trade';
/**
 * A trade that directly happens with moola.
 */
export declare class MoolaDirectTrade extends UbeswapTrade {
    /**
     * The input amount for the trade assuming no slippage.
     */
    inputAmount: TokenAmount;
    /**
     * The output amount for the trade assuming no slippage.
     */
    outputAmount: TokenAmount;
    /**
     * The price expressed in terms of output amount/input amount.
     */
    executionPrice: Price;
    /**
     * The mid price after the trade executes assuming no slippage.
     */
    nextMidPrice: Price;
    /**
     * The percent difference between the mid price before the trade and the trade execution price.
     */
    priceImpact: Percent;
    isWithdrawal(): boolean;
    constructor(route: Route, inputAmount: TokenAmount, outputAmount: TokenAmount, tradeType: TradeType);
    static fromIn(route: Route, inputAmount: TokenAmount): MoolaDirectTrade;
    static fromOut(route: Route, outputAmount: TokenAmount): MoolaDirectTrade;
}
