import { useContractKit } from '@celo-tools/use-contractkit'
import { ChainId } from '@ubeswap/sdk'
import React, { useContext } from 'react'
import { AlertCircle, CheckCircle } from 'react-feather'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import styled, { ThemeContext } from 'styled-components'

import { AccountInfo } from '../../pages/Swap'
import { AppState } from '../../state'
import { TYPE } from '../../theme'
import { ExternalLink } from '../../theme/components'
import { AutoColumn } from '../Column'
import { AutoRow } from '../Row'

const RowNoFlex = styled(AutoRow)`
  flex-wrap: nowrap;
`

export default function TransactionPopup({
  hash,
  success,
  summary,
}: {
  hash: string
  success?: boolean
  summary?: string
}) {
  const { network } = useContractKit()
  const accountInfo = useSelector<AppState, AccountInfo | undefined>((state) => state.swap.accountInfo)
  const chainId = (accountInfo ? accountInfo.chainId : network.chainId) as unknown as ChainId
  const explorerUrl = accountInfo ? accountInfo.explorerUrl : network.explorer

  const theme = useContext(ThemeContext)
  const { t } = useTranslation()

  return (
    <RowNoFlex>
      <div style={{ paddingRight: 16 }}>
        {success ? <CheckCircle color={theme.green1} size={24} /> : <AlertCircle color={theme.red1} size={24} />}
      </div>
      <AutoColumn gap="8px">
        <TYPE.body fontWeight={500}>
          {summary ?? `${t('Hash')}: ` + hash.slice(0, 8) + '...' + hash.slice(58, 65)}
        </TYPE.body>
        {chainId && <ExternalLink href={`${explorerUrl}/tx/${hash}`}>{t('ViewOnCeloExplorer')}</ExternalLink>}
      </AutoColumn>
    </RowNoFlex>
  )
}
