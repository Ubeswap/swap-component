import { useContractKit } from '@celo-tools/use-contractkit';
import { cUSD, JSBI, TokenAmount } from '@ubeswap/sdk';
import { BIG_INT_ZERO } from 'constants/index';
import { usePair } from 'data/Reserves';
import { useTotalSupply } from 'data/TotalSupply';
import { useToken } from 'hooks/Tokens';
import { useCUSDPrice } from 'utils/useCUSDPrice';
export const useLPValue = (stakedAmount, farmSummary) => {
    const { network } = useContractKit();
    const chainId = network.chainId;
    const lpToken = useToken(farmSummary ? farmSummary.lpAddress : undefined) || undefined;
    const totalSupplyOfStakingToken = useTotalSupply(lpToken);
    const token0 = useToken(farmSummary ? farmSummary.token0Address : undefined) || undefined;
    const token1 = useToken(farmSummary ? farmSummary.token1Address : undefined) || undefined;
    const isSingle = Boolean(farmSummary ? farmSummary.token0Address === farmSummary.token1Address : undefined);
    const [, stakingTokenPair] = usePair(token0, token1);
    const cusd = cUSD[chainId];
    const cusdPrice0 = useCUSDPrice(isSingle ? token0 : stakingTokenPair === null || stakingTokenPair === void 0 ? void 0 : stakingTokenPair.token0);
    const cusdPrice1 = useCUSDPrice(isSingle ? token1 : stakingTokenPair === null || stakingTokenPair === void 0 ? void 0 : stakingTokenPair.token1);
    let valueOfUserStakedAmountInCUSD;
    if (totalSupplyOfStakingToken &&
        !totalSupplyOfStakingToken.equalTo('0') &&
        (isSingle || stakingTokenPair) &&
        (cusdPrice0 || cusdPrice1) &&
        token0 &&
        token1) {
        // take the total amount of LP tokens staked, multiply by ETH value of all LP tokens, divide by all LP tokens
        const amount = !stakingTokenPair && cusdPrice0
            ? new TokenAmount(token0, BIG_INT_ZERO)
            : stakingTokenPair
                ? cusdPrice0
                    ? cusdPrice0.quote(stakingTokenPair.reserve0)
                    : cusdPrice1 === null || cusdPrice1 === void 0 ? void 0 : cusdPrice1.quote(stakingTokenPair.reserve1)
                : undefined;
        if (amount) {
            valueOfUserStakedAmountInCUSD = isSingle
                ? new TokenAmount(cusd, cusdPrice0
                    ? JSBI.divide(JSBI.multiply(JSBI.BigInt(stakedAmount), cusdPrice0 === null || cusdPrice0 === void 0 ? void 0 : cusdPrice0.numerator), cusdPrice0 === null || cusdPrice0 === void 0 ? void 0 : cusdPrice0.denominator)
                    : BIG_INT_ZERO)
                : new TokenAmount(cusd, stakedAmount
                    ? JSBI.divide(JSBI.multiply(JSBI.multiply(JSBI.BigInt(stakedAmount), amount.raw), 
                    // this is b/c the value of LP shares are ~double the value of the cUSD they entitle owner to
                    JSBI.BigInt(2)), totalSupplyOfStakingToken.raw)
                    : BIG_INT_ZERO);
        }
    }
    const userAmountTokenA = stakingTokenPair && totalSupplyOfStakingToken && !totalSupplyOfStakingToken.equalTo('0')
        ? new TokenAmount(stakingTokenPair.reserve0.token, JSBI.divide(JSBI.multiply(JSBI.BigInt(stakedAmount), stakingTokenPair.reserve0.raw), totalSupplyOfStakingToken.raw))
        : undefined;
    const userAmountTokenB = stakingTokenPair && stakedAmount && totalSupplyOfStakingToken && !totalSupplyOfStakingToken.equalTo('0')
        ? new TokenAmount(stakingTokenPair.reserve1.token, JSBI.divide(JSBI.multiply(JSBI.BigInt(stakedAmount), stakingTokenPair.reserve1.raw), totalSupplyOfStakingToken.raw))
        : undefined;
    return {
        amountTokenA: stakingTokenPair === null || stakingTokenPair === void 0 ? void 0 : stakingTokenPair.reserve0,
        amountTokenB: stakingTokenPair === null || stakingTokenPair === void 0 ? void 0 : stakingTokenPair.reserve1,
        userValueCUSD: valueOfUserStakedAmountInCUSD,
        userAmountTokenA,
        userAmountTokenB,
    };
};
