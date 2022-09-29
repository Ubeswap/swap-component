"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MinimalPositionCard = exports.HoverCard = exports.FixedHeightRow = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const use_contractkit_1 = require("@celo-tools/use-contractkit");
const sdk_1 = require("@ubeswap/sdk");
const polished_1 = require("polished");
const react_1 = require("react");
const react_feather_1 = require("react-feather");
const react_i18next_1 = require("react-i18next");
const react_router_dom_1 = require("react-router-dom");
const rebass_1 = require("rebass");
const styled_components_1 = __importDefault(require("styled-components"));
const constants_1 = require("../../constants");
const TotalSupply_1 = require("../../data/TotalSupply");
const useColor_1 = require("../../hooks/useColor");
const hooks_1 = require("../../state/wallet/hooks");
const theme_1 = require("../../theme");
const currencyId_1 = require("../../utils/currencyId");
const Button_1 = require("../Button");
const Card_1 = __importStar(require("../Card"));
const Column_1 = require("../Column");
const CurrencyLogo_1 = __importDefault(require("../CurrencyLogo"));
const DoubleLogo_1 = __importDefault(require("../DoubleLogo"));
const styled_1 = require("../earn/styled");
const Row_1 = require("../Row");
const styleds_1 = require("../swap/styleds");
exports.FixedHeightRow = (0, styled_components_1.default)(Row_1.RowBetween) `
  height: 24px;
`;
exports.HoverCard = (0, styled_components_1.default)(Card_1.default) `
  border: 1px solid transparent;
  :hover {
    border: 1px solid ${({ theme }) => (0, polished_1.darken)(0.06, theme.bg2)};
  }
`;
const StyledPositionCard = (0, styled_components_1.default)(Card_1.LightCard) `
  border: none;
  background: ${({ theme, bgColor }) => `radial-gradient(91.85% 100% at 1.84% 0%, ${(0, polished_1.transparentize)(0.8, bgColor)} 0%, ${theme.bg3} 100%) `};
  position: relative;
  overflow: hidden;
`;
function MinimalPositionCard({ pair, border }) {
    const { address: account } = (0, use_contractkit_1.useContractKit)();
    const currency0 = pair.token0;
    const currency1 = pair.token1;
    const [showMore, setShowMore] = (0, react_1.useState)(false);
    const userPoolBalance = (0, hooks_1.useTokenBalance)(account !== null && account !== void 0 ? account : undefined, pair.liquidityToken);
    const totalPoolTokens = (0, TotalSupply_1.useTotalSupply)(pair.liquidityToken);
    const { t } = (0, react_i18next_1.useTranslation)();
    const poolTokenPercentage = !!userPoolBalance && !!totalPoolTokens && sdk_1.JSBI.greaterThanOrEqual(totalPoolTokens.raw, userPoolBalance.raw)
        ? new sdk_1.Percent(userPoolBalance.raw, totalPoolTokens.raw)
        : undefined;
    const [token0Deposited, token1Deposited] = !!pair &&
        !!totalPoolTokens &&
        !!userPoolBalance &&
        // this condition is a short-circuit in the case where useTokenBalance updates sooner than useTotalSupply
        sdk_1.JSBI.greaterThanOrEqual(totalPoolTokens.raw, userPoolBalance.raw)
        ? [
            pair.getLiquidityValue(pair.token0, totalPoolTokens, userPoolBalance, false),
            pair.getLiquidityValue(pair.token1, totalPoolTokens, userPoolBalance, false),
        ]
        : [undefined, undefined];
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: userPoolBalance && sdk_1.JSBI.greaterThan(userPoolBalance.raw, sdk_1.JSBI.BigInt(0)) ? ((0, jsx_runtime_1.jsx)(Card_1.GreyCard, Object.assign({ border: border }, { children: (0, jsx_runtime_1.jsxs)(Column_1.AutoColumn, Object.assign({ gap: "12px" }, { children: [(0, jsx_runtime_1.jsx)(exports.FixedHeightRow, { children: (0, jsx_runtime_1.jsx)(Row_1.RowFixed, { children: (0, jsx_runtime_1.jsx)(rebass_1.Text, Object.assign({ fontWeight: 500, fontSize: 16 }, { children: t('YourPosition') })) }) }), (0, jsx_runtime_1.jsxs)(exports.FixedHeightRow, Object.assign({ onClick: () => setShowMore(!showMore) }, { children: [(0, jsx_runtime_1.jsxs)(Row_1.RowFixed, { children: [(0, jsx_runtime_1.jsx)(DoubleLogo_1.default, { currency0: currency0, currency1: currency1, margin: true, size: 20 }), (0, jsx_runtime_1.jsxs)(rebass_1.Text, Object.assign({ fontWeight: 500, fontSize: 20 }, { children: [currency0.symbol, "/", currency1.symbol] }))] }), (0, jsx_runtime_1.jsx)(Row_1.RowFixed, { children: (0, jsx_runtime_1.jsx)(rebass_1.Text, Object.assign({ fontWeight: 500, fontSize: 20 }, { children: userPoolBalance ? userPoolBalance.toSignificant(4) : '-' })) })] })), (0, jsx_runtime_1.jsxs)(Column_1.AutoColumn, Object.assign({ gap: "4px" }, { children: [(0, jsx_runtime_1.jsxs)(exports.FixedHeightRow, { children: [(0, jsx_runtime_1.jsxs)(rebass_1.Text, Object.assign({ fontSize: 16, fontWeight: 500 }, { children: [t('YourPoolShare'), ":"] })), (0, jsx_runtime_1.jsx)(rebass_1.Text, Object.assign({ fontSize: 16, fontWeight: 500 }, { children: poolTokenPercentage ? poolTokenPercentage.toFixed(6) + '%' : '-' }))] }), (0, jsx_runtime_1.jsxs)(exports.FixedHeightRow, { children: [(0, jsx_runtime_1.jsxs)(rebass_1.Text, Object.assign({ fontSize: 16, fontWeight: 500 }, { children: [currency0.symbol, ":"] })), token0Deposited ? ((0, jsx_runtime_1.jsx)(Row_1.RowFixed, { children: (0, jsx_runtime_1.jsx)(rebass_1.Text, Object.assign({ fontSize: 16, fontWeight: 500, marginLeft: '6px' }, { children: token0Deposited === null || token0Deposited === void 0 ? void 0 : token0Deposited.toSignificant(6) })) })) : ('-')] }), (0, jsx_runtime_1.jsxs)(exports.FixedHeightRow, { children: [(0, jsx_runtime_1.jsxs)(rebass_1.Text, Object.assign({ fontSize: 16, fontWeight: 500 }, { children: [currency1.symbol, ":"] })), token1Deposited ? ((0, jsx_runtime_1.jsx)(Row_1.RowFixed, { children: (0, jsx_runtime_1.jsx)(rebass_1.Text, Object.assign({ fontSize: 16, fontWeight: 500, marginLeft: '6px' }, { children: token1Deposited === null || token1Deposited === void 0 ? void 0 : token1Deposited.toSignificant(6) })) })) : ('-')] })] }))] })) }))) : ((0, jsx_runtime_1.jsx)(Card_1.LightCard, { children: (0, jsx_runtime_1.jsxs)(theme_1.TYPE.subHeader, Object.assign({ style: { textAlign: 'center' } }, { children: [(0, jsx_runtime_1.jsx)("span", Object.assign({ role: "img", "aria-label": "wizard-icon" }, { children: "\u2B50\uFE0F" })), ' ', t('liquidityProviderRewardsDesc')] })) })) }));
}
exports.MinimalPositionCard = MinimalPositionCard;
function FullPositionCard({ pair, border, stakedBalance }) {
    const { t } = (0, react_i18next_1.useTranslation)();
    const { address: account } = (0, use_contractkit_1.useContractKit)();
    const currency0 = pair.token0;
    const currency1 = pair.token1;
    const [showMore, setShowMore] = (0, react_1.useState)(false);
    const userDefaultPoolBalance = (0, hooks_1.useTokenBalance)(account !== null && account !== void 0 ? account : undefined, pair.liquidityToken);
    const totalPoolTokens = (0, TotalSupply_1.useTotalSupply)(pair.liquidityToken);
    // if staked balance balance provided, add to standard liquidity amount
    const userPoolBalance = stakedBalance ? userDefaultPoolBalance === null || userDefaultPoolBalance === void 0 ? void 0 : userDefaultPoolBalance.add(stakedBalance) : userDefaultPoolBalance;
    const poolTokenPercentage = !!userPoolBalance && !!totalPoolTokens && sdk_1.JSBI.greaterThanOrEqual(totalPoolTokens.raw, userPoolBalance.raw)
        ? new sdk_1.Percent(userPoolBalance.raw, totalPoolTokens.raw)
        : undefined;
    const [token0Deposited, token1Deposited] = !!pair &&
        !!totalPoolTokens &&
        !!userPoolBalance &&
        // this condition is a short-circuit in the case where useTokenBalance updates sooner than useTotalSupply
        sdk_1.JSBI.greaterThanOrEqual(totalPoolTokens.raw, userPoolBalance.raw)
        ? [
            pair.getLiquidityValue(pair.token0, totalPoolTokens, userPoolBalance, false),
            pair.getLiquidityValue(pair.token1, totalPoolTokens, userPoolBalance, false),
        ]
        : [undefined, undefined];
    const backgroundColor = (0, useColor_1.useColor)(pair === null || pair === void 0 ? void 0 : pair.token0);
    return ((0, jsx_runtime_1.jsxs)(StyledPositionCard, Object.assign({ border: border, bgColor: backgroundColor }, { children: [(0, jsx_runtime_1.jsx)(styled_1.CardNoise, {}), (0, jsx_runtime_1.jsxs)(Column_1.AutoColumn, Object.assign({ gap: "12px" }, { children: [(0, jsx_runtime_1.jsxs)(exports.FixedHeightRow, { children: [(0, jsx_runtime_1.jsxs)(Row_1.AutoRow, Object.assign({ gap: "8px" }, { children: [(0, jsx_runtime_1.jsx)(DoubleLogo_1.default, { currency0: currency0, currency1: currency1, size: 20 }), (0, jsx_runtime_1.jsx)(rebass_1.Text, Object.assign({ fontWeight: 500, fontSize: 20 }, { children: !currency0 || !currency1 ? (0, jsx_runtime_1.jsx)(styleds_1.Dots, { children: t('Loading') }) : `${currency0.symbol}/${currency1.symbol}` }))] })), (0, jsx_runtime_1.jsx)(Row_1.RowFixed, Object.assign({ gap: "8px" }, { children: (0, jsx_runtime_1.jsx)(Button_1.ButtonEmpty, Object.assign({ padding: "6px 8px", borderRadius: "12px", width: "fit-content", onClick: () => setShowMore(!showMore) }, { children: showMore ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [t('manage'), (0, jsx_runtime_1.jsx)(react_feather_1.ChevronUp, { size: "20", style: { marginLeft: '10px' } })] })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [t('manage'), (0, jsx_runtime_1.jsx)(react_feather_1.ChevronDown, { size: "20", style: { marginLeft: '10px' } })] })) })) }))] }), showMore && ((0, jsx_runtime_1.jsxs)(Column_1.AutoColumn, Object.assign({ gap: "8px" }, { children: [(0, jsx_runtime_1.jsxs)(exports.FixedHeightRow, { children: [(0, jsx_runtime_1.jsxs)(rebass_1.Text, Object.assign({ fontSize: 16, fontWeight: 500 }, { children: [t('YourTotalPoolTokens'), ":"] })), (0, jsx_runtime_1.jsx)(rebass_1.Text, Object.assign({ fontSize: 16, fontWeight: 500 }, { children: userPoolBalance ? userPoolBalance.toSignificant(4) : '-' }))] }), stakedBalance && ((0, jsx_runtime_1.jsxs)(exports.FixedHeightRow, { children: [(0, jsx_runtime_1.jsxs)(rebass_1.Text, Object.assign({ fontSize: 16, fontWeight: 500 }, { children: [t('PoolTokensInRewardsPool'), ":"] })), (0, jsx_runtime_1.jsx)(rebass_1.Text, Object.assign({ fontSize: 16, fontWeight: 500 }, { children: stakedBalance.toSignificant(4) }))] })), (0, jsx_runtime_1.jsxs)(exports.FixedHeightRow, { children: [(0, jsx_runtime_1.jsx)(Row_1.RowFixed, { children: (0, jsx_runtime_1.jsxs)(rebass_1.Text, Object.assign({ fontSize: 16, fontWeight: 500 }, { children: [t('Pooled'), " ", currency0.symbol, ":"] })) }), token0Deposited ? ((0, jsx_runtime_1.jsxs)(Row_1.RowFixed, { children: [(0, jsx_runtime_1.jsx)(rebass_1.Text, Object.assign({ fontSize: 16, fontWeight: 500, marginLeft: '6px' }, { children: token0Deposited === null || token0Deposited === void 0 ? void 0 : token0Deposited.toSignificant(6) })), (0, jsx_runtime_1.jsx)(CurrencyLogo_1.default, { size: "20px", style: { marginLeft: '8px' }, currency: currency0 })] })) : ('-')] }), (0, jsx_runtime_1.jsxs)(exports.FixedHeightRow, { children: [(0, jsx_runtime_1.jsx)(Row_1.RowFixed, { children: (0, jsx_runtime_1.jsxs)(rebass_1.Text, Object.assign({ fontSize: 16, fontWeight: 500 }, { children: [t('Pooled'), " ", currency1.symbol, ":"] })) }), token1Deposited ? ((0, jsx_runtime_1.jsxs)(Row_1.RowFixed, { children: [(0, jsx_runtime_1.jsx)(rebass_1.Text, Object.assign({ fontSize: 16, fontWeight: 500, marginLeft: '6px' }, { children: token1Deposited === null || token1Deposited === void 0 ? void 0 : token1Deposited.toSignificant(6) })), (0, jsx_runtime_1.jsx)(CurrencyLogo_1.default, { size: "20px", style: { marginLeft: '8px' }, currency: currency1 })] })) : ('-')] }), (0, jsx_runtime_1.jsxs)(exports.FixedHeightRow, { children: [(0, jsx_runtime_1.jsxs)(rebass_1.Text, Object.assign({ fontSize: 16, fontWeight: 500 }, { children: [t('YourPoolShare'), ":"] })), (0, jsx_runtime_1.jsx)(rebass_1.Text, Object.assign({ fontSize: 16, fontWeight: 500 }, { children: poolTokenPercentage
                                            ? (poolTokenPercentage.toFixed(2) === '0.00' ? '<0.01' : poolTokenPercentage.toFixed(2)) + '%'
                                            : '-' }))] }), (0, jsx_runtime_1.jsx)(Button_1.ButtonSecondary, Object.assign({ padding: "8px", borderRadius: "8px" }, { children: (0, jsx_runtime_1.jsxs)(theme_1.ExternalLink, Object.assign({ style: { width: '100%', textAlign: 'center' }, href: `https://info.ubeswap.org/account/${account}` }, { children: [t('ViewAccruedFeesAndAnalytics'), (0, jsx_runtime_1.jsx)("span", Object.assign({ style: { fontSize: '11px' } }, { children: "\u2197" }))] })) })), userDefaultPoolBalance && sdk_1.JSBI.greaterThan(userDefaultPoolBalance.raw, constants_1.BIG_INT_ZERO) && ((0, jsx_runtime_1.jsxs)(Row_1.RowBetween, Object.assign({ marginTop: "10px" }, { children: [(0, jsx_runtime_1.jsx)(Button_1.ButtonPrimary, Object.assign({ padding: "8px", borderRadius: "8px", as: react_router_dom_1.Link, to: `/add/${(0, currencyId_1.currencyId)(currency0)}/${(0, currencyId_1.currencyId)(currency1)}`, width: "48%" }, { children: t('addLiquidity') })), (0, jsx_runtime_1.jsx)(Button_1.ButtonPrimary, Object.assign({ padding: "8px", borderRadius: "8px", as: react_router_dom_1.Link, width: "48%", to: `/remove/${(0, currencyId_1.currencyId)(currency0)}/${(0, currencyId_1.currencyId)(currency1)}` }, { children: t('removeLiquidity') }))] }))), stakedBalance && sdk_1.JSBI.greaterThan(stakedBalance.raw, constants_1.BIG_INT_ZERO) && ((0, jsx_runtime_1.jsx)(Button_1.ButtonPrimary, Object.assign({ padding: "8px", borderRadius: "8px", as: react_router_dom_1.Link, to: `/uni/${(0, currencyId_1.currencyId)(currency0)}/${(0, currencyId_1.currencyId)(currency1)}`, width: "100%" }, { children: t('ManageLiquidityInRewardsPool') })))] })))] }))] })));
}
exports.default = FullPositionCard;
