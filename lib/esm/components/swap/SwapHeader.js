import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styled from 'styled-components';
import { TYPE } from '../../theme';
import { RowBetween } from '../Row';
import Settings from '../Settings';
const StyledSwapHeader = styled.div `
  padding: 12px 1rem 0px 1.5rem;
  margin-bottom: -4px;
  width: 100%;
  max-width: 420px;
  color: ${({ theme }) => theme.text2};
`;
export default function SwapHeader({ title = 'Swap', hideSettings = false, }) {
    return (_jsx(StyledSwapHeader, { children: _jsxs(RowBetween, { children: [_jsx(TYPE.black, Object.assign({ my: 2, fontWeight: 500 }, { children: title })), hideSettings || _jsx(Settings, {})] }) }));
}
