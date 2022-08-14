import { useContractKit } from '@celo-tools/use-contractkit'
import { ChainId, cUSD, JSBI, Token, TokenAmount } from '@ubeswap/sdk'

import { BIG_INT_SECONDS_IN_YEAR } from '../../constants'
import { useCUSDPrices } from '../../utils/useCUSDPrice'

export const useAnnualRewardDollars = (rewardTokens: Token[], rewardRates: TokenAmount[]) => {
  const { network } = useContractKit()
  const chainId = network.chainId as unknown as ChainId
  const rewardPrices = useCUSDPrices(rewardTokens)
  if (!rewardPrices || !rewardRates) {
    return undefined
  }
  return rewardPrices.reduce((acc, rewardPrice, idx) => {
    const rewardRate = rewardRates[idx]
    const rewardToken = rewardTokens[idx]
    const rewardTokenPerYear = new TokenAmount(rewardToken, JSBI.multiply(rewardRate.raw, BIG_INT_SECONDS_IN_YEAR))
    return acc.add(rewardPrice?.quote(rewardTokenPerYear) ?? new TokenAmount(cUSD[chainId], '0'))
  }, new TokenAmount(cUSD[chainId], '0'))
}
