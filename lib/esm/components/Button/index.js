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
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { darken, lighten } from 'polished';
import { ChevronDown } from 'react-feather';
import { Button as RebassButton } from 'rebass/styled-components';
import styled from 'styled-components';
import { RowBetween } from '../Row';
const Base = styled(RebassButton) `
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
export const ButtonPrimary = styled(Base) `
  background-color: ${({ theme }) => theme.primary1};
  color: white;
  &:focus {
    box-shadow: 0 0 0 1pt ${({ theme }) => darken(0.05, theme.primary1)};
    background-color: ${({ theme }) => darken(0.05, theme.primary1)};
  }
  &:hover {
    background-color: ${({ theme }) => darken(0.05, theme.primary1)};
  }
  &:active {
    box-shadow: 0 0 0 1pt ${({ theme }) => darken(0.1, theme.primary1)};
    background-color: ${({ theme }) => darken(0.1, theme.primary1)};
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
export const ButtonLight = styled(Base) `
  background-color: ${({ theme }) => theme.primary5};
  color: ${({ theme }) => theme.primaryText1};
  font-size: 16px;
  font-weight: 500;
  &:focus {
    box-shadow: 0 0 0 1pt ${({ theme, disabled }) => !disabled && darken(0.03, theme.primary5)};
    background-color: ${({ theme, disabled }) => !disabled && darken(0.03, theme.primary5)};
  }
  &:hover {
    background-color: ${({ theme, disabled }) => !disabled && darken(0.03, theme.primary5)};
  }
  &:active {
    box-shadow: 0 0 0 1pt ${({ theme, disabled }) => !disabled && darken(0.05, theme.primary5)};
    background-color: ${({ theme, disabled }) => !disabled && darken(0.05, theme.primary5)};
  }
  :disabled {
    opacity: 0.4;
    :hover {
      cursor: auto;
      background-color: ${({ theme }) => theme.primary5};
      box-shadow: none;
      border: 1px solid transparent;
      outline: none;
    }
  }
`;
export const ButtonGray = styled(Base) `
  background-color: ${({ theme }) => theme.bg3};
  color: ${({ theme }) => theme.text2};
  font-size: 16px;
  font-weight: 500;
  &:focus {
    background-color: ${({ theme, disabled }) => !disabled && darken(0.05, theme.bg4)};
  }
  &:hover {
    background-color: ${({ theme, disabled }) => !disabled && darken(0.05, theme.bg4)};
  }
  &:active {
    background-color: ${({ theme, disabled }) => !disabled && darken(0.1, theme.bg4)};
  }
`;
export const ButtonSecondary = styled(Base) `
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
export const ButtonPink = styled(Base) `
  background-color: ${({ theme }) => theme.primary1};
  color: white;

  &:focus {
    box-shadow: 0 0 0 1pt ${({ theme }) => darken(0.05, theme.primary1)};
    background-color: ${({ theme }) => darken(0.05, theme.primary1)};
  }
  &:hover {
    background-color: ${({ theme }) => darken(0.05, theme.primary1)};
  }
  &:active {
    box-shadow: 0 0 0 1pt ${({ theme }) => darken(0.1, theme.primary1)};
    background-color: ${({ theme }) => darken(0.1, theme.primary1)};
  }
  &:disabled {
    background-color: ${({ theme }) => theme.primary1};
    opacity: 50%;
    cursor: auto;
  }
`;
export const ButtonUBEGradient = styled(ButtonPrimary) `
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
export const ButtonOutlined = styled(Base) `
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
export const ButtonEmpty = styled(Base) `
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
export const ButtonWhite = styled(Base) `
  border: 1px solid #edeef2;
  background-color: ${({ theme }) => theme.bg1};
  color: ${({ theme }) => theme.primaryText1};

  &:focus {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    box-shadow: 0 0 0 1pt ${darken(0.05, '#edeef2')};
  }
  &:hover {
    box-shadow: 0 0 0 1pt ${darken(0.1, '#edeef2')};
  }
  &:active {
    box-shadow: 0 0 0 1pt ${darken(0.1, '#edeef2')};
  }
  &:disabled {
    opacity: 50%;
    cursor: auto;
  }
`;
const ButtonConfirmedStyle = styled(Base) `
  background-color: ${({ theme }) => lighten(0.5, theme.green1)};
  color: ${({ theme }) => theme.green1};
  border: 1px solid ${({ theme }) => theme.green1};

  &:disabled {
    opacity: 50%;
    cursor: auto;
  }
`;
const ButtonErrorStyle = styled(Base) `
  background-color: ${({ theme }) => theme.red1};
  border: 1px solid ${({ theme }) => theme.red1};

  &:focus {
    box-shadow: 0 0 0 1pt ${({ theme }) => darken(0.05, theme.red1)};
    background-color: ${({ theme }) => darken(0.05, theme.red1)};
  }
  &:hover {
    background-color: ${({ theme }) => darken(0.05, theme.red1)};
  }
  &:active {
    box-shadow: 0 0 0 1pt ${({ theme }) => darken(0.1, theme.red1)};
    background-color: ${({ theme }) => darken(0.1, theme.red1)};
  }
  &:disabled {
    opacity: 50%;
    cursor: auto;
    box-shadow: none;
    background-color: ${({ theme }) => theme.red1};
    border: 1px solid ${({ theme }) => theme.red1};
  }
`;
export function ButtonConfirmed(_a) {
    var { confirmed, altDisabledStyle } = _a, rest = __rest(_a, ["confirmed", "altDisabledStyle"]);
    if (confirmed) {
        return _jsx(ButtonConfirmedStyle, Object.assign({}, rest), void 0);
    }
    else {
        return _jsx(ButtonPrimary, Object.assign({}, rest, { altDisabledStyle: altDisabledStyle }), void 0);
    }
}
export function ButtonError(_a) {
    var { error } = _a, rest = __rest(_a, ["error"]);
    if (error) {
        return _jsx(ButtonErrorStyle, Object.assign({}, rest), void 0);
    }
    else {
        return _jsx(ButtonPrimary, Object.assign({}, rest), void 0);
    }
}
export function ButtonDropdown(_a) {
    var { disabled = false, children } = _a, rest = __rest(_a, ["disabled", "children"]);
    return (_jsx(ButtonPrimary, Object.assign({}, rest, { disabled: disabled }, { children: _jsxs(RowBetween, { children: [_jsx("div", Object.assign({ style: { display: 'flex', alignItems: 'center' } }, { children: children }), void 0), _jsx(ChevronDown, { size: 24 }, void 0)] }, void 0) }), void 0));
}
export function ButtonDropdownGrey(_a) {
    var { disabled = false, children } = _a, rest = __rest(_a, ["disabled", "children"]);
    return (_jsx(ButtonGray, Object.assign({}, rest, { disabled: disabled, style: { borderRadius: '20px' } }, { children: _jsxs(RowBetween, { children: [_jsx("div", Object.assign({ style: { display: 'flex', alignItems: 'center' } }, { children: children }), void 0), _jsx(ChevronDown, { size: 24 }, void 0)] }, void 0) }), void 0));
}
export function ButtonDropdownLight(_a) {
    var { disabled = false, children } = _a, rest = __rest(_a, ["disabled", "children"]);
    return (_jsx(ButtonOutlined, Object.assign({}, rest, { disabled: disabled }, { children: _jsxs(RowBetween, { children: [_jsx("div", Object.assign({ style: { display: 'flex', alignItems: 'center' } }, { children: children }), void 0), _jsx(ChevronDown, { size: 24 }, void 0)] }, void 0) }), void 0));
}
export function ButtonRadio(_a) {
    var { active } = _a, rest = __rest(_a, ["active"]);
    if (!active) {
        return _jsx(ButtonWhite, Object.assign({}, rest), void 0);
    }
    else {
        return _jsx(ButtonPrimary, Object.assign({}, rest), void 0);
    }
}
export const TabButton = styled(ButtonLight) `
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
