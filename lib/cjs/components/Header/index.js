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
exports.StyledSubMenuItem = exports.StyledMenuItem = exports.StyledMenu = exports.StyledDrawer = exports.BurgerElement = exports.StyledMobileLogo = exports.StyledDesktopLogo = exports.StyledMenuButton = exports.StyledNavLinkExtraSmall = exports.StyledNavLink = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
require("rc-drawer/assets/index.css");
const use_contractkit_1 = require("@celo-tools/use-contractkit");
const sdk_1 = require("@ubeswap/sdk");
const hamburger_react_1 = __importDefault(require("hamburger-react"));
const polished_1 = require("polished");
const rc_drawer_1 = __importDefault(require("rc-drawer"));
const react_1 = require("react");
const react_feather_1 = require("react-feather");
const react_i18next_1 = require("react-i18next");
const react_router_dom_1 = require("react-router-dom");
const rebass_1 = require("rebass");
const styled_components_1 = __importDefault(require("styled-components"));
const use_count_up_1 = require("use-count-up");
const icon_ube_svg_1 = __importDefault(require("../../assets/svg/icon-ube.svg"));
const logo_svg_1 = __importDefault(require("../../assets/svg/logo.svg"));
const logo_dark_svg_1 = __importDefault(require("../../assets/svg/logo-dark.svg"));
const usePrevious_1 = __importDefault(require("../../hooks/usePrevious"));
const hooks_1 = require("../../state/user/hooks");
const hooks_2 = require("../../state/wallet/hooks");
const theme_1 = require("../../theme");
const components_1 = require("../../theme/components");
const relevantDigits_1 = require("../../utils/relevantDigits");
const Card_1 = require("../Card");
const styled_1 = require("../earn/styled");
const Menu_1 = __importDefault(require("../Menu"));
const Modal_1 = __importDefault(require("../Modal"));
const Row_1 = __importStar(require("../Row"));
const Web3Status_1 = __importDefault(require("../Web3Status"));
const BridgeMenuGroup_1 = __importDefault(require("./BridgeMenuGroup"));
const ChartsMenuGroup_1 = __importDefault(require("./ChartsMenuGroup"));
const UbeBalanceContent_1 = __importDefault(require("./UbeBalanceContent"));
const HeaderFrame = styled_components_1.default.div `
  display: grid;
  grid-template-columns: 1fr 120px;
  align-items: center;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  width: 100%;
  top: 0;
  position: relative;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding: 1rem;
  z-index: 2;
  ${({ theme }) => theme.mediaWidth.upToMedium `
    grid-template-columns: 1fr;
    padding: 0 1rem;
    width: calc(100%);
    position: relative;
  `};

  ${({ theme }) => theme.mediaWidth.upToExtraSmall `
        padding: 0.5rem 1rem;
  `}
`;
const HeaderControls = styled_components_1.default.div `
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-self: flex-end;

  ${({ theme }) => theme.mediaWidth.upToMedium `
    flex-direction: row;
    justify-content: space-between;
    justify-self: center;
    width: 100%;
    max-width: 960px;
    padding: 1rem;
    position: fixed;
    bottom: 0px;
    left: 0px;
    width: 100%;
    z-index: 99;
    height: 72px;
    border-radius: 12px 12px 0 0;
    background-color: ${({ theme }) => theme.bg1};
  `};
`;
const HeaderElement = styled_components_1.default.div `
  display: flex;
  align-items: center;

  /* addresses safari's lack of support for "gap" */
  & > *:not(:first-child) {
    margin-left: 8px;
  }

  ${({ theme }) => theme.mediaWidth.upToMedium `
   flex-direction: row-reverse;
    align-items: center;
  `};
`;
const HeaderElementWrap = styled_components_1.default.div `
  display: flex;
  align-items: center;
`;
const HeaderRow = (0, styled_components_1.default)(Row_1.RowFixed) `
  ${({ theme }) => theme.mediaWidth.upToMedium `
   width: 100%;
  `};
`;
const HeaderLinks = (0, styled_components_1.default)(Row_1.default) `
  justify-content: center;
  ${({ theme }) => theme.mediaWidth.upToMedium `
    padding: 1rem 0 1rem 1rem;
    justify-content: flex-end;
