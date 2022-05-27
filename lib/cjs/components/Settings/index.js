"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_feather_1 = require("react-feather");
const react_i18next_1 = require("react-i18next");
const rebass_1 = require("rebass");
const hooks_1 = require("state/user/hooks");
const styled_components_1 = __importStar(require("styled-components"));
const useOnClickOutside_1 = require("../../hooks/useOnClickOutside");
const actions_1 = require("../../state/application/actions");
const hooks_2 = require("../../state/application/hooks");
const hooks_3 = require("../../state/user/hooks");
const theme_1 = require("../../theme");
const Button_1 = require("../Button");
const Column_1 = require("../Column");
const Modal_1 = __importDefault(require("../Modal"));
const QuestionHelper_1 = __importDefault(require("../QuestionHelper"));
const Row_1 = require("../Row");
const Toggle_1 = __importDefault(require("../Toggle"));
const TransactionSettings_1 = __importDefault(require("../TransactionSettings"));
const StyledMenuIcon = (0, styled_components_1.default)(react_feather_1.Settings) `
  height: 20px;
  width: 20px;

  > * {
    stroke: ${({ theme }) => theme.text2};
  }

  :hover {
    opacity: 0.7;
  }
`;
const StyledCloseIcon = (0, styled_components_1.default)(react_feather_1.X) `
  height: 20px;
  width: 20px;
  :hover {
    cursor: pointer;
  }

  > * {
    stroke: ${({ theme }) => theme.text1};
  }
`;
const StyledMenuButton = styled_components_1.default.button `
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
const EmojiWrapper = styled_components_1.default.div `
  position: absolute;
  bottom: -6px;
  right: 0px;
  font-size: 14px;
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
const Break = styled_components_1.default.div `
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.bg3};
`;
const ModalContentWrapper = styled_components_1.default.div `
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 0;
  background-color: ${({ theme }) => theme.bg2};
  border-radius: 20px;
`;
function SettingsTab() {
    const node = (0, react_1.useRef)();
    const open = (0, hooks_2.useModalOpen)(actions_1.ApplicationModal.SETTINGS);
    const toggle = (0, hooks_2.useToggleSettingsMenu)();
    const { t } = (0, react_i18next_1.useTranslation)();
    const theme = (0, react_1.useContext)(styled_components_1.ThemeContext);
    const [userSlippageTolerance, setUserslippageTolerance] = (0, hooks_3.useUserSlippageTolerance)();
    const [minApprove, setMinApprove] = (0, hooks_1.useUserMinApprove)();
    const [allowMoolaWithdrawal, setAllowMoolaWithdrawal] = (0, hooks_1.useUserAllowMoolaWithdrawal)();
    const [disableSmartRouting, setDisableSmartRouting] = (0, hooks_1.useUserDisableSmartRouting)();
    const [ttl, setTtl] = (0, hooks_3.useUserTransactionTTL)();
    const [expertMode, toggleExpertMode] = (0, hooks_3.useExpertModeManager)();
    const [singleHopOnly, setSingleHopOnly] = (0, hooks_3.useUserSingleHopOnly)();
    // show confirmation view before turning on
    const [showConfirmation, setShowConfirmation] = (0, react_1.useState)(false);
    (0, useOnClickOutside_1.useOnClickOutside)(node, open ? toggle : undefined);
    return (
    // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/30451
    (0, jsx_runtime_1.jsxs)(StyledMenu, Object.assign({ ref: node }, { children: [(0, jsx_runtime_1.jsx)(Modal_1.default, Object.assign({ isOpen: showConfirmation, onDismiss: () => setShowConfirmation(false), maxHeight: 100 }, { children: (0, jsx_runtime_1.jsx)(ModalContentWrapper, { children: (0, jsx_runtime_1.jsxs)(Column_1.AutoColumn, Object.assign({ gap: "lg" }, { children: [(0, jsx_runtime_1.jsxs)(Row_1.RowBetween, Object.assign({ style: { padding: '0 2rem' } }, { children: [(0, jsx_runtime_1.jsx)("div", {}, void 0), (0, jsx_runtime_1.jsx)(rebass_1.Text, Object.assign({ fontWeight: 500, fontSize: 20 }, { children: "Are you sure?" }), void 0), (0, jsx_runtime_1.jsx)(StyledCloseIcon, { onClick: () => setShowConfirmation(false) }, void 0)] }), void 0), (0, jsx_runtime_1.jsx)(Break, {}, void 0), (0, jsx_runtime_1.jsxs)(Column_1.AutoColumn, Object.assign({ gap: "lg", style: { padding: '0 2rem' } }, { children: [(0, jsx_runtime_1.jsx)(rebass_1.Text, Object.assign({ fontWeight: 500, fontSize: 20 }, { children: "Expert mode turns off the confirm transaction prompt and allows high slippage trades that often result in bad rates and lost funds." }), void 0), (0, jsx_runtime_1.jsx)(rebass_1.Text, Object.assign({ fontWeight: 600, fontSize: 20 }, { children: "ONLY USE THIS MODE IF YOU KNOW WHAT YOU ARE DOING." }), void 0), (0, jsx_runtime_1.jsx)(Button_1.ButtonError, Object.assign({ error: true, padding: '12px', onClick: () => {
                                            if (window.prompt(`Please type the word "confirm" to enable expert mode.`) === 'confirm') {
                                                toggleExpertMode();
                                                setShowConfirmation(false);
                                            }
                                        } }, { children: (0, jsx_runtime_1.jsx)(rebass_1.Text, Object.assign({ fontSize: 20, fontWeight: 500, id: "confirm-expert-mode" }, { children: "Turn On Expert Mode" }), void 0) }), void 0)] }), void 0)] }), void 0) }, void 0) }), void 0), (0, jsx_runtime_1.jsxs)(StyledMenuButton, Object.assign({ "aria-label": open ? t('settingsClose') : t('settingsOpen'), onClick: toggle, id: "open-settings-dialog-button" }, { children: [(0, jsx_runtime_1.jsx)(StyledMenuIcon, {}, void 0), expertMode ? ((0, jsx_runtime_1.jsx)(EmojiWrapper, { children: (0, jsx_runtime_1.jsx)("span", Object.assign({ role: "img", "aria-label": "wizard-icon" }, { children: "\uD83E\uDDD9" }), void 0) }, void 0)) : null] }), void 0), open && ((0, jsx_runtime_1.jsx)(MenuFlyout, { children: (0, jsx_runtime_1.jsxs)(Column_1.AutoColumn, Object.assign({ gap: "md", style: { padding: '1rem' } }, { children: [(0, jsx_runtime_1.jsx)(rebass_1.Text, Object.assign({ fontWeight: 600, fontSize: 14 }, { children: "Transaction Settings" }), void 0), (0, jsx_runtime_1.jsx)(TransactionSettings_1.default, { rawSlippage: userSlippageTolerance, setRawSlippage: setUserslippageTolerance, deadline: ttl, setDeadline: setTtl }, void 0), (0, jsx_runtime_1.jsx)(rebass_1.Text, Object.assign({ fontWeight: 600, fontSize: 14 }, { children: "Interface Settings" }), void 0), (0, jsx_runtime_1.jsxs)(Row_1.RowBetween, { children: [(0, jsx_runtime_1.jsxs)(Row_1.RowFixed, { children: [(0, jsx_runtime_1.jsx)(theme_1.TYPE.black, Object.assign({ fontWeight: 400, fontSize: 14, color: theme.text2 }, { children: "Toggle Expert Mode" }), void 0), (0, jsx_runtime_1.jsx)(QuestionHelper_1.default, { text: "Bypasses confirmation modals and allows high slippage trades. Use at your own risk." }, void 0)] }, void 0), (0, jsx_runtime_1.jsx)(Toggle_1.default, { id: "toggle-expert-mode-button", isActive: expertMode, toggle: expertMode
                                        ? () => {
                                            toggleExpertMode();
                                            setShowConfirmation(false);
                                        }
                                        : () => {
                                            toggle();
                                            setShowConfirmation(true);
                                        } }, void 0)] }, void 0), (0, jsx_runtime_1.jsxs)(Row_1.RowBetween, { children: [(0, jsx_runtime_1.jsxs)(Row_1.RowFixed, { children: [(0, jsx_runtime_1.jsx)(theme_1.TYPE.black, Object.assign({ fontWeight: 400, fontSize: 14, color: theme.text2 }, { children: "Disable Multihops" }), void 0), (0, jsx_runtime_1.jsx)(QuestionHelper_1.default, { text: "Restricts swaps to direct pairs only." }, void 0)] }, void 0), (0, jsx_runtime_1.jsx)(Toggle_1.default, { id: "toggle-disable-multihop-button", isActive: singleHopOnly, toggle: () => (singleHopOnly ? setSingleHopOnly(false) : setSingleHopOnly(true)) }, void 0)] }, void 0), (0, jsx_runtime_1.jsx)(rebass_1.Text, Object.assign({ fontWeight: 600, fontSize: 14 }, { children: "Routing Settings" }), void 0), (0, jsx_runtime_1.jsxs)(Row_1.RowBetween, { children: [(0, jsx_runtime_1.jsxs)(Row_1.RowFixed, { children: [(0, jsx_runtime_1.jsx)(theme_1.TYPE.black, Object.assign({ fontWeight: 400, fontSize: 14, color: theme.text2 }, { children: "Use minimum approval" }), void 0), (0, jsx_runtime_1.jsx)(QuestionHelper_1.default, { text: "Ensures that each individual trade requires approving the router for the transfer." }, void 0)] }, void 0), (0, jsx_runtime_1.jsx)(Toggle_1.default, { isActive: minApprove, toggle: () => (minApprove ? setMinApprove(false) : setMinApprove(true)) }, void 0)] }, void 0), (0, jsx_runtime_1.jsxs)(Row_1.RowBetween, { children: [(0, jsx_runtime_1.jsxs)(Row_1.RowFixed, { children: [(0, jsx_runtime_1.jsx)(theme_1.TYPE.black, Object.assign({ fontWeight: 400, fontSize: 14, color: theme.text2 }, { children: "Disable smart routing" }), void 0), (0, jsx_runtime_1.jsx)(QuestionHelper_1.default, { text: "Disable using advanced routing techniques to optimize your trade execution price." }, void 0)] }, void 0), (0, jsx_runtime_1.jsx)(Toggle_1.default, { isActive: disableSmartRouting, toggle: () => setDisableSmartRouting(!disableSmartRouting) }, void 0)] }, void 0), (0, jsx_runtime_1.jsxs)(Row_1.RowBetween, { children: [(0, jsx_runtime_1.jsxs)(Row_1.RowFixed, { children: [(0, jsx_runtime_1.jsx)(theme_1.TYPE.black, Object.assign({ fontWeight: 400, fontSize: 14, color: theme.text2 }, { children: "Allow Moola withdrawal" }), void 0), (0, jsx_runtime_1.jsx)(QuestionHelper_1.default, { text: "Enables withdrawing collateral from Moola. This can cause you to get liquidated-- be careful!" }, void 0)] }, void 0), (0, jsx_runtime_1.jsx)(Toggle_1.default, { isActive: allowMoolaWithdrawal, toggle: () => setAllowMoolaWithdrawal(!allowMoolaWithdrawal) }, void 0)] }, void 0)] }), void 0) }, void 0))] }), void 0));
}
exports.default = SettingsTab;
