import { BigNumberish } from '@ethersproject/bignumber';
import { BytesLike } from '@ethersproject/bytes';
import { Pair, Percent, Price, Route, Token, TokenAmount, Trade, TradeType } from '@ubeswap/sdk';
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
export interface SwapPayload {
    path: string[];
    pairs: string[];
    extras: BytesLike[];
    inputAmount: BigNumberish;
    minOutputAmount: BigNumberish;
    expectedOutputAmount: BigNumberish;
    to?: string;
    deadline: BigNumberish;
    partner: BigNumberish;
    sig: BytesLike;
}
export interface MinimaPayloadDetails {
    path: string[];
    pairs: string[];
    extras: BytesLike[];
    inputAmount: string;
    expectedOutputAmount: string;
    deadline: string;
    partner: string;
    sig: BytesLike;
}
export interface MinimaTradePayload {
    expectedOut: string;
    minimumExpectedOut?: string;
    routerAddress: string;
    priceImpact: {
        numerator: number;
        denominator: number;
    };
    details: MinimaPayloadDetails;
}
export declare class MinimaRouterTrade extends UbeswapTrade {
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
    /**
     * Every field that is needed for executing a swap is contained within the details object
     */
    details: SwapPayload;
    constructor(route: Route, inputAmount: TokenAmount, outputAmount: TokenAmount, router: TradeRouter, priceImpact: Percent, path: readonly Token[], details: SwapPayload);
    static fromMinimaTradePayload(pairs: Pair[], inputAmount: TokenAmount, outputAmount: TokenAmount, routerAddress: string, priceImpact: Percent, path: readonly Token[], details: SwapPayload): MinimaRouterTrade;
}
