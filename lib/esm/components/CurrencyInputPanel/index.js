import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useContractKit } from '@celo-tools/use-contractkit';
import { darken } from 'polished';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import DropDown from '../../assets/svgs/dropdown';
import useTheme from '../../hooks/useTheme';
import { useCurrencyBalance } from '../../state/wallet/hooks';
import { TYPE } from '../../theme';
import CurrencyLogo from '../CurrencyLogo';
import DoubleCurrencyLogo from '../DoubleLogo';
import { Input as NumericalInput } from '../NumericalInput';
import { RowBetween } from '../Row';
import CurrencySearchModal from '../SearchModal/CurrencySearchModal';
import { CurrencySelect } from './CurrencySelect';
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
const Aligner = styled.span `
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const StyledDropDown = styled(DropDown) `
  margin: 0 0.25rem 0 0.5rem;
  height: 35%;

  path {
    stroke: ${({ selected, theme }) => (selected ? theme.text1 : theme.white)};
    stroke-width: 1.5px;
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
const StyledTokenName = styled.span `
  ${({ active }) => (active ? '  margin: 0 0.25rem 0 0.75rem;' : '  margin: 0 0.25rem 0 0.25rem;')}
  font-size:  ${({ active }) => (active ? '20px' : '16px')};
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
const ButtonGroup = styled.div ``;
export default function CurrencyInputPanel({ value, onUserInput, onMax, onHalf, showMaxButton, showHalfButton, label = 'Input', onCurrencySelect, currency, disableCurrencySelect = false, hideBalance = false, pair = null, // used for double token logo
hideInput = false, otherCurrency, id, showCommonBases, customBalanceText, chainId, balanceOverride, disabled = false, }) {
    const { t } = useTranslation();
    const [modalOpen, setModalOpen] = useState(false);
    const { address: account } = useContractKit();
    const userBalance = useCurrencyBalance(account !== null && account !== void 0 ? account : undefined, currency !== null && currency !== void 0 ? currency : undefined);
    const selectedCurrencyBalance = balanceOverride !== null && balanceOverride !== void 0 ? balanceOverride : userBalance;
    const theme = useTheme();
    const handleDismissSearch = useCallback(() => {
        setModalOpen(false);
    }, [setModalOpen]);
    return (_jsxs(InputPanel, Object.assign({ id: id }, { children: [_jsxs(Container, Object.assign({ hideInput: hideInput }, { children: [!hideInput && (_jsx(LabelRow, { children: _jsxs(RowBetween, { children: [_jsx(CurrencySelect, Object.assign({ selected: !!currency, className: "open-currency-select-button", onClick: () => {
                                        if (!disableCurrencySelect) {
                                            setModalOpen(true);
                                        }
                                    } }, { children: _jsxs(Aligner, { children: [pair ? (_jsx(DoubleCurrencyLogo, { currency0: pair.token0, currency1: pair.token1, size: 24, margin: true })) : currency ? (_jsx(CurrencyLogo, { currency: currency, size: '24px' })) : null, pair ? (_jsxs(StyledTokenName, Object.assign({ className: "pair-name-container" }, { children: [pair === null || pair === void 0 ? void 0 : pair.token0.symbol, ":", pair === null || pair === void 0 ? void 0 : pair.token1.symbol] }))) : (_jsx(StyledTokenName, Object.assign({ className: "token-symbol-container", active: Boolean(currency && currency.symbol) }, { children: (currency && currency.symbol && currency.symbol.length > 20
                                                    ? currency.symbol.slice(0, 4) +
                                                        '...' +
                                                        currency.symbol.slice(currency.symbol.length - 5, currency.symbol.length)
                                                    : currency === null || currency === void 0 ? void 0 : currency.symbol) || t('selectToken') }))), !disableCurrencySelect && _jsx(StyledDropDown, { selected: !!currency })] }) })), account && (_jsx(TYPE.body, Object.assign({ onClick: onMax, color: theme.text2, fontWeight: 500, fontSize: 14, style: { display: 'inline', cursor: 'pointer' } }, { children: !hideBalance && !!currency && selectedCurrencyBalance
                                        ? (customBalanceText !== null && customBalanceText !== void 0 ? customBalanceText : 'Balance: ') + (selectedCurrencyBalance === null || selectedCurrencyBalance === void 0 ? void 0 : selectedCurrencyBalance.toSignificant(6))
                                        : ' -' })))] }) })), _jsx(InputRow, Object.assign({ style: hideInput ? { padding: '0', borderRadius: '8px' } : {}, selected: disableCurrencySelect }, { children: !hideInput && (_jsxs(_Fragment, { children: [_jsx(NumericalInput, { className: "token-amount-input", value: value, onUserInput: (val) => {
                                        onUserInput(val);
                                    }, disabled: disabled }), account && currency && label !== 'To' && (_jsxs(ButtonGroup, { children: [showHalfButton && _jsx(StyledControlButton, Object.assign({ onClick: onHalf }, { children: "50%" })), showMaxButton && _jsx(StyledControlButton, Object.assign({ onClick: onMax }, { children: "MAX" }))] }))] })) }))] })), !disableCurrencySelect && onCurrencySelect && (_jsx(CurrencySearchModal, { isOpen: modalOpen, onDismiss: handleDismissSearch, onCurrencySelect: onCurrencySelect, selectedCurrency: currency, otherSelectedCurrency: otherCurrency, showCommonBases: showCommonBases, chainId: chainId }))] })));
}
