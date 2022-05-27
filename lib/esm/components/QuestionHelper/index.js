import { jsx as _jsx } from "react/jsx-runtime";
import { useCallback, useState } from 'react';
import { HelpCircle as Question } from 'react-feather';
import styled from 'styled-components';
import Tooltip from '../Tooltip';
const QuestionWrapper = styled.div `
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.2rem;
  border: none;
  background: none;
  outline: none;
  cursor: default;
  border-radius: 36px;
  background-color: ${({ theme }) => theme.bg2};
  color: ${({ theme }) => theme.text2};

  :hover,
  :focus {
    opacity: 0.7;
  }
`;
const LightQuestionWrapper = styled.div `
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.2rem;
  border: none;
  background: none;
  outline: none;
  cursor: default;
  border-radius: 36px;
  width: 24px;
  height: 24px;
  background-color: rgba(255, 255, 255, 0.1);
  color: ${({ theme }) => theme.white};

  :hover,
  :focus {
    opacity: 0.7;
  }
`;
const QuestionMark = styled.span `
  font-size: 1rem;
`;
export default function QuestionHelper({ text }) {
    const [show, setShow] = useState(false);
    const open = useCallback(() => setShow(true), [setShow]);
    const close = useCallback(() => setShow(false), [setShow]);
    return (_jsx("span", Object.assign({ style: { marginLeft: 4 } }, { children: _jsx(Tooltip, Object.assign({ text: text, show: show }, { children: _jsx(QuestionWrapper, Object.assign({ onClick: open, onMouseEnter: open, onMouseLeave: close }, { children: _jsx(Question, { size: 16 }, void 0) }), void 0) }), void 0) }), void 0));
}
export function LightQuestionHelper({ text }) {
    const [show, setShow] = useState(false);
    const open = useCallback(() => setShow(true), [setShow]);
    const close = useCallback(() => setShow(false), [setShow]);
    return (_jsx("span", Object.assign({ style: { marginLeft: 4 } }, { children: _jsx(Tooltip, Object.assign({ text: text, show: show }, { children: _jsx(LightQuestionWrapper, Object.assign({ onClick: open, onMouseEnter: open, onMouseLeave: close }, { children: _jsx(QuestionMark, { children: "?" }, void 0) }), void 0) }), void 0) }), void 0));
}
