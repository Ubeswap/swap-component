"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useLPValue = void 0;
const use_contractkit_1 = require("@celo-tools/use-contractkit");
const sdk_1 = require("@ubeswap/sdk");
const index_1 = require("../../constants/index");
const Reserves_1 = require("../../data/Reserves");
const TotalSupply_1 = require("../../data/TotalSupply");
const Tokens_1 = require("../../hooks/Tokens");
const useCUSDPrice_1 = require("../../utils/useCUSDPrice");
const useLPValue = (stakedAmount, farmSummary) => {
    const { network } = (0, use_contractkit_1.useContractKit)();
    const chainId = network.chainId;
    const lpToken = (0, Tokens_1.useToken)(farmSummary ? farmSummary.lpAddress : undefined) || undefined;
    const totalSupplyOfStakingToken = (0, TotalSupply_1.useTotalSupply)(lpToken);
    const token0 = (0, Tokens_1.useToken)(farmSummary ? farmSummary.token0Address : undefined) || undefined;
    const token1 = (0, Tokens_1.useToken)(farmSummary ? farmSummary.token1Address : undefined) || undefined;
    const isSingle = Boolean(farmSummary ? farmSummary.token0Address === farmSummary.token1Address : undefined);
    const [, stakingTokenPair] = (0, Reserves_1.usePair)(token0, token1);
    const cusd = sdk_1.cUSD[chainId];
    const cusdPrice0 = (0, useCUSDPrice_1.useCUSDPrice)(isSingle ? token0 : stakingTokenPair === null || stakingTokenPair === void 0 ? void 0 : stakingTokenPair.token0);
    const cusdPrice1 = (0, useCUSDPrice_1.useCUSDPrice)(isSingle ? token1 : stakingTokenPair === null || stakingTokenPair === void 0 ? void 0 : stakingTokenPair.token1);
    let valueOfUserStakedAmountInCUSD;
    if (totalSupplyOfStakingToken &&
        !totalSupplyOfStakingToken.equalTo('0') &&
        (isSingle || stakingTokenPair) &&
        (cusdPrice0 || cusdPrice1) &&
        token0 &&
        token1) {
        // take the total amount of LP tokens staked, multiply by ETH value of all LP tokens, divide by all LP tokens
        const amount = !stakingTokenPair && cusdPrice0
            ? new sdk_1.TokenAmount(token0, index_1.BIG_INT_ZERO)
            : stakingTokenPair
                ? cusdPrice0
                    ? cusdPrice0.quote(stakingTokenPair.reserve0)
                    : cusdPrice1 === null || cusdPrice1 === void 0 ? void 0 : cusdPrice1.quote(stakingTokenPair.reserve1)
                : undefined;
        if (amount) {
            valueOfUserStakedAmountInCUSD = isSingle
                ? new sdk_1.TokenAmount(cusd, cusdPrice0
                    ? sdk_1.JSBI.divide(sdk_1.JSBI.multiply(sdk_1.JSBI.BigInt(stakedAmount), cusdPrice0 === null || cusdPrice0 === void 0 ? void 0 : cusdPrice0.numerator), cusdPrice0 === null || cusdPrice0 === void 0 ? void 0 : cusdPrice0.denominator)
                    : index_1.BIG_INT_ZERO)
                : new sdk_1.TokenAmount(cusd, stakedAmount
                    ? sdk_1.JSBI.divide(sdk_1.JSBI.multiply(sdk_1.JSBI.multiply(sdk_1.JSBI.BigInt(stakedAmount), amount.raw), 
                    // this is b/c the value of LP shares are ~double the value of the cUSD they entitle owner to
                    sdk_1.JSBI.BigInt(2)), totalSupplyOfStakingToken.raw)
                    : index_1.BIG_INT_ZERO);
        }
    }
    const userAmountTokenA = stakingTokenPair && totalSupplyOfStakingToken && !totalSupplyOfStakingToken.equalTo('0')
        ? new sdk_1.TokenAmount(stakingTokenPair.reserve0.token, sdk_1.JSBI.divide(sdk_1.JSBI.multiply(sdk_1.JSBI.BigInt(stakedAmount), stakingTokenPair.reserve0.raw), totalSupplyOfStakingToken.raw))
        : undefined;
    const userAmountTokenB = stakingTokenPair && stakedAmount && totalSupplyOfStakingToken && !totalSupplyOfStakingToken.equalTo('0')
        ? new sdk_1.TokenAmount(stakingTokenPair.reserve1.token, sdk_1.JSBI.divide(sdk_1.JSBI.multiply(sdk_1.JSBI.BigInt(stakedAmount), stakingTokenPair.reserve1.raw), totalSupplyOfStakingToken.raw))
        : undefined;
    return {
        amountTokenA: stakingTokenPair === null || stakingTokenPair === void 0 ? void 0 : stakingTokenPair.reserve0,
        amountTokenB: stakingTokenPair === null || stakingTokenPair === void 0 ? void 0 : stakingTokenPair.reserve1,
        userValueCUSD: valueOfUserStakedAmountInCUSD,
        userAmountTokenA,
        userAmountTokenB,
    };
};
exports.useLPValue = useLPValue;
