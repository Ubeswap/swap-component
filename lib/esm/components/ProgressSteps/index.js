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
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { transparentize } from 'polished';
import styled from 'styled-components';
import { AutoColumn } from '../Column';
import { RowBetween } from '../Row';
const Wrapper = styled(AutoColumn) ``;
const Grouping = styled(RowBetween) `
  width: 50%;
`;
const Circle = styled.div `
  min-width: 20px;
  min-height: 20px;
  background-color: ${({ theme, confirmed, disabled }) => disabled ? theme.bg4 : confirmed ? theme.green1 : theme.primary1};
  border-radius: 50%;
  color: ${({ theme }) => theme.white};
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 8px;
  font-size: 12px;
`;
const CircleRow = styled.div `
  width: calc(100% - 20px);
  display: flex;
  align-items: center;
`;
const Connector = styled.div `
  width: 100%;
  height: 2px;
  background-color: ;
  background: linear-gradient(
    90deg,
    ${({ theme, prevConfirmed, disabled }) => disabled ? theme.bg4 : transparentize(0.5, prevConfirmed ? theme.green1 : theme.primary1)}
      0%,
    ${({ theme, prevConfirmed, disabled }) => (disabled ? theme.bg4 : prevConfirmed ? theme.primary1 : theme.bg4)} 80%
  );
  opacity: 0.6;
`;
/**
 * Based on array of steps, create a step counter of circles.
 * A circle can be enabled, disabled, or confirmed. States are derived
 * from previous step.
 *
 * An extra circle is added to represent the ability to swap, add, or remove.
 * This step will never be marked as complete (because no 'txn done' state in body ui).
 *
 * @param steps  array of booleans where true means step is complete
 */
export default function ProgressCircles(_a) {
    var { steps, disabled = false } = _a, rest = __rest(_a, ["steps", "disabled"]);
    return (_jsx(Wrapper, Object.assign({ justify: 'center' }, rest, { children: _jsxs(Grouping, { children: [steps.map((step, i) => {
                    return (_jsxs(CircleRow, { children: [_jsx(Circle, Object.assign({ confirmed: step, disabled: disabled || (!steps[i - 1] && i !== 0) }, { children: step ? '✓' : i + 1 }), void 0), _jsx(Connector, { prevConfirmed: step, disabled: disabled }, void 0)] }, i));
                }), _jsx(Circle, Object.assign({ disabled: disabled || !steps[steps.length - 1] }, { children: steps.length + 1 }), void 0)] }, void 0) }), void 0));
}
