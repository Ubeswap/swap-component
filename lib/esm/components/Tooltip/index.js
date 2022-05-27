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
import { useCallback, useState } from 'react';
import styled from 'styled-components';
import Popover from '../Popover';
const TooltipContainer = styled.div `
  width: 228px;
  padding: 0.6rem 1rem;
  line-height: 150%;
  font-weight: 400;
`;
export default function Tooltip(_a) {
    var { text } = _a, rest = __rest(_a, ["text"]);
    return _jsx(Popover, Object.assign({ content: _jsx(TooltipContainer, { children: text }, void 0) }, rest), void 0);
}
export function MouseoverTooltip(_a) {
    var { children } = _a, rest = __rest(_a, ["children"]);
    const [show, setShow] = useState(false);
    const open = useCallback(() => setShow(true), [setShow]);
    const close = useCallback(() => setShow(false), [setShow]);
    return (_jsx(Tooltip, Object.assign({}, rest, { show: show }, { children: _jsx("div", Object.assign({ onMouseEnter: open, onMouseLeave: close }, { children: children }), void 0) }), void 0));
}
