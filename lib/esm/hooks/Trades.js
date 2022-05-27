import { useUnsupportedTokens } from './Tokens';
export function useIsTransactionUnsupported(currencyIn, currencyOut) {
    const unsupportedToken = useUnsupportedTokens();
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