`};
`;
const AccountElement = styled_components_1.default.div `
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme, active }) => (!active ? theme.bg1 : theme.bg3)};
  border-radius: 12px;
  white-space: nowrap;
  width: 100%;
  cursor: pointer;

  :focus {
    border: 1px solid blue;
  }
`;
const HideSmall = styled_components_1.default.span `
  ${({ theme }) => theme.mediaWidth.upToSmall `
    display: none;
  `};
`;
const NetworkCard = (0, styled_components_1.default)(Card_1.YellowCard) `
  border-radius: 12px;
  padding: 8px 12px;
  ${({ theme }) => theme.mediaWidth.upToSmall `
    margin: 0;
    margin-right: 0.5rem;
    width: initial;
    overflow: hidden;
    text-overflow: ellipsis;
    flex-shrink: 1;
  `};
`;
const BalanceText = (0, styled_components_1.default)(rebass_1.Text) `
  ${({ theme }) => theme.mediaWidth.upToExtraSmall `
    display: none;
  `};
`;
const Title = (0, styled_components_1.default)(react_router_dom_1.NavLink) `
  display: flex;
  align-items: center;
  pointer-events: auto;
  justify-self: flex-start;
  margin-right: 12px;
  ${({ theme }) => theme.mediaWidth.upToSmall `
    justify-self: center;
  `};
  :hover {
    cursor: pointer;
  }
`;
const UbeIcon = styled_components_1.default.div `
  transition: transform 0.3s ease;
  :hover {
    transform: rotate(-5deg);
  }
`;
const activeClassName = 'ACTIVE';
exports.StyledNavLink = (0, styled_components_1.default)(react_router_dom_1.NavLink).attrs({
    activeClassName,
}) `
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: left;
  border-radius: 3rem;
  outline: none;
  cursor: pointer;
  text-decoration: none;
  color: ${({ theme }) => theme.text2};
  font-size: 1rem;
  width: fit-content;
  margin: 0 12px;
  font-weight: 500;

  &.${activeClassName} {
    border-radius: 12px;
    font-weight: 600;
    color: ${({ theme }) => theme.text1};
  }

  :hover,
  :focus {
    color: ${({ theme }) => (0, polished_1.darken)(0.1, theme.text1)};
  }

  @media (max-width: 320px) {
    margin: 0 8px;
  }
`;
exports.StyledNavLinkExtraSmall = (0, styled_components_1.default)(exports.StyledNavLink).attrs({
    activeClassName,
}) `
  ${({ theme }) => theme.mediaWidth.upToExtraSmall `
    display: none;
  `}
`;
const StyledExternalLink = (0, styled_components_1.default)(components_1.ExternalLink).attrs({
    activeClassName,
}) `
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: left;
  border-radius: 3rem;
  outline: none;
  cursor: pointer;
  text-decoration: none;
  color: ${({ theme }) => theme.text2};
  font-size: 1rem;
  width: fit-content;
  margin: 0 12px;
  font-weight: 500;

  &.${activeClassName} {
    border-radius: 12px;
    font-weight: 600;
    color: ${({ theme }) => theme.text1};
  }

  :hover,
  :focus {
    color: ${({ theme }) => (0, polished_1.darken)(0.1, theme.text1)};
  }

  ${({ theme }) => theme.mediaWidth.upToExtraSmall `
      display: none;
