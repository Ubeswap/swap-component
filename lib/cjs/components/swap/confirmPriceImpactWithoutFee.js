"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../constants");
/**
 * Given the price impact, get user confirmation.
 *
 * @param priceImpactWithoutFee price impact of the trade without the fee.
 */
function confirmPriceImpactWithoutFee(priceImpactWithoutFee) {
    if (!priceImpactWithoutFee.lessThan(constants_1.PRICE_IMPACT_WITHOUT_FEE_CONFIRM_MIN)) {
        return (window.prompt(`This swap has a price impact of at least ${constants_1.PRICE_IMPACT_WITHOUT_FEE_CONFIRM_MIN.toFixed(0)}%. Please type the word "confirm" to continue with this swap.`) === 'confirm');
    }
    else if (!priceImpactWithoutFee.lessThan(constants_1.ALLOWED_PRICE_IMPACT_HIGH)) {
        return window.confirm(`This swap has a price impact of at least ${constants_1.ALLOWED_PRICE_IMPACT_HIGH.toFixed(0)}%. Please confirm that you would like to continue with this swap.`);
    }
    return true;
}
exports.default = confirmPriceImpactWithoutFee;
