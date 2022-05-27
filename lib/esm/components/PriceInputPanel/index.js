import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { TYPE } from '../../theme';
import { Input as NumericalInput } from '../NumericalInput';
const InputRow = styled.div `
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: center;
  padding: ${({ selected }) => (selected ? '0.75rem 0.5rem 0.75rem 1rem' : '0.75rem 0.75rem 0.75rem 1rem')};
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
export default function PriceInputPanel({ value, placeholder, onUserInput, disableCurrencySelect = false, hideInput = false, id, }) {
    const { t } = useTranslation();
    return (_jsx(InputPanel, Object.assign({ id: id }, { children: _jsx(Container, Object.assign({ hideInput: hideInput }, { children: _jsx(InputRow, Object.assign({ style: hideInput ? { padding: '0', borderRadius: '8px' } : {}, selected: disableCurrencySelect }, { children: !hideInput && (_jsxs(_Fragment, { children: [_jsx(TYPE.body, { children: t('price') }, void 0), _jsx(NumericalInput, { style: { textAlign: 'right' }, value: value, onUserInput: (val) => {
                                onUserInput(val);
                            }, placeholder: placeholder }, void 0)] }, void 0)) }), void 0) }), void 0) }), void 0));
}
