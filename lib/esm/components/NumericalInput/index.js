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
import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import styled from 'styled-components';
import { escapeRegExp } from '../../utils';
const StyledInput = styled.input `
  color: ${({ error, theme }) => (error ? theme.red1 : theme.text1)};
  width: 0;
  position: relative;
  font-weight: 500;
  outline: none;
  border: none;
  flex: 1 1 auto;
  background-color: ${({ theme }) => theme.bg1};
  font-size: ${({ fontSize }) => fontSize !== null && fontSize !== void 0 ? fontSize : '24px'};
  text-align: ${({ align }) => align && align};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0px;
  -webkit-appearance: textfield;

  ::-webkit-search-decoration {
    -webkit-appearance: none;
  }

  [type='number'] {
    -moz-appearance: textfield;
  }

  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  ::placeholder {
    color: ${({ theme }) => theme.text4};
  }
`;
const inputRegex = RegExp(`^\\d*(?:\\\\[.])?\\d*$`); // match escaped "." characters via in a non-capturing group
export const Input = React.memo(function InnerInput(_a) {
    var { value, onUserInput, placeholder } = _a, rest = __rest(_a, ["value", "onUserInput", "placeholder"]);
    const enforcer = (nextUserInput) => {
        if (nextUserInput === '' || inputRegex.test(escapeRegExp(nextUserInput))) {
            onUserInput(nextUserInput);
        }
    };
    return (_jsx(StyledInput, Object.assign({}, rest, { value: value, onChange: (event) => {
            // replace commas with periods, because uniswap exclusively uses period as the decimal separator
            enforcer(event.target.value.replace(/,/g, '.'));
        }, 
        // universal input options
        inputMode: "decimal", title: "Token Amount", autoComplete: "off", autoCorrect: "off", 
        // text-specific options
        type: "text", pattern: "^[0-9]*[.,]?[0-9]*$", placeholder: placeholder || '0.0', minLength: 1, maxLength: 79, spellCheck: "false" }), void 0));
});
export default Input;
