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
const Sentry = __importStar(require("@sentry/react"));
const useAccountSummary_1 = __importDefault(require("hooks/useAccountSummary"));
const polished_1 = require("polished");
const react_1 = require("react");
const react_feather_1 = require("react-feather");
const react_i18next_1 = require("react-i18next");
const styled_components_1 = __importStar(require("styled-components"));
const web3_utils_1 = require("web3-utils");
const connectors_1 = require("../../connectors");
const hooks_1 = require("../../state/application/hooks");
const hooks_2 = require("../../state/transactions/hooks");
const utils_1 = require("../../utils");
const Button_1 = require("../Button");
const Identicon_1 = __importDefault(require("../Identicon"));
const Loader_1 = __importDefault(require("../Loader"));
const Row_1 = require("../Row");
const WalletModal_1 = __importDefault(require("../WalletModal"));
const Web3StatusGeneric = (0, styled_components_1.default)(Button_1.ButtonSecondary) `
  ${({ theme }) => theme.flexRowNoWrap}
  width: 100%;
  align-items: center;
  padding: 0.5rem;
  border-radius: 12px;
  cursor: pointer;
  user-select: none;
  :focus {
    outline: none;
  }
`;
const Web3StatusError = (0, styled_components_1.default)(Web3StatusGeneric) `
  background-color: ${({ theme }) => theme.red1};
  border: 1px solid ${({ theme }) => theme.red1};
  color: ${({ theme }) => theme.white};
  font-weight: 500;
  :hover,
  :focus {
    background-color: ${({ theme }) => (0, polished_1.darken)(0.1, theme.red1)};
  }
`;
const Web3StatusConnect = (0, styled_components_1.default)(Web3StatusGeneric) `
  background-color: ${({ theme }) => theme.primary4};
  border: none;
  color: ${({ theme }) => theme.primaryText1};
  font-weight: 500;

  :hover,
  :focus {
    border: 1px solid ${({ theme }) => (0, polished_1.darken)(0.05, theme.primary4)};
    color: ${({ theme }) => theme.primaryText1};
  }

  ${({ faded }) => faded &&
    (0, styled_components_1.css) `
      background-color: ${({ theme }) => theme.primary5};
      border: 1px solid ${({ theme }) => theme.primary5};
      color: ${({ theme }) => theme.primaryText1};

      :hover,
      :focus {
        border: 1px solid ${({ theme }) => (0, polished_1.darken)(0.05, theme.primary4)};
        color: ${({ theme }) => (0, polished_1.darken)(0.05, theme.primaryText1)};
      }
    `}
`;
const Web3StatusConnected = (0, styled_components_1.default)(Web3StatusGeneric) `
  background-color: ${({ pending, theme }) => (pending ? theme.primary1 : theme.bg2)};
  border: 1px solid ${({ pending, theme }) => (pending ? theme.primary1 : theme.bg3)};
  color: ${({ pending, theme }) => (pending ? theme.white : theme.text1)};
  font-weight: 500;
  :hover,
  :focus {
    background-color: ${({ pending, theme }) => (pending ? (0, polished_1.darken)(0.05, theme.primary1) : (0, polished_1.lighten)(0.05, theme.bg2))};

    :focus {
      border: 1px solid ${({ pending, theme }) => (pending ? (0, polished_1.darken)(0.1, theme.primary1) : (0, polished_1.darken)(0.1, theme.bg3))};
    }
  }
`;
const Text = styled_components_1.default.p `
  flex: 1 1 auto;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 0 0.5rem 0 0.25rem;
  font-size: 1rem;
  width: fit-content;
  font-weight: 500;
`;
const NetworkIcon = (0, styled_components_1.default)(react_feather_1.Activity) `
  margin-left: 0.25rem;
  margin-right: 0.5rem;
  width: 16px;
  height: 16px;
`;
// we want the latest one to come first, so return negative if a is after b
function newTransactionsFirst(a, b) {
    return b.addedTime - a.addedTime;
}
const StatusIcon = () => {
    const { walletType } = (0, use_contractkit_1.useContractKit)();
    if (walletType === use_contractkit_1.WalletTypes.MetaMask ||
        walletType === use_contractkit_1.WalletTypes.CeloExtensionWallet ||
        walletType === use_contractkit_1.WalletTypes.Injected) {
        return (0, jsx_runtime_1.jsx)(Identicon_1.default, {}, void 0);
    }
    return null;
};
function Web3StatusInner() {
    const { t } = (0, react_i18next_1.useTranslation)();
    const { connect, address, account } = (0, use_contractkit_1.useContractKit)();
    const { nom } = (0, useAccountSummary_1.default)(address);
    const error = null;
    const allTransactions = (0, hooks_2.useAllTransactions)();
    const sortedRecentTransactions = (0, react_1.useMemo)(() => {
        const txs = Object.values(allTransactions);
        return txs.filter(hooks_2.isTransactionRecent).sort(newTransactionsFirst);
    }, [allTransactions]);
    const pending = sortedRecentTransactions.filter((tx) => !tx.receipt).map((tx) => tx.hash);
    const hasPendingTransactions = !!pending.length;
    const toggleWalletModal = (0, hooks_1.useWalletModalToggle)();
    let accountName;
    if (nom) {
        accountName = nom;
    }
    else if (account && !(0, web3_utils_1.isAddress)(account)) {
        // Phone numbers show up under `account`, so we need to check if it is an address
        accountName = account;
    }
    else if (address) {
        accountName = (0, utils_1.shortenAddress)(address);
    }
    if (accountName) {
        return ((0, jsx_runtime_1.jsxs)(Web3StatusConnected, Object.assign({ id: "web3-status-connected", onClick: toggleWalletModal, pending: hasPendingTransactions }, { children: [hasPendingTransactions ? ((0, jsx_runtime_1.jsxs)(Row_1.RowBetween, { children: [(0, jsx_runtime_1.jsxs)(Text, { children: [pending === null || pending === void 0 ? void 0 : pending.length, " ", t('pending')] }, void 0), ' ', (0, jsx_runtime_1.jsx)(Loader_1.default, { stroke: "white" }, void 0)] }, void 0)) : ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(Text, { children: accountName }, void 0) }, void 0)), !hasPendingTransactions && (0, jsx_runtime_1.jsx)(StatusIcon, {}, void 0)] }), void 0));
    }
    else if (error) {
        return ((0, jsx_runtime_1.jsxs)(Web3StatusError, Object.assign({ onClick: () => connect().catch(console.warn) }, { children: [(0, jsx_runtime_1.jsx)(NetworkIcon, {}, void 0), (0, jsx_runtime_1.jsx)(Text, { children: error === 'unsupported' ? 'Wrong Network' : 'Error' }, void 0)] }), void 0));
    }
    else {
        return ((0, jsx_runtime_1.jsx)(Web3StatusConnect, Object.assign({ id: "connect-wallet", onClick: () => connect().catch(console.warn), faded: !address }, { children: (0, jsx_runtime_1.jsx)(Text, { children: t('ConnectToAWallet') }, void 0) }), void 0));
    }
}
function Web3Status() {
    var _a;
    const { address: account, walletType } = (0, use_contractkit_1.useContractKit)();
    const allTransactions = (0, hooks_2.useAllTransactions)();
    const sortedRecentTransactions = (0, react_1.useMemo)(() => {
        const txs = Object.values(allTransactions);
        return txs.filter(hooks_2.isTransactionRecent).sort(newTransactionsFirst);
    }, [allTransactions]);
    const pending = sortedRecentTransactions.filter((tx) => !tx.receipt).map((tx) => tx.hash);
    const confirmed = sortedRecentTransactions.filter((tx) => tx.receipt).map((tx) => tx.hash);
    const { summary, nom } = (0, useAccountSummary_1.default)(account !== null && account !== void 0 ? account : undefined);
    (0, react_1.useEffect)(() => {
        Sentry.setUser({ id: account !== null && account !== void 0 ? account : undefined });
        Sentry.setTag('connector', walletType);
        Sentry.setTag('network', connectors_1.NETWORK_CHAIN_NAME);
    }, [walletType, account]);
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(Web3StatusInner, {}, void 0), (0, jsx_runtime_1.jsx)(WalletModal_1.default, { ENSName: (_a = nom !== null && nom !== void 0 ? nom : summary === null || summary === void 0 ? void 0 : summary.name) !== null && _a !== void 0 ? _a : undefined, pendingTransactions: pending, confirmedTransactions: confirmed }, void 0)] }, void 0));
}
exports.default = Web3Status;
