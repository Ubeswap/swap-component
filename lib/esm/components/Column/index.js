import styled from 'styled-components';
const Column = styled.div `
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;
export const ColumnCenter = styled(Column) `
  width: 100%;
  align-items: center;
`;
export const AutoColumn = styled.div `
  display: grid;
  grid-auto-rows: auto;
  grid-row-gap: ${({ gap }) => (gap === 'sm' && '8px') || (gap === 'md' && '12px') || (gap === 'lg' && '24px') || gap};
  justify-items: ${({ justify }) => justify && justify};
`;
export const TopSection = styled(AutoColumn) `
  max-width: 720px;
  width: 100%;
  margin-bottom: 24px;
`;
export const TopSectionLimitOrder = styled(TopSection) `
  max-width: 420px;
`;
export default Column;
