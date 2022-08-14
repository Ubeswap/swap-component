import { useContractKit } from '@celo-tools/use-contractkit'
import { CELO, ChainId as UbeswapChainId, cUSD, Fraction, TokenAmount, TradeType } from '@ubeswap/sdk'
import { BigNumber } from 'ethers'
import React, { useContext, useEffect, useState } from 'react'
import { ThemeContext } from 'styled-components'

import { usePair } from '../../../../data/Reserves'
import { TYPE } from '../../../../theme'
import QuestionHelper from '../../../QuestionHelper'
import { RowBetween, RowFixed } from '../../../Row'
import { ErrorText } from '../../../swap/styleds'
import { MoolaDirectTrade } from '../moola/MoolaDirectTrade'
import { useLendingPool } from '../moola/useMoola'

interface Props {
  trade: MoolaDirectTrade
}

export const MoolaDirectTradeDetails: React.FC<Props> = ({ trade }: Props) => {
  const { address: account, network } = useContractKit()
  const chainId = network.chainId
  const lendingPool = useLendingPool()
  const theme = useContext(ThemeContext)

  const celo = CELO[chainId as unknown as UbeswapChainId]
  const [, pair] = usePair(celo, cUSD[chainId as unknown as UbeswapChainId])
  const cusdPrice = pair?.priceOf(cUSD[chainId as unknown as UbeswapChainId])

  const [userData, setUserData] = useState<{
    totalCollateralETH: BigNumber
    totalDebtETH: BigNumber
    availableBorrowsETH: BigNumber
    currentLiquidationThreshold: BigNumber
    ltv: BigNumber
    healthFactor: BigNumber
  } | null>(null)
  useEffect(() => {
    if (account) {
      ;(async () => {
        const data = await lendingPool.getUserAccountData(account)
        setUserData(data)
      })()
    }
  }, [account, lendingPool])

  let userDataArea = null
  if (userData) {
    const healthFactor = userData.healthFactor.div(BigNumber.from(10).pow(27))
    const collateral = cusdPrice
      ? new TokenAmount(celo, userData.totalCollateralETH.toString()).multiply(cusdPrice)
      : null
    const borrows = cusdPrice ? new TokenAmount(celo, userData.totalDebtETH.toString()).multiply(cusdPrice) : null

    userDataArea = (
      <>
        <RowBetween>
          <RowFixed>
            <TYPE.black color={theme.text2} fontSize={14} fontWeight={400}>
              Collateral Balance
            </TYPE.black>
            <QuestionHelper text="The amount of collateral you have in Moola." />
          </RowFixed>
          <RowFixed>
            <TYPE.black fontSize={14} marginLeft={'4px'}>
              {collateral ? (collateral.lessThan(new Fraction('1')) ? '<$1' : `$${collateral.toFixed(2)}`) : '--'}
            </TYPE.black>
          </RowFixed>
        </RowBetween>
        <RowBetween>
          <RowFixed>
            <TYPE.black color={theme.text2} fontSize={14} fontWeight={400}>
              Borrow Balance
            </TYPE.black>
            <QuestionHelper text="The amount you owe to Moola." />
          </RowFixed>
          <RowFixed>
            <TYPE.black fontSize={14} marginLeft={'4px'}>
              {borrows ? (borrows.lessThan(new Fraction('1')) ? '<$1' : `$${borrows.toFixed(2)}`) : '--'}
            </TYPE.black>
          </RowFixed>
        </RowBetween>
        <RowBetween>
          <RowFixed>
            <TYPE.black color={theme.text2} fontSize={14} fontWeight={400}>
              Health Factor
            </TYPE.black>
            <QuestionHelper text="How risky your position is. If this is below 1, you can be liquidated." />
          </RowFixed>
          <ErrorText fontWeight={500} fontSize={14} severity={0}>
            {healthFactor.gt(100) ? 'Excellent' : healthFactor.toString()}
          </ErrorText>
        </RowBetween>
      </>
    )
  }

  return (
    <>
      <RowBetween>
        <RowFixed>
          <TYPE.black fontSize={14} fontWeight={400} color={theme.text2}>
            {trade.outputAmount.currency.symbol} received
          </TYPE.black>
          <QuestionHelper
            text={`Since this trade is routed through Moola, you are guaranteed to receive 1 ${trade.outputAmount.currency.symbol} per ${trade.inputAmount.currency.symbol}.`}
          />
        </RowFixed>
        <RowFixed>
          <TYPE.black fontSize={14}>
            {trade.outputAmount.lessThan('10000') ? trade.outputAmount.toSignificant(4) : trade.outputAmount.toFixed(0)}
          </TYPE.black>
          <TYPE.black fontSize={14} marginLeft={'4px'}>
            {trade.tradeType === TradeType.EXACT_INPUT
              ? trade.outputAmount.currency.symbol
              : trade.inputAmount.currency.symbol}
          </TYPE.black>
        </RowFixed>
      </RowBetween>
      <RowBetween>
        <RowFixed>
          <TYPE.black color={theme.text2} fontSize={14} fontWeight={400}>
            Price Impact
          </TYPE.black>
          <QuestionHelper text="Since this trade is routed through Moola, there is zero price slippage." />
        </RowFixed>
        <ErrorText fontWeight={500} fontSize={14} severity={0}>
          0.00%
        </ErrorText>
      </RowBetween>
      {userDataArea}
    </>
  )
}
