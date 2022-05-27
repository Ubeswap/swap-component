import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useContractKit } from '@celo-tools/use-contractkit';
import { darken } from 'polished';
import styled from 'styled-components';
import { useCurrencyBalance } from '../../state/wallet/hooks';
import { Input as NumericalInput } from '../NumericalInput';
const InputRow = styled.div `
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: center;
  padding: ${({ selected }) => (selected ? '0.75rem 0.5rem 0.75rem 1rem' : '0.75rem 0.75rem 0.75rem 1rem')};
`;
const LabelRow = styled.div `
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: center;
  color: ${({ theme }) => theme.text1};
  font-size: 0.75rem;
  line-height: 1rem;
  padding: 0.75rem 1rem 0 1rem;
  span:hover {
    cursor: pointer;
    color: ${({ theme }) => darken(0.2, theme.text2)};
  }
`;
const InputPanel = styled.div `
  ${({ theme }) => theme.flexColumnNoWrap}
  position: relative;
  border-radius: ${({ hideInput }) => (hideInput ? '8px' : '20px')};
  background-color: ${({ theme }) => theme.bg2};
  z-index: 1;
`;
const Container = styled.div `
  border-radius: ${({ hideInput }) => (hideInput ? '8px' : '20px')};
  border: 1px solid ${({ theme }) => theme.bg2};
  background-color: ${({ theme }) => theme.bg1};
`;
const StyledControlButton = styled.button `
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
const AmountWrapper = styled.div `
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
`;
const AmountDescriptionWrapper = styled.div `
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
const ButtonGroup = styled.div ``;
export default function StakeInputField({ value, onUserInput, onMax, currency, hideBalance = false, hideInput = false, id, stakeBalance, walletBalance, }) {
    const { address: account } = useContractKit();
    const userBalance = useCurrencyBalance(account !== null && account !== void 0 ? account : undefined, currency !== null && currency !== void 0 ? currency : undefined);
    const selectedCurrencyBalance = walletBalance !== null && walletBalance !== void 0 ? walletBalance : userBalance;
    return (_jsx(InputPanel, Object.assign({ id: id }, { children: _jsxs(Container, Object.assign({ hideInput: hideInput }, { children: [!hideInput && (_jsx(LabelRow, { children: _jsx(AmountWrapper, { children: account && (_jsxs(_Fragment, { children: [_jsxs(AmountDescriptionWrapper, { children: [_jsx("span", { children: "Current Stake:\u00A0" }, void 0), _jsx("span", { children: stakeBalance ? stakeBalance.toFixed(2, { groupSeparator: ',' }) : '--' }, void 0)] }, void 0), _jsxs(AmountDescriptionWrapper, { children: [_jsx("span", { children: "Wallet Balance:\u00A0 " }, void 0), _jsx("span", { children: !hideBalance && !!currency && selectedCurrencyBalance
                                                ? selectedCurrencyBalance === null || selectedCurrencyBalance === void 0 ? void 0 : selectedCurrencyBalance.toSignificant(4)
                                                : '--' }, void 0)] }, void 0)] }, void 0)) }, void 0) }, void 0)), _jsx(InputRow, Object.assign({ style: { marginTop: '-0.5rem' }, selected: true }, { children: !hideInput && (_jsxs(_Fragment, { children: [_jsx(NumericalInput, { className: "token-amount-input", value: value, onUserInput: (val) => {
                                    onUserInput(val);
                                } }, void 0), _jsx(ButtonGroup, { children: _jsx(StyledControlButton, Object.assign({ onClick: onMax }, { children: "MAX" }), void 0) }, void 0)] }, void 0)) }), void 0)] }), void 0) }), void 0));
}
