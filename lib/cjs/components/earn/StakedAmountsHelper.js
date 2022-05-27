"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SingleStakedAmountsHelper = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const QuestionHelper_1 = __importDefault(require("components/QuestionHelper"));
function StakedAmountsHelper({ userAmountTokenA, userAmountTokenB }) {
    return (0, jsx_runtime_1.jsx)(QuestionHelper_1.default, { text: `${formatStakedAmount(userAmountTokenA)} | ${formatStakedAmount(userAmountTokenB)}` }, void 0);
}
exports.default = StakedAmountsHelper;
function SingleStakedAmountsHelper({ userAmountToken }) {
    return (0, jsx_runtime_1.jsx)(QuestionHelper_1.default, { text: `${formatStakedAmount(userAmountToken)}` }, void 0);
}
exports.SingleStakedAmountsHelper = SingleStakedAmountsHelper;
// Format amount based on the size, when under 1 show significant digits, when 1 to 10 show 1 decimal, over 10 round
function formatStakedAmount(tokenAmmount) {
    const amount = (tokenAmmount === null || tokenAmmount === void 0 ? void 0 : tokenAmmount.lessThan('1'))
        ? tokenAmmount.toSignificant(2)
        : tokenAmmount === null || tokenAmmount === void 0 ? void 0 : tokenAmmount.toFixed((tokenAmmount === null || tokenAmmount === void 0 ? void 0 : tokenAmmount.lessThan('10')) ? 1 : 0, { groupSeparator: ',' });
    return `${amount} ${tokenAmmount === null || tokenAmmount === void 0 ? void 0 : tokenAmmount.token.symbol}`;
}
