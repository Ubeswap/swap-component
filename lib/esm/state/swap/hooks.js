import { useContractKit } from '@celo-tools/use-contractkit';
import { parseUnits } from '@ethersproject/units';
import { CELO, cEUR, cUSD, JSBI, Token, TokenAmount } from '@ubeswap/sdk';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMinimaTrade, useUbeswapTradeExactIn, useUbeswapTradeExactOut, } from '../../components/swap/routing/hooks/useTrade';
import { ROUTER_ADDRESS } from '../../constants';
import { useCurrency } from '../../hooks/Tokens';
import useENS from '../../hooks/useENS';
import useParsedQueryString from '../../hooks/useParsedQueryString';
import { isAddress } from '../../utils';
import { computeSlippageAdjustedAmounts } from '../../utils/prices';
import { useUserSlippageTolerance } from '../user/hooks';
import { useCurrencyBalances } from '../wallet/hooks';
import { Field, replaceSwapState, selectCurrency, setRecipient, switchCurrencies, typeInput } from './actions';
export function useSwapState() {
    return useSelector((state) => state.swap);
}
export function useSwapActionHandlers() {
    const dispatch = useDispatch();
    const onCurrencySelection = useCallback((field, currency) => {
        dispatch(selectCurrency({
            field,
            currencyId: currency instanceof Token ? currency.address : '',
        }));
    }, [dispatch]);
    const onSwitchTokens = useCallback(() => {
        dispatch(switchCurrencies());
    }, [dispatch]);
    const onUserInput = useCallback((field, typedValue) => {
        dispatch(typeInput({ field, typedValue }));
    }, [dispatch]);
    const onChangeRecipient = useCallback((recipient) => {
        dispatch(setRecipient({ recipient }));
    }, [dispatch]);
    return {
        onSwitchTokens,
        onCurrencySelection,
        onUserInput,
        onChangeRecipient,
    };
}
// try to parse a user entered amount for a given token
export function tryParseAmount(value, currency) {
    if (!value || !currency) {
        return undefined;
    }
    try {
        const typedValueParsed = parseUnits(value, currency.decimals).toString();
        if (typedValueParsed !== '0') {
            return new TokenAmount(currency, JSBI.BigInt(typedValueParsed));
        }
    }
    catch (error) {
        // should fail if the user specifies too many decimal places of precision (or maybe exceed max uint?)
        console.debug(`Failed to parse input amount: "${value}"`, error);
    }
    // necessary for all paths to return a value
    return new TokenAmount(currency, JSBI.BigInt(0));
}
const BAD_RECIPIENT_ADDRESSES = [
    '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f',
    '0xf164fC0Ec4E93095b804a4795bBe1e041497b92a',
    '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
    ROUTER_ADDRESS,
];
/**
 * Returns true if any of the pairs or tokens in a trade have the given checksummed address
 * @param trade to check for the given address
 * @param checksummedAddress address to check in the pairs and tokens
 */
