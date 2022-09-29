import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useContractKit } from '@celo-tools/use-contractkit';
import { CheckCircle, Triangle } from 'react-feather';
import styled from 'styled-components';
import { useAllTransactions } from '../../state/transactions/hooks';
import { ExternalLink } from '../../theme';
import Loader from '../Loader';
import { RowFixed } from '../Row';
const TransactionWrapper = styled.div ``;
const TransactionStatusText = styled.div `
  margin-right: 0.5rem;
  display: flex;
  align-items: center;
  :hover {
    text-decoration: underline;
  }
`;
const TransactionState = styled(ExternalLink) `
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-decoration: none !important;
  border-radius: 0.5rem;
  padding: 0.25rem 0rem;
  font-weight: 500;
  font-size: 0.825rem;
  color: ${({ theme }) => theme.primary1};
`;
const IconWrapper = styled.div `
  color: ${({ pending, success, theme }) => (pending ? theme.primary1 : success ? theme.green1 : theme.red1)};
`;
export default function Transaction({ hash }) {
    var _a, _b;
    const { network } = useContractKit();
    const chainId = network.chainId;
    const allTransactions = useAllTransactions();
    const tx = allTransactions === null || allTransactions === void 0 ? void 0 : allTransactions[hash];
    const summary = tx === null || tx === void 0 ? void 0 : tx.summary;
    const pending = !(tx === null || tx === void 0 ? void 0 : tx.receipt);
    const success = !pending && tx && (((_a = tx.receipt) === null || _a === void 0 ? void 0 : _a.status) === 1 || typeof ((_b = tx.receipt) === null || _b === void 0 ? void 0 : _b.status) === 'undefined');
    if (!chainId)
        return null;
    return (_jsx(TransactionWrapper, { children: _jsxs(TransactionState, Object.assign({ href: `${network.explorer}/tx/${hash}`, pending: pending, success: success }, { children: [_jsx(RowFixed, { children: _jsxs(TransactionStatusText, { children: [summary !== null && summary !== void 0 ? summary : hash, " \u2197"] }) }), _jsx(IconWrapper, Object.assign({ pending: pending, success: success }, { children: pending ? _jsx(Loader, {}) : success ? _jsx(CheckCircle, { size: "16" }) : _jsx(Triangle, { size: "16" }) }))] })) }));
}
