"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TabButton = exports.ButtonRadio = exports.ButtonDropdownLight = exports.ButtonDropdownGrey = exports.ButtonDropdown = exports.ButtonError = exports.ButtonConfirmed = exports.ButtonWhite = exports.ButtonEmpty = exports.ButtonOutlined = exports.ButtonUBEGradient = exports.ButtonPink = exports.ButtonSecondary = exports.ButtonGray = exports.ButtonLight = exports.ButtonPrimary = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const polished_1 = require("polished");
const react_feather_1 = require("react-feather");
const styled_components_1 = require("rebass/styled-components");
const styled_components_2 = __importDefault(require("styled-components"));
const Row_1 = require("../Row");
const Base = (0, styled_components_2.default)(styled_components_1.Button) `
  padding: ${({ padding }) => (padding ? padding : '18px')};
  width: ${({ width }) => (width ? width : '100%')};
  font-weight: 500;
  text-align: center;
  border-radius: 20px;
  border-radius: ${({ borderRadius }) => borderRadius && borderRadius};
  outline: none;
  border: 1px solid transparent;
  color: white;
  text-decoration: none;
  display: flex;
  justify-content: center;
  flex-wrap: nowrap;
  align-items: center;
  cursor: pointer;
  position: relative;
  z-index: 1;
  &:disabled {
    cursor: auto;
  }

  > * {
    user-select: none;
  }
`;
exports.ButtonPrimary = (0, styled_components_2.default)(Base) `
  background-color: ${({ theme }) => theme.primary1};
  color: white;
  &:focus {
    box-shadow: 0 0 0 1pt ${({ theme }) => (0, polished_1.darken)(0.05, theme.primary1)};
    background-color: ${({ theme }) => (0, polished_1.darken)(0.05, theme.primary1)};
  }
  &:hover {
    background-color: ${({ theme }) => (0, polished_1.darken)(0.05, theme.primary1)};
  }
  &:active {
    box-shadow: 0 0 0 1pt ${({ theme }) => (0, polished_1.darken)(0.1, theme.primary1)};
    background-color: ${({ theme }) => (0, polished_1.darken)(0.1, theme.primary1)};
  }
  &:disabled {
    background-color: ${({ theme, altDisabledStyle, disabled }) => altDisabledStyle ? (disabled ? theme.bg3 : theme.primary1) : theme.bg3};
    color: ${({ theme, altDisabledStyle, disabled }) => altDisabledStyle ? (disabled ? theme.text3 : 'white') : theme.text3};
    cursor: auto;
    box-shadow: none;
    border: 1px solid transparent;
    outline: none;
    opacity: ${({ altDisabledStyle }) => (altDisabledStyle ? '0.5' : '1')};
  }
`;
exports.ButtonLight = (0, styled_components_2.default)(Base) `
  background-color: ${({ theme }) => (0, polished_1.lighten)(0.28, theme.primary1)};
  color: ${({ theme }) => (0, polished_1.lighten)(0.01, theme.primary1)};
  font-size: 16px;
  font-weight: 500;
  &:focus {
    box-shadow: 0 0 0 1pt ${({ theme, disabled }) => !disabled && (0, polished_1.lighten)(0.24, theme.primary1)};
    background-color: ${({ theme, disabled }) => !disabled && (0, polished_1.lighten)(0.24, theme.primary1)};
  }
  &:hover {
    background-color: ${({ theme, disabled }) => !disabled && (0, polished_1.lighten)(0.24, theme.primary1)};
  }
  &:active {
    box-shadow: 0 0 0 1pt ${({ theme, disabled }) => !disabled && (0, polished_1.lighten)(0.2, theme.primary1)};
    background-color: ${({ theme, disabled }) => !disabled && (0, polished_1.lighten)(0.2, theme.primary1)};
  }
  :disabled {
    opacity: 0.4;
    :hover {
      cursor: auto;
      background-color: ${({ theme }) => (0, polished_1.lighten)(0.28, theme.primary1)};
      box-shadow: none;
      border: 1px solid transparent;
      outline: none;
    }
  }
`;
exports.ButtonGray = (0, styled_components_2.default)(Base) `
  background-color: ${({ theme }) => theme.bg3};
  color: ${({ theme }) => theme.text2};
  font-size: 16px;
  font-weight: 500;
  &:focus {
    background-color: ${({ theme, disabled }) => !disabled && (0, polished_1.darken)(0.05, theme.bg4)};
  }
  &:hover {
    background-color: ${({ theme, disabled }) => !disabled && (0, polished_1.darken)(0.05, theme.bg4)};
  }
  &:active {
    background-color: ${({ theme, disabled }) => !disabled && (0, polished_1.darken)(0.1, theme.bg4)};
  }
`;
exports.ButtonSecondary = (0, styled_components_2.default)(Base) `
  border: 1px solid ${({ theme }) => theme.primary4};
  color: ${({ theme }) => theme.primary1};
  background-color: transparent;
  font-size: 16px;
  border-radius: 12px;
  padding: ${({ padding }) => (padding ? padding : '10px')};

  &:focus {
    box-shadow: 0 0 0 1pt ${({ theme }) => theme.primary4};
    border: 1px solid ${({ theme }) => theme.primary3};
  }
  &:hover {
    border: 1px solid ${({ theme }) => theme.primary3};
  }
  &:active {
    box-shadow: 0 0 0 1pt ${({ theme }) => theme.primary4};
    border: 1px solid ${({ theme }) => theme.primary3};
  }
  &:disabled {
    opacity: 50%;
    cursor: auto;
  }
  a:hover {
    text-decoration: none;
  }
`;
exports.ButtonPink = (0, styled_components_2.default)(Base) `
  background-color: ${({ theme }) => theme.primary1};
  color: white;

  &:focus {
    box-shadow: 0 0 0 1pt ${({ theme }) => (0, polished_1.darken)(0.05, theme.primary1)};
    background-color: ${({ theme }) => (0, polished_1.darken)(0.05, theme.primary1)};
  }
  &:hover {
    background-color: ${({ theme }) => (0, polished_1.darken)(0.05, theme.primary1)};
  }
  &:active {
    box-shadow: 0 0 0 1pt ${({ theme }) => (0, polished_1.darken)(0.1, theme.primary1)};
    background-color: ${({ theme }) => (0, polished_1.darken)(0.1, theme.primary1)};
  }
  &:disabled {
    background-color: ${({ theme }) => theme.primary1};
    opacity: 50%;
    cursor: auto;
  }
`;
exports.ButtonUBEGradient = (0, styled_components_2.default)(exports.ButtonPrimary) `
  color: white;
  padding: 4px 8px;
  height: 36px;
  font-weight: 500;
  background-color: ${({ theme }) => theme.bg3};
  background: radial-gradient(174.47% 188.91% at 1.84% 0%, #ff007a 0%, #2172e5 100%), #edeef2;
  width: fit-content;
  position: relative;
  cursor: pointer;
  border: none;
  white-space: no-wrap;
  :hover {
    opacity: 0.8;
  }
  :active {
    opacity: 0.9;
  }
`;
exports.ButtonOutlined = (0, styled_components_2.default)(Base) `
  border: 1px solid ${({ theme }) => theme.bg2};
  background-color: transparent;
  color: ${({ theme }) => theme.text1};

  &:focus {
    box-shadow: 0 0 0 1px ${({ theme }) => theme.bg4};
  }
  &:hover {
    box-shadow: 0 0 0 1px ${({ theme }) => theme.bg4};
  }
  &:active {
    box-shadow: 0 0 0 1px ${({ theme }) => theme.bg4};
  }
  &:disabled {
    opacity: 50%;
    cursor: auto;
  }
`;
exports.ButtonEmpty = (0, styled_components_2.default)(Base) `
  background-color: transparent;
  color: ${({ theme }) => theme.primary1};
  display: flex;
  justify-content: center;
  align-items: center;

  &:focus {
    text-decoration: underline;
  }
  &:hover {
    text-decoration: none;
  }
  &:active {
    text-decoration: none;
  }
  &:disabled {
    opacity: 50%;
    cursor: auto;
  }
`;
exports.ButtonWhite = (0, styled_components_2.default)(Base) `
  border: 1px solid #edeef2;
  background-color: ${({ theme }) => theme.bg1};
  color: ${({ theme }) => theme.primaryText1};

  &:focus {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    box-shadow: 0 0 0 1pt ${(0, polished_1.darken)(0.05, '#edeef2')};
  }
  &:hover {
    box-shadow: 0 0 0 1pt ${(0, polished_1.darken)(0.1, '#edeef2')};
  }
  &:active {
    box-shadow: 0 0 0 1pt ${(0, polished_1.darken)(0.1, '#edeef2')};
  }
  &:disabled {
    opacity: 50%;
    cursor: auto;
  }
`;
const ButtonConfirmedStyle = (0, styled_components_2.default)(Base) `
  background-color: ${({ theme }) => (0, polished_1.lighten)(0.5, theme.green1)};
  color: ${({ theme }) => theme.green1};
  border: 1px solid ${({ theme }) => theme.green1};

  &:disabled {
    opacity: 50%;
    cursor: auto;
  }
`;
const ButtonErrorStyle = (0, styled_components_2.default)(Base) `
  background-color: ${({ theme }) => theme.red1};
  border: 1px solid ${({ theme }) => theme.red1};

  &:focus {
    box-shadow: 0 0 0 1pt ${({ theme }) => (0, polished_1.darken)(0.05, theme.red1)};
    background-color: ${({ theme }) => (0, polished_1.darken)(0.05, theme.red1)};
  }
  &:hover {
    background-color: ${({ theme }) => (0, polished_1.darken)(0.05, theme.red1)};
  }
  &:active {
    box-shadow: 0 0 0 1pt ${({ theme }) => (0, polished_1.darken)(0.1, theme.red1)};
    background-color: ${({ theme }) => (0, polished_1.darken)(0.1, theme.red1)};
  }
  &:disabled {
    opacity: 50%;
    cursor: auto;
    box-shadow: none;
    background-color: ${({ theme }) => theme.red1};
    border: 1px solid ${({ theme }) => theme.red1};
  }
`;
function ButtonConfirmed(_a) {
    var { confirmed, altDisabledStyle } = _a, rest = __rest(_a, ["confirmed", "altDisabledStyle"]);
    if (confirmed) {
        return (0, jsx_runtime_1.jsx)(ButtonConfirmedStyle, Object.assign({}, rest));
    }
    else {
        return (0, jsx_runtime_1.jsx)(exports.ButtonPrimary, Object.assign({}, rest, { altDisabledStyle: altDisabledStyle }));
    }
}
exports.ButtonConfirmed = ButtonConfirmed;
function ButtonError(_a) {
    var { error } = _a, rest = __rest(_a, ["error"]);
    if (error) {
        return (0, jsx_runtime_1.jsx)(ButtonErrorStyle, Object.assign({}, rest));
    }
    else {
        return (0, jsx_runtime_1.jsx)(exports.ButtonPrimary, Object.assign({}, rest));
    }
}
exports.ButtonError = ButtonError;
function ButtonDropdown(_a) {
    var { disabled = false, children } = _a, rest = __rest(_a, ["disabled", "children"]);
    return ((0, jsx_runtime_1.jsx)(exports.ButtonPrimary, Object.assign({}, rest, { disabled: disabled }, { children: (0, jsx_runtime_1.jsxs)(Row_1.RowBetween, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ style: { display: 'flex', alignItems: 'center' } }, { children: children })), (0, jsx_runtime_1.jsx)(react_feather_1.ChevronDown, { size: 24 })] }) })));
}
exports.ButtonDropdown = ButtonDropdown;
function ButtonDropdownGrey(_a) {
    var { disabled = false, children } = _a, rest = __rest(_a, ["disabled", "children"]);
    return ((0, jsx_runtime_1.jsx)(exports.ButtonGray, Object.assign({}, rest, { disabled: disabled, style: { borderRadius: '20px' } }, { children: (0, jsx_runtime_1.jsxs)(Row_1.RowBetween, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ style: { display: 'flex', alignItems: 'center' } }, { children: children })), (0, jsx_runtime_1.jsx)(react_feather_1.ChevronDown, { size: 24 })] }) })));
}
exports.ButtonDropdownGrey = ButtonDropdownGrey;
function ButtonDropdownLight(_a) {
    var { disabled = false, children } = _a, rest = __rest(_a, ["disabled", "children"]);
    return ((0, jsx_runtime_1.jsx)(exports.ButtonOutlined, Object.assign({}, rest, { disabled: disabled }, { children: (0, jsx_runtime_1.jsxs)(Row_1.RowBetween, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ style: { display: 'flex', alignItems: 'center' } }, { children: children })), (0, jsx_runtime_1.jsx)(react_feather_1.ChevronDown, { size: 24 })] }) })));
}
exports.ButtonDropdownLight = ButtonDropdownLight;
function ButtonRadio(_a) {
    var { active } = _a, rest = __rest(_a, ["active"]);
    if (!active) {
        return (0, jsx_runtime_1.jsx)(exports.ButtonWhite, Object.assign({}, rest));
    }
    else {
        return (0, jsx_runtime_1.jsx)(exports.ButtonPrimary, Object.assign({}, rest));
    }
}
exports.ButtonRadio = ButtonRadio;
exports.TabButton = (0, styled_components_2.default)(exports.ButtonLight) `
  background-color: initial;
  width: 35%;
  ${({ active }) => active &&
    `
  box-shadow: 0 0 0 1pt #6D619A70;
  background-color: #6D619A70;
`}
  font-size: 12px;
  display: inline-block;
  padding: 0.75rem;
  margin: 0.5rem 0.05rem 0.5rem 0.5rem;
`;
