"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeparatorDark = exports.Separator = exports.SearchInput = exports.MenuItem = exports.PaddedColumn = exports.Checkbox = exports.FadedSpan = exports.TextDot = exports.PopoverContainer = exports.StyledMenu = exports.ModalInfo = void 0;
const styled_components_1 = __importDefault(require("styled-components"));
const Column_1 = require("../Column");
const Row_1 = require("../Row");
exports.ModalInfo = styled_components_1.default.div `
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: center;
  padding: 1rem 1rem;
  margin: 0.25rem 0.5rem;
  justify-content: center;
  flex: 1;
  user-select: none;
`;
exports.StyledMenu = styled_components_1.default.div `
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border: none;
`;
exports.PopoverContainer = styled_components_1.default.div `
  z-index: 100;
  visibility: ${(props) => (props.show ? 'visible' : 'hidden')};
  opacity: ${(props) => (props.show ? 1 : 0)};
  transition: visibility 150ms linear, opacity 150ms linear;
  background: ${({ theme }) => theme.bg2};
  border: 1px solid ${({ theme }) => theme.bg3};
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.01), 0px 4px 8px rgba(0, 0, 0, 0.04), 0px 16px 24px rgba(0, 0, 0, 0.04),
    0px 24px 32px rgba(0, 0, 0, 0.01);
  color: ${({ theme }) => theme.text2};
  border-radius: 0.5rem;
  padding: 1rem;
  display: grid;
  grid-template-rows: 1fr;
  grid-gap: 8px;
  font-size: 1rem;
  text-align: left;
  top: 80px;
`;
exports.TextDot = styled_components_1.default.div `
  height: 3px;
  width: 3px;
  background-color: ${({ theme }) => theme.text2};
  border-radius: 50%;
`;
exports.FadedSpan = (0, styled_components_1.default)(Row_1.RowFixed) `
  color: ${({ theme }) => theme.primary1};
  font-size: 14px;
`;
exports.Checkbox = styled_components_1.default.input `
  border: 1px solid ${({ theme }) => theme.red3};
  height: 20px;
  margin: 0;
`;
exports.PaddedColumn = (0, styled_components_1.default)(Column_1.AutoColumn) `
  padding: 20px;
`;
exports.MenuItem = (0, styled_components_1.default)(Row_1.RowBetween) `
  padding: 4px 20px;
  height: 56px;
  display: grid;
  grid-template-columns: auto minmax(auto, 1fr) auto minmax(0, 72px);
  grid-gap: 16px;
  cursor: ${({ disabled }) => !disabled && 'pointer'};
  pointer-events: ${({ disabled }) => disabled && 'none'};
  :hover {
    background-color: ${({ theme, disabled }) => !disabled && theme.bg2};
  }
  opacity: ${({ disabled, selected }) => (disabled || selected ? 0.5 : 1)};
`;
exports.SearchInput = styled_components_1.default.input `
  position: relative;
  display: flex;
  padding: 16px;
  align-items: center;
  width: 100%;
  white-space: nowrap;
  background: none;
  border: none;
  outline: none;
  border-radius: 20px;
  color: ${({ theme }) => theme.text1};
  border-style: solid;
  border: 1px solid ${({ theme }) => theme.bg3};
  -webkit-appearance: none;

  font-size: 18px;

  ::placeholder {
    color: ${({ theme }) => theme.text3};
  }
  transition: border 100ms;
  :focus {
    border: 1px solid ${({ theme }) => theme.primary1};
    outline: none;
  }
`;
exports.Separator = styled_components_1.default.div `
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.bg2};
`;
exports.SeparatorDark = styled_components_1.default.div `
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.bg3};
`;
