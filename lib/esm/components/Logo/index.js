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
import { useState } from 'react';
import { HelpCircle } from 'react-feather';
const BAD_SRCS = {};
/**
 * Renders an image by sequentially trying a list of URIs, and then eventually a fallback triangle alert
 */
export default function Logo(_a) {
    var { srcs, alt } = _a, rest = __rest(_a, ["srcs", "alt"]);
    const [, refresh] = useState(0);
    const src = srcs.find((src) => !BAD_SRCS[src]);
    if (src) {
        return (_jsx("img", Object.assign({}, rest, { alt: alt, src: src, onError: () => {
                if (src)
                    BAD_SRCS[src] = true;
                refresh((i) => i + 1);
            } }), void 0));
    }
    return _jsx(HelpCircle, Object.assign({}, rest), void 0);
}
