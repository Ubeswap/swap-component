"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const styled_components_1 = __importDefault(require("styled-components"));
const theme_1 = require("../../theme");
const Row_1 = require("../Row");
const Settings_1 = __importDefault(require("../Settings"));
const StyledSwapHeader = styled_components_1.default.div `
  padding: 12px 1rem 0px 1.5rem;
  margin-bottom: -4px;
  width: 100%;
  max-width: 420px;
  color: ${({ theme }) => theme.text2};
  box-sizing: border-box;
`;
function SwapHeader({ title = 'Swap', hideSettings = false, }) {
    return ((0, jsx_runtime_1.jsx)(StyledSwapHeader, { children: (0, jsx_runtime_1.jsxs)(Row_1.RowBetween, { children: [(0, jsx_runtime_1.jsx)(theme_1.TYPE.black, Object.assign({ my: 2, fontWeight: 500, fontSize: 16 }, { children: title })), hideSettings || (0, jsx_runtime_1.jsx)(Settings_1.default, {})] }) }));
}
exports.default = SwapHeader;
