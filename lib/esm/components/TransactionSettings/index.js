import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { darken } from 'polished';
import { useContext, useRef, useState } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { TYPE } from '../../theme';
import { AutoColumn } from '../Column';
import QuestionHelper from '../QuestionHelper';
import { RowBetween, RowFixed } from '../Row';
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
const FancyButton = styled.button `
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
const Option = styled(FancyButton) `
  margin-right: 8px;
  :hover {
    cursor: pointer;
  }
  background-color: ${({ active, theme }) => active && theme.primary1};
  color: ${({ active, theme }) => (active ? theme.white : theme.text1)};
`;
const Input = styled.input `
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
const OptionCustom = styled(FancyButton) `
  height: 2rem;
  position: relative;
  padding: 0 0.75rem;
  flex: 1;
  border: ${({ theme, active, warning }) => active && `1px solid ${warning ? theme.red1 : theme.primary1}`};
  :hover {
    border: ${({ theme, active, warning }) => active && `1px solid ${warning ? darken(0.1, theme.red1) : darken(0.1, theme.primary1)}`};
  }

  input {
    width: 100%;
    height: 100%;
    border: 0px;
    border-radius: 2rem;
    box-sizing: border-box;
  }
`;
const SlippageEmojiContainer = styled.span `
  color: #f3841e;
  ${({ theme }) => theme.mediaWidth.upToSmall `
    display: none;  
  `}
`;
export default function SlippageTabs({ rawSlippage, setRawSlippage, deadline, setDeadline }) {
    const theme = useContext(ThemeContext);
    const inputRef = useRef();
    const [slippageInput, setSlippageInput] = useState('');
    const [deadlineInput, setDeadlineInput] = useState('');
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
    return (_jsxs(AutoColumn, Object.assign({ gap: "md" }, { children: [_jsxs(AutoColumn, Object.assign({ gap: "sm" }, { children: [_jsxs(RowFixed, { children: [_jsx(TYPE.black, Object.assign({ fontWeight: 400, fontSize: 14, color: theme.text2 }, { children: "Slippage tolerance" })), _jsx(QuestionHelper, { text: "Your transaction will revert if the price changes unfavorably by more than this percentage." })] }), _jsxs(RowBetween, { children: [_jsx(Option, Object.assign({ onClick: () => {
                                    setSlippageInput('');
                                    setRawSlippage(10);
                                }, active: rawSlippage === 10 }, { children: "0.1%" })), _jsx(Option, Object.assign({ onClick: () => {
                                    setSlippageInput('');
                                    setRawSlippage(50);
                                }, active: rawSlippage === 50 }, { children: "0.5%" })), _jsx(Option, Object.assign({ onClick: () => {
                                    setSlippageInput('');
                                    setRawSlippage(100);
                                }, active: rawSlippage === 100 }, { children: "1%" })), _jsx(OptionCustom, Object.assign({ active: ![10, 50, 100].includes(rawSlippage), warning: !slippageInputIsValid, tabIndex: -1 }, { children: _jsxs(RowBetween, { children: [!!slippageInput &&
                                            (slippageError === SlippageError.RiskyLow || slippageError === SlippageError.RiskyHigh) ? (_jsx(SlippageEmojiContainer, { children: _jsx("span", Object.assign({ role: "img", "aria-label": "warning" }, { children: "\u26A0\uFE0F" })) })) : null, _jsx(Input, { ref: inputRef, placeholder: (rawSlippage / 100).toFixed(2), value: slippageInput, onBlur: () => {
                                                parseCustomSlippage((rawSlippage / 100).toFixed(2));
                                            }, onChange: (e) => parseCustomSlippage(e.target.value), color: !slippageInputIsValid ? 'red' : '' }), "%"] }) }))] }), !!slippageError && (_jsx(RowBetween, Object.assign({ style: {
                            fontSize: '14px',
                            paddingTop: '7px',
                            color: slippageError === SlippageError.InvalidInput ? 'red' : '#F3841E',
                        } }, { children: slippageError === SlippageError.InvalidInput
                            ? 'Enter a valid slippage percentage'
                            : slippageError === SlippageError.RiskyLow
                                ? 'Your transaction may fail'
                                : 'Your transaction may be frontrun' })))] })), _jsxs(AutoColumn, Object.assign({ gap: "sm" }, { children: [_jsxs(RowFixed, { children: [_jsx(TYPE.black, Object.assign({ fontSize: 14, fontWeight: 400, color: theme.text2 }, { children: "Transaction deadline" })), _jsx(QuestionHelper, { text: "Your transaction will revert if it is pending for more than this long." })] }), _jsxs(RowFixed, { children: [_jsx(OptionCustom, Object.assign({ style: { width: '80px' }, tabIndex: -1 }, { children: _jsx(Input, { color: deadlineError ? 'red' : undefined, onBlur: () => {
                                        parseCustomDeadline((deadline / 60).toString());
                                    }, placeholder: (deadline / 60).toString(), value: deadlineInput, onChange: (e) => parseCustomDeadline(e.target.value) }) })), _jsx(TYPE.body, Object.assign({ style: { paddingLeft: '8px' }, fontSize: 14 }, { children: "minutes" }))] })] }))] })));
}
