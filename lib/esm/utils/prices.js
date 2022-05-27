import { JSBI, Percent, TokenAmount } from '@ubeswap/sdk';
import { ALLOWED_PRICE_IMPACT_HIGH, ALLOWED_PRICE_IMPACT_LOW, ALLOWED_PRICE_IMPACT_MEDIUM, BLOCKED_PRICE_IMPACT_NON_EXPERT, } from '../constants';
import { Field } from '../state/swap/actions';
import { basisPointsToPercent } from './index';
const BASE_FEE = new Percent(JSBI.BigInt(30), JSBI.BigInt(10000));
const ONE_HUNDRED_PERCENT = new Percent(JSBI.BigInt(10000), JSBI.BigInt(10000));
const INPUT_FRACTION_AFTER_FEE = ONE_HUNDRED_PERCENT.subtract(BASE_FEE);
// computes price breakdown for the trade
export function computeTradePriceBreakdown(trade) {
    // for each hop in our trade, take away the x*y=k price impact from 0.3% fees
    // e.g. for 3 tokens/2 hops: 1 - ((1 - .03) * (1-.03))
    const realizedLPFee = !trade
        ? undefined
        : ONE_HUNDRED_PERCENT.subtract(trade.route.pairs.reduce((currentFee) => currentFee.multiply(INPUT_FRACTION_AFTER_FEE), ONE_HUNDRED_PERCENT));
    // remove lp fees from price impact
    const priceImpactWithoutFeeFraction = trade && realizedLPFee ? trade.priceImpact.subtract(realizedLPFee) : undefined;
    // the x*y=k impact
    const priceImpactWithoutFeePercent = priceImpactWithoutFeeFraction
        ? new Percent(priceImpactWithoutFeeFraction === null || priceImpactWithoutFeeFraction === void 0 ? void 0 : priceImpactWithoutFeeFraction.numerator, priceImpactWithoutFeeFraction === null || priceImpactWithoutFeeFraction === void 0 ? void 0 : priceImpactWithoutFeeFraction.denominator)
        : undefined;
    // the amount of the input that accrues to LPs
    const realizedLPFeeAmount = realizedLPFee &&
        trade &&
        new TokenAmount(trade.inputAmount.token, realizedLPFee.multiply(trade.inputAmount.raw).quotient);
    return { priceImpactWithoutFee: priceImpactWithoutFeePercent, realizedLPFee: realizedLPFeeAmount };
}
// computes the minimum amount out and maximum amount in for a trade given a user specified allowed slippage in bips
export function computeSlippageAdjustedAmounts(trade, allowedSlippage) {
    const pct = basisPointsToPercent(allowedSlippage);
    return {
        [Field.INPUT]: trade === null || trade === void 0 ? void 0 : trade.maximumAmountIn(pct),
        [Field.OUTPUT]: trade === null || trade === void 0 ? void 0 : trade.minimumAmountOut(pct),
    };
}
export function warningSeverity(priceImpact) {
    if (!(priceImpact === null || priceImpact === void 0 ? void 0 : priceImpact.lessThan(BLOCKED_PRICE_IMPACT_NON_EXPERT)))
        return 4;
    if (!(priceImpact === null || priceImpact === void 0 ? void 0 : priceImpact.lessThan(ALLOWED_PRICE_IMPACT_HIGH)))
        return 3;
    if (!(priceImpact === null || priceImpact === void 0 ? void 0 : priceImpact.lessThan(ALLOWED_PRICE_IMPACT_MEDIUM)))
        return 2;
    if (!(priceImpact === null || priceImpact === void 0 ? void 0 : priceImpact.lessThan(ALLOWED_PRICE_IMPACT_LOW)))
        return 1;
    return 0;
}
export function formatExecutionPrice(trade, inverted) {
    if (!trade) {
        return '';
    }
    return inverted
        ? `${trade.executionPrice.invert().toSignificant(6)} ${trade.inputAmount.currency.symbol} / ${trade.outputAmount.currency.symbol}`
        : `${trade.executionPrice.toSignificant(6)} ${trade.outputAmount.currency.symbol} / ${trade.inputAmount.currency.symbol}`;
}
