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
const jsx_runtime_1 = require("react/jsx-runtime");
const use_contractkit_1 = require("@celo-tools/use-contractkit");
const react_1 = require("react");
const react_i18next_1 = require("react-i18next");
const react_redux_1 = require("react-redux");
const styled_components_1 = __importStar(require("styled-components"));
const useENS_1 = __importDefault(require("../../hooks/useENS"));
const theme_1 = require("../../theme");
const Column_1 = require("../Column");
const Row_1 = require("../Row");
const InputPanel = styled_components_1.default.div `
  ${({ theme }) => theme.flexColumnNoWrap}
  position: relative;
  border-radius: 1.25rem;
  background-color: ${({ theme }) => theme.bg1};
  z-index: 1;
  width: 100%;
`;
const ContainerRow = styled_components_1.default.div `
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 1.25rem;
  border: 1px solid ${({ error, theme }) => (error ? theme.red1 : theme.bg2)};
  transition: border-color 300ms ${({ error }) => (error ? 'step-end' : 'step-start')},
    color 500ms ${({ error }) => (error ? 'step-end' : 'step-start')};
  background-color: ${({ theme }) => theme.bg1};
`;
const InputContainer = styled_components_1.default.div `
  flex: 1;
  padding: 1rem;
`;
const Input = styled_components_1.default.input `
  font-size: 1.25rem;
  outline: none;
  border: none;
  flex: 1 1 auto;
  width: 0;
  background-color: ${({ theme }) => theme.bg1};
  transition: color 300ms ${({ error }) => (error ? 'step-end' : 'step-start')};
  color: ${({ error, theme }) => (error ? theme.red1 : theme.primary1)};
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 500;
  width: 100%;
  ::placeholder {
    color: ${({ theme }) => theme.text4};
  }
  padding: 0px;
  -webkit-appearance: textfield;

  ::-webkit-search-decoration {
    -webkit-appearance: none;
  }

  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  ::placeholder {
    color: ${({ theme }) => theme.text4};
  }
`;
function AddressInputPanel({ id, value, onChange, }) {
    const { network } = (0, use_contractkit_1.useContractKit)();
    const accountInfo = (0, react_redux_1.useSelector)((state) => state.swap.accountInfo);
    const chainId = (accountInfo ? accountInfo.chainId : network.chainId);
    const explorerUrl = accountInfo ? accountInfo.explorerUrl : network.explorer;
    const theme = (0, react_1.useContext)(styled_components_1.ThemeContext);
    const { address, loading } = (0, useENS_1.default)(value);
    const handleInput = (0, react_1.useCallback)((event) => {
        const input = event.target.value;
        const withoutSpaces = input.replace(/\s+/g, '');
        onChange(withoutSpaces);
    }, [onChange]);
    const { t } = (0, react_i18next_1.useTranslation)();
    const error = Boolean(value.length > 0 && !loading && !address);
    return ((0, jsx_runtime_1.jsx)(InputPanel, Object.assign({ id: id }, { children: (0, jsx_runtime_1.jsx)(ContainerRow, Object.assign({ error: error }, { children: (0, jsx_runtime_1.jsx)(InputContainer, { children: (0, jsx_runtime_1.jsxs)(Column_1.AutoColumn, Object.assign({ gap: "md" }, { children: [(0, jsx_runtime_1.jsxs)(Row_1.RowBetween, { children: [(0, jsx_runtime_1.jsx)(theme_1.TYPE.black, Object.assign({ color: theme.text2, fontWeight: 500, fontSize: 14 }, { children: "Recipient" })), address && chainId && ((0, jsx_runtime_1.jsxs)(theme_1.ExternalLink, Object.assign({ href: `${explorerUrl}/address/${address}`, style: { fontSize: '14px' } }, { children: ["(", t('ViewOnCeloExplorer'), ")"] })))] }), (0, jsx_runtime_1.jsx)(Input, { className: "recipient-address-input", type: "text", autoComplete: "off", autoCorrect: "off", autoCapitalize: "off", spellCheck: "false", placeholder: `${t('ViewOnCeloExplorer')}`, error: error, pattern: "^(0x[a-fA-F0-9]{40})$", onChange: handleInput, value: value })] })) }) })) })));
}
exports.default = AddressInputPanel;
