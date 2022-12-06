"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const use_contractkit_1 = require("@celo-tools/use-contractkit");
const polished_1 = require("polished");
const react_1 = require("react");
const react_i18next_1 = require("react-i18next");
const styled_components_1 = __importDefault(require("styled-components"));
const dropdown_1 = __importDefault(require("../../assets/svgs/dropdown"));
const useTheme_1 = __importDefault(require("../../hooks/useTheme"));
const hooks_1 = require("../../state/wallet/hooks");
const theme_1 = require("../../theme");
const CurrencyLogo_1 = __importDefault(require("../CurrencyLogo"));
const DoubleLogo_1 = __importDefault(require("../DoubleLogo"));
const NumericalInput_1 = require("../NumericalInput");
const Row_1 = require("../Row");
const CurrencySearchModal_1 = __importDefault(require("../SearchModal/CurrencySearchModal"));
const CurrencySelect_1 = require("./CurrencySelect");
const InputRow = styled_components_1.default.div `
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: center;
  padding: ${({ selected }) => (selected ? '0.75rem 0.5rem 0.75rem 1rem' : '0.75rem 0.75rem 0.75rem 1rem')};
`;
const LabelRow = styled_components_1.default.div `
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: center;
  color: ${({ theme }) => theme.text1};
  font-size: 0.75rem;
  line-height: 1rem;
  padding: 0.75rem 1rem 0 1rem;
  span:hover {
    cursor: pointer;
    color: ${({ theme }) => (0, polished_1.darken)(0.2, theme.text2)};
  }
`;
const Aligner = styled_components_1.default.span `
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const StyledDropDown = (0, styled_components_1.default)(dropdown_1.default) `
  margin: 0 0.25rem 0 0.5rem;
  height: 35%;

  path {
    stroke: ${({ selected, theme }) => (selected ? theme.text1 : theme.white)};
    stroke-width: 1.5px;
  }
`;
const InputPanel = styled_components_1.default.div `
  ${({ theme }) => theme.flexColumnNoWrap}
  position: relative;
  border-radius: ${({ hideInput }) => (hideInput ? '8px' : '20px')};
  background-color: ${({ theme }) => theme.bg2};
  z-index: 1;
`;
const Container = styled_components_1.default.div `
  border-radius: ${({ hideInput }) => (hideInput ? '8px' : '20px')};
  border: 1px solid ${({ theme }) => theme.bg2};
  background-color: ${({ theme }) => theme.bg1};
`;
const StyledTokenName = styled_components_1.default.span `
  ${({ active }) => (active ? '  margin: 0 0.25rem 0 0.75rem;' : '  margin: 0 0.25rem 0 0.25rem;')}
  font-size:  ${({ active }) => (active ? '20px' : '16px')};
`;
const StyledControlButton = styled_components_1.default.button `
  height: 28px;
  background-color: ${({ theme }) => (0, polished_1.lighten)(0.25, theme.primary1)};
  border: 1px solid ${({ theme }) => (0, polished_1.lighten)(0.25, theme.primary1)};
  border-radius: 0.5rem;
  font-size: 0.875rem;

  font-weight: 500;
  cursor: pointer;
  margin-left: 0.3rem;
  margin-right: 0.2rem;
  color: ${({ theme }) => (0, polished_1.lighten)(0.01, theme.primary1)};
  :hover {
    border: 1px solid ${({ theme }) => theme.primary1};
  }
  :focus {
    border: 1px solid ${({ theme }) => theme.primary1};
    outline: none;
  }

  ${({ theme }) => theme.mediaWidth.upToExtraSmall `
    margin-left: 0.4rem;
    margin-right: 0.1rem;
  `};
