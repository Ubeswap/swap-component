import { jsx as _jsx } from "react/jsx-runtime";
import styled from 'styled-components';
import { TYPE } from '../../theme';
import { RowBetween } from '../Row';
const StyledSendHeader = styled.div `
  padding: 12px 1rem 0px 1.5rem;
  margin-bottom: -4px;
  width: 100%;
  max-width: 420px;
  color: ${({ theme }) => theme.text2};
`;
export default function SendHeader() {
    return (_jsx(StyledSendHeader, { children: _jsx(RowBetween, Object.assign({ style: { height: '35px' } }, { children: _jsx(TYPE.black, Object.assign({ fontWeight: 500 }, { children: "Send" })) })) }));
}
