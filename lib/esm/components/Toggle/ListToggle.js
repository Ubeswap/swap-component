import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styled from 'styled-components';
import { TYPE } from '../../theme';
const Wrapper = styled.button `
  border-radius: 20px;
  border: none;
  background: ${({ theme }) => theme.bg1};
  display: flex;
  width: fit-content;
  cursor: pointer;
  outline: none;
  padding: 0.4rem 0.4rem;
  align-items: center;
`;
const ToggleElement = styled.span `
  border-radius: 50%;
  height: 24px;
  width: 24px;
  background-color: ${({ isActive, bgColor, theme }) => (isActive ? bgColor : theme.bg4)};
  :hover {
    opacity: 0.8;
  }
`;
const StatusText = styled(TYPE.main) `
  margin: 0 10px;
  width: 24px;
  color: ${({ theme, isActive }) => (isActive ? theme.text1 : theme.text3)};
`;
export default function ListToggle({ id, isActive, bgColor, toggle }) {
    return (_jsxs(Wrapper, Object.assign({ id: id, isActive: isActive, onClick: toggle }, { children: [isActive && (_jsx(StatusText, Object.assign({ fontWeight: "600", margin: "0 6px", isActive: true }, { children: "ON" }), void 0)), _jsx(ToggleElement, { isActive: isActive, bgColor: bgColor }, void 0), !isActive && (_jsx(StatusText, Object.assign({ fontWeight: "600", margin: "0 6px", isActive: false }, { children: "OFF" }), void 0))] }), void 0));
}
