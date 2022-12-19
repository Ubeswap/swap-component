import { useContractKit } from '@celo-tools/use-contractkit'
import { ChainId, Token } from '@ubeswap/sdk'
import { transparentize } from 'polished'
import React, { useState } from 'react'
import { AlertTriangle, ArrowLeft } from 'react-feather'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

import useTheme from '../../hooks/useTheme'
import { AccountInfo } from '../../pages/Swap'
import { AppState } from '../../state'
import { useCombinedInactiveList } from '../../state/lists/hooks'
import { useAddUserToken } from '../../state/user/hooks'
import { CloseIcon, TYPE } from '../../theme'
import { ExternalLink } from '../../theme/components'
import { ButtonPrimary } from '../Button'
import Card from '../Card'
import { AutoColumn } from '../Column'
import CurrencyLogo from '../CurrencyLogo'
import ListLogo from '../ListLogo'
import { AutoRow, RowBetween, RowFixed } from '../Row'
import { SectionBreak } from '../swap/styleds'
import { Checkbox, PaddedColumn } from './styleds'

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  overflow: auto;
`

const WarningWrapper = styled(Card)<{ highWarning: boolean }>`
  background-color: ${({ theme, highWarning }) =>
    highWarning ? transparentize(0.8, theme.red1) : transparentize(0.8, theme.yellow2)};
  width: fit-content;
`

const AddressText = styled(TYPE.blue)`
  font-size: 12px;

  ${({ theme }) => theme.mediaWidth.upToSmall`
    font-size: 10px;
`}
`

interface ImportProps {
  tokens: Token[]
  onBack?: () => void
  onDismiss?: () => void
  handleCurrencySelect?: (currency: Token) => void
}

export function ImportToken({ tokens, onBack, onDismiss, handleCurrencySelect }: ImportProps) {
  const theme = useTheme()

  const { network } = useContractKit()
  const accountInfo = useSelector<AppState, AccountInfo | undefined>((state) => state.swap.accountInfo)
  const chainId = (accountInfo ? accountInfo.chainId : network.chainId) as unknown as ChainId
  const explorerUrl = accountInfo ? accountInfo.explorerUrl : network.explorer

  const [confirmed, setConfirmed] = useState(false)

  const addToken = useAddUserToken()
  const { t } = useTranslation()

  // use for showing import source on inactive tokens
  const inactiveTokenList = useCombinedInactiveList()

  // higher warning severity if either is not on a list
  const fromLists =
    (chainId && inactiveTokenList?.[chainId]?.[tokens[0]?.address]?.list) ||
    (chainId && inactiveTokenList?.[chainId]?.[tokens[1]?.address]?.list)

  return (
    <Wrapper>
      <PaddedColumn gap="14px" style={{ width: '100%', flex: '1 1' }}>
        <RowBetween>
          {onBack ? <ArrowLeft style={{ cursor: 'pointer' }} onClick={onBack} /> : <div></div>}
          <TYPE.mediumHeader>
            {t('Import')} {tokens.length > 1 ? `${t('Tokens')}` : `${t('Token')}`}
          </TYPE.mediumHeader>
          {onDismiss ? <CloseIcon onClick={onDismiss} /> : <div></div>}
        </RowBetween>
      </PaddedColumn>
      <SectionBreak />
      <PaddedColumn gap="md">
        {tokens.map((token) => {
          const list = chainId ? inactiveTokenList?.[chainId]?.[token.address]?.list : undefined
          return (
            <Card backgroundColor={theme.bg2} key={'import' + token.address} className=".token-warning-container">
              <AutoColumn gap="10px">
                <AutoRow align="center">
                  <CurrencyLogo currency={token} size={'24px'} />
                  <TYPE.body ml="8px" mr="8px" fontWeight={500}>
                    {token.symbol}
                  </TYPE.body>
                  <TYPE.darkGray fontWeight={300}>{token.name}</TYPE.darkGray>
                </AutoRow>
                {chainId && (
                  <ExternalLink href={`${explorerUrl}/address/${token.address}`}>
                    <AddressText>{token.address}</AddressText>
                  </ExternalLink>
                )}
                {list !== undefined ? (
                  <RowFixed>
                    {list.logoURI && <ListLogo logoURI={list.logoURI} size="12px" />}
                    <TYPE.small ml="6px" color={theme.text3}>
                      via {list.name}
                    </TYPE.small>
                  </RowFixed>
                ) : (
                  <WarningWrapper borderRadius="4px" padding="4px" highWarning={true}>
                    <RowFixed>
                      <AlertTriangle stroke={theme.red1} size="10px" />
                      <TYPE.body color={theme.red1} ml="4px" fontSize="10px" fontWeight={500}>
                        {t('UnknownSource')}
                      </TYPE.body>
                    </RowFixed>
                  </WarningWrapper>
                )}
              </AutoColumn>
            </Card>
          )
        })}

        <Card
          style={{ backgroundColor: fromLists ? transparentize(0.8, theme.yellow2) : transparentize(0.8, theme.red1) }}
        >
          <AutoColumn justify="center" style={{ textAlign: 'center', gap: '16px', marginBottom: '12px' }}>
            <AlertTriangle stroke={fromLists ? theme.yellow2 : theme.red1} size={32} />
            <TYPE.body fontWeight={600} fontSize={20} color={fromLists ? theme.yellow2 : theme.red1}>
              {t('TradeAtYourOwnRisk')}
            </TYPE.body>
          </AutoColumn>

          <AutoColumn style={{ textAlign: 'center', gap: '16px', marginBottom: '12px' }}>
            <TYPE.body fontWeight={400} color={fromLists ? theme.yellow2 : theme.red1}>
              {t('tokenExp')}
            </TYPE.body>
            <TYPE.body fontWeight={600} color={fromLists ? theme.yellow2 : theme.red1}>
              {t('tokenImportRisk')}
            </TYPE.body>
          </AutoColumn>
          <AutoRow justify="center" style={{ cursor: 'pointer' }} onClick={() => setConfirmed(!confirmed)}>
            <Checkbox
              className=".understand-checkbox"
              name="confirmed"
              type="checkbox"
              checked={confirmed}
              onChange={() => setConfirmed(!confirmed)}
            />
            <TYPE.body ml="10px" fontSize="16px" color={fromLists ? theme.yellow2 : theme.red1} fontWeight={500}>
              {t('IUnderstand')}
            </TYPE.body>
          </AutoRow>
        </Card>
        <ButtonPrimary
          disabled={!confirmed}
          altDisabledStyle={true}
          borderRadius="20px"
          padding="10px 1rem"
          onClick={() => {
            tokens.map((token) => addToken(token))
            handleCurrencySelect && handleCurrencySelect(tokens[0])
          }}
          className=".token-dismiss-button"
        >
          {t('Import')}
        </ButtonPrimary>
      </PaddedColumn>
    </Wrapper>
  )
}