function involvesAddress(trade, checksummedAddress) {
    return (trade.route.path.some((token) => token.address === checksummedAddress) ||
        trade.route.pairs.some((pair) => pair.liquidityToken.address === checksummedAddress));
}
// from the current swap inputs, compute the best trade and return it.
export function useDerivedSwapInfo(minimaPartnerId) {
    var _a, _b;
    const { address, network } = useContractKit();
    const accountInfo = useSelector((state) => state.swap.accountInfo);
    const account = accountInfo ? accountInfo.account : address;
    const chainId = accountInfo ? accountInfo.chainId : network.chainId;
    const { independentField, typedValue, [Field.INPUT]: { currencyId: inputCurrencyId }, [Field.OUTPUT]: { currencyId: outputCurrencyId }, recipient, } = useSwapState();
    const inputCurrency = useCurrency(inputCurrencyId);
    const outputCurrency = useCurrency(outputCurrencyId);
    const recipientLookup = useENS(recipient !== null && recipient !== void 0 ? recipient : undefined);
    const to = (_a = (recipient === null ? account : recipientLookup.address)) !== null && _a !== void 0 ? _a : null;
    const relevantTokenBalances = useCurrencyBalances(account !== null && account !== void 0 ? account : undefined, [
        inputCurrency !== null && inputCurrency !== void 0 ? inputCurrency : undefined,
        outputCurrency !== null && outputCurrency !== void 0 ? outputCurrency : undefined,
    ]);
    const isExactIn = independentField === Field.INPUT;
    const parsedAmount = tryParseAmount(typedValue, (_b = (isExactIn ? inputCurrency : outputCurrency)) !== null && _b !== void 0 ? _b : undefined);
    const minimaBestTradeExactIn = useMinimaTrade(isExactIn ? parsedAmount : undefined, outputCurrency !== null && outputCurrency !== void 0 ? outputCurrency : undefined, minimaPartnerId);
    const ubeBestTradeExactIn = useUbeswapTradeExactIn(isExactIn ? parsedAmount : undefined, outputCurrency !== null && outputCurrency !== void 0 ? outputCurrency : undefined);
    const bestTradeExactIn = minimaBestTradeExactIn === undefined ? undefined : minimaBestTradeExactIn !== null && minimaBestTradeExactIn !== void 0 ? minimaBestTradeExactIn : ubeBestTradeExactIn;
    const bestTradeExactOut = useUbeswapTradeExactOut(inputCurrency !== null && inputCurrency !== void 0 ? inputCurrency : undefined, !isExactIn ? parsedAmount : undefined);
    const v2Trade = isExactIn ? bestTradeExactIn : bestTradeExactOut;
    const currencyBalances = {
        [Field.INPUT]: relevantTokenBalances[0],
        [Field.OUTPUT]: relevantTokenBalances[1],
    };
    const currencies = {
        [Field.INPUT]: inputCurrency !== null && inputCurrency !== void 0 ? inputCurrency : undefined,
        [Field.OUTPUT]: outputCurrency !== null && outputCurrency !== void 0 ? outputCurrency : undefined,
    };
    let inputError;
    if (!account) {
        inputError = 'Connect Wallet';
    }
    if (!parsedAmount) {
        inputError = inputError !== null && inputError !== void 0 ? inputError : 'Enter an amount';
    }
    if (!currencies[Field.INPUT] || !currencies[Field.OUTPUT]) {
        inputError = inputError !== null && inputError !== void 0 ? inputError : 'Select a token';
    }
    const formattedTo = isAddress(to);
    if (!to || !formattedTo) {
        inputError = inputError !== null && inputError !== void 0 ? inputError : 'Enter a recipient';
    }
    else {
        if (BAD_RECIPIENT_ADDRESSES.indexOf(formattedTo) !== -1 ||
            (bestTradeExactIn && involvesAddress(bestTradeExactIn, formattedTo)) ||
            (bestTradeExactOut && involvesAddress(bestTradeExactOut, formattedTo))) {
            inputError = inputError !== null && inputError !== void 0 ? inputError : 'Invalid recipient';
        }
    }
    const [allowedSlippage] = useUserSlippageTolerance();
    const slippageAdjustedAmounts = v2Trade && allowedSlippage && computeSlippageAdjustedAmounts(v2Trade, allowedSlippage);
    // compare input balance to max input based on version
    const [balanceIn, amountIn] = [
        currencyBalances[Field.INPUT],
        slippageAdjustedAmounts ? slippageAdjustedAmounts[Field.INPUT] : null,
    ];
    let showRamp = false;
    if (balanceIn && amountIn && balanceIn.lessThan(amountIn)) {
        if (amountIn.currency.address === cUSD[chainId].address ||
            amountIn.currency.address === CELO[chainId].address ||
            amountIn.currency.address === cEUR[chainId].address) {
            showRamp = true;
        }
        inputError = 'Insufficient ' + amountIn.currency.symbol + ' balance';
    }
    return {
        currencies,
        currencyBalances,
        parsedAmount,
        v2Trade: v2Trade !== null && v2Trade !== void 0 ? v2Trade : undefined,
        showRamp,
        inputError,
    };
}
function parseCurrencyFromURLParameter(urlParam, chainId) {
    var _a;
    if (typeof urlParam === 'string') {
        const valid = isAddress(urlParam);
        if (valid)
            return valid;
        if (urlParam.toUpperCase() === 'CUSD')
            return cUSD[chainId].address;
        if (valid === false)
            return cUSD[chainId].address;
    }
    return (_a = cUSD[chainId].address) !== null && _a !== void 0 ? _a : '';
}
function parseTokenAmountURLParameter(urlParam) {
    return typeof urlParam === 'string' && !isNaN(parseFloat(urlParam)) ? urlParam : '';
}
function parseIndependentFieldURLParameter(urlParam) {
    return typeof urlParam === 'string' && urlParam.toLowerCase() === 'output' ? Field.OUTPUT : Field.INPUT;
}
const ENS_NAME_REGEX = /^[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)?$/;
const ADDRESS_REGEX = /^0x[a-fA-F0-9]{40}$/;
function validatedRecipient(recipient) {
    if (typeof recipient !== 'string')
        return null;
    const address = isAddress(recipient);
    if (address)
        return address;
    if (ENS_NAME_REGEX.test(recipient))
        return recipient;
    if (ADDRESS_REGEX.test(recipient))
        return recipient;
    return null;
}
export function queryParametersToSwapState(parsedQs, chainId) {
    let inputCurrency = parseCurrencyFromURLParameter(parsedQs.inputCurrency, chainId);
    let outputCurrency = parseCurrencyFromURLParameter(parsedQs.outputCurrency, chainId);
    if (inputCurrency === outputCurrency) {
        if (typeof parsedQs.outputCurrency === 'string') {
            inputCurrency = '';
        }
        else {
            outputCurrency = '';
        }
    }
    const recipient = validatedRecipient(parsedQs.recipient);
    return {
        [Field.INPUT]: {
            currencyId: inputCurrency,
        },
        [Field.OUTPUT]: {
            currencyId: outputCurrency,
        },
        typedValue: parseTokenAmountURLParameter(parsedQs.exactAmount),
        independentField: parseIndependentFieldURLParameter(parsedQs.exactField),
        recipient,
    };
}
// updates the swap state to use the defaults for a given network
export function useDefaultsFromURLSearch(defaultSwapToken) {
    const { network } = useContractKit();
    const accountInfo = useSelector((state) => state.swap.accountInfo);
    const chainId = (accountInfo ? accountInfo.chainId : network.chainId);
    const dispatch = useDispatch();
    const parsedQs = useParsedQueryString();
    const [result, setResult] = useState();
    useEffect(() => {
        if (!chainId)
            return;
        const parsed = queryParametersToSwapState(parsedQs, chainId);
        dispatch(replaceSwapState({
            typedValue: parsed.typedValue,
            field: parsed.independentField,
            inputCurrencyId: isAddress(defaultSwapToken) ? defaultSwapToken : parsed[Field.INPUT].currencyId,
            outputCurrencyId: parsed[Field.OUTPUT].currencyId,
            recipient: parsed.recipient,
        }));
        setResult({ inputCurrencyId: parsed[Field.INPUT].currencyId, outputCurrencyId: parsed[Field.OUTPUT].currencyId });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, chainId]);
    return result;
}
