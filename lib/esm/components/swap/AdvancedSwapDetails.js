import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import styled, { ThemeContext } from 'styled-components';
import { useUserSlippageTolerance } from '../../state/user/hooks';
import { ExternalLink, TYPE } from '../../theme';
import { AutoColumn } from '../Column';
import QuestionHelper from '../QuestionHelper';
import { RowBetween } from '../Row';
import { TradeDetails } from './routing/TradeDetails';
import SwapRoute from './SwapRoute';
function TradeSummary({ trade, allowedSlippage }) {
    return (_jsx(_Fragment, { children: _jsx(AutoColumn, Object.assign({ style: { padding: '0 16px' } }, { children: _jsx(TradeDetails, { trade: trade, allowedSlippage: allowedSlippage }) })) }));
}
const InfoLink = styled(ExternalLink) `
  width: 100%;
  border: 1px solid ${({ theme }) => theme.bg3};
  padding: 6px 6px;
  border-radius: 8px;
  text-align: center;
  font-size: 14px;
  color: ${({ theme }) => theme.text1};
`;
export function AdvancedSwapDetails({ trade }) {
    const theme = useContext(ThemeContext);
    const [allowedSlippage] = useUserSlippageTolerance();
    const path = trade && trade.path;
    const showRoute = Boolean(path && path.length > 2);
    const { t } = useTranslation();
    return (_jsx(AutoColumn, Object.assign({ gap: "0px" }, { children: trade && (_jsxs(_Fragment, { children: [_jsx(TradeSummary, { trade: trade, allowedSlippage: allowedSlippage }), showRoute && (_jsx(_Fragment, { children: _jsxs(RowBetween, Object.assign({ style: { padding: '0 16px' } }, { children: [_jsxs("span", Object.assign({ style: { display: 'flex', alignItems: 'center' } }, { children: [_jsx(TYPE.black, Object.assign({ fontSize: 14, fontWeight: 400, color: theme.text2 }, { children: t('Route') })), _jsx(QuestionHelper, { text: t('RoutingThroughTheseTokensResultedInTheBestPriceForYourTrade') })] })), _jsx(SwapRoute, { trade: trade })] })) })), !trade.hidePairAnalytics && !showRoute && (_jsx(AutoColumn, Object.assign({ style: { padding: '12px 16px 0 16px' } }, { children: _jsxs(InfoLink, Object.assign({ href: 'https://info.ubeswap.org/pair/' + trade.route.pairs[0].liquidityToken.address, target: "_blank" }, { children: [t('ViewPairAnalytics'), " \u2197"] })) })))] })) })));
}
