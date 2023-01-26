import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styled from 'styled-components';
import CurrencyLogo from '../CurrencyLogo';
const Wrapper = styled.div `
  position: relative;
  display: flex;
  flex-direction: row;
  margin-right: ${({ sizeraw, margin }) => margin && (sizeraw / 3 + 8).toString() + 'px'};
`;
const HigherLogo = styled(CurrencyLogo) `
  z-index: 2;
`;
const CoveredLogo = styled(CurrencyLogo) `
  position: absolute;
  left: ${({ sizeraw }) => '-' + (sizeraw / 2).toString() + 'px'} !important;
`;
export default function DoubleCurrencyLogo({ currency0, currency1, size = 16, margin = false, }) {
    return (_jsxs(Wrapper, Object.assign({ sizeraw: size, margin: margin }, { children: [currency0 && _jsx(HigherLogo, { currency: currency0, size: size.toString() + 'px' }), currency1 && _jsx(CoveredLogo, { currency: currency1, size: size.toString() + 'px', sizeraw: size })] })));
}
