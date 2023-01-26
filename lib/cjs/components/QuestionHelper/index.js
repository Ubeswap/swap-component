"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LightQuestionHelper = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_feather_1 = require("react-feather");
const styled_components_1 = __importDefault(require("styled-components"));
const Tooltip_1 = __importDefault(require("../Tooltip"));
const QuestionWrapper = styled_components_1.default.div `
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.2rem;
  border: none;
  background: none;
  outline: none;
  cursor: default;
  border-radius: 36px;
  background-color: ${({ theme }) => theme.bg2};
  color: ${({ theme }) => theme.text2};

  :hover,
  :focus {
    opacity: 0.7;
  }
`;
const LightQuestionWrapper = styled_components_1.default.div `
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.2rem;
  border: none;
  background: none;
  outline: none;
  cursor: default;
  border-radius: 36px;
  width: 24px;
  height: 24px;
  background-color: rgba(255, 255, 255, 0.1);
  color: ${({ theme }) => theme.white};

  :hover,
  :focus {
    opacity: 0.7;
  }
`;
const QuestionMark = styled_components_1.default.span `
  font-size: 1rem;
`;
function QuestionHelper({ text }) {
    const [show, setShow] = (0, react_1.useState)(false);
    const open = (0, react_1.useCallback)(() => setShow(true), [setShow]);
    const close = (0, react_1.useCallback)(() => setShow(false), [setShow]);
    return ((0, jsx_runtime_1.jsx)("span", Object.assign({ style: { marginLeft: 4 } }, { children: (0, jsx_runtime_1.jsx)(Tooltip_1.default, Object.assign({ text: text, show: show }, { children: (0, jsx_runtime_1.jsx)(QuestionWrapper, Object.assign({ onClick: open, onMouseEnter: open, onMouseLeave: close }, { children: (0, jsx_runtime_1.jsx)(react_feather_1.HelpCircle, { size: 16 }) })) })) })));
}
exports.default = QuestionHelper;
function LightQuestionHelper({ text }) {
    const [show, setShow] = (0, react_1.useState)(false);
    const open = (0, react_1.useCallback)(() => setShow(true), [setShow]);
    const close = (0, react_1.useCallback)(() => setShow(false), [setShow]);
    return ((0, jsx_runtime_1.jsx)("span", Object.assign({ style: { marginLeft: 4 } }, { children: (0, jsx_runtime_1.jsx)(Tooltip_1.default, Object.assign({ text: text, show: show }, { children: (0, jsx_runtime_1.jsx)(LightQuestionWrapper, Object.assign({ onClick: open, onMouseEnter: open, onMouseLeave: close }, { children: (0, jsx_runtime_1.jsx)(QuestionMark, { children: "?" }) })) })) })));
}
exports.LightQuestionHelper = LightQuestionHelper;
