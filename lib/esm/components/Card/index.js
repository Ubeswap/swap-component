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
import { Text } from 'rebass';
import { Box } from 'rebass/styled-components';
import styled from 'styled-components';
const Card = styled(Box) `
  width: ${({ width }) => width !== null && width !== void 0 ? width : '100%'};
  border-radius: 16px;
  padding: 1.25rem;
  padding: ${({ padding }) => padding};
  border: ${({ border }) => border};
  border-radius: ${({ borderRadius }) => borderRadius};
`;
export default Card;
export const LightCard = styled(Card) `
  border: 1px solid ${({ theme }) => theme.bg2};
  background-color: ${({ theme }) => theme.bg1};
`;
export const GreyCard = styled(Card) `
  background-color: ${({ theme }) => theme.bg3};
`;
export const OutlineCard = styled(Card) `
  border: 1px solid ${({ theme }) => theme.bg3};
`;
export const YellowCard = styled(Card) `
  background-color: rgba(243, 132, 30, 0.05);
  color: ${({ theme }) => theme.yellow2};
  font-weight: 500;
`;
export const PinkCard = styled(Card) `
  background-color: rgba(255, 0, 122, 0.03);
  color: ${({ theme }) => theme.primary1};
  font-weight: 500;
`;
const BlueCardStyled = styled(Card) `
  background-color: ${({ theme }) => theme.primary5};
  color: ${({ theme }) => theme.primary1};
  border-radius: 12px;
  width: fit-content;
`;
export const BlueCard = (_a) => {
    var { children } = _a, rest = __rest(_a, ["children"]);
    return (_jsx(BlueCardStyled, Object.assign({}, rest, { children: _jsx(Text, Object.assign({ fontWeight: 500, color: "#2172E5" }, { children: children }), void 0) }), void 0));
};
