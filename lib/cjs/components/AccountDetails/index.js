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
const use_contractkit_1 = require("@celo-tools/use-contractkit");
const react_1 = require("react");
const react_feather_1 = require("react-feather");
const react_i18next_1 = require("react-i18next");
const react_redux_1 = require("react-redux");
const hooks_1 = require("state/application/hooks");
const styled_components_1 = __importStar(require("styled-components"));
const x_svg_1 = require("../../assets/images/x.svg");
const actions_1 = require("../../state/transactions/actions");
const theme_1 = require("../../theme");
const utils_1 = require("../../utils");
const Button_1 = require("../Button");
const Identicon_1 = __importDefault(require("../Identicon"));
const Row_1 = require("../Row");
const Copy_1 = __importDefault(require("./Copy"));
const Transaction_1 = __importDefault(require("./Transaction"));
const HeaderRow = styled_components_1.default.div `
  ${({ theme }) => theme.flexRowNoWrap};
  padding: 1rem 1rem;
  font-weight: 500;
  color: ${(props) => (props.color === 'blue' ? ({ theme }) => theme.primary1 : 'inherit')};
  ${({ theme }) => theme.mediaWidth.upToMedium `
    padding: 1rem;
  `};
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
const InfoCard = styled_components_1.default.div `
  padding: 1rem;
  border: 1px solid ${({ theme }) => theme.bg3};
  border-radius: 20px;
  position: relative;
  display: grid;
  grid-row-gap: 12px;
  margin-bottom: 20px;
`;
const AccountGroupingRow = styled_components_1.default.div `
  ${({ theme }) => theme.flexRowNoWrap};
  justify-content: space-between;
  align-items: center;
  font-weight: 400;
  color: ${({ theme }) => theme.text1};

  div {
    ${({ theme }) => theme.flexRowNoWrap}
    align-items: center;
  }
`;
const AccountSection = styled_components_1.default.div `
  background-color: ${({ theme }) => theme.bg1};
  padding: 0rem 1rem;
  ${({ theme }) => theme.mediaWidth.upToMedium `padding: 0rem 1rem 1.5rem 1rem;`};
`;
const YourAccount = styled_components_1.default.div `
  h5 {
    margin: 0 0 1rem 0;
    font-weight: 400;
  }

  h4 {
    margin: 0;
    font-weight: 500;
  }
`;
const LowerSection = styled_components_1.default.div `
  ${({ theme }) => theme.flexColumnNoWrap}
  padding: 1.5rem;
  flex-grow: 1;
  overflow: auto;
  background-color: ${({ theme }) => theme.bg2};
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;

  h5 {
    margin: 0;
    font-weight: 400;
    color: ${({ theme }) => theme.text3};
  }
