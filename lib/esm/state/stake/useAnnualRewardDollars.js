import { useContractKit } from '@celo-tools/use-contractkit';
import { cUSD, JSBI, TokenAmount } from '@ubeswap/sdk';
import { BIG_INT_SECONDS_IN_YEAR } from '../../constants';
import { useCUSDPrices } from '../../utils/useCUSDPrice';
export const useAnnualRewardDollars = (rewardTokens, rewardRates) => {
    const { network } = useContractKit();
    const chainId = network.chainId;
    const rewardPrices = useCUSDPrices(rewardTokens);
    if (!rewardPrices || !rewardRates) {
        return undefined;
    }
    return rewardPrices.reduce((acc, rewardPrice, idx) => {
        var _a;
        const rewardRate = rewardRates[idx];
        const rewardToken = rewardTokens[idx];
        const rewardTokenPerYear = new TokenAmount(rewardToken, JSBI.multiply(rewardRate.raw, BIG_INT_SECONDS_IN_YEAR));
        return acc.add((_a = rewardPrice === null || rewardPrice === void 0 ? void 0 : rewardPrice.quote(rewardTokenPerYear)) !== null && _a !== void 0 ? _a : new TokenAmount(cUSD[chainId], '0'));
    }, new TokenAmount(cUSD[chainId], '0'));
};