`}
`;
exports.StyledMenuButton = styled_components_1.default.button `
  position: relative;
  width: 100%;
  height: 100%;
  border: none;
  background-color: transparent;
  margin: 0;
  padding: 0;
  height: 35px;
  background-color: ${({ theme }) => theme.bg3};
  margin-left: 8px;
  padding: 0.15rem 0.5rem;
  border-radius: 0.5rem;

  :hover,
  :focus {
    cursor: pointer;
    outline: none;
    background-color: ${({ theme }) => theme.bg4};
  }

  svg {
    margin-top: 2px;
  }
  > * {
    stroke: ${({ theme }) => theme.text1};
  }
`;
exports.StyledDesktopLogo = styled_components_1.default.img `
  display: inline;
  ${({ theme }) => theme.mediaWidth.upToSmall `
    display: none;  
  `};
  ${({ theme }) => theme.mediaWidth.upToExtraSmall `
    display: inline;  
  `};
  @media (max-width: 385px) {
    display: none;
  }
`;
exports.StyledMobileLogo = styled_components_1.default.img `
  display: none;
  ${({ theme }) => theme.mediaWidth.upToSmall `
    display: inline;  
  `};
  ${({ theme }) => theme.mediaWidth.upToExtraSmall `
    display: none;  
  `};
  @media (max-width: 385px) {
    display: inline;
  }
`;
exports.BurgerElement = (0, styled_components_1.default)(HeaderElement) `
  display: none;
  ${({ theme }) => theme.mediaWidth.upToExtraSmall `
    display: flex;  
  `};
`;
exports.StyledDrawer = (0, styled_components_1.default)(rc_drawer_1.default) `
  & .drawer-content-wrapper {
    background: ${({ theme }) => theme.bg3};
    color: ${({ theme }) => theme.text1};
  }
`;
exports.StyledMenu = styled_components_1.default.ul `
  padding-left: 0px;
  list-style: none;
`;
exports.StyledMenuItem = styled_components_1.default.li `
  padding: 10px 0px 10px 20px;
`;
exports.StyledSubMenuItem = (0, styled_components_1.default)(exports.StyledMenuItem) `
  padding-left: 30px;
`;
const StyledDrawerExternalLink = (0, styled_components_1.default)(StyledExternalLink).attrs({
    activeClassName,
}) `
  text-decoration: none;
  ${({ theme }) => theme.mediaWidth.upToExtraSmall `
      display: flex;
