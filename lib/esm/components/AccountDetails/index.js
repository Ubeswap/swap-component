import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useContractKit, WalletTypes } from '@celo-tools/use-contractkit';
import { useCallback, useContext } from 'react';
import { ExternalLink as LinkIcon } from 'react-feather';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import styled, { ThemeContext } from 'styled-components';
import Close from '../../assets/svgs/Close';
import { useCloseModals } from '../../state/application/hooks';
import { clearAllTransactions } from '../../state/transactions/actions';
import { ExternalLink, LinkStyledButton, TYPE } from '../../theme';
import { shortenAddress } from '../../utils';
import { ButtonSecondary } from '../Button';
import Identicon from '../Identicon';
import { AutoRow } from '../Row';
import Copy from './Copy';
import Transaction from './Transaction';
const HeaderRow = styled.div `
  ${({ theme }) => theme.flexRowNoWrap};
  padding: 1rem 1rem;
  font-weight: 500;
  color: ${(props) => (props.color === 'blue' ? ({ theme }) => theme.primary1 : 'inherit')};
  ${({ theme }) => theme.mediaWidth.upToMedium `
    padding: 1rem;
  `};
`;
const UpperSection = styled.div `
  position: relative;

  h5 {
    margin: 0;
    margin-bottom: 0.5rem;
    font-size: 1rem;
    font-weight: 400;
  }

  h5:last-child {
    margin-bottom: 0px;
  }

  h4 {
    margin-top: 0;
    font-weight: 500;
  }
`;
const InfoCard = styled.div `
  padding: 1rem;
  border: 1px solid ${({ theme }) => theme.bg3};
  border-radius: 20px;
  position: relative;
  display: grid;
  grid-row-gap: 12px;
  margin-bottom: 20px;
`;
const AccountGroupingRow = styled.div `
  ${({ theme }) => theme.flexRowNoWrap};
  justify-content: space-between;
  align-items: center;
  font-weight: 400;
  color: ${({ theme }) => theme.text1};

  div {
    ${({ theme }) => theme.flexRowNoWrap}
    align-items: center;
  }
`;
const AccountSection = styled.div `
  background-color: ${({ theme }) => theme.bg1};
  padding: 0rem 1rem;
  ${({ theme }) => theme.mediaWidth.upToMedium `padding: 0rem 1rem 1.5rem 1rem;`};
`;
const YourAccount = styled.div `
  h5 {
    margin: 0 0 1rem 0;
    font-weight: 400;
  }

  h4 {
    margin: 0;
    font-weight: 500;
  }
`;
const LowerSection = styled.div `
  ${({ theme }) => theme.flexColumnNoWrap}
  padding: 1.5rem;
  flex-grow: 1;
  overflow: auto;
  background-color: ${({ theme }) => theme.bg2};
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;

  h5 {
    margin: 0;
    font-weight: 400;
    color: ${({ theme }) => theme.text3};
  }
`;
const AccountControl = styled.div `
  display: flex;
  justify-content: space-between;
  min-width: 0;
  width: 100%;

  font-weight: 500;
  font-size: 1.25rem;

  a:hover {
    text-decoration: underline;
  }

  p {
    min-width: 0;
    margin: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;
const AddressLink = styled(ExternalLink) `
  font-size: 0.825rem;
  color: ${({ theme }) => theme.text3};
  margin-left: 1rem;
  font-size: 0.825rem;
  display: flex;
  :hover {
    color: ${({ theme }) => theme.text2};
  }
`;
const CloseIcon = styled.div `
  position: absolute;
  right: 1rem;
  top: 14px;
  &:hover {
    cursor: pointer;
    opacity: 0.6;
  }
`;
const CloseColor = styled(Close) `
  path {
    stroke: ${({ theme }) => theme.text4};
  }
`;
const WalletName = styled.div `
  width: initial;
  font-size: 0.825rem;
  font-weight: 500;
  color: ${({ theme }) => theme.text3};
`;
const IconWrapper = styled.div `
  ${({ theme }) => theme.flexColumnNoWrap};
  align-items: center;
  justify-content: center;
  margin-right: 8px;
  & > img,
  span {
    height: ${({ size }) => (size ? size + 'px' : '32px')};
    width: ${({ size }) => (size ? size + 'px' : '32px')};
  }
  ${({ theme }) => theme.mediaWidth.upToMedium `
    align-items: flex-end;
  `};
`;
const TransactionListWrapper = styled.div `
  ${({ theme }) => theme.flexColumnNoWrap};
`;
const WalletAction = styled(ButtonSecondary) `
  width: fit-content;
  font-weight: 400;
  margin-left: 8px;
  font-size: 0.825rem;
  padding: 4px 6px;
  :hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;
