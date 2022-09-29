"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddRemoveTabs = exports.FindPoolTabs = exports.SwapPoolTabs = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const polished_1 = require("polished");
const react_feather_1 = require("react-feather");
const react_i18next_1 = require("react-i18next");
const react_redux_1 = require("react-redux");
const react_router_dom_1 = require("react-router-dom");
const styled_components_1 = __importDefault(require("styled-components"));
const actions_1 = require("../../state/mint/actions");
const Row_1 = require("../Row");
// import QuestionHelper from '../QuestionHelper'
const Settings_1 = __importDefault(require("../Settings"));
const Tabs = styled_components_1.default.div `
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: center;
  border-radius: 3rem;
  justify-content: space-evenly;
`;
const activeClassName = 'ACTIVE';
const StyledNavLink = (0, styled_components_1.default)(react_router_dom_1.NavLink).attrs({
    activeClassName,
}) `
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: center;
  justify-content: center;
  height: 3rem;
  border-radius: 3rem;
  outline: none;
  cursor: pointer;
  text-decoration: none;
  color: ${({ theme }) => theme.text3};
  font-size: 20px;

  &.${activeClassName} {
    border-radius: 12px;
    font-weight: 500;
    color: ${({ theme }) => theme.text1};
  }

  :hover,
  :focus {
    color: ${({ theme }) => (0, polished_1.darken)(0.1, theme.text1)};
  }
`;
const ActiveText = styled_components_1.default.div `
  font-weight: 500;
  font-size: 20px;
`;
const StyledArrowLeft = (0, styled_components_1.default)(react_feather_1.ArrowLeft) `
  color: ${({ theme }) => theme.text1};
`;
function SwapPoolTabs({ active }) {
    const { t } = (0, react_i18next_1.useTranslation)();
    return ((0, jsx_runtime_1.jsxs)(Tabs, Object.assign({ style: { marginBottom: '20px', display: 'none' } }, { children: [(0, jsx_runtime_1.jsx)(StyledNavLink, Object.assign({ id: `swap-nav-link`, to: '/swap', isActive: () => active === 'swap' }, { children: t('swap') })), (0, jsx_runtime_1.jsx)(StyledNavLink, Object.assign({ id: `pool-nav-link`, to: '/pool', isActive: () => active === 'pool' }, { children: t('pool') }))] })));
}
exports.SwapPoolTabs = SwapPoolTabs;
function FindPoolTabs() {
    const { t } = (0, react_i18next_1.useTranslation)();
    return ((0, jsx_runtime_1.jsx)(Tabs, { children: (0, jsx_runtime_1.jsxs)(Row_1.RowBetween, Object.assign({ style: { padding: '1rem 1rem 0 1rem' } }, { children: [(0, jsx_runtime_1.jsx)(react_router_dom_1.Link, Object.assign({ to: "/pool" }, { children: (0, jsx_runtime_1.jsx)(StyledArrowLeft, {}) })), (0, jsx_runtime_1.jsx)(ActiveText, { children: t('ImportPool') }), (0, jsx_runtime_1.jsx)(Settings_1.default, {})] })) }));
}
exports.FindPoolTabs = FindPoolTabs;
function AddRemoveTabs({ adding, creating }) {
    // reset states on back
    const dispatch = (0, react_redux_1.useDispatch)();
    const { t } = (0, react_i18next_1.useTranslation)();
    return ((0, jsx_runtime_1.jsx)(Tabs, { children: (0, jsx_runtime_1.jsxs)(Row_1.RowBetween, Object.assign({ style: { padding: '1rem 1rem 0 1rem' } }, { children: [(0, jsx_runtime_1.jsx)(react_router_dom_1.Link, Object.assign({ to: "/pool", onClick: () => {
                        adding && dispatch((0, actions_1.resetMintState)());
                    } }, { children: (0, jsx_runtime_1.jsx)(StyledArrowLeft, {}) })), (0, jsx_runtime_1.jsx)(ActiveText, { children: creating ? `${t('createPair')}` : adding ? `${t('addLiquidity')}` : `${t('removeLiquidity')}` }), (0, jsx_runtime_1.jsx)(Settings_1.default, {})] })) }));
}
exports.AddRemoveTabs = AddRemoveTabs;
