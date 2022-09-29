"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCUSDPriceOfULP = exports.useCUSDPrice = exports.useCUSDPrices = void 0;
const use_contractkit_1 = require("@celo-tools/use-contractkit");
const sdk_1 = require("@ubeswap/sdk");
const react_1 = require("react");
const index_1 = require("../constants/index");
const Reserves_1 = require("../data/Reserves");
const TotalSupply_1 = require("../data/TotalSupply");
const Tokens_1 = require("../hooks/Tokens");
const useContract_1 = require("../hooks/useContract");
const hooks_1 = require("../state/multicall/hooks");
/**
 * Returns the price in cUSD of the input currency
 * @param currency currency to compute the cUSD price of
 */
function useCUSDPrices(tokens) {
    const { network: { chainId }, } = (0, use_contractkit_1.useContractKit)();
    const CUSD = sdk_1.cUSD[chainId];
    const celo = sdk_1.CELO[chainId];
    const tokenPairs = (0, react_1.useMemo)(() => tokens === null || tokens === void 0 ? void 0 : tokens.map((token) => [
        [token && (0, sdk_1.currencyEquals)(token, CUSD) ? undefined : token, CUSD],
        [token && (0, sdk_1.currencyEquals)(token, celo) ? undefined : token, celo],
        [celo, CUSD],
    ]).flat(), [CUSD, celo, tokens]);
    const thesePairs = (0, Reserves_1.usePairs)(tokenPairs);
    return (0, react_1.useMemo)(() => {
        if (!tokens || !chainId) {
            return undefined;
        }
        const pairs = thesePairs.map((x) => x[1]);
        return tokens.map((token, idx) => {
            const start = idx * 3;
            const [cUSDPair, celoPair, celoCUSDPair] = [pairs[start], pairs[start + 1], pairs[start + 2]];
            // handle cUSD
            if (token.equals(CUSD)) {
                return new sdk_1.Price(CUSD, CUSD, '1', '1');
            }
            if (cUSDPair) {
                return cUSDPair.priceOf(token);
            }
            if (celoPair && celoCUSDPair) {
                return celoPair.priceOf(token).multiply(celoCUSDPair.priceOf(celo));
            }
            return undefined;
        });
    }, [chainId, tokens, CUSD, celo, thesePairs]);
}
exports.useCUSDPrices = useCUSDPrices;
/**
 * Returns the price in cUSD of the input currency
 * @param token the token to get the cUSD price of
 */
function useCUSDPrice(token) {
    const { network: { chainId }, } = (0, use_contractkit_1.useContractKit)();
    const CUSD = sdk_1.cUSD[chainId];
    const celo = sdk_1.CELO[chainId];
    const mcUSD = index_1.MCUSD[chainId];
    const tokenPairs = (0, react_1.useMemo)(() => [
        [token && (0, sdk_1.currencyEquals)(token, CUSD) ? undefined : token, CUSD],
        [token && (0, sdk_1.currencyEquals)(token, celo) ? undefined : token, celo],
        [token && mcUSD && (0, sdk_1.currencyEquals)(token, mcUSD) ? undefined : token, mcUSD ? mcUSD : undefined],
        [celo, CUSD],
    ], [CUSD, celo, mcUSD, token]);
    const [[, cUSDPair], [, celoPair], [, mcUSDPair], [, celoCUSDPair]] = (0, Reserves_1.usePairs)(tokenPairs);
    const cusdPairAddr = token ? sdk_1.Pair.getAddress(token, CUSD) : undefined;
    const cusdPairTotalSupply = (0, TotalSupply_1.useTotalSupply)((0, Tokens_1.useToken)(cusdPairAddr) || undefined);
    const mcusdPairAddr = token && mcUSD && token.address !== mcUSD.address ? sdk_1.Pair.getAddress(token, mcUSD) : undefined;
    const mcusdPairTotalSupply = (0, TotalSupply_1.useTotalSupply)((0, Tokens_1.useToken)(mcusdPairAddr) || undefined);
    return (0, react_1.useMemo)(() => {
        if (!token || !chainId) {
            return undefined;
        }
        // handle cUSD
        if (token.equals(CUSD)) {
            return new sdk_1.Price(CUSD, CUSD, '1', '1');
        }
        if (mcUSDPair && cUSDPair && cusdPairTotalSupply && mcusdPairTotalSupply) {
            try {
                if (sdk_1.JSBI.greaterThan(mcUSDPair.getLiquidityMinted(mcusdPairTotalSupply, mcUSDPair.reserve0, mcUSDPair.reserve1).raw, cUSDPair.getLiquidityMinted(cusdPairTotalSupply, cUSDPair.reserve0, cUSDPair.reserve1).raw)) {
                    return mcUSDPair.priceOf(token);
                }
            }
            catch (e) {
                if (e.message != 'Invariant failed: LIQUIDITY') {
                    console.log(e);
                }
            }
        }
        if (cUSDPair) {
            return cUSDPair.priceOf(token);
        }
        if (celoPair && celoCUSDPair) {
            return celoPair.priceOf(token).multiply(celoCUSDPair.priceOf(celo));
        }
        return undefined;
    }, [
        chainId,
        token,
        CUSD,
        cUSDPair,
        celo,
        celoCUSDPair,
        celoPair,
        mcUSDPair,
        cusdPairTotalSupply,
        mcusdPairTotalSupply,
    ]);
}
exports.useCUSDPrice = useCUSDPrice;
/**
 * Returns the price in cUSD of the input currency
 * @param currency currency to compute the cUSD price of
 */
