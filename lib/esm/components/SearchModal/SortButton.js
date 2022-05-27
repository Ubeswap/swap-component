import { jsx as _jsx } from "react/jsx-runtime";
import { Text } from 'rebass';
import styled from 'styled-components';
import { RowFixed } from '../Row';
export const FilterWrapper = styled(RowFixed) `
  padding: 8px;
  background-color: ${({ theme }) => theme.bg2};
  color: ${({ theme }) => theme.text1};
  border-radius: 8px;
  user-select: none;
  & > * {
    user-select: none;
  }
  :hover {
    cursor: pointer;
  }
`;
export default function SortButton({ toggleSortOrder, ascending, }) {
    return (_jsx(FilterWrapper, Object.assign({ onClick: toggleSortOrder }, { children: _jsx(Text, Object.assign({ fontSize: 14, fontWeight: 500 }, { children: ascending ? '↑' : '↓' }), void 0) }), void 0));
}
