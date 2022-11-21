import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useContractKit } from '@celo-tools/use-contractkit';
import { JSBI } from '@ubeswap/sdk';
import { useContext, useMemo } from 'react';
import { AlertTriangle } from 'react-feather';
import styled, { ThemeContext } from 'styled-components';
import { useAllTokens } from '../../hooks/Tokens';
import { useTokenBalances } from '../../state/wallet/hooks';
import { ExternalLink, TYPE } from '../../theme';
import { AutoColumn, TopSection } from '../Column';
import { RowBetween, RowStart } from '../Row';
import { filterTokens } from '../SearchModal/filtering';
export const CardSection = styled(AutoColumn) `
  padding: 1rem;
  z-index: 1;
  opacity: ${({ disabled }) => disabled && '0.4'};
`;
const WarningCard = styled(AutoColumn) `
  background-color: ${(props) => props.theme.bg1};
  border-top: 3px solid ${(props) => props.theme.primary1};
  width: 100%;
  position: relative;
  overflow: hidden;
`;
export default function OpticsV1Warning() {
    const { address: account, network } = useContractKit();
    const theme = useContext(ThemeContext);
    const chainId = network.chainId;
    const allTokens = useAllTokens(chainId);
    const opticsv1Tokens = useMemo(() => {
        return filterTokens(Object.values(allTokens), 'Optics v1');
    }, [allTokens]);
    const opticsV1Balance = useTokenBalances(account !== null && account !== void 0 ? account : undefined, opticsv1Tokens);
    const opticsV1TokensWithBalances = Object.values(opticsV1Balance).length > 0 &&
        Object.values(opticsV1Balance)
            .filter((balance) => (balance === null || balance === void 0 ? void 0 : balance.numerator) && JSBI.greaterThan(balance.numerator, JSBI.BigInt(0)))
            .map((balance) => _jsxs("span", { children: [balance === null || balance === void 0 ? void 0 : balance.currency.symbol, " "] }, balance === null || balance === void 0 ? void 0 : balance.currency.address));
    return (_jsx(TopSection, Object.assign({ gap: "md" }, { children: opticsV1TokensWithBalances && opticsV1TokensWithBalances.length > 0 && (_jsx(WarningCard, { children: _jsx(CardSection, { children: _jsxs(RowStart, { children: [_jsx("div", Object.assign({ style: { paddingRight: 16 } }, { children: _jsx(AlertTriangle, { color: theme.yellow2, size: 36 }) })), _jsxs(AutoColumn, Object.assign({ gap: "md" }, { children: [_jsx(RowBetween, { children: _jsxs(TYPE.black, Object.assign({ fontWeight: 600 }, { children: ["You have the following Optics V1 Tokens: ", opticsV1TokensWithBalances] })) }), _jsx(RowBetween, { children: _jsx(TYPE.black, Object.assign({ fontSize: 14 }, { children: "Please either migrate your tokens to Optics v2 tokens or bridge your tokens" })) }), _jsxs(RowStart, { children: [_jsx(ExternalLink, Object.assign({ href: "https://www.mobius.money/#/opensum" }, { children: "Migrate" })), "\u00A0", _jsx(ExternalLink, Object.assign({ href: "https://old.optics.app/" }, { children: "Bridge" }))] })] }))] }) }) })) })));
}
