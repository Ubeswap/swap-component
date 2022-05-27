"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Separator = exports.SwapShowAcceptChanges = exports.SwapCallbackError = exports.Dots = exports.TruncatedText = exports.StyledBalanceMaxMini = exports.ErrorText = exports.BottomGrouping = exports.SectionBreak = exports.ArrowWrapper = exports.Wrapper = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const polished_1 = require("polished");
const react_feather_1 = require("react-feather");
const rebass_1 = require("rebass");
const styled_components_1 = __importStar(require("styled-components"));
const Column_1 = require("../Column");
exports.Wrapper = styled_components_1.default.div `
  position: relative;
  padding: 1rem;
`;
exports.ArrowWrapper = styled_components_1.default.div `
  padding: 2px;

  ${({ clickable }) => clickable
    ? (0, styled_components_1.css) `
          :hover {
            cursor: pointer;
            opacity: 0.8;
          }
        `
    : null}
`;
exports.SectionBreak = styled_components_1.default.div `
  height: 1px;
  width: 100%;
  background-color: ${({ theme }) => theme.bg3};
`;
exports.BottomGrouping = styled_components_1.default.div `
  margin-top: 1rem;
`;
exports.ErrorText = (0, styled_components_1.default)(rebass_1.Text) `
  color: ${({ theme, severity }) => severity === 3 || severity === 4
    ? theme.red1
    : severity === 2
        ? theme.yellow2
        : severity === 1
            ? theme.text1
            : theme.green1};
`;
exports.StyledBalanceMaxMini = styled_components_1.default.button `
  height: 22px;
  width: 22px;
  background-color: ${({ theme }) => theme.bg2};
  border: none;
  border-radius: 50%;
  padding: 0.2rem;
  font-size: 0.875rem;
  font-weight: 400;
  margin-left: 0.4rem;
  cursor: pointer;
  color: ${({ theme }) => theme.text2};
  display: flex;
  justify-content: center;
  align-items: center;
  float: right;

  :hover {
    background-color: ${({ theme }) => theme.bg3};
  }
  :focus {
    background-color: ${({ theme }) => theme.bg3};
    outline: none;
  }
`;
exports.TruncatedText = (0, styled_components_1.default)(rebass_1.Text) `
  text-overflow: ellipsis;
  width: 220px;
  overflow: hidden;
`;
// styles
exports.Dots = styled_components_1.default.span `
  &::after {
    display: inline-block;
    animation: ellipsis 1.25s infinite;
    content: '.';
    width: 1em;
    text-align: left;
  }
  @keyframes ellipsis {
    0% {
      content: '.';
    }
    33% {
      content: '..';
    }
    66% {
      content: '...';
    }
  }
`;
const SwapCallbackErrorInner = styled_components_1.default.div `
  background-color: ${({ theme }) => (0, polished_1.transparentize)(0.9, theme.red1)};
  border-radius: 1rem;
  display: flex;
  align-items: center;
  font-size: 0.825rem;
  width: 100%;
  padding: 3rem 1.25rem 1rem 1rem;
  margin-top: -2rem;
  color: ${({ theme }) => theme.red1};
  z-index: -1;
  p {
    padding: 0;
    margin: 0;
    font-weight: 500;
  }
`;
const SwapCallbackErrorInnerAlertTriangle = styled_components_1.default.div `
  background-color: ${({ theme }) => (0, polished_1.transparentize)(0.9, theme.red1)};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  border-radius: 12px;
  min-width: 48px;
  height: 48px;
`;
function SwapCallbackError({ error }) {
    return ((0, jsx_runtime_1.jsxs)(SwapCallbackErrorInner, { children: [(0, jsx_runtime_1.jsx)(SwapCallbackErrorInnerAlertTriangle, { children: (0, jsx_runtime_1.jsx)(react_feather_1.AlertTriangle, { size: 24 }, void 0) }, void 0), (0, jsx_runtime_1.jsx)("p", { children: error }, void 0)] }, void 0));
}
exports.SwapCallbackError = SwapCallbackError;
exports.SwapShowAcceptChanges = (0, styled_components_1.default)(Column_1.AutoColumn) `
  background-color: ${({ theme }) => (0, polished_1.transparentize)(0.9, theme.primary1)};
  color: ${({ theme }) => theme.primary1};
  padding: 0.5rem;
  border-radius: 12px;
  margin-top: 8px;
`;
exports.Separator = styled_components_1.default.div `
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.bg2};
`;