function renderTransactions(transactions) {
    return (_jsx(TransactionListWrapper, { children: transactions.map((hash, i) => {
            return _jsx(Transaction, { hash: hash }, i);
        }) }));
}
export default function AccountDetails({ toggleWalletModal, pendingTransactions, confirmedTransactions, ENSName, }) {
    const { connect, destroy, address, walletType, network } = useContractKit();
    const chainId = network.chainId;
    const closeModals = useCloseModals();
    const theme = useContext(ThemeContext);
    const dispatch = useDispatch();
    const { t } = useTranslation();
    function formatConnectorName() {
        if (walletType === WalletTypes.Unauthenticated) {
            return null;
        }
        // TODO(igm): should be valora??
        // const name = walletType === WalletTypes.? SupportedProviders.Valora : SupportedProviders[walletType]
        return (_jsxs(WalletName, { children: [t('ConnectedWith'), " ", walletType] }));
    }
    function getStatusIcon() {
        if (walletType === WalletTypes.MetaMask) {
            return (_jsx(IconWrapper, Object.assign({ size: 16 }, { children: _jsx(Identicon, {}) })));
        }
        return null;
    }
    const clearAllTransactionsCallback = useCallback(() => {
        if (chainId)
            dispatch(clearAllTransactions({ chainId }));
    }, [dispatch, chainId]);
    return (_jsxs(_Fragment, { children: [_jsxs(UpperSection, { children: [_jsx(CloseIcon, Object.assign({ onClick: toggleWalletModal }, { children: _jsx(CloseColor, {}) })), _jsx(HeaderRow, { children: "Account" }), _jsx(AccountSection, { children: _jsx(YourAccount, { children: _jsxs(InfoCard, { children: [_jsxs(AccountGroupingRow, { children: [formatConnectorName(), _jsxs("div", { children: [address && (_jsx(WalletAction, Object.assign({ style: { fontSize: '.825rem', fontWeight: 400, marginRight: '8px' }, onClick: destroy }, { children: t('Disconnect') }))), _jsx(WalletAction, Object.assign({ style: { fontSize: '.825rem', fontWeight: 400 }, onClick: () => {
                                                            closeModals();
                                                            connect();
                                                        } }, { children: t('Change') }))] })] }), _jsx(AccountGroupingRow, Object.assign({ id: "web3-account-identifier-row" }, { children: _jsx(AccountControl, { children: _jsxs("div", { children: [getStatusIcon(), ENSName ? _jsxs("p", { children: [" ", ENSName] }) : _jsxs("p", { children: [" ", address && shortenAddress(address)] })] }) }) })), _jsx(AccountGroupingRow, { children: ENSName ? (_jsx(_Fragment, { children: _jsx(AccountControl, { children: _jsxs("div", { children: [address && (_jsx(Copy, Object.assign({ toCopy: address }, { children: _jsx("span", Object.assign({ style: { marginLeft: '4px' } }, { children: t('CopyAddress') })) }))), chainId && address && (_jsxs(AddressLink, Object.assign({ hasENS: !!ENSName, isENS: true, href: `${network.explorer}/address/${address}` }, { children: [_jsx(LinkIcon, { size: 16 }), _jsx("span", Object.assign({ style: { marginLeft: '4px' } }, { children: t('ViewOnCeloExplorer') }))] })))] }) }) })) : (_jsx(_Fragment, { children: _jsx(AccountControl, { children: _jsxs("div", { children: [address && (_jsx(Copy, Object.assign({ toCopy: address }, { children: _jsx("span", Object.assign({ style: { marginLeft: '4px' } }, { children: t('CopyAddress') })) }))), chainId && address && (_jsxs(AddressLink, Object.assign({ hasENS: !!ENSName, isENS: false, href: `${network.explorer}/address/${address}` }, { children: [_jsx(LinkIcon, { size: 16 }), _jsx("span", Object.assign({ style: { marginLeft: '4px' } }, { children: t('ViewOnCeloExplorer') }))] })))] }) }) })) })] }) }) })] }), !!pendingTransactions.length || !!confirmedTransactions.length ? (_jsxs(LowerSection, { children: [_jsxs(AutoRow, Object.assign({ mb: '1rem', style: { justifyContent: 'space-between' } }, { children: [_jsx(TYPE.body, { children: t('RecentTransactions') }), _jsxs(LinkStyledButton, Object.assign({ onClick: clearAllTransactionsCallback }, { children: ["(", t('ClearAll'), ")"] }))] })), renderTransactions(pendingTransactions), renderTransactions(confirmedTransactions)] })) : (_jsx(LowerSection, { children: _jsx(TYPE.body, Object.assign({ color: theme.text1 }, { children: t('YourTransactionsWillAppearHere') })) }))] }));
}
