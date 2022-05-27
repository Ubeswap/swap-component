import { jsx as _jsx } from "react/jsx-runtime";
import { Token } from '@ubeswap/sdk';
import { useMemo } from 'react';
import styled from 'styled-components';
import useHttpLocations from '../../hooks/useHttpLocations';
import { WrappedTokenInfo } from '../../state/lists/hooks';
import Logo from '../Logo';
const StyledLogo = styled(Logo) `
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  border-radius: ${({ size }) => size};
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.075);
  background-color: ${({ theme }) => theme.white};
`;
export default function CurrencyLogo({ currency, size = '24px', style, }) {
    var _a;
    const uriLocations = useHttpLocations(currency instanceof WrappedTokenInfo ? currency.logoURI : undefined);
    const srcs = useMemo(() => {
        var _a;
        if (currency instanceof Token) {
            if (currency instanceof WrappedTokenInfo) {
                return [...uriLocations, (_a = currency.logoURI) !== null && _a !== void 0 ? _a : currency.address];
            }
            return [];
        }
        return [];
    }, [currency, uriLocations]);
    return _jsx(StyledLogo, { size: size, srcs: srcs, alt: `${(_a = currency === null || currency === void 0 ? void 0 : currency.symbol) !== null && _a !== void 0 ? _a : 'token'} logo`, style: style }, void 0);
}
