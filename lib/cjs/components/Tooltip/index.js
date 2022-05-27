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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MouseoverTooltip = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const styled_components_1 = __importDefault(require("styled-components"));
const Popover_1 = __importDefault(require("../Popover"));
const TooltipContainer = styled_components_1.default.div `
  width: 228px;
  padding: 0.6rem 1rem;
  line-height: 150%;
  font-weight: 400;
`;
function Tooltip(_a) {
    var { text } = _a, rest = __rest(_a, ["text"]);
    return (0, jsx_runtime_1.jsx)(Popover_1.default, Object.assign({ content: (0, jsx_runtime_1.jsx)(TooltipContainer, { children: text }, void 0) }, rest), void 0);
}
exports.default = Tooltip;
function MouseoverTooltip(_a) {
    var { children } = _a, rest = __rest(_a, ["children"]);
    const [show, setShow] = (0, react_1.useState)(false);
    const open = (0, react_1.useCallback)(() => setShow(true), [setShow]);
    const close = (0, react_1.useCallback)(() => setShow(false), [setShow]);
    return ((0, jsx_runtime_1.jsx)(Tooltip, Object.assign({}, rest, { show: show }, { children: (0, jsx_runtime_1.jsx)("div", Object.assign({ onMouseEnter: open, onMouseLeave: close }, { children: children }), void 0) }), void 0));
}
exports.MouseoverTooltip = MouseoverTooltip;
