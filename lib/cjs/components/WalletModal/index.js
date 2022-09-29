"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const use_contractkit_1 = require("@celo-tools/use-contractkit");
const react_1 = require("react");
const react_device_detect_1 = require("react-device-detect");
const react_i18next_1 = require("react-i18next");
const styled_components_1 = __importDefault(require("styled-components"));
const Close_1 = __importDefault(require("../../assets/svgs/Close"));
const actions_1 = require("../../state/application/actions");
const hooks_1 = require("../../state/application/hooks");
const theme_1 = require("../../theme");
const AccountDetails_1 = __importDefault(require("../AccountDetails"));
const Modal_1 = __importDefault(require("../Modal"));
const CeloConnector_1 = require("./CeloConnector");
const CloseIcon = styled_components_1.default.div `
  position: absolute;
  right: 1rem;
  top: 14px;
  &:hover {
    cursor: pointer;
    opacity: 0.6;
  }
`;
const CloseColor = (0, styled_components_1.default)(Close_1.default) `
  path {
    stroke: ${({ theme }) => theme.text4};
  }
`;
const Wrapper = styled_components_1.default.div `
  ${({ theme }) => theme.flexColumnNoWrap}
  margin: 0;
  padding: 0;
  width: 100%;
`;
const HeaderRow = styled_components_1.default.div `
  ${({ theme }) => theme.flexRowNoWrap};
  padding: 1rem 1rem;
  font-weight: 500;
  color: ${(props) => (props.color === 'blue' ? ({ theme }) => theme.primary1 : 'inherit')};
  ${({ theme }) => theme.mediaWidth.upToMedium `
    padding: 1rem;
  `};
`;
const ContentWrapper = styled_components_1.default.div `
  background-color: ${({ theme }) => theme.bg2};
  padding: 2rem;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;

  ${({ theme }) => theme.mediaWidth.upToMedium `padding: 1rem`};
`;
const UpperSection = styled_components_1.default.div `
  position: relative;

  h5 {
    margin: 0;
    margin-bottom: 0.5rem;
    font-size: 1rem;
    font-weight: 400;
  }

  h5:last-child {
    margin-bottom: 0px;
  }

  h4 {
    margin-top: 0;
    font-weight: 500;
  }
`;
const Blurb = styled_components_1.default.div `
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 2rem;
  ${({ theme }) => theme.mediaWidth.upToMedium `
    margin: 1rem;
    font-size: 12px;
  `};
`;
const HoverText = styled_components_1.default.div `
  :hover {
    cursor: pointer;
  }
`;
const WALLET_VIEWS = {
    OPTIONS_SECONDARY: 'options_secondary',
    ACCOUNT: 'account',
};
function WalletModal({ pendingTransactions, confirmedTransactions, ENSName, }) {
    const { address } = (0, use_contractkit_1.useContractKit)();
    // TODO(igm): get the errors
    const error = null;
    const [walletView, setWalletView] = (0, react_1.useState)(WALLET_VIEWS.ACCOUNT);
    const walletModalOpen = (0, hooks_1.useModalOpen)(actions_1.ApplicationModal.WALLET);
    const closeModals = (0, hooks_1.useCloseModals)();
    const { t } = (0, react_i18next_1.useTranslation)();
    // always reset to account view
    (0, react_1.useEffect)(() => {
        if (walletModalOpen) {
            setWalletView(WALLET_VIEWS.ACCOUNT);
        }
    }, [walletModalOpen]);
    function getModalContent() {
        if (error) {
            return ((0, jsx_runtime_1.jsxs)(UpperSection, { children: [(0, jsx_runtime_1.jsx)(CloseIcon, Object.assign({ onClick: closeModals }, { children: (0, jsx_runtime_1.jsx)(CloseColor, {}) })), (0, jsx_runtime_1.jsx)(HeaderRow, { children: error === 'unsupported-chain-id' ? 'Wrong Network' : 'Error connecting' }), (0, jsx_runtime_1.jsx)(ContentWrapper, { children: error === 'unsupported-chain-id' ? ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h5", { children: t('PleaseConnectToTheAppropriateCeloNetwork') }), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)(CeloConnector_1.CeloConnector, {})] })) : ('Error connecting. Try refreshing the page.') })] }));
        }
        if (address && walletView === WALLET_VIEWS.ACCOUNT) {
            return ((0, jsx_runtime_1.jsx)(AccountDetails_1.default, { toggleWalletModal: closeModals, pendingTransactions: pendingTransactions, confirmedTransactions: confirmedTransactions, ENSName: ENSName }));
        }
        return ((0, jsx_runtime_1.jsxs)(UpperSection, { children: [(0, jsx_runtime_1.jsx)(CloseIcon, Object.assign({ onClick: closeModals }, { children: (0, jsx_runtime_1.jsx)(CloseColor, {}) })), walletView !== WALLET_VIEWS.ACCOUNT ? ((0, jsx_runtime_1.jsx)(HeaderRow, Object.assign({ color: "blue" }, { children: (0, jsx_runtime_1.jsx)(HoverText, Object.assign({ onClick: () => {
                            setWalletView(WALLET_VIEWS.ACCOUNT);
                        } }, { children: t('Back') })) }))) : ((0, jsx_runtime_1.jsx)(HeaderRow, { children: (0, jsx_runtime_1.jsx)(HoverText, { children: t('ConnectToAWallet') }) })), (0, jsx_runtime_1.jsxs)(ContentWrapper, { children: [!react_device_detect_1.isMobile && ((0, jsx_runtime_1.jsx)(Blurb, { children: (0, jsx_runtime_1.jsx)(theme_1.ExternalLink, Object.assign({ href: "https://docs.ubeswap.org/wallet-support/wallets" }, { children: t('LearnMoreAboutCeloWallets') })) })), react_device_detect_1.isMobile && ((0, jsx_runtime_1.jsxs)(Blurb, { children: [(0, jsx_runtime_1.jsxs)("span", { children: [t('NewToCelo'), " \u00A0"] }), (0, jsx_runtime_1.jsx)(theme_1.ExternalLink, Object.assign({ href: "https://docs.ubeswap.org/wallet-support/wallets" }, { children: t('LearnMoreAboutWallets') }))] }))] })] }));
    }
    return ((0, jsx_runtime_1.jsx)(Modal_1.default, Object.assign({ isOpen: walletModalOpen, onDismiss: closeModals, minHeight: false, maxHeight: 90 }, { children: (0, jsx_runtime_1.jsx)(Wrapper, { children: getModalContent() }) })));
}
exports.default = WalletModal;
