import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useContractKit } from '@celo-tools/use-contractkit';
import { useCallback, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import styled, { ThemeContext } from 'styled-components';
import useENS from '../../hooks/useENS';
import { ExternalLink, TYPE } from '../../theme';
import { AutoColumn } from '../Column';
import { RowBetween } from '../Row';
const InputPanel = styled.div `
  ${({ theme }) => theme.flexColumnNoWrap}
  position: relative;
  border-radius: 1.25rem;
  background-color: ${({ theme }) => theme.bg1};
  z-index: 1;
  width: 100%;
`;
const ContainerRow = styled.div `
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 1.25rem;
  border: 1px solid ${({ error, theme }) => (error ? theme.red1 : theme.bg2)};
  transition: border-color 300ms ${({ error }) => (error ? 'step-end' : 'step-start')},
    color 500ms ${({ error }) => (error ? 'step-end' : 'step-start')};
  background-color: ${({ theme }) => theme.bg1};
`;
const InputContainer = styled.div `
  flex: 1;
  padding: 1rem;
`;
const Input = styled.input `
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
export default function AddressInputPanel({ id, value, onChange, }) {
    const { network } = useContractKit();
    const accountInfo = useSelector((state) => state.swap.accountInfo);
    const chainId = (accountInfo ? accountInfo.chainId : network.chainId);
    const explorerUrl = accountInfo ? accountInfo.explorerUrl : network.explorer;
    const theme = useContext(ThemeContext);
    const { address, loading } = useENS(value);
    const handleInput = useCallback((event) => {
        const input = event.target.value;
        const withoutSpaces = input.replace(/\s+/g, '');
        onChange(withoutSpaces);
    }, [onChange]);
    const { t } = useTranslation();
    const error = Boolean(value.length > 0 && !loading && !address);
    return (_jsx(InputPanel, Object.assign({ id: id }, { children: _jsx(ContainerRow, Object.assign({ error: error }, { children: _jsx(InputContainer, { children: _jsxs(AutoColumn, Object.assign({ gap: "md" }, { children: [_jsxs(RowBetween, { children: [_jsx(TYPE.black, Object.assign({ color: theme.text2, fontWeight: 500, fontSize: 14 }, { children: "Recipient" })), address && chainId && (_jsxs(ExternalLink, Object.assign({ href: `${explorerUrl}/address/${address}`, style: { fontSize: '14px' } }, { children: ["(", t('ViewOnCeloExplorer'), ")"] })))] }), _jsx(Input, { className: "recipient-address-input", type: "text", autoComplete: "off", autoCorrect: "off", autoCapitalize: "off", spellCheck: "false", placeholder: `${t('ViewOnCeloExplorer')}`, error: error, pattern: "^(0x[a-fA-F0-9]{40})$", onChange: handleInput, value: value })] })) }) })) })));
}
