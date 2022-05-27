"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const use_contractkit_1 = require("@celo-tools/use-contractkit");
const polished_1 = require("polished");
const styled_components_1 = __importDefault(require("styled-components"));
const hooks_1 = require("../../state/wallet/hooks");
const NumericalInput_1 = require("../NumericalInput");
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
const StyledControlButton = styled_components_1.default.button `
  height: 28px;
  background-color: ${({ theme }) => theme.primary5};
  border: 1px solid ${({ theme }) => theme.primary5};
  border-radius: 0.5rem;
  font-size: 0.875rem;

  font-weight: 500;
  cursor: pointer;
  margin-left: 0.3rem;
  margin-right: 0.2rem;
  color: ${({ theme }) => theme.primaryText1};
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
const AmountWrapper = styled_components_1.default.div `
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
`;
const AmountDescriptionWrapper = styled_components_1.default.div `
  display: flex;
  justify-content: space-between;
  width: unset;
  cursor: pointer;
  font-weight: 500;
  font-size: 14px;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.text2};
  ${({ theme }) => theme.mediaWidth.upToExtraSmall `
    width: 100%;
`};
`;
const ButtonGroup = styled_components_1.default.div ``;
function StakeInputField({ value, onUserInput, onMax, currency, hideBalance = false, hideInput = false, id, stakeBalance, walletBalance, }) {
    const { address: account } = (0, use_contractkit_1.useContractKit)();
    const userBalance = (0, hooks_1.useCurrencyBalance)(account !== null && account !== void 0 ? account : undefined, currency !== null && currency !== void 0 ? currency : undefined);
    const selectedCurrencyBalance = walletBalance !== null && walletBalance !== void 0 ? walletBalance : userBalance;
    return ((0, jsx_runtime_1.jsx)(InputPanel, Object.assign({ id: id }, { children: (0, jsx_runtime_1.jsxs)(Container, Object.assign({ hideInput: hideInput }, { children: [!hideInput && ((0, jsx_runtime_1.jsx)(LabelRow, { children: (0, jsx_runtime_1.jsx)(AmountWrapper, { children: account && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)(AmountDescriptionWrapper, { children: [(0, jsx_runtime_1.jsx)("span", { children: "Current Stake:\u00A0" }, void 0), (0, jsx_runtime_1.jsx)("span", { children: stakeBalance ? stakeBalance.toFixed(2, { groupSeparator: ',' }) : '--' }, void 0)] }, void 0), (0, jsx_runtime_1.jsxs)(AmountDescriptionWrapper, { children: [(0, jsx_runtime_1.jsx)("span", { children: "Wallet Balance:\u00A0 " }, void 0), (0, jsx_runtime_1.jsx)("span", { children: !hideBalance && !!currency && selectedCurrencyBalance
                                                ? selectedCurrencyBalance === null || selectedCurrencyBalance === void 0 ? void 0 : selectedCurrencyBalance.toSignificant(4)
                                                : '--' }, void 0)] }, void 0)] }, void 0)) }, void 0) }, void 0)), (0, jsx_runtime_1.jsx)(InputRow, Object.assign({ style: { marginTop: '-0.5rem' }, selected: true }, { children: !hideInput && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(NumericalInput_1.Input, { className: "token-amount-input", value: value, onUserInput: (val) => {
                                    onUserInput(val);
                                } }, void 0), (0, jsx_runtime_1.jsx)(ButtonGroup, { children: (0, jsx_runtime_1.jsx)(StyledControlButton, Object.assign({ onClick: onMax }, { children: "MAX" }), void 0) }, void 0)] }, void 0)) }), void 0)] }), void 0) }), void 0));
}
exports.default = StakeInputField;
