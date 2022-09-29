import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styled from 'styled-components';
const ToggleElement = styled.span `
  padding: 0.25rem 0.5rem;
  border-radius: 14px;
  background: ${({ theme, isActive, isOnSwitch }) => (isActive ? (isOnSwitch ? theme.primary1 : theme.text4) : 'none')};
  color: ${({ theme, isActive, isOnSwitch }) => (isActive ? (isOnSwitch ? theme.white : theme.text2) : theme.text3)};
  font-size: 1rem;
  font-weight: 400;

  padding: 0.35rem 0.6rem;
  border-radius: 12px;
  background: ${({ theme, isActive, isOnSwitch }) => (isActive ? (isOnSwitch ? theme.primary1 : theme.text4) : 'none')};
  color: ${({ theme, isActive, isOnSwitch }) => (isActive ? (isOnSwitch ? theme.white : theme.text2) : theme.text2)};
  font-size: 1rem;
  font-weight: ${({ isOnSwitch }) => (isOnSwitch ? '500' : '400')};
  :hover {
    user-select: ${({ isOnSwitch }) => (isOnSwitch ? 'none' : 'initial')};
    background: ${({ theme, isActive, isOnSwitch }) => isActive ? (isOnSwitch ? theme.primary1 : theme.text3) : 'none'};
    color: ${({ theme, isActive, isOnSwitch }) => (isActive ? (isOnSwitch ? theme.white : theme.text2) : theme.text3)};
  }
`;
const StyledToggle = styled.button `
  border-radius: 12px;
  border: none;
  background: ${({ theme }) => theme.bg3};
  display: flex;
  width: fit-content;
  cursor: pointer;
  outline: none;
  padding: 0;
`;
export default function Toggle({ id, isActive, toggle }) {
    return (_jsxs(StyledToggle, Object.assign({ id: id, isActive: isActive, onClick: toggle }, { children: [_jsx(ToggleElement, Object.assign({ isActive: isActive, isOnSwitch: true }, { children: "On" })), _jsx(ToggleElement, Object.assign({ isActive: !isActive, isOnSwitch: false }, { children: "Off" }))] })));
}
