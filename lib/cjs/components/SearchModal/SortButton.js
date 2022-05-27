"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilterWrapper = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const rebass_1 = require("rebass");
const styled_components_1 = __importDefault(require("styled-components"));
const Row_1 = require("../Row");
exports.FilterWrapper = (0, styled_components_1.default)(Row_1.RowFixed) `
  padding: 8px;
  background-color: ${({ theme }) => theme.bg2};
  color: ${({ theme }) => theme.text1};
  border-radius: 8px;
  user-select: none;
  & > * {
    user-select: none;
  }
  :hover {
    cursor: pointer;
  }
`;
function SortButton({ toggleSortOrder, ascending, }) {
    return ((0, jsx_runtime_1.jsx)(exports.FilterWrapper, Object.assign({ onClick: toggleSortOrder }, { children: (0, jsx_runtime_1.jsx)(rebass_1.Text, Object.assign({ fontSize: 14, fontWeight: 500 }, { children: ascending ? '↑' : '↓' }), void 0) }), void 0));
}
exports.default = SortButton;
