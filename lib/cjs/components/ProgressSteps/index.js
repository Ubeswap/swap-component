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
const jsx_runtime_1 = require("react/jsx-runtime");
const polished_1 = require("polished");
const styled_components_1 = __importDefault(require("styled-components"));
const Column_1 = require("../Column");
const Row_1 = require("../Row");
const Wrapper = (0, styled_components_1.default)(Column_1.AutoColumn) ``;
const Grouping = (0, styled_components_1.default)(Row_1.RowBetween) `
  width: 50%;
`;
const Circle = styled_components_1.default.div `
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
const CircleRow = styled_components_1.default.div `
  width: calc(100% - 20px);
  display: flex;
  align-items: center;
`;
const Connector = styled_components_1.default.div `
  width: 100%;
  height: 2px;
  background-color: ;
  background: linear-gradient(
    90deg,
    ${({ theme, prevConfirmed, disabled }) => disabled ? theme.bg4 : (0, polished_1.transparentize)(0.5, prevConfirmed ? theme.green1 : theme.primary1)}
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
function ProgressCircles(_a) {
    var { steps, disabled = false } = _a, rest = __rest(_a, ["steps", "disabled"]);
    return ((0, jsx_runtime_1.jsx)(Wrapper, Object.assign({ justify: 'center' }, rest, { children: (0, jsx_runtime_1.jsxs)(Grouping, { children: [steps.map((step, i) => {
                    return ((0, jsx_runtime_1.jsxs)(CircleRow, { children: [(0, jsx_runtime_1.jsx)(Circle, Object.assign({ confirmed: step, disabled: disabled || (!steps[i - 1] && i !== 0) }, { children: step ? '✓' : i + 1 })), (0, jsx_runtime_1.jsx)(Connector, { prevConfirmed: step, disabled: disabled })] }, i));
                }), (0, jsx_runtime_1.jsx)(Circle, Object.assign({ disabled: disabled || !steps[steps.length - 1] }, { children: steps.length + 1 }))] }) })));
}
exports.default = ProgressCircles;
