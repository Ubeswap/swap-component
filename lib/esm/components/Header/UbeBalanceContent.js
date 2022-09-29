import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useContractKit } from '@celo-tools/use-contractkit';
import { ChainId as UbeswapChainId } from '@ubeswap/sdk';
import { X } from 'react-feather';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import tokenLogo from '../../assets/images/token-logo.png';
import { UBE } from '../../constants';
import { useTotalSupply } from '../../data/TotalSupply';
import { useTotalUbeEarned } from '../../state/stake/hooks';
import { useAggregateUbeBalance, useTokenBalance } from '../../state/wallet/hooks';
import { ExternalLink, StyledInternalLink, TYPE, UbeTokenAnimated } from '../../theme';
import { relevantDigits } from '../../utils/relevantDigits';
import { useCUSDPrice } from '../../utils/useCUSDPrice';
import { AutoColumn } from '../Column';
import { Break, CardNoise, CardSection, DataCard } from '../earn/styled';
import Loader from '../Loader';
import { RowBetween } from '../Row';
import { useCirculatingSupply } from './useCirculatingSupply';
const ContentWrapper = styled(AutoColumn) `
  width: 100%;
`;
const ModalUpper = styled(DataCard) `
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  background: radial-gradient(76.02% 75.41% at 1.84% 0%, ${({ theme }) => theme.primary1} 0%, #021d43 100%), #edeef2;
  padding: 0.5rem;
`;
const StyledClose = styled(X) `
  position: absolute;
  right: 16px;
  top: 16px;

  :hover {
    cursor: pointer;
  }
`;
/**
 * Content for balance stats modal
 */
export default function UbeBalanceContent({ setShowUbeBalanceModal }) {
    var _a, _b, _c;
    const { address: account, network } = useContractKit();
    const chainId = network.chainId;
    const ube = chainId ? UBE[chainId] : undefined;
    const total = useAggregateUbeBalance();
    const ubeBalance = useTokenBalance(account !== null && account !== void 0 ? account : undefined, ube);
    const ubeToClaim = useTotalUbeEarned();
    const totalSupply = useTotalSupply(ube);
    const ubePrice = useCUSDPrice(ube);
    const circulation = useCirculatingSupply();
    const { t } = useTranslation();
    return (_jsx(ContentWrapper, Object.assign({ gap: "lg" }, { children: _jsxs(ModalUpper, { children: [_jsx(CardNoise, {}), _jsx(CardSection, Object.assign({ gap: "md" }, { children: _jsxs(RowBetween, { children: [_jsx(TYPE.white, Object.assign({ color: "white" }, { children: "Your UBE Breakdown" })), _jsx(StyledClose, { stroke: "white", onClick: () => setShowUbeBalanceModal(false) })] }) })), _jsx(Break, {}), account && (_jsxs(_Fragment, { children: [_jsxs(CardSection, Object.assign({ gap: "sm" }, { children: [_jsxs(AutoColumn, Object.assign({ gap: "md", justify: "center" }, { children: [_jsx(UbeTokenAnimated, { width: "48px", src: tokenLogo }), ' ', _jsx(TYPE.white, Object.assign({ fontSize: 48, fontWeight: 600, color: "white" }, { children: relevantDigits(total) }))] })), _jsxs(AutoColumn, Object.assign({ gap: "md" }, { children: [_jsxs(RowBetween, { children: [_jsxs(TYPE.white, Object.assign({ color: "white" }, { children: [t('Balance'), ":"] })), _jsx(TYPE.white, Object.assign({ color: "white" }, { children: ubeBalance === null || ubeBalance === void 0 ? void 0 : ubeBalance.toFixed(2, { groupSeparator: ',' }) }))] }), _jsxs(RowBetween, { children: [_jsxs(TYPE.white, Object.assign({ color: "white" }, { children: [t('Unclaimed'), ":"] })), _jsxs(TYPE.white, Object.assign({ color: "white" }, { children: [ubeToClaim === null || ubeToClaim === void 0 ? void 0 : ubeToClaim.toFixed(4, { groupSeparator: ',' }), ' ', ubeToClaim && ubeToClaim.greaterThan('0') && (_jsxs(StyledInternalLink, Object.assign({ onClick: () => setShowUbeBalanceModal(false), to: "/farm" }, { children: ["(", t('claim'), ")"] })))] }))] })] }))] })), _jsx(Break, {})] })), _jsx(CardSection, Object.assign({ gap: "sm" }, { children: _jsxs(AutoColumn, Object.assign({ gap: "md" }, { children: [_jsxs(RowBetween, { children: [_jsxs(TYPE.white, Object.assign({ color: "white" }, { children: [t('UbePrice'), ":"] })), _jsxs(TYPE.white, Object.assign({ color: "white" }, { children: ["$", (_a = ubePrice === null || ubePrice === void 0 ? void 0 : ubePrice.toFixed(2)) !== null && _a !== void 0 ? _a : '-'] }))] }), _jsxs(RowBetween, { children: [_jsxs(TYPE.white, Object.assign({ color: "white" }, { children: [t('UbeInCirculation'), ":"] })), _jsx(TYPE.white, Object.assign({ color: "white" }, { children: (_b = circulation === null || circulation === void 0 ? void 0 : circulation.toFixed(0, { groupSeparator: ',' })) !== null && _b !== void 0 ? _b : _jsx(Loader, {}) }))] }), _jsxs(RowBetween, { children: [_jsx(TYPE.white, Object.assign({ color: "white" }, { children: t('TotalSupply') })), _jsx(TYPE.white, Object.assign({ color: "white" }, { children: (_c = totalSupply === null || totalSupply === void 0 ? void 0 : totalSupply.toFixed(0, { groupSeparator: ',' })) !== null && _c !== void 0 ? _c : _jsx(Loader, {}) }))] }), ube && ube.chainId === UbeswapChainId.MAINNET ? (_jsx(ExternalLink, Object.assign({ href: `https://info.ubeswap.org/token/${ube.address}` }, { children: t('ViewUbeAnalytics') }))) : null] })) })), _jsx(CardNoise, {})] }) })));
}
