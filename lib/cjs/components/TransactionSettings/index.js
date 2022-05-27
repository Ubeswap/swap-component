"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const polished_1 = require("polished");
const react_1 = require("react");
const styled_components_1 = __importStar(require("styled-components"));
const theme_1 = require("../../theme");
const Column_1 = require("../Column");
const QuestionHelper_1 = __importDefault(require("../QuestionHelper"));
const Row_1 = require("../Row");
var SlippageError;
(function (SlippageError) {
    SlippageError["InvalidInput"] = "InvalidInput";
    SlippageError["RiskyLow"] = "RiskyLow";
    SlippageError["RiskyHigh"] = "RiskyHigh";
})(SlippageError || (SlippageError = {}));
var DeadlineError;
(function (DeadlineError) {
    DeadlineError["InvalidInput"] = "InvalidInput";
})(DeadlineError || (DeadlineError = {}));
const FancyButton = styled_components_1.default.button `
  color: ${({ theme }) => theme.text1};
  align-items: center;
  height: 2rem;
  border-radius: 36px;
  font-size: 1rem;
  width: auto;
  min-width: 3.5rem;
  border: 1px solid ${({ theme }) => theme.bg3};
  outline: none;
  background: ${({ theme }) => theme.bg1};
  :hover {
    border: 1px solid ${({ theme }) => theme.bg4};
  }
  :focus {
    border: 1px solid ${({ theme }) => theme.primary1};
  }
`;
const Option = (0, styled_components_1.default)(FancyButton) `
  margin-right: 8px;
  :hover {
    cursor: pointer;
  }
  background-color: ${({ active, theme }) => active && theme.primary1};
  color: ${({ active, theme }) => (active ? theme.white : theme.text1)};
`;
const Input = styled_components_1.default.input `
  background: ${({ theme }) => theme.bg1};
  font-size: 16px;
  width: auto;
  outline: none;
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  color: ${({ theme, color }) => (color === 'red' ? theme.red1 : theme.text1)};
  text-align: right;
`;
const OptionCustom = (0, styled_components_1.default)(FancyButton) `
  height: 2rem;
  position: relative;
  padding: 0 0.75rem;
  flex: 1;
  border: ${({ theme, active, warning }) => active && `1px solid ${warning ? theme.red1 : theme.primary1}`};
  :hover {
    border: ${({ theme, active, warning }) => active && `1px solid ${warning ? (0, polished_1.darken)(0.1, theme.red1) : (0, polished_1.darken)(0.1, theme.primary1)}`};
  }

  input {
    width: 100%;
    height: 100%;
    border: 0px;
    border-radius: 2rem;
  }
`;
const SlippageEmojiContainer = styled_components_1.default.span `
  color: #f3841e;
  ${({ theme }) => theme.mediaWidth.upToSmall `
    display: none;  
  `}
`;
function SlippageTabs({ rawSlippage, setRawSlippage, deadline, setDeadline }) {
    const theme = (0, react_1.useContext)(styled_components_1.ThemeContext);
    const inputRef = (0, react_1.useRef)();
    const [slippageInput, setSlippageInput] = (0, react_1.useState)('');
    const [deadlineInput, setDeadlineInput] = (0, react_1.useState)('');
    const slippageInputIsValid = slippageInput === '' || (rawSlippage / 100).toFixed(2) === Number.parseFloat(slippageInput).toFixed(2);
    const deadlineInputIsValid = deadlineInput === '' || (deadline / 60).toString() === deadlineInput;
    let slippageError;
    if (slippageInput !== '' && !slippageInputIsValid) {
        slippageError = SlippageError.InvalidInput;
    }
    else if (slippageInputIsValid && rawSlippage < 50) {
        slippageError = SlippageError.RiskyLow;
    }
    else if (slippageInputIsValid && rawSlippage > 500) {
        slippageError = SlippageError.RiskyHigh;
    }
    else {
        slippageError = undefined;
    }
    let deadlineError;
    if (deadlineInput !== '' && !deadlineInputIsValid) {
        deadlineError = DeadlineError.InvalidInput;
    }
    else {
        deadlineError = undefined;
    }
    function parseCustomSlippage(value) {
        setSlippageInput(value);
        try {
            const valueAsIntFromRoundedFloat = Number.parseInt((Number.parseFloat(value) * 100).toString());
            if (!Number.isNaN(valueAsIntFromRoundedFloat) && valueAsIntFromRoundedFloat < 5000) {
                setRawSlippage(valueAsIntFromRoundedFloat);
            }
            // eslint-disable-next-line no-empty
        }
        catch (_a) { }
    }
    function parseCustomDeadline(value) {
        setDeadlineInput(value);
        try {
            const valueAsInt = Number.parseInt(value) * 60;
            if (!Number.isNaN(valueAsInt) && valueAsInt > 0) {
                setDeadline(valueAsInt);
            }
            // eslint-disable-next-line no-empty
        }
        catch (_a) { }
    }
    return ((0, jsx_runtime_1.jsxs)(Column_1.AutoColumn, Object.assign({ gap: "md" }, { children: [(0, jsx_runtime_1.jsxs)(Column_1.AutoColumn, Object.assign({ gap: "sm" }, { children: [(0, jsx_runtime_1.jsxs)(Row_1.RowFixed, { children: [(0, jsx_runtime_1.jsx)(theme_1.TYPE.black, Object.assign({ fontWeight: 400, fontSize: 14, color: theme.text2 }, { children: "Slippage tolerance" }), void 0), (0, jsx_runtime_1.jsx)(QuestionHelper_1.default, { text: "Your transaction will revert if the price changes unfavorably by more than this percentage." }, void 0)] }, void 0), (0, jsx_runtime_1.jsxs)(Row_1.RowBetween, { children: [(0, jsx_runtime_1.jsx)(Option, Object.assign({ onClick: () => {
                                    setSlippageInput('');
                                    setRawSlippage(10);
                                }, active: rawSlippage === 10 }, { children: "0.1%" }), void 0), (0, jsx_runtime_1.jsx)(Option, Object.assign({ onClick: () => {
                                    setSlippageInput('');
                                    setRawSlippage(50);
                                }, active: rawSlippage === 50 }, { children: "0.5%" }), void 0), (0, jsx_runtime_1.jsx)(Option, Object.assign({ onClick: () => {
                                    setSlippageInput('');
                                    setRawSlippage(100);
                                }, active: rawSlippage === 100 }, { children: "1%" }), void 0), (0, jsx_runtime_1.jsx)(OptionCustom, Object.assign({ active: ![10, 50, 100].includes(rawSlippage), warning: !slippageInputIsValid, tabIndex: -1 }, { children: (0, jsx_runtime_1.jsxs)(Row_1.RowBetween, { children: [!!slippageInput &&
                                            (slippageError === SlippageError.RiskyLow || slippageError === SlippageError.RiskyHigh) ? ((0, jsx_runtime_1.jsx)(SlippageEmojiContainer, { children: (0, jsx_runtime_1.jsx)("span", Object.assign({ role: "img", "aria-label": "warning" }, { children: "\u26A0\uFE0F" }), void 0) }, void 0)) : null, (0, jsx_runtime_1.jsx)(Input, { ref: inputRef, placeholder: (rawSlippage / 100).toFixed(2), value: slippageInput, onBlur: () => {
                                                parseCustomSlippage((rawSlippage / 100).toFixed(2));
                                            }, onChange: (e) => parseCustomSlippage(e.target.value), color: !slippageInputIsValid ? 'red' : '' }, void 0), "%"] }, void 0) }), void 0)] }, void 0), !!slippageError && ((0, jsx_runtime_1.jsx)(Row_1.RowBetween, Object.assign({ style: {
                            fontSize: '14px',
                            paddingTop: '7px',
                            color: slippageError === SlippageError.InvalidInput ? 'red' : '#F3841E',
                        } }, { children: slippageError === SlippageError.InvalidInput
                            ? 'Enter a valid slippage percentage'
                            : slippageError === SlippageError.RiskyLow
                                ? 'Your transaction may fail'
                                : 'Your transaction may be frontrun' }), void 0))] }), void 0), (0, jsx_runtime_1.jsxs)(Column_1.AutoColumn, Object.assign({ gap: "sm" }, { children: [(0, jsx_runtime_1.jsxs)(Row_1.RowFixed, { children: [(0, jsx_runtime_1.jsx)(theme_1.TYPE.black, Object.assign({ fontSize: 14, fontWeight: 400, color: theme.text2 }, { children: "Transaction deadline" }), void 0), (0, jsx_runtime_1.jsx)(QuestionHelper_1.default, { text: "Your transaction will revert if it is pending for more than this long." }, void 0)] }, void 0), (0, jsx_runtime_1.jsxs)(Row_1.RowFixed, { children: [(0, jsx_runtime_1.jsx)(OptionCustom, Object.assign({ style: { width: '80px' }, tabIndex: -1 }, { children: (0, jsx_runtime_1.jsx)(Input, { color: deadlineError ? 'red' : undefined, onBlur: () => {
                                        parseCustomDeadline((deadline / 60).toString());
                                    }, placeholder: (deadline / 60).toString(), value: deadlineInput, onChange: (e) => parseCustomDeadline(e.target.value) }, void 0) }), void 0), (0, jsx_runtime_1.jsx)(theme_1.TYPE.body, Object.assign({ style: { paddingLeft: '8px' }, fontSize: 14 }, { children: "minutes" }), void 0)] }, void 0)] }), void 0)] }), void 0));
}
exports.default = SlippageTabs;
