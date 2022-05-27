"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_feather_1 = require("react-feather");
const react_i18next_1 = require("react-i18next");
const styled_components_1 = __importDefault(require("styled-components"));
const useCopyClipboard_1 = __importDefault(require("../../hooks/useCopyClipboard"));
const theme_1 = require("../../theme");
const CopyIcon = (0, styled_components_1.default)(theme_1.LinkStyledButton) `
  color: ${({ theme }) => theme.text3};
  flex-shrink: 0;
  display: flex;
  text-decoration: none;
  font-size: 0.825rem;
  :hover,
  :active,
  :focus {
    text-decoration: none;
    color: ${({ theme }) => theme.text2};
  }
`;
const TransactionStatusText = styled_components_1.default.span `
  margin-left: 0.25rem;
  font-size: 0.825rem;
  ${({ theme }) => theme.flexRowNoWrap};
  align-items: center;
`;
function CopyHelper(props) {
    const [isCopied, setCopied] = (0, useCopyClipboard_1.default)();
    const { t } = (0, react_i18next_1.useTranslation)();
    return ((0, jsx_runtime_1.jsxs)(CopyIcon, Object.assign({ onClick: () => setCopied(props.toCopy) }, { children: [isCopied ? ((0, jsx_runtime_1.jsxs)(TransactionStatusText, { children: [(0, jsx_runtime_1.jsx)(react_feather_1.CheckCircle, { size: '16' }, void 0), (0, jsx_runtime_1.jsxs)(TransactionStatusText, { children: [" ", t('copied'), " "] }, void 0)] }, void 0)) : ((0, jsx_runtime_1.jsx)(TransactionStatusText, { children: (0, jsx_runtime_1.jsx)(react_feather_1.Copy, { size: '16' }, void 0) }, void 0)), isCopied ? '' : props.children] }), void 0));
}
exports.default = CopyHelper;
