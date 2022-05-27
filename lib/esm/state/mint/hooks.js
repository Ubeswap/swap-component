import { useContractKit } from '@celo-tools/use-contractkit';
import { CELO, cEUR, cUSD, JSBI, Percent, Price } from '@ubeswap/sdk';
import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PairState, usePair } from '../../data/Reserves';
import { useTotalSupply } from '../../data/TotalSupply';
import { tryParseAmount } from '../swap/hooks';
import { useCurrencyBalances } from '../wallet/hooks';
import { Field, typeInput } from './actions';
const ZERO = JSBI.BigInt(0);
export function useMintState() {
    return useSelector((state) => state.mint);
}
export function useMintActionHandlers(noLiquidity) {
    const dispatch = useDispatch();
    const onFieldAInput = useCallback((typedValue) => {
        dispatch(typeInput({ field: Field.CURRENCY_A, typedValue, noLiquidity: noLiquidity === true }));
    }, [dispatch, noLiquidity]);
    const onFieldBInput = useCallback((typedValue) => {
        dispatch(typeInput({ field: Field.CURRENCY_B, typedValue, noLiquidity: noLiquidity === true }));
    }, [dispatch, noLiquidity]);
    return {
        onFieldAInput,
        onFieldBInput,
    };
}
export function useDerivedMintInfo(currencyA, currencyB) {
    var _a, _b, _c, _d;
    const { address: account, network } = useContractKit();
    const { independentField, typedValue, otherTypedValue } = useMintState();
    const dependentField = independentField === Field.CURRENCY_A ? Field.CURRENCY_B : Field.CURRENCY_A;
    // tokens
    const currencies = useMemo(() => ({
        [Field.CURRENCY_A]: currencyA !== null && currencyA !== void 0 ? currencyA : undefined,
        [Field.CURRENCY_B]: currencyB !== null && currencyB !== void 0 ? currencyB : undefined,
    }), [currencyA, currencyB]);
    // pair
    const [pairState, pair] = usePair(currencies[Field.CURRENCY_A], currencies[Field.CURRENCY_B]);
    const totalSupply = useTotalSupply(pair === null || pair === void 0 ? void 0 : pair.liquidityToken);
    const noLiquidity = pairState === PairState.NOT_EXISTS || Boolean(totalSupply && JSBI.equal(totalSupply.raw, ZERO));
    // balances
    const balances = useCurrencyBalances(account !== null && account !== void 0 ? account : undefined, [
        currencies[Field.CURRENCY_A],
        currencies[Field.CURRENCY_B],
    ]);
    const currencyBalances = {
        [Field.CURRENCY_A]: balances[0],
        [Field.CURRENCY_B]: balances[1],
    };
    // amounts
    const independentAmount = tryParseAmount(typedValue, currencies[independentField]);
    const dependentAmount = useMemo(() => {
        if (noLiquidity) {
            if (otherTypedValue && currencies[dependentField]) {
                return tryParseAmount(otherTypedValue, currencies[dependentField]);
            }
            return undefined;
        }
        else if (independentAmount) {
            // we wrap the currencies just to get the price in terms of the other token
            const wrappedIndependentAmount = independentAmount;
            const [tokenA, tokenB] = [currencyA, currencyB];
            if (tokenA && tokenB && wrappedIndependentAmount && pair) {
                const dependentTokenAmount = dependentField === Field.CURRENCY_B
                    ? pair.priceOf(tokenA).quote(wrappedIndependentAmount)
                    : pair.priceOf(tokenB).quote(wrappedIndependentAmount);
                return dependentTokenAmount;
            }
            return undefined;
        }
        else {
            return undefined;
        }
    }, [noLiquidity, otherTypedValue, currencies, dependentField, independentAmount, currencyA, currencyB, pair]);
    const parsedAmounts = useMemo(() => ({
        [Field.CURRENCY_A]: independentField === Field.CURRENCY_A ? independentAmount : dependentAmount,
        [Field.CURRENCY_B]: independentField === Field.CURRENCY_A ? dependentAmount : independentAmount,
    }), [independentField, independentAmount, dependentAmount]);
    const price = useMemo(() => {
        if (noLiquidity) {
            const { [Field.CURRENCY_A]: currencyAAmount, [Field.CURRENCY_B]: currencyBAmount } = parsedAmounts;
            if (currencyAAmount && currencyBAmount) {
                return new Price(currencyAAmount.currency, currencyBAmount.currency, currencyAAmount.raw, currencyBAmount.raw);
            }
            return undefined;
        }
        else {
            const wrappedCurrencyA = currencyA;
            return pair && wrappedCurrencyA ? pair.priceOf(wrappedCurrencyA) : undefined;
        }
    }, [currencyA, noLiquidity, pair, parsedAmounts]);
    // liquidity minted
    const liquidityMinted = useMemo(() => {
        const { [Field.CURRENCY_A]: currencyAAmount, [Field.CURRENCY_B]: currencyBAmount } = parsedAmounts;
        const [tokenAmountA, tokenAmountB] = [currencyAAmount, currencyBAmount];
        try {
            if (pair && totalSupply && tokenAmountA && tokenAmountB) {
                return pair.getLiquidityMinted(totalSupply, tokenAmountA, tokenAmountB);
            }
        }
        catch (e) {
            console.warn(e);
        }
        return undefined;
    }, [parsedAmounts, pair, totalSupply]);
    const poolTokenPercentage = useMemo(() => {
        if (liquidityMinted && totalSupply) {
            return new Percent(liquidityMinted.raw, totalSupply.add(liquidityMinted).raw);
        }
        else {
            return undefined;
        }
    }, [liquidityMinted, totalSupply]);
    let error;
    if (!account) {
        error = 'Connect Wallet';
    }
    if (pairState === PairState.INVALID) {
        error = error !== null && error !== void 0 ? error : 'Invalid pair';
    }
    if (!parsedAmounts[Field.CURRENCY_A] || !parsedAmounts[Field.CURRENCY_B]) {
        error = error !== null && error !== void 0 ? error : 'Enter an amount';
    }
    const { [Field.CURRENCY_A]: currencyAAmount, [Field.CURRENCY_B]: currencyBAmount } = parsedAmounts;
    let showRampA = false;
    if (currencyAAmount && ((_a = currencyBalances === null || currencyBalances === void 0 ? void 0 : currencyBalances[Field.CURRENCY_A]) === null || _a === void 0 ? void 0 : _a.lessThan(currencyAAmount))) {
        if (currencyAAmount.currency.address === cUSD[network.chainId].address ||
            currencyAAmount.currency.address === CELO[network.chainId].address ||
            currencyAAmount.currency.address === cEUR[network.chainId].address) {
            showRampA = true;
        }
        else {
            error = 'Insufficient ' + ((_b = currencies[Field.CURRENCY_A]) === null || _b === void 0 ? void 0 : _b.symbol) + ' balance';
        }
    }
    let showRampB = false;
    if (currencyBAmount && ((_c = currencyBalances === null || currencyBalances === void 0 ? void 0 : currencyBalances[Field.CURRENCY_B]) === null || _c === void 0 ? void 0 : _c.lessThan(currencyBAmount))) {
        if (currencyBAmount.currency.address === cUSD[network.chainId].address ||
            currencyBAmount.currency.address === CELO[network.chainId].address ||
            currencyBAmount.currency.address === cEUR[network.chainId].address) {
            showRampB = true;
        }
        else {
            error = 'Insufficient ' + ((_d = currencies[Field.CURRENCY_B]) === null || _d === void 0 ? void 0 : _d.symbol) + ' balance';
        }
    }
    return {
        dependentField,
        currencies,
        pair,
        pairState,
        currencyBalances,
        parsedAmounts,
        price,
        noLiquidity,
        liquidityMinted,
        poolTokenPercentage,
        error,
        showRampA,
        showRampB,
    };
}
