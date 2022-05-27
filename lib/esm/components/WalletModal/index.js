import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useContractKit } from '@celo-tools/use-contractkit';
import { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { ReactComponent as Close } from '../../assets/images/x.svg';
import { ApplicationModal } from '../../state/application/actions';
import { useCloseModals, useModalOpen } from '../../state/application/hooks';
import { ExternalLink } from '../../theme';
import AccountDetails from '../AccountDetails';
import Modal from '../Modal';
import { CeloConnector } from './CeloConnector';
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
const Wrapper = styled.div `
  ${({ theme }) => theme.flexColumnNoWrap}
  margin: 0;
  padding: 0;
  width: 100%;
`;
const HeaderRow = styled.div `
  ${({ theme }) => theme.flexRowNoWrap};
  padding: 1rem 1rem;
  font-weight: 500;
  color: ${(props) => (props.color === 'blue' ? ({ theme }) => theme.primary1 : 'inherit')};
  ${({ theme }) => theme.mediaWidth.upToMedium `
    padding: 1rem;
  `};
`;
const ContentWrapper = styled.div `
  background-color: ${({ theme }) => theme.bg2};
  padding: 2rem;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;

  ${({ theme }) => theme.mediaWidth.upToMedium `padding: 1rem`};
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
const Blurb = styled.div `
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 2rem;
  ${({ theme }) => theme.mediaWidth.upToMedium `
    margin: 1rem;
    font-size: 12px;
  `};
`;
const HoverText = styled.div `
  :hover {
    cursor: pointer;
  }
`;
const WALLET_VIEWS = {
    OPTIONS_SECONDARY: 'options_secondary',
    ACCOUNT: 'account',
};
export default function WalletModal({ pendingTransactions, confirmedTransactions, ENSName, }) {
    const { address } = useContractKit();
    // TODO(igm): get the errors
    const error = null;
    const [walletView, setWalletView] = useState(WALLET_VIEWS.ACCOUNT);
    const walletModalOpen = useModalOpen(ApplicationModal.WALLET);
    const closeModals = useCloseModals();
    const { t } = useTranslation();
    // always reset to account view
    useEffect(() => {
        if (walletModalOpen) {
            setWalletView(WALLET_VIEWS.ACCOUNT);
        }
    }, [walletModalOpen]);
    function getModalContent() {
        if (error) {
            return (_jsxs(UpperSection, { children: [_jsx(CloseIcon, Object.assign({ onClick: closeModals }, { children: _jsx(CloseColor, {}, void 0) }), void 0), _jsx(HeaderRow, { children: error === 'unsupported-chain-id' ? 'Wrong Network' : 'Error connecting' }, void 0), _jsx(ContentWrapper, { children: error === 'unsupported-chain-id' ? (_jsxs("div", { children: [_jsx("h5", { children: t('PleaseConnectToTheAppropriateCeloNetwork') }, void 0), _jsx("br", {}, void 0), _jsx(CeloConnector, {}, void 0)] }, void 0)) : ('Error connecting. Try refreshing the page.') }, void 0)] }, void 0));
        }
        if (address && walletView === WALLET_VIEWS.ACCOUNT) {
            return (_jsx(AccountDetails, { toggleWalletModal: closeModals, pendingTransactions: pendingTransactions, confirmedTransactions: confirmedTransactions, ENSName: ENSName }, void 0));
        }
        return (_jsxs(UpperSection, { children: [_jsx(CloseIcon, Object.assign({ onClick: closeModals }, { children: _jsx(CloseColor, {}, void 0) }), void 0), walletView !== WALLET_VIEWS.ACCOUNT ? (_jsx(HeaderRow, Object.assign({ color: "blue" }, { children: _jsx(HoverText, Object.assign({ onClick: () => {
                            setWalletView(WALLET_VIEWS.ACCOUNT);
                        } }, { children: t('Back') }), void 0) }), void 0)) : (_jsx(HeaderRow, { children: _jsx(HoverText, { children: t('ConnectToAWallet') }, void 0) }, void 0)), _jsxs(ContentWrapper, { children: [!isMobile && (_jsx(Blurb, { children: _jsx(ExternalLink, Object.assign({ href: "https://docs.ubeswap.org/wallet-support/wallets" }, { children: t('LearnMoreAboutCeloWallets') }), void 0) }, void 0)), isMobile && (_jsxs(Blurb, { children: [_jsxs("span", { children: [t('NewToCelo'), " \u00A0"] }, void 0), _jsx(ExternalLink, Object.assign({ href: "https://docs.ubeswap.org/wallet-support/wallets" }, { children: t('LearnMoreAboutWallets') }), void 0)] }, void 0))] }, void 0)] }, void 0));
    }
    return (_jsx(Modal, Object.assign({ isOpen: walletModalOpen, onDismiss: closeModals, minHeight: false, maxHeight: 90 }, { children: _jsx(Wrapper, { children: getModalContent() }, void 0) }), void 0));
}
