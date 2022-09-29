"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const styled_components_1 = __importDefault(require("styled-components"));
const theme_1 = require("../../../theme");
const QuestionHelper_1 = require("../../QuestionHelper");
const Row_1 = require("../../Row");
const PoolRateWrapper = styled_components_1.default.div `
  display: flex;
  align-items: flex-end;
  gap: 3px;
  flex-direction: column;
`;
function PoolStatRow({ helperText, statName, statValue, statArrayValue }) {
    return ((0, jsx_runtime_1.jsxs)(Row_1.RowBetween, { children: [(0, jsx_runtime_1.jsxs)(Row_1.RowFixed, { children: [(0, jsx_runtime_1.jsx)(theme_1.TYPE.white, { children: statName }), helperText && (0, jsx_runtime_1.jsx)(QuestionHelper_1.LightQuestionHelper, { text: helperText })] }), statValue ? ((0, jsx_runtime_1.jsx)(theme_1.TYPE.white, { children: statValue ? statValue : '-' })) : statArrayValue ? ((0, jsx_runtime_1.jsx)(PoolRateWrapper, { children: statArrayValue.map((value, i) => ((0, jsx_runtime_1.jsx)(theme_1.TYPE.white, { children: value ? value : '-' }, i))) })) : null] }));
}
exports.default = PoolStatRow;
