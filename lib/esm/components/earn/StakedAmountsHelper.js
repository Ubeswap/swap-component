import { jsx as _jsx } from "react/jsx-runtime";
import QuestionHelper from '../QuestionHelper';
export default function StakedAmountsHelper({ userAmountTokenA, userAmountTokenB }) {
    return _jsx(QuestionHelper, { text: `${formatStakedAmount(userAmountTokenA)} | ${formatStakedAmount(userAmountTokenB)}` });
}
export function SingleStakedAmountsHelper({ userAmountToken }) {
    return _jsx(QuestionHelper, { text: `${formatStakedAmount(userAmountToken)}` });
}
// Format amount based on the size, when under 1 show significant digits, when 1 to 10 show 1 decimal, over 10 round
function formatStakedAmount(tokenAmmount) {
    const amount = (tokenAmmount === null || tokenAmmount === void 0 ? void 0 : tokenAmmount.lessThan('1'))
        ? tokenAmmount.toSignificant(2)
        : tokenAmmount === null || tokenAmmount === void 0 ? void 0 : tokenAmmount.toFixed((tokenAmmount === null || tokenAmmount === void 0 ? void 0 : tokenAmmount.lessThan('10')) ? 1 : 0, { groupSeparator: ',' });
    return `${amount} ${tokenAmmount === null || tokenAmmount === void 0 ? void 0 : tokenAmmount.token.symbol}`;
}
