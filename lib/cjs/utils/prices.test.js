"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sdk_1 = require("@ubeswap/sdk");
const prices_1 = require("./prices");
describe('prices', () => {
    const token1 = new sdk_1.Token(sdk_1.ChainId.MAINNET, '0x0000000000000000000000000000000000000001', 18);
    const token2 = new sdk_1.Token(sdk_1.ChainId.MAINNET, '0x0000000000000000000000000000000000000002', 18);
    const token3 = new sdk_1.Token(sdk_1.ChainId.MAINNET, '0x0000000000000000000000000000000000000003', 18);
    const pair12 = new sdk_1.Pair(new sdk_1.TokenAmount(token1, sdk_1.JSBI.BigInt(10000)), new sdk_1.TokenAmount(token2, sdk_1.JSBI.BigInt(20000)));
    const pair23 = new sdk_1.Pair(new sdk_1.TokenAmount(token2, sdk_1.JSBI.BigInt(20000)), new sdk_1.TokenAmount(token3, sdk_1.JSBI.BigInt(30000)));
    describe('computeTradePriceBreakdown', () => {
        it('returns undefined for undefined', () => {
            expect((0, prices_1.computeTradePriceBreakdown)(undefined)).toEqual({
                priceImpactWithoutFee: undefined,
                realizedLPFee: undefined,
            });
        });
        it('correct realized lp fee for single hop', () => {
            expect((0, prices_1.computeTradePriceBreakdown)(new sdk_1.Trade(new sdk_1.Route([pair12], token1), new sdk_1.TokenAmount(token1, sdk_1.JSBI.BigInt(1000)), sdk_1.TradeType.EXACT_INPUT)).realizedLPFee).toEqual(new sdk_1.TokenAmount(token1, sdk_1.JSBI.BigInt(3)));
        });
        it('correct realized lp fee for double hop', () => {
            expect((0, prices_1.computeTradePriceBreakdown)(new sdk_1.Trade(new sdk_1.Route([pair12, pair23], token1), new sdk_1.TokenAmount(token1, sdk_1.JSBI.BigInt(1000)), sdk_1.TradeType.EXACT_INPUT)).realizedLPFee).toEqual(new sdk_1.TokenAmount(token1, sdk_1.JSBI.BigInt(5)));
        });
    });
});
