import { useContractKit } from '@celo-tools/use-contractkit'
import React, { useEffect, useState } from 'react'
import { isMobile } from 'react-device-detect'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

import Close from '../../assets/svgs/Close'
import { ApplicationModal } from '../../state/application/actions'
import { useCloseModals, useModalOpen } from '../../state/application/hooks'
import { ExternalLink } from '../../theme'
import AccountDetails from '../AccountDetails'
import Modal from '../Modal'
import { CeloConnector } from './CeloConnector'

const CloseIcon = styled.div`
  position: absolute;
  right: 1rem;
  top: 14px;
  &:hover {
    cursor: pointer;
    opacity: 0.6;
  }
`

const CloseColor = styled(Close)`
  path {
    stroke: ${({ theme }) => theme.text4};
  }
`

const Wrapper = styled.div`
  ${({ theme }) => theme.flexColumnNoWrap}
  margin: 0;
  padding: 0;
  width: 100%;
`

const HeaderRow = styled.div`
  ${({ theme }) => theme.flexRowNoWrap};
  padding: 1rem 1rem;
  font-weight: 500;
  color: ${(props) => (props.color === 'blue' ? ({ theme }) => theme.primary1 : 'inherit')};
  ${({ theme }) => theme.mediaWidth.upToMedium`
    padding: 1rem;
  `};
`

const ContentWrapper = styled.div`
  background-color: ${({ theme }) => theme.bg2};
  padding: 2rem;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;

  ${({ theme }) => theme.mediaWidth.upToMedium`padding: 1rem`};
`

const UpperSection = styled.div`
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
`

const Blurb = styled.div`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 2rem;
  ${({ theme }) => theme.mediaWidth.upToMedium`
    margin: 1rem;
    font-size: 12px;
  `};
`

const HoverText = styled.div`
  :hover {
    cursor: pointer;
  }
`

const WALLET_VIEWS = {
  OPTIONS_SECONDARY: 'options_secondary',
  ACCOUNT: 'account',
}

export default function WalletModal({
  pendingTransactions,
  confirmedTransactions,
  ENSName,
}: {
  pendingTransactions: string[] // hashes of pending
  confirmedTransactions: string[] // hashes of confirmed
  ENSName?: string
}) {
  const { address } = useContractKit()
  // TODO(igm): get the errors
  const error = null

  const [walletView, setWalletView] = useState(WALLET_VIEWS.ACCOUNT)

  const walletModalOpen = useModalOpen(ApplicationModal.WALLET)
  const closeModals = useCloseModals()
  const { t } = useTranslation()

  // always reset to account view
  useEffect(() => {
    if (walletModalOpen) {
      setWalletView(WALLET_VIEWS.ACCOUNT)
    }
  }, [walletModalOpen])

  function getModalContent() {
    if (error) {
      return (
        <UpperSection>
          <CloseIcon onClick={closeModals}>
            <CloseColor />
          </CloseIcon>
          <HeaderRow>{error === 'unsupported-chain-id' ? 'Wrong Network' : 'Error connecting'}</HeaderRow>
          <ContentWrapper>
            {error === 'unsupported-chain-id' ? (
              <div>
                <h5>{t('PleaseConnectToTheAppropriateCeloNetwork')}</h5>
                <br />
                <CeloConnector />
              </div>
            ) : (
              'Error connecting. Try refreshing the page.'
            )}
          </ContentWrapper>
        </UpperSection>
      )
    }
    if (address && walletView === WALLET_VIEWS.ACCOUNT) {
      return (
        <AccountDetails
          toggleWalletModal={closeModals}
          pendingTransactions={pendingTransactions}
          confirmedTransactions={confirmedTransactions}
          ENSName={ENSName}
        />
      )
    }
    return (
      <UpperSection>
        <CloseIcon onClick={closeModals}>
          <CloseColor />
        </CloseIcon>
        {walletView !== WALLET_VIEWS.ACCOUNT ? (
          <HeaderRow color="blue">
            <HoverText
              onClick={() => {
                setWalletView(WALLET_VIEWS.ACCOUNT)
              }}
            >
              {t('Back')}
            </HoverText>
          </HeaderRow>
        ) : (
          <HeaderRow>
            <HoverText>{t('ConnectToAWallet')}</HoverText>
          </HeaderRow>
        )}
        <ContentWrapper>
          {!isMobile && (
            <Blurb>
              <ExternalLink href="https://docs.ubeswap.org/wallet-support/wallets">
                {t('LearnMoreAboutCeloWallets')}
              </ExternalLink>
            </Blurb>
          )}
          {isMobile && (
            <Blurb>
              <span>{t('NewToCelo')} &nbsp;</span>
              <ExternalLink href="https://docs.ubeswap.org/wallet-support/wallets">
                {t('LearnMoreAboutWallets')}
              </ExternalLink>
            </Blurb>
          )}
        </ContentWrapper>
      </UpperSection>
    )
  }

  return (
    <Modal isOpen={walletModalOpen} onDismiss={closeModals} minHeight={false} maxHeight={90}>
      <Wrapper>{getModalContent()}</Wrapper>
    </Modal>
  )
}
