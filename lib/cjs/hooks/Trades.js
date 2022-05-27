"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useIsTransactionUnsupported = void 0;
const Tokens_1 = require("./Tokens");
function useIsTransactionUnsupported(currencyIn, currencyOut) {
    const unsupportedToken = (0, Tokens_1.useUnsupportedTokens)();
    const tokenIn = currencyIn;
    const tokenOut = currencyOut;
    // if unsupported list loaded & either token on list, mark as unsupported
    if (unsupportedToken) {
        if (tokenIn && Object.keys(unsupportedToken).includes(tokenIn.address)) {
            return true;
        }
        if (tokenOut && Object.keys(unsupportedToken).includes(tokenOut.address)) {
            return true;
        }
    }
    return false;
}
exports.useIsTransactionUnsupported = useIsTransactionUnsupported;
