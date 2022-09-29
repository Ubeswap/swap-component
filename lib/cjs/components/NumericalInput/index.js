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
exports.Input = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importDefault(require("react"));
const styled_components_1 = __importDefault(require("styled-components"));
const utils_1 = require("../../utils");
const StyledInput = styled_components_1.default.input `
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
exports.Input = react_1.default.memo(function InnerInput(_a) {
    var { value, onUserInput, placeholder } = _a, rest = __rest(_a, ["value", "onUserInput", "placeholder"]);
    const enforcer = (nextUserInput) => {
        if (nextUserInput === '' || inputRegex.test((0, utils_1.escapeRegExp)(nextUserInput))) {
            onUserInput(nextUserInput);
        }
    };
    return ((0, jsx_runtime_1.jsx)(StyledInput, Object.assign({}, rest, { value: value, onChange: (event) => {
            // replace commas with periods, because uniswap exclusively uses period as the decimal separator
            enforcer(event.target.value.replace(/,/g, '.'));
        }, 
        // universal input options
        inputMode: "decimal", title: "Token Amount", autoComplete: "off", autoCorrect: "off", 
        // text-specific options
        type: "text", pattern: "^[0-9]*[.,]?[0-9]*$", placeholder: placeholder || '0.0', minLength: 1, maxLength: 79, spellCheck: "false" })));
});
exports.default = exports.Input;
