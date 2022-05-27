import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef } from 'react';
import { BookOpen, Code, Info, MessageCircle, PieChart, Send } from 'react-feather';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as MenuIcon } from '../../assets/images/menu.svg';
import { useOnClickOutside } from '../../hooks/useOnClickOutside';
import { ApplicationModal } from '../../state/application/actions';
import { useModalOpen, useToggleModal } from '../../state/application/hooks';
import { ExternalLink } from '../../theme';
const StyledMenuIcon = styled(MenuIcon) `
  path {
    stroke: ${({ theme }) => theme.text1};
  }
`;
const StyledMenuButton = styled.button `
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
const StyledMenu = styled.div `
  margin-left: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border: none;
  text-align: left;
`;
const MenuFlyout = styled.span `
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
const MenuItem = styled(ExternalLink) `
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
const MenuItemInternal = styled(NavLink) `
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
export default function Menu() {
    const node = useRef();
    const open = useModalOpen(ApplicationModal.MENU);
    const toggle = useToggleModal(ApplicationModal.MENU);
    useOnClickOutside(node, open ? toggle : undefined);
    const { t } = useTranslation();
    return (
    // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/30451
    _jsxs(StyledMenu, Object.assign({ ref: node }, { children: [_jsx(StyledMenuButton, Object.assign({ onClick: toggle, "aria-label": open ? t('menuClose') : t('menuOpen') }, { children: _jsx(StyledMenuIcon, {}, void 0) }), void 0), open && (_jsxs(MenuFlyout, { children: [_jsxs(MenuItemInternal, Object.assign({ id: "link", to: "/send" }, { children: [_jsx(Send, { size: 14 }, void 0), "Send"] }), void 0), _jsxs(MenuItem, Object.assign({ id: "link", href: "https://ubeswap.org/" }, { children: [_jsx(Info, { size: 14 }, void 0), "About"] }), void 0), _jsxs(MenuItem, Object.assign({ id: "link", href: "https://docs.ubeswap.org/" }, { children: [_jsx(BookOpen, { size: 14 }, void 0), "Docs"] }), void 0), _jsxs(MenuItem, Object.assign({ id: "link", href: CODE_LINK }, { children: [_jsx(Code, { size: 14 }, void 0), "Code"] }), void 0), _jsxs(MenuItem, Object.assign({ id: "link", href: "https://discord.gg/zZkUXCMPGP" }, { children: [_jsx(MessageCircle, { size: 14 }, void 0), "Discord"] }), void 0), _jsxs(MenuItem, Object.assign({ id: "link", href: "https://info.ubeswap.org/" }, { children: [_jsx(PieChart, { size: 14 }, void 0), "Analytics"] }), void 0)] }, void 0))] }), void 0));
}
