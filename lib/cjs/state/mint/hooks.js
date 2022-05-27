"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useDerivedMintInfo = exports.useMintActionHandlers = exports.useMintState = void 0;
const use_contractkit_1 = require("@celo-tools/use-contractkit");
const sdk_1 = require("@ubeswap/sdk");
const react_1 = require("react");
const react_redux_1 = require("react-redux");
const Reserves_1 = require("../../data/Reserves");
const TotalSupply_1 = require("../../data/TotalSupply");
const hooks_1 = require("../swap/hooks");
const hooks_2 = require("../wallet/hooks");
const actions_1 = require("./actions");
const ZERO = sdk_1.JSBI.BigInt(0);
function useMintState() {
    return (0, react_redux_1.useSelector)((state) => state.mint);
}
exports.useMintState = useMintState;
function useMintActionHandlers(noLiquidity) {
    const dispatch = (0, react_redux_1.useDispatch)();
    const onFieldAInput = (0, react_1.useCallback)((typedValue) => {
        dispatch((0, actions_1.typeInput)({ field: actions_1.Field.CURRENCY_A, typedValue, noLiquidity: noLiquidity === true }));
    }, [dispatch, noLiquidity]);
    const onFieldBInput = (0, react_1.useCallback)((typedValue) => {
        dispatch((0, actions_1.typeInput)({ field: actions_1.Field.CURRENCY_B, typedValue, noLiquidity: noLiquidity === true }));
    }, [dispatch, noLiquidity]);
    return {
        onFieldAInput,
        onFieldBInput,
    };
}
exports.useMintActionHandlers = useMintActionHandlers;
function useDerivedMintInfo(currencyA, currencyB) {
    var _a, _b, _c, _d;
    const { address: account, network } = (0, use_contractkit_1.useContractKit)();
    const { independentField, typedValue, otherTypedValue } = useMintState();
    const dependentField = independentField === actions_1.Field.CURRENCY_A ? actions_1.Field.CURRENCY_B : actions_1.Field.CURRENCY_A;
    // tokens
    const currencies = (0, react_1.useMemo)(() => ({
        [actions_1.Field.CURRENCY_A]: currencyA !== null && currencyA !== void 0 ? currencyA : undefined,
        [actions_1.Field.CURRENCY_B]: currencyB !== null && currencyB !== void 0 ? currencyB : undefined,
    }), [currencyA, currencyB]);
    // pair
    const [pairState, pair] = (0, Reserves_1.usePair)(currencies[actions_1.Field.CURRENCY_A], currencies[actions_1.Field.CURRENCY_B]);
    const totalSupply = (0, TotalSupply_1.useTotalSupply)(pair === null || pair === void 0 ? void 0 : pair.liquidityToken);
    const noLiquidity = pairState === Reserves_1.PairState.NOT_EXISTS || Boolean(totalSupply && sdk_1.JSBI.equal(totalSupply.raw, ZERO));
    // balances
    const balances = (0, hooks_2.useCurrencyBalances)(account !== null && account !== void 0 ? account : undefined, [
        currencies[actions_1.Field.CURRENCY_A],
        currencies[actions_1.Field.CURRENCY_B],
    ]);
    const currencyBalances = {
        [actions_1.Field.CURRENCY_A]: balances[0],
        [actions_1.Field.CURRENCY_B]: balances[1],
    };
    // amounts
    const independentAmount = (0, hooks_1.tryParseAmount)(typedValue, currencies[independentField]);
    const dependentAmount = (0, react_1.useMemo)(() => {
        if (noLiquidity) {
            if (otherTypedValue && currencies[dependentField]) {
                return (0, hooks_1.tryParseAmount)(otherTypedValue, currencies[dependentField]);
            }
            return undefined;
        }
        else if (independentAmount) {
            // we wrap the currencies just to get the price in terms of the other token
            const wrappedIndependentAmount = independentAmount;
            const [tokenA, tokenB] = [currencyA, currencyB];
            if (tokenA && tokenB && wrappedIndependentAmount && pair) {
                const dependentTokenAmount = dependentField === actions_1.Field.CURRENCY_B
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
    const parsedAmounts = (0, react_1.useMemo)(() => ({
        [actions_1.Field.CURRENCY_A]: independentField === actions_1.Field.CURRENCY_A ? independentAmount : dependentAmount,
        [actions_1.Field.CURRENCY_B]: independentField === actions_1.Field.CURRENCY_A ? dependentAmount : independentAmount,
    }), [independentField, independentAmount, dependentAmount]);
    const price = (0, react_1.useMemo)(() => {
        if (noLiquidity) {
            const { [actions_1.Field.CURRENCY_A]: currencyAAmount, [actions_1.Field.CURRENCY_B]: currencyBAmount } = parsedAmounts;
            if (currencyAAmount && currencyBAmount) {
                return new sdk_1.Price(currencyAAmount.currency, currencyBAmount.currency, currencyAAmount.raw, currencyBAmount.raw);
            }
            return undefined;
        }
        else {
            const wrappedCurrencyA = currencyA;
            return pair && wrappedCurrencyA ? pair.priceOf(wrappedCurrencyA) : undefined;
        }
    }, [currencyA, noLiquidity, pair, parsedAmounts]);
    // liquidity minted
    const liquidityMinted = (0, react_1.useMemo)(() => {
        const { [actions_1.Field.CURRENCY_A]: currencyAAmount, [actions_1.Field.CURRENCY_B]: currencyBAmount } = parsedAmounts;
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
    const poolTokenPercentage = (0, react_1.useMemo)(() => {
        if (liquidityMinted && totalSupply) {
            return new sdk_1.Percent(liquidityMinted.raw, totalSupply.add(liquidityMinted).raw);
        }
        else {
            return undefined;
        }
    }, [liquidityMinted, totalSupply]);
    let error;
    if (!account) {
        error = 'Connect Wallet';
    }
    if (pairState === Reserves_1.PairState.INVALID) {
        error = error !== null && error !== void 0 ? error : 'Invalid pair';
    }
    if (!parsedAmounts[actions_1.Field.CURRENCY_A] || !parsedAmounts[actions_1.Field.CURRENCY_B]) {
        error = error !== null && error !== void 0 ? error : 'Enter an amount';
    }
    const { [actions_1.Field.CURRENCY_A]: currencyAAmount, [actions_1.Field.CURRENCY_B]: currencyBAmount } = parsedAmounts;
    let showRampA = false;
    if (currencyAAmount && ((_a = currencyBalances === null || currencyBalances === void 0 ? void 0 : currencyBalances[actions_1.Field.CURRENCY_A]) === null || _a === void 0 ? void 0 : _a.lessThan(currencyAAmount))) {
        if (currencyAAmount.currency.address === sdk_1.cUSD[network.chainId].address ||
            currencyAAmount.currency.address === sdk_1.CELO[network.chainId].address ||
            currencyAAmount.currency.address === sdk_1.cEUR[network.chainId].address) {
            showRampA = true;
        }
        else {
            error = 'Insufficient ' + ((_b = currencies[actions_1.Field.CURRENCY_A]) === null || _b === void 0 ? void 0 : _b.symbol) + ' balance';
        }
    }
    let showRampB = false;
    if (currencyBAmount && ((_c = currencyBalances === null || currencyBalances === void 0 ? void 0 : currencyBalances[actions_1.Field.CURRENCY_B]) === null || _c === void 0 ? void 0 : _c.lessThan(currencyBAmount))) {
        if (currencyBAmount.currency.address === sdk_1.cUSD[network.chainId].address ||
            currencyBAmount.currency.address === sdk_1.CELO[network.chainId].address ||
            currencyBAmount.currency.address === sdk_1.cEUR[network.chainId].address) {
            showRampB = true;
        }
        else {
            error = 'Insufficient ' + ((_d = currencies[actions_1.Field.CURRENCY_B]) === null || _d === void 0 ? void 0 : _d.symbol) + ' balance';
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
exports.useDerivedMintInfo = useDerivedMintInfo;
