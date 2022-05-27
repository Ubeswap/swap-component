"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_feather_1 = require("react-feather");
const react_i18next_1 = require("react-i18next");
const react_router_dom_1 = require("react-router-dom");
const styled_components_1 = __importDefault(require("styled-components"));
const menu_svg_1 = require("../../assets/images/menu.svg");
const useOnClickOutside_1 = require("../../hooks/useOnClickOutside");
const actions_1 = require("../../state/application/actions");
const hooks_1 = require("../../state/application/hooks");
const theme_1 = require("../../theme");
const StyledMenuIcon = (0, styled_components_1.default)(menu_svg_1.ReactComponent) `
  path {
    stroke: ${({ theme }) => theme.text1};
  }
`;
const StyledMenuButton = styled_components_1.default.button `
  width: 100%;
  height: 100%;
  border: none;
  background-color: transparent;
  margin: 0;
  padding: 0;
  height: 35px;
  background-color: ${({ theme }) => theme.bg3};

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
`;
const StyledMenu = styled_components_1.default.div `
  margin-left: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border: none;
  text-align: left;
`;
const MenuFlyout = styled_components_1.default.span `
  min-width: 8.125rem;
  background-color: ${({ theme }) => theme.bg3};
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.01), 0px 4px 8px rgba(0, 0, 0, 0.04), 0px 16px 24px rgba(0, 0, 0, 0.04),
    0px 24px 32px rgba(0, 0, 0, 0.01);
  border-radius: 12px;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  font-size: 1rem;
  position: absolute;
  top: 4rem;
  right: 0rem;
  z-index: 100;

  ${({ theme }) => theme.mediaWidth.upToMedium `
    top: -17.25rem;
  `};
`;
const MenuItem = (0, styled_components_1.default)(theme_1.ExternalLink) `
  flex: 1;
  padding: 0.5rem 0.5rem;
  color: ${({ theme }) => theme.text2};
  :hover {
    color: ${({ theme }) => theme.text1};
    cursor: pointer;
    text-decoration: none;
  }
  > svg {
    margin-right: 8px;
  }
`;
const MenuItemInternal = (0, styled_components_1.default)(react_router_dom_1.NavLink) `
  text-decoration: none;
  flex: 1;
  padding: 0.5rem 0.5rem;
  color: ${({ theme }) => theme.text2};
  :hover {
    color: ${({ theme }) => theme.text1};
    cursor: pointer;
    text-decoration: none;
  }
  > svg {
    margin-right: 8px;
  }
`;
const CODE_LINK = 'https://github.com/Ubeswap/ubeswap-interface';
function Menu() {
    const node = (0, react_1.useRef)();
    const open = (0, hooks_1.useModalOpen)(actions_1.ApplicationModal.MENU);
    const toggle = (0, hooks_1.useToggleModal)(actions_1.ApplicationModal.MENU);
    (0, useOnClickOutside_1.useOnClickOutside)(node, open ? toggle : undefined);
    const { t } = (0, react_i18next_1.useTranslation)();
    return (
    // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/30451
    (0, jsx_runtime_1.jsxs)(StyledMenu, Object.assign({ ref: node }, { children: [(0, jsx_runtime_1.jsx)(StyledMenuButton, Object.assign({ onClick: toggle, "aria-label": open ? t('menuClose') : t('menuOpen') }, { children: (0, jsx_runtime_1.jsx)(StyledMenuIcon, {}, void 0) }), void 0), open && ((0, jsx_runtime_1.jsxs)(MenuFlyout, { children: [(0, jsx_runtime_1.jsxs)(MenuItemInternal, Object.assign({ id: "link", to: "/send" }, { children: [(0, jsx_runtime_1.jsx)(react_feather_1.Send, { size: 14 }, void 0), "Send"] }), void 0), (0, jsx_runtime_1.jsxs)(MenuItem, Object.assign({ id: "link", href: "https://ubeswap.org/" }, { children: [(0, jsx_runtime_1.jsx)(react_feather_1.Info, { size: 14 }, void 0), "About"] }), void 0), (0, jsx_runtime_1.jsxs)(MenuItem, Object.assign({ id: "link", href: "https://docs.ubeswap.org/" }, { children: [(0, jsx_runtime_1.jsx)(react_feather_1.BookOpen, { size: 14 }, void 0), "Docs"] }), void 0), (0, jsx_runtime_1.jsxs)(MenuItem, Object.assign({ id: "link", href: CODE_LINK }, { children: [(0, jsx_runtime_1.jsx)(react_feather_1.Code, { size: 14 }, void 0), "Code"] }), void 0), (0, jsx_runtime_1.jsxs)(MenuItem, Object.assign({ id: "link", href: "https://discord.gg/zZkUXCMPGP" }, { children: [(0, jsx_runtime_1.jsx)(react_feather_1.MessageCircle, { size: 14 }, void 0), "Discord"] }), void 0), (0, jsx_runtime_1.jsxs)(MenuItem, Object.assign({ id: "link", href: "https://info.ubeswap.org/" }, { children: [(0, jsx_runtime_1.jsx)(react_feather_1.PieChart, { size: 14 }, void 0), "Analytics"] }), void 0)] }, void 0))] }), void 0));
}
exports.default = Menu;
