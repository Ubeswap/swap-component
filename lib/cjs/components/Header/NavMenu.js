"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StyledNavMenu = void 0;
const polished_1 = require("polished");
const styled_components_1 = __importDefault(require("styled-components"));
exports.StyledNavMenu = (0, styled_components_1.default)('div') `
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: left;
  border-radius: 3rem;
  outline: none;
  cursor: pointer;
  text-decoration: none;
  color: ${({ theme }) => theme.text2};
  font-size: 1rem;
  width: fit-content;
  margin: 0 12px;
  font-weight: 500;

  :hover,
  :focus {
    color: ${({ theme }) => (0, polished_1.darken)(0.1, theme.text1)};
  }

  @media (max-width: 320px) {
    margin: 0 8px;
  }

  ${({ theme }) => theme.mediaWidth.upToExtraSmall `
    display: none;
  `}
`;
