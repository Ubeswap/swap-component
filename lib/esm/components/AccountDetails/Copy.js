import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { CheckCircle, Copy } from 'react-feather';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import useCopyClipboard from '../../hooks/useCopyClipboard';
import { LinkStyledButton } from '../../theme';
const CopyIcon = styled(LinkStyledButton) `
  color: ${({ theme }) => theme.text3};
  flex-shrink: 0;
  display: flex;
  text-decoration: none;
  font-size: 0.825rem;
  :hover,
  :active,
  :focus {
    text-decoration: none;
    color: ${({ theme }) => theme.text2};
  }
`;
const TransactionStatusText = styled.span `
  margin-left: 0.25rem;
  font-size: 0.825rem;
  ${({ theme }) => theme.flexRowNoWrap};
  align-items: center;
`;
export default function CopyHelper(props) {
    const [isCopied, setCopied] = useCopyClipboard();
    const { t } = useTranslation();
    return (_jsxs(CopyIcon, Object.assign({ onClick: () => setCopied(props.toCopy) }, { children: [isCopied ? (_jsxs(TransactionStatusText, { children: [_jsx(CheckCircle, { size: '16' }, void 0), _jsxs(TransactionStatusText, { children: [" ", t('copied'), " "] }, void 0)] }, void 0)) : (_jsx(TransactionStatusText, { children: _jsx(Copy, { size: '16' }, void 0) }, void 0)), isCopied ? '' : props.children] }), void 0));
}
