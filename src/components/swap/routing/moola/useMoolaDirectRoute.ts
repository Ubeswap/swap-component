import { useContractKit, useProvider } from '@celo-tools/use-contractkit'
import { ChainId, currencyEquals, JSBI, Pair, Route, Token, TokenAmount } from '@ubeswap/sdk'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'

import { AccountInfo } from '../../../../pages/Swap'
import { AppState } from '../../../../state'
import { useUserAllowMoolaWithdrawal } from '../../../../state/user/hooks'
import { moolaDuals } from './useMoola'

const BIG_NUMBER = JSBI.exponentiate(JSBI.BigInt(2), JSBI.BigInt(255))

export const useMoolaDirectRoute = (
  inputCurrency: Token | null | undefined,
  outputCurrency: Token | null | undefined
): Route | null => {
  const library = useProvider()
  const { network } = useContractKit()
  const accountInfo = useSelector<AppState, AccountInfo | undefined>((state) => state.swap.accountInfo)
  const chainId = (accountInfo ? accountInfo.chainId : network.chainId) as unknown as ChainId
  const provider = accountInfo ? accountInfo.provider : library
  const [allowMoolaWithdrawal] = useUserAllowMoolaWithdrawal()

  return useMemo(() => {
    if (chainId === ChainId.BAKLAVA) {
      return null
    }

    if (chainId !== ChainId.ALFAJORES && chainId !== ChainId.MAINNET) {
      return null
    }

    if (!provider) {
      return null
    }

    if (!inputCurrency || !outputCurrency) {
      return null
    }

    const withdrawalRoutes = moolaDuals.map((dual) => dual.map((token) => token[chainId]))
    const depositRoutes = withdrawalRoutes.map((route) => route.reverse())

    const routes = [...depositRoutes, ...(allowMoolaWithdrawal ? withdrawalRoutes : [])] as const

    const routeRaw =
      inputCurrency &&
      outputCurrency &&
      routes.find(([a, b]) => currencyEquals(inputCurrency, a) && currencyEquals(outputCurrency, b))
    if (!routeRaw) {
      return null
    }

    return new Route(
      [new Pair(new TokenAmount(inputCurrency, BIG_NUMBER), new TokenAmount(outputCurrency, BIG_NUMBER))],
      inputCurrency,
      outputCurrency
    )
  }, [inputCurrency, outputCurrency, allowMoolaWithdrawal, chainId, provider])
}
