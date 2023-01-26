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
import styled from 'styled-components';
import { useLastTruthy } from '../../hooks/useLast';
import { AdvancedSwapDetails } from './AdvancedSwapDetails';
const AdvancedDetailsFooter = styled.div `
  padding-top: calc(16px + 2rem);
  padding-bottom: 16px;
  margin-top: -2rem;
  width: 100%;
  max-width: 400px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  color: ${({ theme }) => theme.text2};
  background-color: ${({ theme }) => theme.advancedBG};
  z-index: 0;

  transform: ${({ show }) => (show ? 'translateY(0%)' : 'translateY(-100%)')};
  transition: transform 300ms ease-in-out;
`;
export default function AdvancedSwapDetailsDropdown(_a) {
    var _b;
    var { trade } = _a, rest = __rest(_a, ["trade"]);
    const lastTrade = useLastTruthy(trade);
    return (_jsx(AdvancedDetailsFooter, Object.assign({ show: Boolean(trade) }, { children: _jsx(AdvancedSwapDetails, Object.assign({}, rest, { trade: (_b = trade !== null && trade !== void 0 ? trade : lastTrade) !== null && _b !== void 0 ? _b : undefined })) })));
}
