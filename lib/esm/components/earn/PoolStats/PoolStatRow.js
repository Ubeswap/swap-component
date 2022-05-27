import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { LightQuestionHelper } from 'components/QuestionHelper';
import { RowBetween, RowFixed } from 'components/Row';
import styled from 'styled-components';
import { TYPE } from 'theme';
const PoolRateWrapper = styled.div `
  display: flex;
  align-items: flex-end;
  gap: 3px;
  flex-direction: column;
`;
export default function PoolStatRow({ helperText, statName, statValue, statArrayValue }) {
    return (_jsxs(RowBetween, { children: [_jsxs(RowFixed, { children: [_jsx(TYPE.white, { children: statName }, void 0), helperText && _jsx(LightQuestionHelper, { text: helperText }, void 0)] }, void 0), statValue ? (_jsx(TYPE.white, { children: statValue ? statValue : '-' }, void 0)) : statArrayValue ? (_jsx(PoolRateWrapper, { children: statArrayValue.map((value, i) => (_jsx(TYPE.white, { children: value ? value : '-' }, i))) }, void 0)) : null] }, void 0));
}
