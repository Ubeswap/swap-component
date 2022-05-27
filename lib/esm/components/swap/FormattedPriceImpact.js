import { jsx as _jsx } from "react/jsx-runtime";
import { ONE_BIPS } from '../../constants';
import { warningSeverity } from '../../utils/prices';
import { ErrorText } from './styleds';
/**
 * Formatted version of price impact text with warning colors
 */
export default function FormattedPriceImpact({ priceImpact }) {
    return (_jsx(ErrorText, Object.assign({ fontWeight: 500, fontSize: 14, severity: warningSeverity(priceImpact) }, { children: priceImpact ? (priceImpact.lessThan(ONE_BIPS) ? '<0.01%' : `${priceImpact.toFixed(2)}%`) : '-' }), void 0));
}