`}
`;
const NETWORK_LABELS = {
    [use_contractkit_1.ChainId.Mainnet]: 'Celo',
    [use_contractkit_1.ChainId.Alfajores]: 'Alfajores',
    [use_contractkit_1.ChainId.Baklava]: 'Baklava',
};
function Header() {
    var _a, _b;
    const { address: account, network } = (0, use_contractkit_1.useContractKit)();
    const chainId = network.chainId;
    const { t } = (0, react_i18next_1.useTranslation)();
    const userCELOBalance = (0, hooks_2.useTokenBalance)(account !== null && account !== void 0 ? account : undefined, sdk_1.CELO[chainId]);
    const [darkMode, toggleDarkMode] = (0, hooks_1.useDarkModeManager)();
    const [showUbeBalanceModal, setShowUbeBalanceModal] = (0, react_1.useState)(false);
    const aggregateBalance = (0, hooks_2.useAggregateUbeBalance)();
    const countUpValue = (0, relevantDigits_1.relevantDigits)(aggregateBalance);
    const countUpValuePrevious = (_a = (0, usePrevious_1.default)(countUpValue)) !== null && _a !== void 0 ? _a : '0';
    const [drawerVisible, setDrawerVisible] = (0, react_1.useState)(false);
    const onDrawerClose = () => {
        setDrawerVisible(false);
    };
    const onToggle = (toggled) => {
        setDrawerVisible(toggled);
    };
    return ((0, jsx_runtime_1.jsxs)(HeaderFrame, { children: [(0, jsx_runtime_1.jsx)(Modal_1.default, Object.assign({ isOpen: showUbeBalanceModal, onDismiss: () => setShowUbeBalanceModal(false) }, { children: (0, jsx_runtime_1.jsx)(UbeBalanceContent_1.default, { setShowUbeBalanceModal: setShowUbeBalanceModal }) })), (0, jsx_runtime_1.jsxs)(HeaderRow, { children: [(0, jsx_runtime_1.jsx)(Title, Object.assign({ to: "/" }, { children: (0, jsx_runtime_1.jsxs)(UbeIcon, { children: [(0, jsx_runtime_1.jsx)(exports.StyledMobileLogo, { width: '32px', height: '36px', src: icon_ube_svg_1.default, alt: "Ubeswap" }), (0, jsx_runtime_1.jsx)(exports.StyledDesktopLogo, { width: '140px', height: '26px', src: darkMode ? logo_dark_svg_1.default : logo_svg_1.default, alt: "Ubeswap" })] }) })), (0, jsx_runtime_1.jsxs)(HeaderLinks, { children: [(0, jsx_runtime_1.jsx)(exports.StyledNavLink, Object.assign({ id: `swap-nav-link`, to: '/swap' }, { children: t('swap') })), (0, jsx_runtime_1.jsx)(exports.StyledNavLinkExtraSmall, Object.assign({ id: `swap-nav-link`, to: '/limit-order' }, { children: t('limitOrder') })), (0, jsx_runtime_1.jsx)(exports.StyledNavLink, Object.assign({ id: `pool-nav-link`, to: '/pool', isActive: (match, { pathname }) => Boolean(match) ||
                                    pathname.startsWith('/add') ||
                                    pathname.startsWith('/remove') ||
                                    pathname.startsWith('/create') ||
                                    pathname.startsWith('/find') }, { children: t('pool') })), (0, jsx_runtime_1.jsx)(exports.StyledNavLink, Object.assign({ id: "farm-nav-link", to: "/farm" }, { children: t('farm') })), (0, jsx_runtime_1.jsx)(BridgeMenuGroup_1.default, {}), (0, jsx_runtime_1.jsx)(exports.StyledNavLinkExtraSmall, Object.assign({ id: `stake-nav-link`, to: '/stake' }, { children: t('stake') })), (0, jsx_runtime_1.jsx)(ChartsMenuGroup_1.default, {})] }), (0, jsx_runtime_1.jsxs)(exports.BurgerElement, { children: [(0, jsx_runtime_1.jsx)(hamburger_react_1.default, { size: 18, hideOutline: false, label: "show menu", toggled: drawerVisible, onToggle: onToggle }), (0, jsx_runtime_1.jsx)(exports.StyledDrawer, Object.assign({ open: drawerVisible, placement: 'right', width: '250px', level: null, handler: false, onClose: onDrawerClose }, { children: (0, jsx_runtime_1.jsxs)(exports.StyledMenu, { children: [(0, jsx_runtime_1.jsx)(exports.StyledMenuItem, { children: (0, jsx_runtime_1.jsx)(exports.StyledNavLink, Object.assign({ id: 'stake-drawer-nav-link', to: '/stake', onClick: onDrawerClose }, { children: t('stake') })) }), (0, jsx_runtime_1.jsx)(exports.StyledMenuItem, { children: (0, jsx_runtime_1.jsx)(exports.StyledNavLink, Object.assign({ id: 'limit-orders-drawer-nav-link', to: '/limit-order', onClick: onDrawerClose }, { children: "Limit Orders" })) }), (0, jsx_runtime_1.jsx)(exports.StyledMenuItem, { children: (0, jsx_runtime_1.jsx)(exports.StyledNavLink, Object.assign({ id: 'stake-drawer-nav-link', to: '#' }, { children: "Bridge" })) }), (0, jsx_runtime_1.jsx)(exports.StyledSubMenuItem, { children: (0, jsx_runtime_1.jsx)(StyledDrawerExternalLink, Object.assign({ id: `stake-drawer-nav-link`, href: 'https://allbridge.io/' }, { children: "Allbridge" })) }), (0, jsx_runtime_1.jsx)(exports.StyledSubMenuItem, { children: (0, jsx_runtime_1.jsx)(StyledDrawerExternalLink, Object.assign({ id: `stake-drawer-nav-link`, href: 'https://app.multichain.org/#/router' }, { children: "Multichain" })) }), (0, jsx_runtime_1.jsx)(exports.StyledSubMenuItem, { children: (0, jsx_runtime_1.jsx)(StyledDrawerExternalLink, Object.assign({ id: `stake-drawer-nav-link`, href: 'https://optics.app/' }, { children: "Optics" })) }), (0, jsx_runtime_1.jsx)(exports.StyledSubMenuItem, { children: (0, jsx_runtime_1.jsx)(StyledDrawerExternalLink, Object.assign({ id: `stake-drawer-nav-link`, href: 'https://bridge.orbitchain.io/' }, { children: "Orbit" })) }), (0, jsx_runtime_1.jsx)(exports.StyledMenuItem, { children: (0, jsx_runtime_1.jsx)(exports.StyledNavLink, Object.assign({ id: 'charts-drawer-nav-link', to: '#' }, { children: "Charts" })) }), (0, jsx_runtime_1.jsx)(exports.StyledSubMenuItem, { children: (0, jsx_runtime_1.jsx)(StyledDrawerExternalLink, Object.assign({ id: `charts-analytics-drawer-nav-link`, href: 'https://info.ubeswap.org/' }, { children: "Analytics" })) }), (0, jsx_runtime_1.jsx)(exports.StyledSubMenuItem, { children: (0, jsx_runtime_1.jsx)(StyledDrawerExternalLink, Object.assign({ id: `charts-celo-tracker-drawer-nav-link`, href: 'https://celotracker.com/' }, { children: "Celo Tracker" })) })] }) }))] })] }), (0, jsx_runtime_1.jsxs)(HeaderControls, { children: [(0, jsx_runtime_1.jsxs)(HeaderElement, { children: [(0, jsx_runtime_1.jsx)(HideSmall, { children: chainId && NETWORK_LABELS[chainId] && ((0, jsx_runtime_1.jsx)(NetworkCard, Object.assign({ title: NETWORK_LABELS[chainId] }, { children: NETWORK_LABELS[chainId] }))) }), aggregateBalance && ((0, jsx_runtime_1.jsxs)(UBEWrapper, Object.assign({ onClick: () => setShowUbeBalanceModal(true) }, { children: [(0, jsx_runtime_1.jsxs)(UBEAmount, Object.assign({ active: !!account, style: { pointerEvents: 'auto' } }, { children: [account && ((0, jsx_runtime_1.jsx)(HideSmall, { children: (0, jsx_runtime_1.jsx)(theme_1.TYPE.white, Object.assign({ style: {
                                                        paddingRight: '.4rem',
                                                    } }, { children: (0, jsx_runtime_1.jsx)(use_count_up_1.CountUp, { isCounting: true, start: parseFloat(countUpValuePrevious), end: parseFloat(countUpValue), thousandsSeparator: ',', duration: 1 }, countUpValue) })) })), "UBE"] })), (0, jsx_runtime_1.jsx)(styled_1.CardNoise, {})] }))), (0, jsx_runtime_1.jsxs)(AccountElement, Object.assign({ active: !!account, style: { pointerEvents: 'auto' } }, { children: [account && userCELOBalance ? ((0, jsx_runtime_1.jsxs)(BalanceText, Object.assign({ style: { flexShrink: 0 }, pl: "0.75rem", pr: "0.5rem", fontWeight: 500 }, { children: [(_b = (0, relevantDigits_1.relevantDigits)(userCELOBalance)) !== null && _b !== void 0 ? _b : '0.00', " CELO"] }))) : null, (0, jsx_runtime_1.jsx)(Web3Status_1.default, {})] }))] }), (0, jsx_runtime_1.jsxs)(HeaderElementWrap, { children: [(0, jsx_runtime_1.jsx)(exports.StyledMenuButton, Object.assign({ "aria-label": t('toggleDarkMode'), onClick: () => toggleDarkMode() }, { children: darkMode ? (0, jsx_runtime_1.jsx)(react_feather_1.Moon, { size: 20 }) : (0, jsx_runtime_1.jsx)(react_feather_1.Sun, { size: 20 }) })), (0, jsx_runtime_1.jsx)(Menu_1.default, {})] })] })] }));
}
exports.default = Header;
const UBEAmount = (0, styled_components_1.default)(AccountElement) `
  color: white;
  padding: 4px 8px;
  height: 36px;
  font-weight: 500;
  background-color: ${({ theme }) => theme.bg3};
  background: radial-gradient(174.47% 188.91% at 1.84% 0%, ${({ theme }) => theme.primary1} 0%, #2172e5 100%), #edeef2;
`;
const UBEWrapper = styled_components_1.default.span `
  width: fit-content;
  position: relative;
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
  :active {
    opacity: 0.9;
  }
`;
