import { useContractKit } from '@celo-tools/use-contractkit';
import { parseUnits } from '@ethersproject/units';
import { CELO, cEUR, cUSD, Fraction, Token, TokenAmount } from '@ubeswap/sdk';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useUbeswapTradeExactIn, useUbeswapTradeExactOut } from '../../components/swap/routing/hooks/useTrade';
import { ROUTER_ADDRESS } from '../../constants';
import { useCurrency } from '../../hooks/Tokens';
import useENS from '../../hooks/useENS';
import { tryParseAmount } from '../../state/swap/hooks';
import { useCurrencyBalances } from '../../state/wallet/hooks';
import { isAddress } from '../../utils';
import { Field, selectCurrency, setBuying as setBuyingAction, setRecipient, switchCurrencies, typeInput, } from './actions';
const BAD_RECIPIENT_ADDRESSES = [
    '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f',
    '0xf164fC0Ec4E93095b804a4795bBe1e041497b92a',
    '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
    ROUTER_ADDRESS,
];
export function useLimitOrderState() {
    return useSelector((state) => state.limit);
}
// from the current limit order inputs, compute the trade
export function useDerivedLimitOrderInfo() {
    var _a;
    const { address: account, network } = useContractKit();
    const { priceTypedValue, tokenTypedValue, [Field.PRICE]: { currencyId: priceCurrencyId }, [Field.TOKEN]: { currencyId: tokenCurrencyId }, recipient, buying, } = useLimitOrderState();
    const priceCurrency = useCurrency(priceCurrencyId);
    const tokenCurrency = useCurrency(tokenCurrencyId);
    const recipientLookup = useENS(recipient !== null && recipient !== void 0 ? recipient : undefined);
    const to = (_a = (recipient === null ? account : recipientLookup.address)) !== null && _a !== void 0 ? _a : null;
    const relevantTokenBalances = useCurrencyBalances(account !== null && account !== void 0 ? account : undefined, [
        priceCurrency !== null && priceCurrency !== void 0 ? priceCurrency : undefined,
        tokenCurrency !== null && tokenCurrency !== void 0 ? tokenCurrency : undefined,
    ]);
    // When buying, the buy asset
    const parsedTokenAmount = tryParseAmount(tokenTypedValue, tokenCurrency !== null && tokenCurrency !== void 0 ? tokenCurrency : undefined);
    const parsedPrice = tryParseAmount(priceTypedValue, priceCurrency !== null && priceCurrency !== void 0 ? priceCurrency : undefined);
    // When buying, the sell asset
    const parsedTokenOutput = parsedPrice
        ? tryParseAmount(parsedTokenAmount === null || parsedTokenAmount === void 0 ? void 0 : parsedTokenAmount.multiply(parsedPrice.numerator).divide(parsedPrice.denominator).toFixed(10), priceCurrency !== null && priceCurrency !== void 0 ? priceCurrency : undefined)
        : undefined;
    const parsedInputTotal = buying ? parsedTokenOutput : parsedTokenAmount;
    const parsedOutputTotal = buying ? parsedTokenAmount : parsedTokenOutput;
    // Determine price as if we were trading 1 of the asset
    const buyTrade = useUbeswapTradeExactOut(priceCurrency !== null && priceCurrency !== void 0 ? priceCurrency : undefined, parsedTokenAmount
        ? new TokenAmount(parsedTokenAmount.currency, parseUnits('1', parsedTokenAmount.currency.decimals).toString())
        : undefined);
    const sellTrade = useUbeswapTradeExactIn(parsedTokenAmount
        ? new TokenAmount(parsedTokenAmount.currency, parseUnits('1', parsedTokenAmount.currency.decimals).toString())
        : undefined, priceCurrency !== null && priceCurrency !== void 0 ? priceCurrency : undefined);
    const v2Trade = buying ? buyTrade : sellTrade;
    const currencyBalances = {
        [Field.PRICE]: relevantTokenBalances[0],
        [Field.TOKEN]: relevantTokenBalances[1],
    };
    const currencies = {
        [Field.PRICE]: priceCurrency !== null && priceCurrency !== void 0 ? priceCurrency : undefined,
        [Field.TOKEN]: tokenCurrency !== null && tokenCurrency !== void 0 ? tokenCurrency : undefined,
    };
    let inputError;
    if (!account) {
        inputError = 'Connect Wallet';
    }
    if (!parsedTokenAmount) {
        inputError = inputError !== null && inputError !== void 0 ? inputError : 'Enter a token amount';
    }
    else if (!parsedPrice) {
        inputError = inputError !== null && inputError !== void 0 ? inputError : 'Enter a limit order price';
    }
    if (!currencies[Field.TOKEN] || !currencies[Field.PRICE]) {
        inputError = inputError !== null && inputError !== void 0 ? inputError : 'Select a token';
    }
    const formattedTo = isAddress(to);
    if (!to || !formattedTo) {
        inputError = inputError !== null && inputError !== void 0 ? inputError : 'Enter a recipient';
    }
    else {
        if (BAD_RECIPIENT_ADDRESSES.indexOf(formattedTo) !== -1) {
            inputError = inputError !== null && inputError !== void 0 ? inputError : 'Invalid recipient';
        }
    }
    // compare input balance to max input based on version
    const [balanceIn, amountIn] = [
        buying ? currencyBalances[Field.PRICE] : currencyBalances[Field.TOKEN],
        parsedInputTotal,
    ];
    let showRamp = false;
    if (balanceIn && amountIn && balanceIn.lessThan(amountIn)) {
        if (balanceIn.currency.address === cUSD[network.chainId].address ||
            balanceIn.currency.address === CELO[network.chainId].address ||
            balanceIn.currency.address === cEUR[network.chainId].address) {
            showRamp = true;
        }
        inputError = 'Insufficient ' + amountIn.currency.symbol + ' balance';
    }
    //calculate difference between market price and limit order price for display
    const marketDiffFraction = v2Trade && parsedPrice
        ? new Fraction(parsedPrice === null || parsedPrice === void 0 ? void 0 : parsedPrice.numerator, buying ? v2Trade.executionPrice.invert().numerator : v2Trade.executionPrice.invert().denominator)
        : undefined;
    const aboveMarketPrice = marketDiffFraction && marketDiffFraction.lessThan('1');
    const marketPriceDiffIndicator = marketDiffFraction
        ? aboveMarketPrice
            ? new Fraction('1', '1').subtract(marketDiffFraction).multiply(new Fraction('1000', '10'))
            : marketDiffFraction.subtract(new Fraction('1', '1')).multiply(new Fraction('1000', '10'))
        : undefined;
    return {
        currencies,
        currencyBalances,
        parsedInputTotal,
        parsedOutputTotal,
        v2Trade: v2Trade !== null && v2Trade !== void 0 ? v2Trade : undefined,
        showRamp,
        inputError,
        buying,
        marketPriceDiffIndicator,
        aboveMarketPrice,
    };
}
export function useLimitOrderActionHandlers() {
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
    const setBuying = useCallback((buying) => {
        dispatch(setBuyingAction({ buying }));
    }, [dispatch]);
    return {
        onSwitchTokens,
        onCurrencySelection,
        onUserInput,
        onChangeRecipient,
        setBuying,
    };
}
