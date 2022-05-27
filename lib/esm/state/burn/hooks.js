import { useContractKit } from '@celo-tools/use-contractkit';
import { JSBI, Percent, TokenAmount } from '@ubeswap/sdk';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { usePair } from '../../data/Reserves';
import { useTotalSupply } from '../../data/TotalSupply';
import { tryParseAmount } from '../swap/hooks';
import { useTokenBalances } from '../wallet/hooks';
import { Field, typeInput } from './actions';
export function useBurnState() {
    return useSelector((state) => state.burn);
}
export function useDerivedBurnInfo(currencyA, currencyB) {
    var _a, _b;
    const { address: account } = useContractKit();
    const { independentField, typedValue } = useBurnState();
    // pair + totalsupply
    const [, pair] = usePair(currencyA, currencyB);
    // balances
    const relevantTokenBalances = useTokenBalances(account !== null && account !== void 0 ? account : undefined, [pair === null || pair === void 0 ? void 0 : pair.liquidityToken]);
    const userLiquidity = relevantTokenBalances === null || relevantTokenBalances === void 0 ? void 0 : relevantTokenBalances[(_b = (_a = pair === null || pair === void 0 ? void 0 : pair.liquidityToken) === null || _a === void 0 ? void 0 : _a.address) !== null && _b !== void 0 ? _b : ''];
    const [tokenA, tokenB] = [currencyA, currencyB];
    const tokens = {
        [Field.CURRENCY_A]: tokenA,
        [Field.CURRENCY_B]: tokenB,
        [Field.LIQUIDITY]: pair === null || pair === void 0 ? void 0 : pair.liquidityToken,
    };
    // liquidity values
    const totalSupply = useTotalSupply(pair === null || pair === void 0 ? void 0 : pair.liquidityToken);
    const liquidityValueA = pair &&
        totalSupply &&
        userLiquidity &&
        tokenA &&
        // this condition is a short-circuit in the case where useTokenBalance updates sooner than useTotalSupply
        JSBI.greaterThanOrEqual(totalSupply.raw, userLiquidity.raw)
        ? new TokenAmount(tokenA, pair.getLiquidityValue(tokenA, totalSupply, userLiquidity, false).raw)
        : undefined;
    const liquidityValueB = pair &&
        totalSupply &&
        userLiquidity &&
        tokenB &&
        // this condition is a short-circuit in the case where useTokenBalance updates sooner than useTotalSupply
        JSBI.greaterThanOrEqual(totalSupply.raw, userLiquidity.raw)
        ? new TokenAmount(tokenB, pair.getLiquidityValue(tokenB, totalSupply, userLiquidity, false).raw)
        : undefined;
    const liquidityValues = {
        [Field.CURRENCY_A]: liquidityValueA,
        [Field.CURRENCY_B]: liquidityValueB,
    };
    let percentToRemove = new Percent('0', '100');
    // user specified a %
    if (independentField === Field.LIQUIDITY_PERCENT) {
        percentToRemove = new Percent(typedValue, '100');
    }
    // user specified a specific amount of liquidity tokens
    else if (independentField === Field.LIQUIDITY) {
        if (pair === null || pair === void 0 ? void 0 : pair.liquidityToken) {
            const independentAmount = tryParseAmount(typedValue, pair.liquidityToken);
            if (independentAmount && userLiquidity && !independentAmount.greaterThan(userLiquidity)) {
                percentToRemove = new Percent(independentAmount.raw, userLiquidity.raw);
            }
        }
    }
    // user specified a specific amount of token a or b
    else {
        if (tokens[independentField]) {
            const independentAmount = tryParseAmount(typedValue, tokens[independentField]);
            const liquidityValue = liquidityValues[independentField];
            if (independentAmount && liquidityValue && !independentAmount.greaterThan(liquidityValue)) {
                percentToRemove = new Percent(independentAmount.raw, liquidityValue.raw);
            }
        }
    }
    const parsedAmounts = {
        [Field.LIQUIDITY_PERCENT]: percentToRemove,
        [Field.LIQUIDITY]: userLiquidity && percentToRemove && percentToRemove.greaterThan('0')
            ? new TokenAmount(userLiquidity.token, percentToRemove.multiply(userLiquidity.raw).quotient)
            : undefined,
        [Field.CURRENCY_A]: tokenA && percentToRemove && percentToRemove.greaterThan('0') && liquidityValueA
            ? new TokenAmount(tokenA, percentToRemove.multiply(liquidityValueA.raw).quotient)
            : undefined,
        [Field.CURRENCY_B]: tokenB && percentToRemove && percentToRemove.greaterThan('0') && liquidityValueB
            ? new TokenAmount(tokenB, percentToRemove.multiply(liquidityValueB.raw).quotient)
            : undefined,
    };
    let error;
    if (!account) {
        error = 'Connect Wallet';
    }
    if (!parsedAmounts[Field.LIQUIDITY] || !parsedAmounts[Field.CURRENCY_A] || !parsedAmounts[Field.CURRENCY_B]) {
        error = error !== null && error !== void 0 ? error : 'Enter an amount';
    }
    return { pair, parsedAmounts, error };
}
export function useBurnActionHandlers() {
    const dispatch = useDispatch();
    const onUserInput = useCallback((field, typedValue) => {
        dispatch(typeInput({ field, typedValue }));
    }, [dispatch]);
    return {
        onUserInput,
    };
}
