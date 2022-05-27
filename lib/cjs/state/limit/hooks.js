"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useLimitOrderActionHandlers = exports.useDerivedLimitOrderInfo = exports.useLimitOrderState = void 0;
const use_contractkit_1 = require("@celo-tools/use-contractkit");
const units_1 = require("@ethersproject/units");
const sdk_1 = require("@ubeswap/sdk");
const useTrade_1 = require("components/swap/routing/hooks/useTrade");
const react_1 = require("react");
const react_redux_1 = require("react-redux");
const hooks_1 = require("state/swap/hooks");
const hooks_2 = require("state/wallet/hooks");
const constants_1 = require("../../constants");
const Tokens_1 = require("../../hooks/Tokens");
const useENS_1 = __importDefault(require("../../hooks/useENS"));
const utils_1 = require("../../utils");
const actions_1 = require("./actions");
const BAD_RECIPIENT_ADDRESSES = [
    '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f',
    '0xf164fC0Ec4E93095b804a4795bBe1e041497b92a',
    '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
    constants_1.ROUTER_ADDRESS,
];
function useLimitOrderState() {
    return (0, react_redux_1.useSelector)((state) => state.limit);
}
exports.useLimitOrderState = useLimitOrderState;
// from the current limit order inputs, compute the trade
function useDerivedLimitOrderInfo() {
    var _a;
    const { address: account, network } = (0, use_contractkit_1.useContractKit)();
    const { priceTypedValue, tokenTypedValue, [actions_1.Field.PRICE]: { currencyId: priceCurrencyId }, [actions_1.Field.TOKEN]: { currencyId: tokenCurrencyId }, recipient, buying, } = useLimitOrderState();
    const priceCurrency = (0, Tokens_1.useCurrency)(priceCurrencyId);
    const tokenCurrency = (0, Tokens_1.useCurrency)(tokenCurrencyId);
    const recipientLookup = (0, useENS_1.default)(recipient !== null && recipient !== void 0 ? recipient : undefined);
    const to = (_a = (recipient === null ? account : recipientLookup.address)) !== null && _a !== void 0 ? _a : null;
    const relevantTokenBalances = (0, hooks_2.useCurrencyBalances)(account !== null && account !== void 0 ? account : undefined, [
        priceCurrency !== null && priceCurrency !== void 0 ? priceCurrency : undefined,
        tokenCurrency !== null && tokenCurrency !== void 0 ? tokenCurrency : undefined,
    ]);
    // When buying, the buy asset
    const parsedTokenAmount = (0, hooks_1.tryParseAmount)(tokenTypedValue, tokenCurrency !== null && tokenCurrency !== void 0 ? tokenCurrency : undefined);
    const parsedPrice = (0, hooks_1.tryParseAmount)(priceTypedValue, priceCurrency !== null && priceCurrency !== void 0 ? priceCurrency : undefined);
    // When buying, the sell asset
    const parsedTokenOutput = parsedPrice
        ? (0, hooks_1.tryParseAmount)(parsedTokenAmount === null || parsedTokenAmount === void 0 ? void 0 : parsedTokenAmount.multiply(parsedPrice.numerator).divide(parsedPrice.denominator).toFixed(10), priceCurrency !== null && priceCurrency !== void 0 ? priceCurrency : undefined)
        : undefined;
    const parsedInputTotal = buying ? parsedTokenOutput : parsedTokenAmount;
    const parsedOutputTotal = buying ? parsedTokenAmount : parsedTokenOutput;
    // Determine price as if we were trading 1 of the asset
    const buyTrade = (0, useTrade_1.useUbeswapTradeExactOut)(priceCurrency !== null && priceCurrency !== void 0 ? priceCurrency : undefined, parsedTokenAmount
        ? new sdk_1.TokenAmount(parsedTokenAmount.currency, (0, units_1.parseUnits)('1', parsedTokenAmount.currency.decimals).toString())
        : undefined);
    const sellTrade = (0, useTrade_1.useUbeswapTradeExactIn)(parsedTokenAmount
        ? new sdk_1.TokenAmount(parsedTokenAmount.currency, (0, units_1.parseUnits)('1', parsedTokenAmount.currency.decimals).toString())
        : undefined, priceCurrency !== null && priceCurrency !== void 0 ? priceCurrency : undefined);
    const v2Trade = buying ? buyTrade : sellTrade;
    const currencyBalances = {
        [actions_1.Field.PRICE]: relevantTokenBalances[0],
        [actions_1.Field.TOKEN]: relevantTokenBalances[1],
    };
    const currencies = {
        [actions_1.Field.PRICE]: priceCurrency !== null && priceCurrency !== void 0 ? priceCurrency : undefined,
        [actions_1.Field.TOKEN]: tokenCurrency !== null && tokenCurrency !== void 0 ? tokenCurrency : undefined,
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
    if (!currencies[actions_1.Field.TOKEN] || !currencies[actions_1.Field.PRICE]) {
        inputError = inputError !== null && inputError !== void 0 ? inputError : 'Select a token';
    }
    const formattedTo = (0, utils_1.isAddress)(to);
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
        buying ? currencyBalances[actions_1.Field.PRICE] : currencyBalances[actions_1.Field.TOKEN],
        parsedInputTotal,
    ];
    let showRamp = false;
    if (balanceIn && amountIn && balanceIn.lessThan(amountIn)) {
        if (balanceIn.currency.address === sdk_1.cUSD[network.chainId].address ||
            balanceIn.currency.address === sdk_1.CELO[network.chainId].address ||
            balanceIn.currency.address === sdk_1.cEUR[network.chainId].address) {
            showRamp = true;
        }
        inputError = 'Insufficient ' + amountIn.currency.symbol + ' balance';
    }
    //calculate difference between market price and limit order price for display
    const marketDiffFraction = v2Trade && parsedPrice
        ? new sdk_1.Fraction(parsedPrice === null || parsedPrice === void 0 ? void 0 : parsedPrice.numerator, buying ? v2Trade.executionPrice.invert().numerator : v2Trade.executionPrice.invert().denominator)
        : undefined;
    const aboveMarketPrice = marketDiffFraction && marketDiffFraction.lessThan('1');
    const marketPriceDiffIndicator = marketDiffFraction
        ? aboveMarketPrice
            ? new sdk_1.Fraction('1', '1').subtract(marketDiffFraction).multiply(new sdk_1.Fraction('1000', '10'))
            : marketDiffFraction.subtract(new sdk_1.Fraction('1', '1')).multiply(new sdk_1.Fraction('1000', '10'))
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
exports.useDerivedLimitOrderInfo = useDerivedLimitOrderInfo;
function useLimitOrderActionHandlers() {
    const dispatch = (0, react_redux_1.useDispatch)();
    const onCurrencySelection = (0, react_1.useCallback)((field, currency) => {
        dispatch((0, actions_1.selectCurrency)({
            field,
            currencyId: currency instanceof sdk_1.Token ? currency.address : '',
        }));
    }, [dispatch]);
    const onSwitchTokens = (0, react_1.useCallback)(() => {
        dispatch((0, actions_1.switchCurrencies)());
    }, [dispatch]);
    const onUserInput = (0, react_1.useCallback)((field, typedValue) => {
        dispatch((0, actions_1.typeInput)({ field, typedValue }));
    }, [dispatch]);
    const onChangeRecipient = (0, react_1.useCallback)((recipient) => {
        dispatch((0, actions_1.setRecipient)({ recipient }));
    }, [dispatch]);
    const setBuying = (0, react_1.useCallback)((buying) => {
        dispatch((0, actions_1.setBuying)({ buying }));
    }, [dispatch]);
    return {
        onSwitchTokens,
        onCurrencySelection,
        onUserInput,
        onChangeRecipient,
        setBuying,
    };
}
exports.useLimitOrderActionHandlers = useLimitOrderActionHandlers;