const useCUSDPriceOfULP = (stakingToken) => {
    var _a, _b, _c, _d;
    const { network: { chainId }, } = (0, use_contractkit_1.useContractKit)();
    const pair = (0, useContract_1.usePairContract)(stakingToken ? stakingToken.address : '');
    const token0Address = (_b = (_a = (0, hooks_1.useSingleCallResult)(pair, 'token0', [])) === null || _a === void 0 ? void 0 : _a.result) === null || _b === void 0 ? void 0 : _b[0];
    const token1Address = (_d = (_c = (0, hooks_1.useSingleCallResult)(pair, 'token1', [])) === null || _c === void 0 ? void 0 : _c.result) === null || _d === void 0 ? void 0 : _d[0];
    const totalSupplyOfStakingToken = (0, TotalSupply_1.useTotalSupply)(stakingToken);
    const token0 = (0, Tokens_1.useToken)(token0Address) || undefined;
    const token1 = (0, Tokens_1.useToken)(token1Address) || undefined;
    const [, stakingTokenPair] = (0, Reserves_1.usePair)(token0, token1);
    const cusdPrice0 = useCUSDPrice(stakingTokenPair === null || stakingTokenPair === void 0 ? void 0 : stakingTokenPair.token0);
    const cusdPrice1 = useCUSDPrice(stakingTokenPair === null || stakingTokenPair === void 0 ? void 0 : stakingTokenPair.token1);
    const CUSD = sdk_1.cUSD[chainId];
    return (0, react_1.useMemo)(() => {
        if (!stakingToken || !chainId) {
            return undefined;
        }
        // handle cUSD
        if (stakingToken.equals(CUSD)) {
            return new sdk_1.Price(CUSD, CUSD, '1', '1');
        }
        if (stakingToken &&
            totalSupplyOfStakingToken &&
            !totalSupplyOfStakingToken.equalTo('0') &&
            cusdPrice0 &&
            cusdPrice1 &&
            stakingTokenPair &&
            (stakingTokenPair === null || stakingTokenPair === void 0 ? void 0 : stakingTokenPair.reserve0) &&
            (stakingTokenPair === null || stakingTokenPair === void 0 ? void 0 : stakingTokenPair.reserve1)) {
            const amount0 = cusdPrice0.quote(stakingTokenPair.reserve0);
            const amount1 = cusdPrice1.quote(stakingTokenPair.reserve1);
            const token1CUSDPrice = amount0.divide(totalSupplyOfStakingToken);
            const token2CUSDPrice = amount1.divide(totalSupplyOfStakingToken);
            const amount = token1CUSDPrice.add(token2CUSDPrice);
            return new sdk_1.Price(stakingToken, CUSD, amount.denominator, amount.numerator);
        }
        return undefined;
    }, [stakingToken, chainId, CUSD, totalSupplyOfStakingToken, cusdPrice0, cusdPrice1, stakingTokenPair]);
};
exports.useCUSDPriceOfULP = useCUSDPriceOfULP;
