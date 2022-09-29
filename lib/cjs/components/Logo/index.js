"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_feather_1 = require("react-feather");
const BAD_SRCS = {};
/**
 * Renders an image by sequentially trying a list of URIs, and then eventually a fallback triangle alert
 */
function Logo(_a) {
    var { srcs, alt } = _a, rest = __rest(_a, ["srcs", "alt"]);
    const [, refresh] = (0, react_1.useState)(0);
    const src = srcs.find((src) => !BAD_SRCS[src]);
    if (src) {
        return ((0, jsx_runtime_1.jsx)("img", Object.assign({}, rest, { alt: alt, src: src, onError: () => {
                if (src)
                    BAD_SRCS[src] = true;
                refresh((i) => i + 1);
            } })));
    }
    return (0, jsx_runtime_1.jsx)(react_feather_1.HelpCircle, Object.assign({}, rest));
}
exports.default = Logo;