`;
const ButtonGroup = styled_components_1.default.div ``;
function CurrencyInputPanel({ value, onUserInput, onMax, onHalf, showMaxButton, showHalfButton, label = 'Input', onCurrencySelect, currency, disableCurrencySelect = false, hideBalance = false, pair = null, // used for double token logo
hideInput = false, otherCurrency, id, showCommonBases, customBalanceText, chainId, balanceOverride, disabled = false, defaultTokenLists, defaultTokenLogoURI, }) {
    const { t } = (0, react_i18next_1.useTranslation)();
    const [modalOpen, setModalOpen] = (0, react_1.useState)(false);
    const { address: account } = (0, use_contractkit_1.useContractKit)();
    const userBalance = (0, hooks_1.useCurrencyBalance)(account !== null && account !== void 0 ? account : undefined, currency !== null && currency !== void 0 ? currency : undefined);
    const selectedCurrencyBalance = balanceOverride !== null && balanceOverride !== void 0 ? balanceOverride : userBalance;
    const theme = (0, useTheme_1.default)();
    const handleDismissSearch = (0, react_1.useCallback)(() => {
        setModalOpen(false);
    }, [setModalOpen]);
    return ((0, jsx_runtime_1.jsxs)(InputPanel, Object.assign({ id: id }, { children: [(0, jsx_runtime_1.jsxs)(Container, Object.assign({ hideInput: hideInput }, { children: [!hideInput && ((0, jsx_runtime_1.jsx)(LabelRow, { children: (0, jsx_runtime_1.jsxs)(Row_1.RowBetween, { children: [(0, jsx_runtime_1.jsx)(CurrencySelect_1.CurrencySelect, Object.assign({ selected: !!currency, disableCurrencySelect: disableCurrencySelect, className: "open-currency-select-button", onClick: () => {
                                        if (!disableCurrencySelect) {
                                            setModalOpen(true);
                                        }
                                    } }, { children: (0, jsx_runtime_1.jsxs)(Aligner, { children: [pair ? ((0, jsx_runtime_1.jsx)(DoubleLogo_1.default, { currency0: pair.token0, currency1: pair.token1, size: 24, margin: true })) : currency ? ((0, jsx_runtime_1.jsx)(CurrencyLogo_1.default, { currency: currency, size: '24px', defaultTokenLogoURI: defaultTokenLogoURI })) : null, pair ? ((0, jsx_runtime_1.jsxs)(StyledTokenName, Object.assign({ className: "pair-name-container" }, { children: [pair === null || pair === void 0 ? void 0 : pair.token0.symbol, ":", pair === null || pair === void 0 ? void 0 : pair.token1.symbol] }))) : ((0, jsx_runtime_1.jsx)(StyledTokenName, Object.assign({ className: "token-symbol-container", active: Boolean(currency && currency.symbol) }, { children: (currency && currency.symbol && currency.symbol.length > 20
                                                    ? currency.symbol.slice(0, 4) +
                                                        '...' +
                                                        currency.symbol.slice(currency.symbol.length - 5, currency.symbol.length)
                                                    : currency === null || currency === void 0 ? void 0 : currency.symbol) || t('selectToken') }))), !disableCurrencySelect && (0, jsx_runtime_1.jsx)(StyledDropDown, { selected: !!currency })] }) })), account && ((0, jsx_runtime_1.jsx)(theme_1.TYPE.body, Object.assign({ onClick: onMax, color: theme.text2, fontWeight: 500, fontSize: 14, style: { display: 'inline', cursor: 'pointer' } }, { children: !hideBalance && !!currency && selectedCurrencyBalance
                                        ? (customBalanceText !== null && customBalanceText !== void 0 ? customBalanceText : 'Balance: ') + (selectedCurrencyBalance === null || selectedCurrencyBalance === void 0 ? void 0 : selectedCurrencyBalance.toSignificant(6))
                                        : ' -' })))] }) })), (0, jsx_runtime_1.jsx)(InputRow, Object.assign({ style: hideInput ? { padding: '0', borderRadius: '8px' } : {}, selected: disableCurrencySelect }, { children: !hideInput && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(NumericalInput_1.Input, { className: "token-amount-input", value: value, onUserInput: (val) => {
                                        onUserInput(val);
                                    }, disabled: disabled }), account && currency && label !== 'To' && ((0, jsx_runtime_1.jsxs)(ButtonGroup, { children: [showHalfButton && (0, jsx_runtime_1.jsx)(StyledControlButton, Object.assign({ onClick: onHalf }, { children: "50%" })), showMaxButton && (0, jsx_runtime_1.jsx)(StyledControlButton, Object.assign({ onClick: onMax }, { children: "MAX" }))] }))] })) }))] })), !disableCurrencySelect && onCurrencySelect && ((0, jsx_runtime_1.jsx)(CurrencySearchModal_1.default, { isOpen: modalOpen, onDismiss: handleDismissSearch, onCurrencySelect: onCurrencySelect, selectedCurrency: currency, otherSelectedCurrency: otherCurrency, showCommonBases: showCommonBases, chainId: chainId, defaultTokenLists: defaultTokenLists }))] })));
}
exports.default = CurrencyInputPanel;
