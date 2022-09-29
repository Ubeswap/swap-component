import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useContractKit } from '@celo-tools/use-contractkit';
import { JSBI, Percent } from '@ubeswap/sdk';
import { darken, transparentize } from 'polished';
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'react-feather';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Text } from 'rebass';
import styled from 'styled-components';
import { BIG_INT_ZERO } from '../../constants';
import { useTotalSupply } from '../../data/TotalSupply';
import { useColor } from '../../hooks/useColor';
import { useTokenBalance } from '../../state/wallet/hooks';
import { ExternalLink, TYPE } from '../../theme';
import { currencyId } from '../../utils/currencyId';
import { ButtonEmpty, ButtonPrimary, ButtonSecondary } from '../Button';
import Card, { GreyCard, LightCard } from '../Card';
import { AutoColumn } from '../Column';
import CurrencyLogo from '../CurrencyLogo';
import DoubleCurrencyLogo from '../DoubleLogo';
import { CardNoise } from '../earn/styled';
import { AutoRow, RowBetween, RowFixed } from '../Row';
import { Dots } from '../swap/styleds';
export const FixedHeightRow = styled(RowBetween) `
  height: 24px;
`;
export const HoverCard = styled(Card) `
  border: 1px solid transparent;
  :hover {
    border: 1px solid ${({ theme }) => darken(0.06, theme.bg2)};
  }
`;
const StyledPositionCard = styled(LightCard) `
  border: none;
  background: ${({ theme, bgColor }) => `radial-gradient(91.85% 100% at 1.84% 0%, ${transparentize(0.8, bgColor)} 0%, ${theme.bg3} 100%) `};
  position: relative;
  overflow: hidden;
`;
export function MinimalPositionCard({ pair, border }) {
    const { address: account } = useContractKit();
    const currency0 = pair.token0;
    const currency1 = pair.token1;
    const [showMore, setShowMore] = useState(false);
    const userPoolBalance = useTokenBalance(account !== null && account !== void 0 ? account : undefined, pair.liquidityToken);
    const totalPoolTokens = useTotalSupply(pair.liquidityToken);
    const { t } = useTranslation();
    const poolTokenPercentage = !!userPoolBalance && !!totalPoolTokens && JSBI.greaterThanOrEqual(totalPoolTokens.raw, userPoolBalance.raw)
        ? new Percent(userPoolBalance.raw, totalPoolTokens.raw)
        : undefined;
    const [token0Deposited, token1Deposited] = !!pair &&
        !!totalPoolTokens &&
        !!userPoolBalance &&
        // this condition is a short-circuit in the case where useTokenBalance updates sooner than useTotalSupply
        JSBI.greaterThanOrEqual(totalPoolTokens.raw, userPoolBalance.raw)
        ? [
            pair.getLiquidityValue(pair.token0, totalPoolTokens, userPoolBalance, false),
            pair.getLiquidityValue(pair.token1, totalPoolTokens, userPoolBalance, false),
        ]
        : [undefined, undefined];
    return (_jsx(_Fragment, { children: userPoolBalance && JSBI.greaterThan(userPoolBalance.raw, JSBI.BigInt(0)) ? (_jsx(GreyCard, Object.assign({ border: border }, { children: _jsxs(AutoColumn, Object.assign({ gap: "12px" }, { children: [_jsx(FixedHeightRow, { children: _jsx(RowFixed, { children: _jsx(Text, Object.assign({ fontWeight: 500, fontSize: 16 }, { children: t('YourPosition') })) }) }), _jsxs(FixedHeightRow, Object.assign({ onClick: () => setShowMore(!showMore) }, { children: [_jsxs(RowFixed, { children: [_jsx(DoubleCurrencyLogo, { currency0: currency0, currency1: currency1, margin: true, size: 20 }), _jsxs(Text, Object.assign({ fontWeight: 500, fontSize: 20 }, { children: [currency0.symbol, "/", currency1.symbol] }))] }), _jsx(RowFixed, { children: _jsx(Text, Object.assign({ fontWeight: 500, fontSize: 20 }, { children: userPoolBalance ? userPoolBalance.toSignificant(4) : '-' })) })] })), _jsxs(AutoColumn, Object.assign({ gap: "4px" }, { children: [_jsxs(FixedHeightRow, { children: [_jsxs(Text, Object.assign({ fontSize: 16, fontWeight: 500 }, { children: [t('YourPoolShare'), ":"] })), _jsx(Text, Object.assign({ fontSize: 16, fontWeight: 500 }, { children: poolTokenPercentage ? poolTokenPercentage.toFixed(6) + '%' : '-' }))] }), _jsxs(FixedHeightRow, { children: [_jsxs(Text, Object.assign({ fontSize: 16, fontWeight: 500 }, { children: [currency0.symbol, ":"] })), token0Deposited ? (_jsx(RowFixed, { children: _jsx(Text, Object.assign({ fontSize: 16, fontWeight: 500, marginLeft: '6px' }, { children: token0Deposited === null || token0Deposited === void 0 ? void 0 : token0Deposited.toSignificant(6) })) })) : ('-')] }), _jsxs(FixedHeightRow, { children: [_jsxs(Text, Object.assign({ fontSize: 16, fontWeight: 500 }, { children: [currency1.symbol, ":"] })), token1Deposited ? (_jsx(RowFixed, { children: _jsx(Text, Object.assign({ fontSize: 16, fontWeight: 500, marginLeft: '6px' }, { children: token1Deposited === null || token1Deposited === void 0 ? void 0 : token1Deposited.toSignificant(6) })) })) : ('-')] })] }))] })) }))) : (_jsx(LightCard, { children: _jsxs(TYPE.subHeader, Object.assign({ style: { textAlign: 'center' } }, { children: [_jsx("span", Object.assign({ role: "img", "aria-label": "wizard-icon" }, { children: "\u2B50\uFE0F" })), ' ', t('liquidityProviderRewardsDesc')] })) })) }));
}
export default function FullPositionCard({ pair, border, stakedBalance }) {
    const { t } = useTranslation();
    const { address: account } = useContractKit();
    const currency0 = pair.token0;
    const currency1 = pair.token1;
    const [showMore, setShowMore] = useState(false);
    const userDefaultPoolBalance = useTokenBalance(account !== null && account !== void 0 ? account : undefined, pair.liquidityToken);
    const totalPoolTokens = useTotalSupply(pair.liquidityToken);
    // if staked balance balance provided, add to standard liquidity amount
    const userPoolBalance = stakedBalance ? userDefaultPoolBalance === null || userDefaultPoolBalance === void 0 ? void 0 : userDefaultPoolBalance.add(stakedBalance) : userDefaultPoolBalance;
    const poolTokenPercentage = !!userPoolBalance && !!totalPoolTokens && JSBI.greaterThanOrEqual(totalPoolTokens.raw, userPoolBalance.raw)
        ? new Percent(userPoolBalance.raw, totalPoolTokens.raw)
        : undefined;
    const [token0Deposited, token1Deposited] = !!pair &&
        !!totalPoolTokens &&
        !!userPoolBalance &&
        // this condition is a short-circuit in the case where useTokenBalance updates sooner than useTotalSupply
        JSBI.greaterThanOrEqual(totalPoolTokens.raw, userPoolBalance.raw)
        ? [
            pair.getLiquidityValue(pair.token0, totalPoolTokens, userPoolBalance, false),
            pair.getLiquidityValue(pair.token1, totalPoolTokens, userPoolBalance, false),
        ]
        : [undefined, undefined];
    const backgroundColor = useColor(pair === null || pair === void 0 ? void 0 : pair.token0);
    return (_jsxs(StyledPositionCard, Object.assign({ border: border, bgColor: backgroundColor }, { children: [_jsx(CardNoise, {}), _jsxs(AutoColumn, Object.assign({ gap: "12px" }, { children: [_jsxs(FixedHeightRow, { children: [_jsxs(AutoRow, Object.assign({ gap: "8px" }, { children: [_jsx(DoubleCurrencyLogo, { currency0: currency0, currency1: currency1, size: 20 }), _jsx(Text, Object.assign({ fontWeight: 500, fontSize: 20 }, { children: !currency0 || !currency1 ? _jsx(Dots, { children: t('Loading') }) : `${currency0.symbol}/${currency1.symbol}` }))] })), _jsx(RowFixed, Object.assign({ gap: "8px" }, { children: _jsx(ButtonEmpty, Object.assign({ padding: "6px 8px", borderRadius: "12px", width: "fit-content", onClick: () => setShowMore(!showMore) }, { children: showMore ? (_jsxs(_Fragment, { children: [t('manage'), _jsx(ChevronUp, { size: "20", style: { marginLeft: '10px' } })] })) : (_jsxs(_Fragment, { children: [t('manage'), _jsx(ChevronDown, { size: "20", style: { marginLeft: '10px' } })] })) })) }))] }), showMore && (_jsxs(AutoColumn, Object.assign({ gap: "8px" }, { children: [_jsxs(FixedHeightRow, { children: [_jsxs(Text, Object.assign({ fontSize: 16, fontWeight: 500 }, { children: [t('YourTotalPoolTokens'), ":"] })), _jsx(Text, Object.assign({ fontSize: 16, fontWeight: 500 }, { children: userPoolBalance ? userPoolBalance.toSignificant(4) : '-' }))] }), stakedBalance && (_jsxs(FixedHeightRow, { children: [_jsxs(Text, Object.assign({ fontSize: 16, fontWeight: 500 }, { children: [t('PoolTokensInRewardsPool'), ":"] })), _jsx(Text, Object.assign({ fontSize: 16, fontWeight: 500 }, { children: stakedBalance.toSignificant(4) }))] })), _jsxs(FixedHeightRow, { children: [_jsx(RowFixed, { children: _jsxs(Text, Object.assign({ fontSize: 16, fontWeight: 500 }, { children: [t('Pooled'), " ", currency0.symbol, ":"] })) }), token0Deposited ? (_jsxs(RowFixed, { children: [_jsx(Text, Object.assign({ fontSize: 16, fontWeight: 500, marginLeft: '6px' }, { children: token0Deposited === null || token0Deposited === void 0 ? void 0 : token0Deposited.toSignificant(6) })), _jsx(CurrencyLogo, { size: "20px", style: { marginLeft: '8px' }, currency: currency0 })] })) : ('-')] }), _jsxs(FixedHeightRow, { children: [_jsx(RowFixed, { children: _jsxs(Text, Object.assign({ fontSize: 16, fontWeight: 500 }, { children: [t('Pooled'), " ", currency1.symbol, ":"] })) }), token1Deposited ? (_jsxs(RowFixed, { children: [_jsx(Text, Object.assign({ fontSize: 16, fontWeight: 500, marginLeft: '6px' }, { children: token1Deposited === null || token1Deposited === void 0 ? void 0 : token1Deposited.toSignificant(6) })), _jsx(CurrencyLogo, { size: "20px", style: { marginLeft: '8px' }, currency: currency1 })] })) : ('-')] }), _jsxs(FixedHeightRow, { children: [_jsxs(Text, Object.assign({ fontSize: 16, fontWeight: 500 }, { children: [t('YourPoolShare'), ":"] })), _jsx(Text, Object.assign({ fontSize: 16, fontWeight: 500 }, { children: poolTokenPercentage
                                            ? (poolTokenPercentage.toFixed(2) === '0.00' ? '<0.01' : poolTokenPercentage.toFixed(2)) + '%'
                                            : '-' }))] }), _jsx(ButtonSecondary, Object.assign({ padding: "8px", borderRadius: "8px" }, { children: _jsxs(ExternalLink, Object.assign({ style: { width: '100%', textAlign: 'center' }, href: `https://info.ubeswap.org/account/${account}` }, { children: [t('ViewAccruedFeesAndAnalytics'), _jsx("span", Object.assign({ style: { fontSize: '11px' } }, { children: "\u2197" }))] })) })), userDefaultPoolBalance && JSBI.greaterThan(userDefaultPoolBalance.raw, BIG_INT_ZERO) && (_jsxs(RowBetween, Object.assign({ marginTop: "10px" }, { children: [_jsx(ButtonPrimary, Object.assign({ padding: "8px", borderRadius: "8px", as: Link, to: `/add/${currencyId(currency0)}/${currencyId(currency1)}`, width: "48%" }, { children: t('addLiquidity') })), _jsx(ButtonPrimary, Object.assign({ padding: "8px", borderRadius: "8px", as: Link, width: "48%", to: `/remove/${currencyId(currency0)}/${currencyId(currency1)}` }, { children: t('removeLiquidity') }))] }))), stakedBalance && JSBI.greaterThan(stakedBalance.raw, BIG_INT_ZERO) && (_jsx(ButtonPrimary, Object.assign({ padding: "8px", borderRadius: "8px", as: Link, to: `/uni/${currencyId(currency0)}/${currencyId(currency1)}`, width: "100%" }, { children: t('ManageLiquidityInRewardsPool') })))] })))] }))] })));
}
