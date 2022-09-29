import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useContext, useRef, useState } from 'react';
import { Settings, X } from 'react-feather';
import { useTranslation } from 'react-i18next';
import { Text } from 'rebass';
import styled, { ThemeContext } from 'styled-components';
import { useOnClickOutside } from '../../hooks/useOnClickOutside';
import { ApplicationModal } from '../../state/application/actions';
import { useModalOpen, useToggleSettingsMenu } from '../../state/application/hooks';
import { useExpertModeManager, useUserAllowMoolaWithdrawal, useUserDisableSmartRouting, useUserMinApprove, useUserSingleHopOnly, useUserSlippageTolerance, useUserTransactionTTL, } from '../../state/user/hooks';
import { TYPE } from '../../theme';
import { ButtonError } from '../Button';
import { AutoColumn } from '../Column';
import Modal from '../Modal';
import QuestionHelper from '../QuestionHelper';
import { RowBetween, RowFixed } from '../Row';
import Toggle from '../Toggle';
import TransactionSettings from '../TransactionSettings';
const StyledMenuIcon = styled(Settings) `
  height: 20px;
  width: 20px;

  > * {
    stroke: ${({ theme }) => theme.text2};
  }

  :hover {
    opacity: 0.7;
  }
`;
const StyledCloseIcon = styled(X) `
  height: 20px;
  width: 20px;
  :hover {
    cursor: pointer;
  }

  > * {
    stroke: ${({ theme }) => theme.text1};
  }
`;
const StyledMenuButton = styled.button `
  position: relative;
  width: 100%;
  height: 100%;
  border: none;
  background-color: transparent;
  margin: 0;
  padding: 0;
  height: 35px;

  padding: 0.15rem 0.5rem;
  border-radius: 0.5rem;

  :hover,
  :focus {
    cursor: pointer;
    outline: none;
  }

  svg {
    margin-top: 2px;
  }
`;
const EmojiWrapper = styled.div `
  position: absolute;
  bottom: -6px;
  right: 0px;
  font-size: 14px;
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
  min-width: 20.125rem;
  background-color: ${({ theme }) => theme.bg2};
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.01), 0px 4px 8px rgba(0, 0, 0, 0.04), 0px 16px 24px rgba(0, 0, 0, 0.04),
    0px 24px 32px rgba(0, 0, 0, 0.01);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  font-size: 1rem;
  position: absolute;
  top: 3rem;
  right: 0rem;
  z-index: 100;

  ${({ theme }) => theme.mediaWidth.upToMedium `
    min-width: 18.125rem;
  `};
`;
const Break = styled.div `
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.bg3};
`;
const ModalContentWrapper = styled.div `
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 0;
  background-color: ${({ theme }) => theme.bg2};
  border-radius: 20px;
`;
export default function SettingsTab() {
    const node = useRef();
    const open = useModalOpen(ApplicationModal.SETTINGS);
    const toggle = useToggleSettingsMenu();
    const { t } = useTranslation();
    const theme = useContext(ThemeContext);
    const [userSlippageTolerance, setUserslippageTolerance] = useUserSlippageTolerance();
    const [minApprove, setMinApprove] = useUserMinApprove();
    const [allowMoolaWithdrawal, setAllowMoolaWithdrawal] = useUserAllowMoolaWithdrawal();
    const [disableSmartRouting, setDisableSmartRouting] = useUserDisableSmartRouting();
    const [ttl, setTtl] = useUserTransactionTTL();
    const [expertMode, toggleExpertMode] = useExpertModeManager();
    const [singleHopOnly, setSingleHopOnly] = useUserSingleHopOnly();
    // show confirmation view before turning on
    const [showConfirmation, setShowConfirmation] = useState(false);
    useOnClickOutside(node, open ? toggle : undefined);
    return (
    // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/30451
    _jsxs(StyledMenu, Object.assign({ ref: node }, { children: [_jsx(Modal, Object.assign({ isOpen: showConfirmation, onDismiss: () => setShowConfirmation(false), maxHeight: 100 }, { children: _jsx(ModalContentWrapper, { children: _jsxs(AutoColumn, Object.assign({ gap: "lg" }, { children: [_jsxs(RowBetween, Object.assign({ style: { padding: '0 2rem' } }, { children: [_jsx("div", {}), _jsx(Text, Object.assign({ fontWeight: 500, fontSize: 20 }, { children: "Are you sure?" })), _jsx(StyledCloseIcon, { onClick: () => setShowConfirmation(false) })] })), _jsx(Break, {}), _jsxs(AutoColumn, Object.assign({ gap: "lg", style: { padding: '0 2rem' } }, { children: [_jsx(Text, Object.assign({ fontWeight: 500, fontSize: 20 }, { children: "Expert mode turns off the confirm transaction prompt and allows high slippage trades that often result in bad rates and lost funds." })), _jsx(Text, Object.assign({ fontWeight: 600, fontSize: 20 }, { children: "ONLY USE THIS MODE IF YOU KNOW WHAT YOU ARE DOING." })), _jsx(ButtonError, Object.assign({ error: true, padding: '12px', onClick: () => {
                                            if (window.prompt(`Please type the word "confirm" to enable expert mode.`) === 'confirm') {
                                                toggleExpertMode();
                                                setShowConfirmation(false);
                                            }
                                        } }, { children: _jsx(Text, Object.assign({ fontSize: 20, fontWeight: 500, id: "confirm-expert-mode" }, { children: "Turn On Expert Mode" })) }))] }))] })) }) })), _jsxs(StyledMenuButton, Object.assign({ "aria-label": open ? t('settingsClose') : t('settingsOpen'), onClick: toggle, id: "open-settings-dialog-button" }, { children: [_jsx(StyledMenuIcon, {}), expertMode ? (_jsx(EmojiWrapper, { children: _jsx("span", Object.assign({ role: "img", "aria-label": "wizard-icon" }, { children: "\uD83E\uDDD9" })) })) : null] })), open && (_jsx(MenuFlyout, { children: _jsxs(AutoColumn, Object.assign({ gap: "md", style: { padding: '1rem' } }, { children: [_jsx(Text, Object.assign({ fontWeight: 600, fontSize: 14 }, { children: "Transaction Settings" })), _jsx(TransactionSettings, { rawSlippage: userSlippageTolerance, setRawSlippage: setUserslippageTolerance, deadline: ttl, setDeadline: setTtl }), _jsx(Text, Object.assign({ fontWeight: 600, fontSize: 14 }, { children: "Interface Settings" })), _jsxs(RowBetween, { children: [_jsxs(RowFixed, { children: [_jsx(TYPE.black, Object.assign({ fontWeight: 400, fontSize: 14, color: theme.text2 }, { children: "Toggle Expert Mode" })), _jsx(QuestionHelper, { text: "Bypasses confirmation modals and allows high slippage trades. Use at your own risk." })] }), _jsx(Toggle, { id: "toggle-expert-mode-button", isActive: expertMode, toggle: expertMode
                                        ? () => {
                                            toggleExpertMode();
                                            setShowConfirmation(false);
                                        }
                                        : () => {
                                            toggle();
                                            setShowConfirmation(true);
                                        } })] }), _jsxs(RowBetween, { children: [_jsxs(RowFixed, { children: [_jsx(TYPE.black, Object.assign({ fontWeight: 400, fontSize: 14, color: theme.text2 }, { children: "Disable Multihops" })), _jsx(QuestionHelper, { text: "Restricts swaps to direct pairs only." })] }), _jsx(Toggle, { id: "toggle-disable-multihop-button", isActive: singleHopOnly, toggle: () => (singleHopOnly ? setSingleHopOnly(false) : setSingleHopOnly(true)) })] }), _jsx(Text, Object.assign({ fontWeight: 600, fontSize: 14 }, { children: "Routing Settings" })), _jsxs(RowBetween, { children: [_jsxs(RowFixed, { children: [_jsx(TYPE.black, Object.assign({ fontWeight: 400, fontSize: 14, color: theme.text2 }, { children: "Use minimum approval" })), _jsx(QuestionHelper, { text: "Ensures that each individual trade requires approving the router for the transfer." })] }), _jsx(Toggle, { isActive: minApprove, toggle: () => (minApprove ? setMinApprove(false) : setMinApprove(true)) })] }), _jsxs(RowBetween, { children: [_jsxs(RowFixed, { children: [_jsx(TYPE.black, Object.assign({ fontWeight: 400, fontSize: 14, color: theme.text2 }, { children: "Disable smart routing" })), _jsx(QuestionHelper, { text: "Disable using advanced routing techniques to optimize your trade execution price." })] }), _jsx(Toggle, { isActive: disableSmartRouting, toggle: () => setDisableSmartRouting(!disableSmartRouting) })] }), _jsxs(RowBetween, { children: [_jsxs(RowFixed, { children: [_jsx(TYPE.black, Object.assign({ fontWeight: 400, fontSize: 14, color: theme.text2 }, { children: "Allow Moola withdrawal" })), _jsx(QuestionHelper, { text: "Enables withdrawing collateral from Moola. This can cause you to get liquidated-- be careful!" })] }), _jsx(Toggle, { isActive: allowMoolaWithdrawal, toggle: () => setAllowMoolaWithdrawal(!allowMoolaWithdrawal) })] })] })) }))] })));
}
