"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BodyWrapper = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const styled_components_1 = __importDefault(require("styled-components"));
exports.BodyWrapper = styled_components_1.default.div `
  position: relative;
  max-width: 420px;
  width: 100%;
  background: ${({ theme }) => theme.bg1};
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.01), 0px 4px 8px rgba(0, 0, 0, 0.04), 0px 16px 24px rgba(0, 0, 0, 0.04),
    0px 24px 32px rgba(0, 0, 0, 0.01);
  border-radius: 30px;
  z-index: 1;
  /* padding: 1rem; */
`;
/**
 * The styled container element that wraps the content of most pages and the tabs.
 */
function AppBody({ children }) {
    return (0, jsx_runtime_1.jsx)(exports.BodyWrapper, { children: children });
}
exports.default = AppBody;
