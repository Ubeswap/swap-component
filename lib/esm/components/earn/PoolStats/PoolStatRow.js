import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styled from 'styled-components';
import { TYPE } from '../../../theme';
import { LightQuestionHelper } from '../../QuestionHelper';
import { RowBetween, RowFixed } from '../../Row';
const PoolRateWrapper = styled.div `
  display: flex;
  align-items: flex-end;
  gap: 3px;
  flex-direction: column;
`;
export default function PoolStatRow({ helperText, statName, statValue, statArrayValue }) {
    return (_jsxs(RowBetween, { children: [_jsxs(RowFixed, { children: [_jsx(TYPE.white, { children: statName }), helperText && _jsx(LightQuestionHelper, { text: helperText })] }), statValue ? (_jsx(TYPE.white, { children: statValue ? statValue : '-' })) : statArrayValue ? (_jsx(PoolRateWrapper, { children: statArrayValue.map((value, i) => (_jsx(TYPE.white, { children: value ? value : '-' }, i))) })) : null] }));
}
