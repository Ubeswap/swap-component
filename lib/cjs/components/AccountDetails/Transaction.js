"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const use_contractkit_1 = require("@celo-tools/use-contractkit");
const react_feather_1 = require("react-feather");
const styled_components_1 = __importDefault(require("styled-components"));
const hooks_1 = require("../../state/transactions/hooks");
const theme_1 = require("../../theme");
const Loader_1 = __importDefault(require("../Loader"));
const Row_1 = require("../Row");
const TransactionWrapper = styled_components_1.default.div ``;
const TransactionStatusText = styled_components_1.default.div `
  margin-right: 0.5rem;
  display: flex;
  align-items: center;
  :hover {
    text-decoration: underline;
  }
`;
const TransactionState = (0, styled_components_1.default)(theme_1.ExternalLink) `
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-decoration: none !important;
  border-radius: 0.5rem;
  padding: 0.25rem 0rem;
  font-weight: 500;
  font-size: 0.825rem;
  color: ${({ theme }) => theme.primary1};
`;
const IconWrapper = styled_components_1.default.div `
  color: ${({ pending, success, theme }) => (pending ? theme.primary1 : success ? theme.green1 : theme.red1)};
`;
function Transaction({ hash }) {
    var _a, _b;
    const { network } = (0, use_contractkit_1.useContractKit)();
    const chainId = network.chainId;
    const allTransactions = (0, hooks_1.useAllTransactions)();
    const tx = allTransactions === null || allTransactions === void 0 ? void 0 : allTransactions[hash];
    const summary = tx === null || tx === void 0 ? void 0 : tx.summary;
    const pending = !(tx === null || tx === void 0 ? void 0 : tx.receipt);
    const success = !pending && tx && (((_a = tx.receipt) === null || _a === void 0 ? void 0 : _a.status) === 1 || typeof ((_b = tx.receipt) === null || _b === void 0 ? void 0 : _b.status) === 'undefined');
    if (!chainId)
        return null;
    return ((0, jsx_runtime_1.jsx)(TransactionWrapper, { children: (0, jsx_runtime_1.jsxs)(TransactionState, Object.assign({ href: `${network.explorer}/tx/${hash}`, pending: pending, success: success }, { children: [(0, jsx_runtime_1.jsx)(Row_1.RowFixed, { children: (0, jsx_runtime_1.jsxs)(TransactionStatusText, { children: [summary !== null && summary !== void 0 ? summary : hash, " \u2197"] }, void 0) }, void 0), (0, jsx_runtime_1.jsx)(IconWrapper, Object.assign({ pending: pending, success: success }, { children: pending ? (0, jsx_runtime_1.jsx)(Loader_1.default, {}, void 0) : success ? (0, jsx_runtime_1.jsx)(react_feather_1.CheckCircle, { size: "16" }, void 0) : (0, jsx_runtime_1.jsx)(react_feather_1.Triangle, { size: "16" }, void 0) }), void 0)] }), void 0) }, void 0));
}
exports.default = Transaction;
