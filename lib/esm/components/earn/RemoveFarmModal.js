import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { X } from 'react-feather';
import { useTranslation } from 'react-i18next';
import { Text } from 'rebass';
import styled from 'styled-components';
import { ButtonPrimary, ButtonSecondary } from '../Button';
import { AutoColumn } from '../Column';
import Modal from '../Modal';
import { RowBetween } from '../Row';
import { Break } from './styled';
const ModalContentWrapper = styled.div `
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 0;
  background-color: ${({ theme }) => theme.bg2};
  border-radius: 20px;
`;
const StyledCloseIcon = styled(X) `
  height: 20px;
  width: 20px;
  :hover {
    cursor: pointer;
  }
  > * {
    stroke: ${({ theme }) => theme.text1};
  }
`;
export default function RemoveFarmModal({ isOpen, onClose, onConfirm }) {
    const { t } = useTranslation();
    const onDismiss = () => {
        onClose();
    };
    return (_jsx(Modal, Object.assign({ isOpen: isOpen, onDismiss: onDismiss, maxHeight: 100 }, { children: _jsx(ModalContentWrapper, { children: _jsxs(AutoColumn, Object.assign({ gap: "lg" }, { children: [_jsxs(RowBetween, Object.assign({ style: { padding: '0 2rem' } }, { children: [_jsx("div", {}), _jsx(Text, Object.assign({ fontWeight: 500, fontSize: 20 }, { children: t('AreYouSure') })), _jsx(StyledCloseIcon, { onClick: () => onClose() })] })), _jsx(Break, {}), _jsxs(AutoColumn, Object.assign({ gap: "lg", style: { padding: '0 2rem' } }, { children: [_jsxs(Text, Object.assign({ fontWeight: 400, fontSize: 16, mb: '1rem' }, { children: ["Selected Farm will be removed from your browser.", _jsx("br", {}), "You can import it later whenever you want."] })), _jsxs(RowBetween, { children: [_jsx(ButtonSecondary, Object.assign({ mr: "0.5rem", padding: "18px", onClick: onDismiss }, { children: `${t('cancel')}` })), _jsx(ButtonPrimary, Object.assign({ borderRadius: "12px", onClick: onConfirm }, { children: `${t('continue')}` }))] })] }))] })) }) })));
}
