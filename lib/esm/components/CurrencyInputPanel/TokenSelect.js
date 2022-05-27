import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CurrencyLogo from 'components/CurrencyLogo';
import CurrencySearchModal from 'components/SearchModal/CurrencySearchModal';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { ReactComponent as Close } from '../../assets/images/x.svg';
import { CurrencySelect } from './CurrencySelect';
const Aligner = styled.span `
  display: flex;
  align-items: center;
`;
const CloseIcon = styled.div `
  margin-left: 12px;
  background-color: ${({ theme }) => theme.bg2};
  border-radius: 16px;
  padding: 5px 7px;
  &:hover {
    cursor: pointer;
    opacity: 0.6;
  }
  &:active {
    transform: rotate(360deg);
  }
  transition-duration: 1s;
  transition-property: transform;
`;
const CloseColor = styled(Close) `
  transform: translateX(-2px);
  path {
    stroke: ${({ theme }) => theme.text1};
  }
`;
const StyledTokenName = styled.span `
  ${({ active }) => (active ? '  margin: 0 0.25rem 0 0.75rem;' : '  margin: 0 0.25rem 0 0.25rem;')}
  font-size:  ${({ active }) => (active ? '20px' : '16px')};
`;
export default function TokenSelect(props) {
    const { t } = useTranslation();
    const [modalOpen, setModalOpen] = useState(false);
    const handleDismissSearch = useCallback(() => {
        setModalOpen(false);
    }, [setModalOpen]);
    return (_jsxs(_Fragment, { children: [_jsxs(Aligner, { children: [_jsx(CurrencySelect, Object.assign({ selected: !props.token, className: "open-currency-select-button", onClick: () => {
                            setModalOpen(true);
                        } }, { children: _jsx(Aligner, { children: props.token ? (_jsxs(_Fragment, { children: [_jsx(CurrencyLogo, { currency: props.token, size: '24px' }, void 0), _jsxs(StyledTokenName, { children: [" ", props.token.symbol, " "] }, void 0)] }, void 0)) : (_jsxs(_Fragment, { children: [_jsx(FontAwesomeIcon, { icon: faFilter, width: '16px' }, void 0), _jsx(StyledTokenName, { children: t('Token') }, void 0)] }, void 0)) }, void 0) }), void 0), props.token && (_jsx(CloseIcon, Object.assign({ onClick: () => props.onTokenSelect(null) }, { children: _jsx(CloseColor, {}, void 0) }), void 0))] }, void 0), _jsx(CurrencySearchModal, { isOpen: modalOpen, onDismiss: handleDismissSearch, onCurrencySelect: props.onTokenSelect, selectedCurrency: props === null || props === void 0 ? void 0 : props.token, showCommonBases: true }, void 0)] }, void 0));
}
