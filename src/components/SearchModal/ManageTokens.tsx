import { useContractKit } from '@celo-tools/use-contractkit'
import { ChainId, Token } from '@ubeswap/sdk'
import React, { RefObject, useCallback, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

import { useToken } from '../../hooks/Tokens'
import useTheme from '../../hooks/useTheme'
import { AccountInfo } from '../../pages/Swap'
import { AppState } from '../../state'
import { useRemoveUserAddedToken, useUserAddedTokens } from '../../state/user/hooks'
import { ButtonText, ExternalLink, ExternalLinkIcon, TrashIcon, TYPE } from '../../theme'
import { isAddress } from '../../utils'
import Card from '../Card'
import Column from '../Column'
import CurrencyLogo from '../CurrencyLogo'
import Row, { RowBetween, RowFixed } from '../Row'
import { CurrencyModalView } from './CurrencySearchModal'
import ImportRow from './ImportRow'
import { PaddedColumn, SearchInput, Separator } from './styleds'

const Wrapper = styled.div`
  width: 100%;
  height: calc(100% - 60px);
  position: relative;
  padding-bottom: 60px;
`

const Footer = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  border-radius: 20px;
  border-top-right-radius: 0;
  border-top-left-radius: 0;
  border-top: 1px solid ${({ theme }) => theme.bg3};
  padding: 20px;
  text-align: center;
`

export default function ManageTokens({
  setModalView,
  setImportToken,
}: {
  setModalView: (view: CurrencyModalView) => void
  setImportToken: (token: Token) => void
}) {
  const { network } = useContractKit()
  const accountInfo = useSelector<AppState, AccountInfo | undefined>((state) => state.swap.accountInfo)
  const chainId = (accountInfo ? accountInfo.chainId : network.chainId) as unknown as ChainId
  const explorerUrl = accountInfo ? accountInfo.explorerUrl : network.explorer

  const [searchQuery, setSearchQuery] = useState<string>('')
  const theme = useTheme()
  const { t } = useTranslation()

  // manage focus on modal show
  const inputRef = useRef<HTMLInputElement>()
  const handleInput = useCallback((event) => {
    const input = event.target.value
    const checksummedInput = isAddress(input)
    setSearchQuery(checksummedInput || input)
  }, [])

  // if they input an address, use it
  const isAddressSearch = isAddress(searchQuery)
  const searchToken = useToken(searchQuery)

  // all tokens for local lisr
  const userAddedTokens: Token[] = useUserAddedTokens()
  const removeToken = useRemoveUserAddedToken()

  const handleRemoveAll = useCallback(() => {
    if (chainId && userAddedTokens) {
      userAddedTokens.map((token) => {
        return removeToken(chainId, token.address)
      })
    }
  }, [removeToken, userAddedTokens, chainId])

  const tokenList = useMemo(() => {
    return (
      chainId &&
      userAddedTokens.map((token) => (
        <RowBetween key={token.address} width="100%">
          <RowFixed>
            <CurrencyLogo currency={token} size={'20px'} />
            <ExternalLink href={`${explorerUrl}/address/${token.address}`}>
              <TYPE.main ml={'10px'} fontWeight={600}>
                {token.symbol}
              </TYPE.main>
            </ExternalLink>
          </RowFixed>
          <RowFixed>
            <TrashIcon onClick={() => removeToken(chainId, token.address)} />
            <ExternalLinkIcon href={`${explorerUrl}/address/${token.address}`} />
          </RowFixed>
        </RowBetween>
      ))
    )
  }, [userAddedTokens, removeToken, network, chainId])

  return (
    <Wrapper>
      <Column style={{ width: '100%', flex: '1 1' }}>
        <PaddedColumn gap="14px">
          <Row>
            <SearchInput
              type="text"
              id="token-search-input"
              placeholder={'0x0000'}
              value={searchQuery}
              autoComplete="off"
              ref={inputRef as RefObject<HTMLInputElement>}
              onChange={handleInput}
            />
          </Row>
          {searchQuery !== '' && !isAddressSearch && (
            <TYPE.error error={true}>{t('EnterValidTokenAddress')}</TYPE.error>
          )}
          {searchToken && (
            <Card backgroundColor={theme.bg2} padding="10px 0">
              <ImportRow
                token={searchToken}
                showImportView={() => setModalView(CurrencyModalView.importToken)}
                setImportToken={setImportToken}
                style={{ height: 'fit-content' }}
              />
            </Card>
          )}
        </PaddedColumn>
        <Separator />
        <PaddedColumn gap="lg">
          <RowBetween>
            <TYPE.main fontWeight={600}>
              {userAddedTokens?.length} {t('Custom')} {userAddedTokens.length === 1 ? 'Token' : 'Tokens'}
            </TYPE.main>
            {userAddedTokens.length > 0 && (
              <ButtonText onClick={handleRemoveAll}>
                <TYPE.blue>{t('ClearAll')}</TYPE.blue>
              </ButtonText>
            )}
          </RowBetween>
          {tokenList}
        </PaddedColumn>
      </Column>
      <Footer>
        <TYPE.darkGray>{t('TipCustomTokensAreStoredLocallyInYourBrowser')}</TYPE.darkGray>
      </Footer>
    </Wrapper>
  )
}
