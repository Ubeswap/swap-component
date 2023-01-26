import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { ArrowLeft } from 'react-feather';
import { useTranslation } from 'react-i18next';
import { Text } from 'rebass';
import styled from 'styled-components';
import { CloseIcon } from '../../theme';
import { RowBetween } from '../Row';
import { CurrencyModalView } from './CurrencySearchModal';
import { ManageLists } from './ManageLists';
import ManageTokens from './ManageTokens';
import { PaddedColumn, Separator } from './styleds';
const Wrapper = styled.div `
  width: 100%;
  position: relative;
  padding-bottom: 80px;
`;
const ToggleWrapper = styled(RowBetween) `
  background-color: ${({ theme }) => theme.bg3};
  border-radius: 12px;
  padding: 6px;
`;
const ToggleOption = styled.div `
  width: 48%;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  font-weight: 600;
  background-color: ${({ theme, active }) => (active ? theme.bg1 : theme.bg3)};
  color: ${({ theme, active }) => (active ? theme.text1 : theme.text2)};
  user-select: none;

  :hover {
    cursor: pointer;
    opacity: 0.7;
  }
`;
export default function Manage({ onDismiss, setModalView, setImportList, setImportToken, setListUrl, }) {
    // toggle between tokens and lists
    const [showLists, setShowLists] = useState(true);
    const { t } = useTranslation();
    return (_jsxs(Wrapper, { children: [_jsx(PaddedColumn, { children: _jsxs(RowBetween, { children: [_jsx(ArrowLeft, { style: { cursor: 'pointer' }, onClick: () => setModalView(CurrencyModalView.search) }), _jsx(Text, Object.assign({ fontWeight: 500, fontSize: 20 }, { children: t('manage') })), _jsx(CloseIcon, { onClick: onDismiss })] }) }), _jsx(Separator, {}), _jsx(PaddedColumn, Object.assign({ style: { paddingBottom: 0 } }, { children: _jsxs(ToggleWrapper, { children: [_jsx(ToggleOption, Object.assign({ onClick: () => setShowLists(!showLists), active: showLists }, { children: t('Lists') })), _jsx(ToggleOption, Object.assign({ onClick: () => setShowLists(!showLists), active: !showLists }, { children: t('Tokens') }))] }) })), showLists ? (_jsx(ManageLists, { setModalView: setModalView, setImportList: setImportList, setListUrl: setListUrl })) : (_jsx(ManageTokens, { setModalView: setModalView, setImportToken: setImportToken }))] }));
}