`;
const AccountControl = styled_components_1.default.div `
  display: flex;
  justify-content: space-between;
  min-width: 0;
  width: 100%;

  font-weight: 500;
  font-size: 1.25rem;

  a:hover {
    text-decoration: underline;
  }

  p {
    min-width: 0;
    margin: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;
const AddressLink = (0, styled_components_1.default)(theme_1.ExternalLink) `
  font-size: 0.825rem;
  color: ${({ theme }) => theme.text3};
  margin-left: 1rem;
  font-size: 0.825rem;
  display: flex;
  :hover {
    color: ${({ theme }) => theme.text2};
  }
`;
const CloseIcon = styled_components_1.default.div `
  position: absolute;
  right: 1rem;
  top: 14px;
  &:hover {
    cursor: pointer;
    opacity: 0.6;
  }
`;
const CloseColor = (0, styled_components_1.default)(x_svg_1.ReactComponent) `
  path {
    stroke: ${({ theme }) => theme.text4};
  }
`;
const WalletName = styled_components_1.default.div `
  width: initial;
  font-size: 0.825rem;
  font-weight: 500;
  color: ${({ theme }) => theme.text3};
`;
const IconWrapper = styled_components_1.default.div `
  ${({ theme }) => theme.flexColumnNoWrap};
  align-items: center;
  justify-content: center;
  margin-right: 8px;
  & > img,
  span {
    height: ${({ size }) => (size ? size + 'px' : '32px')};
    width: ${({ size }) => (size ? size + 'px' : '32px')};
  }
  ${({ theme }) => theme.mediaWidth.upToMedium `
    align-items: flex-end;
  `};
`;
const TransactionListWrapper = styled_components_1.default.div `
  ${({ theme }) => theme.flexColumnNoWrap};
`;
const WalletAction = (0, styled_components_1.default)(Button_1.ButtonSecondary) `
  width: fit-content;
  font-weight: 400;
  margin-left: 8px;
  font-size: 0.825rem;
  padding: 4px 6px;
  :hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;
function renderTransactions(transactions) {
    return ((0, jsx_runtime_1.jsx)(TransactionListWrapper, { children: transactions.map((hash, i) => {
            return (0, jsx_runtime_1.jsx)(Transaction_1.default, { hash: hash }, i);
        }) }, void 0));
}
function AccountDetails({ toggleWalletModal, pendingTransactions, confirmedTransactions, ENSName, }) {
    const { connect, destroy, address, walletType, network } = (0, use_contractkit_1.useContractKit)();
    const chainId = network.chainId;
    const closeModals = (0, hooks_1.useCloseModals)();
    const theme = (0, react_1.useContext)(styled_components_1.ThemeContext);
    const dispatch = (0, react_redux_1.useDispatch)();
    const { t } = (0, react_i18next_1.useTranslation)();
    function formatConnectorName() {
        if (walletType === use_contractkit_1.WalletTypes.Unauthenticated) {
            return null;
        }
        // TODO(igm): should be valora??
        // const name = walletType === WalletTypes.? SupportedProviders.Valora : SupportedProviders[walletType]
        return ((0, jsx_runtime_1.jsxs)(WalletName, { children: [t('ConnectedWith'), " ", walletType] }, void 0));
    }
    function getStatusIcon() {
        if (walletType === use_contractkit_1.WalletTypes.MetaMask) {
            return ((0, jsx_runtime_1.jsx)(IconWrapper, Object.assign({ size: 16 }, { children: (0, jsx_runtime_1.jsx)(Identicon_1.default, {}, void 0) }), void 0));
        }
        return null;
    }
    const clearAllTransactionsCallback = (0, react_1.useCallback)(() => {
        if (chainId)
            dispatch((0, actions_1.clearAllTransactions)({ chainId }));
    }, [dispatch, chainId]);
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)(UpperSection, { children: [(0, jsx_runtime_1.jsx)(CloseIcon, Object.assign({ onClick: toggleWalletModal }, { children: (0, jsx_runtime_1.jsx)(CloseColor, {}, void 0) }), void 0), (0, jsx_runtime_1.jsx)(HeaderRow, { children: "Account" }, void 0), (0, jsx_runtime_1.jsx)(AccountSection, { children: (0, jsx_runtime_1.jsx)(YourAccount, { children: (0, jsx_runtime_1.jsxs)(InfoCard, { children: [(0, jsx_runtime_1.jsxs)(AccountGroupingRow, { children: [formatConnectorName(), (0, jsx_runtime_1.jsxs)("div", { children: [address && ((0, jsx_runtime_1.jsx)(WalletAction, Object.assign({ style: { fontSize: '.825rem', fontWeight: 400, marginRight: '8px' }, onClick: destroy }, { children: t('Disconnect') }), void 0)), (0, jsx_runtime_1.jsx)(WalletAction, Object.assign({ style: { fontSize: '.825rem', fontWeight: 400 }, onClick: () => {
                                                            closeModals();
                                                            connect();
                                                        } }, { children: t('Change') }), void 0)] }, void 0)] }, void 0), (0, jsx_runtime_1.jsx)(AccountGroupingRow, Object.assign({ id: "web3-account-identifier-row" }, { children: (0, jsx_runtime_1.jsx)(AccountControl, { children: (0, jsx_runtime_1.jsxs)("div", { children: [getStatusIcon(), ENSName ? (0, jsx_runtime_1.jsxs)("p", { children: [" ", ENSName] }, void 0) : (0, jsx_runtime_1.jsxs)("p", { children: [" ", address && (0, utils_1.shortenAddress)(address)] }, void 0)] }, void 0) }, void 0) }), void 0), (0, jsx_runtime_1.jsx)(AccountGroupingRow, { children: ENSName ? ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(AccountControl, { children: (0, jsx_runtime_1.jsxs)("div", { children: [address && ((0, jsx_runtime_1.jsx)(Copy_1.default, Object.assign({ toCopy: address }, { children: (0, jsx_runtime_1.jsx)("span", Object.assign({ style: { marginLeft: '4px' } }, { children: t('CopyAddress') }), void 0) }), void 0)), chainId && address && ((0, jsx_runtime_1.jsxs)(AddressLink, Object.assign({ hasENS: !!ENSName, isENS: true, href: `${network.explorer}/address/${address}` }, { children: [(0, jsx_runtime_1.jsx)(react_feather_1.ExternalLink, { size: 16 }, void 0), (0, jsx_runtime_1.jsx)("span", Object.assign({ style: { marginLeft: '4px' } }, { children: t('ViewOnCeloExplorer') }), void 0)] }), void 0))] }, void 0) }, void 0) }, void 0)) : ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(AccountControl, { children: (0, jsx_runtime_1.jsxs)("div", { children: [address && ((0, jsx_runtime_1.jsx)(Copy_1.default, Object.assign({ toCopy: address }, { children: (0, jsx_runtime_1.jsx)("span", Object.assign({ style: { marginLeft: '4px' } }, { children: t('CopyAddress') }), void 0) }), void 0)), chainId && address && ((0, jsx_runtime_1.jsxs)(AddressLink, Object.assign({ hasENS: !!ENSName, isENS: false, href: `${network.explorer}/address/${address}` }, { children: [(0, jsx_runtime_1.jsx)(react_feather_1.ExternalLink, { size: 16 }, void 0), (0, jsx_runtime_1.jsx)("span", Object.assign({ style: { marginLeft: '4px' } }, { children: t('ViewOnCeloExplorer') }), void 0)] }), void 0))] }, void 0) }, void 0) }, void 0)) }, void 0)] }, void 0) }, void 0) }, void 0)] }, void 0), !!pendingTransactions.length || !!confirmedTransactions.length ? ((0, jsx_runtime_1.jsxs)(LowerSection, { children: [(0, jsx_runtime_1.jsxs)(Row_1.AutoRow, Object.assign({ mb: '1rem', style: { justifyContent: 'space-between' } }, { children: [(0, jsx_runtime_1.jsx)(theme_1.TYPE.body, { children: t('RecentTransactions') }, void 0), (0, jsx_runtime_1.jsxs)(theme_1.LinkStyledButton, Object.assign({ onClick: clearAllTransactionsCallback }, { children: ["(", t('ClearAll'), ")"] }), void 0)] }), void 0), renderTransactions(pendingTransactions), renderTransactions(confirmedTransactions)] }, void 0)) : ((0, jsx_runtime_1.jsx)(LowerSection, { children: (0, jsx_runtime_1.jsx)(theme_1.TYPE.body, Object.assign({ color: theme.text1 }, { children: t('YourTransactionsWillAppearHere') }), void 0) }, void 0))] }, void 0));
}
exports.default = AccountDetails;
