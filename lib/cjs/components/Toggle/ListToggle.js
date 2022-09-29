"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const styled_components_1 = __importDefault(require("styled-components"));
const theme_1 = require("../../theme");
const Wrapper = styled_components_1.default.button `
  border-radius: 20px;
  border: none;
  background: ${({ theme }) => theme.bg1};
  display: flex;
  width: fit-content;
  cursor: pointer;
  outline: none;
  padding: 0.4rem 0.4rem;
  align-items: center;
`;
const ToggleElement = styled_components_1.default.span `
  border-radius: 50%;
  height: 24px;
  width: 24px;
  background-color: ${({ isActive, bgColor, theme }) => (isActive ? bgColor : theme.bg4)};
  :hover {
    opacity: 0.8;
  }
`;
const StatusText = (0, styled_components_1.default)(theme_1.TYPE.main) `
  margin: 0 10px;
  width: 24px;
  color: ${({ theme, isActive }) => (isActive ? theme.text1 : theme.text3)};
`;
function ListToggle({ id, isActive, bgColor, toggle }) {
    return ((0, jsx_runtime_1.jsxs)(Wrapper, Object.assign({ id: id, isActive: isActive, onClick: toggle }, { children: [isActive && ((0, jsx_runtime_1.jsx)(StatusText, Object.assign({ fontWeight: "600", margin: "0 6px", isActive: true }, { children: "ON" }))), (0, jsx_runtime_1.jsx)(ToggleElement, { isActive: isActive, bgColor: bgColor }), !isActive && ((0, jsx_runtime_1.jsx)(StatusText, Object.assign({ fontWeight: "600", margin: "0 6px", isActive: false }, { children: "OFF" })))] })));
}
exports.default = ListToggle;
