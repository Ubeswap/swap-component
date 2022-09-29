"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useDefaultsFromURLSearch = exports.queryParametersToSwapState = exports.useDerivedSwapInfo = exports.tryParseAmount = exports.useSwapActionHandlers = exports.useSwapState = void 0;
const use_contractkit_1 = require("@celo-tools/use-contractkit");
const units_1 = require("@ethersproject/units");
const sdk_1 = require("@ubeswap/sdk");
const react_1 = require("react");
const react_redux_1 = require("react-redux");
const useTrade_1 = require("../../components/swap/routing/hooks/useTrade");
const constants_1 = require("../../constants");
const Tokens_1 = require("../../hooks/Tokens");
const useENS_1 = __importDefault(require("../../hooks/useENS"));
const useParsedQueryString_1 = __importDefault(require("../../hooks/useParsedQueryString"));
const utils_1 = require("../../utils");
const prices_1 = require("../../utils/prices");
const hooks_1 = require("../user/hooks");
const hooks_2 = require("../wallet/hooks");
const actions_1 = require("./actions");
function useSwapState() {
    return (0, react_redux_1.useSelector)((state) => state.swap);
}
exports.useSwapState = useSwapState;
function useSwapActionHandlers() {
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
    return {
        onSwitchTokens,
        onCurrencySelection,
        onUserInput,
        onChangeRecipient,
    };
}
exports.useSwapActionHandlers = useSwapActionHandlers;
// try to parse a user entered amount for a given token
function tryParseAmount(value, currency) {
    if (!value || !currency) {
        return undefined;
    }
    try {
        const typedValueParsed = (0, units_1.parseUnits)(value, currency.decimals).toString();
        if (typedValueParsed !== '0') {
            return new sdk_1.TokenAmount(currency, sdk_1.JSBI.BigInt(typedValueParsed));
        }
    }
    catch (error) {
        // should fail if the user specifies too many decimal places of precision (or maybe exceed max uint?)
        console.debug(`Failed to parse input amount: "${value}"`, error);
    }
    // necessary for all paths to return a value
    return new sdk_1.TokenAmount(currency, sdk_1.JSBI.BigInt(0));
}
exports.tryParseAmount = tryParseAmount;
const BAD_RECIPIENT_ADDRESSES = [
    '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f',
    '0xf164fC0Ec4E93095b804a4795bBe1e041497b92a',
    '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
    constants_1.ROUTER_ADDRESS,
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
function useDerivedSwapInfo() {
    var _a, _b;
    const { address: account, network } = (0, use_contractkit_1.useContractKit)();
    const { independentField, typedValue, [actions_1.Field.INPUT]: { currencyId: inputCurrencyId }, [actions_1.Field.OUTPUT]: { currencyId: outputCurrencyId }, recipient, } = useSwapState();
    const inputCurrency = (0, Tokens_1.useCurrency)(inputCurrencyId);
    const outputCurrency = (0, Tokens_1.useCurrency)(outputCurrencyId);
    const recipientLookup = (0, useENS_1.default)(recipient !== null && recipient !== void 0 ? recipient : undefined);
    const to = (_a = (recipient === null ? account : recipientLookup.address)) !== null && _a !== void 0 ? _a : null;
    const relevantTokenBalances = (0, hooks_2.useCurrencyBalances)(account !== null && account !== void 0 ? account : undefined, [
        inputCurrency !== null && inputCurrency !== void 0 ? inputCurrency : undefined,
        outputCurrency !== null && outputCurrency !== void 0 ? outputCurrency : undefined,
    ]);
    const isExactIn = independentField === actions_1.Field.INPUT;
    const parsedAmount = tryParseAmount(typedValue, (_b = (isExactIn ? inputCurrency : outputCurrency)) !== null && _b !== void 0 ? _b : undefined);
    const minimaBestTradeExactIn = (0, useTrade_1.useMinimaTrade)(isExactIn ? parsedAmount : undefined, outputCurrency !== null && outputCurrency !== void 0 ? outputCurrency : undefined);
    const ubeBestTradeExactIn = (0, useTrade_1.useUbeswapTradeExactIn)(isExactIn ? parsedAmount : undefined, outputCurrency !== null && outputCurrency !== void 0 ? outputCurrency : undefined);
    const bestTradeExactIn = minimaBestTradeExactIn === undefined ? undefined : minimaBestTradeExactIn !== null && minimaBestTradeExactIn !== void 0 ? minimaBestTradeExactIn : ubeBestTradeExactIn;
    const bestTradeExactOut = (0, useTrade_1.useUbeswapTradeExactOut)(inputCurrency !== null && inputCurrency !== void 0 ? inputCurrency : undefined, !isExactIn ? parsedAmount : undefined);
    const v2Trade = isExactIn ? bestTradeExactIn : bestTradeExactOut;
    const currencyBalances = {
        [actions_1.Field.INPUT]: relevantTokenBalances[0],
        [actions_1.Field.OUTPUT]: relevantTokenBalances[1],
    };
    const currencies = {
        [actions_1.Field.INPUT]: inputCurrency !== null && inputCurrency !== void 0 ? inputCurrency : undefined,
        [actions_1.Field.OUTPUT]: outputCurrency !== null && outputCurrency !== void 0 ? outputCurrency : undefined,
    };
    let inputError;
    if (!account) {
        inputError = 'Connect Wallet';
    }
    if (!parsedAmount) {
        inputError = inputError !== null && inputError !== void 0 ? inputError : 'Enter an amount';
    }
    if (!currencies[actions_1.Field.INPUT] || !currencies[actions_1.Field.OUTPUT]) {
        inputError = inputError !== null && inputError !== void 0 ? inputError : 'Select a token';
    }
    const formattedTo = (0, utils_1.isAddress)(to);
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
    const [allowedSlippage] = (0, hooks_1.useUserSlippageTolerance)();
    const slippageAdjustedAmounts = v2Trade && allowedSlippage && (0, prices_1.computeSlippageAdjustedAmounts)(v2Trade, allowedSlippage);
    // compare input balance to max input based on version
    const [balanceIn, amountIn] = [
        currencyBalances[actions_1.Field.INPUT],
        slippageAdjustedAmounts ? slippageAdjustedAmounts[actions_1.Field.INPUT] : null,
    ];
    let showRamp = false;
    if (balanceIn && amountIn && balanceIn.lessThan(amountIn)) {
        if (amountIn.currency.address === sdk_1.cUSD[network.chainId].address ||
            amountIn.currency.address === sdk_1.CELO[network.chainId].address ||
            amountIn.currency.address === sdk_1.cEUR[network.chainId].address) {
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
exports.useDerivedSwapInfo = useDerivedSwapInfo;
function parseCurrencyFromURLParameter(urlParam, chainId) {
    var _a;
    if (typeof urlParam === 'string') {
        const valid = (0, utils_1.isAddress)(urlParam);
        if (valid)
            return valid;
        if (urlParam.toUpperCase() === 'CUSD')
            return sdk_1.cUSD[chainId].address;
        if (valid === false)
            return sdk_1.cUSD[chainId].address;
    }
    return (_a = sdk_1.cUSD[chainId].address) !== null && _a !== void 0 ? _a : '';
}
function parseTokenAmountURLParameter(urlParam) {
    return typeof urlParam === 'string' && !isNaN(parseFloat(urlParam)) ? urlParam : '';
}
function parseIndependentFieldURLParameter(urlParam) {
    return typeof urlParam === 'string' && urlParam.toLowerCase() === 'output' ? actions_1.Field.OUTPUT : actions_1.Field.INPUT;
}
const ENS_NAME_REGEX = /^[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)?$/;
const ADDRESS_REGEX = /^0x[a-fA-F0-9]{40}$/;
function validatedRecipient(recipient) {
    if (typeof recipient !== 'string')
        return null;
    const address = (0, utils_1.isAddress)(recipient);
    if (address)
        return address;
    if (ENS_NAME_REGEX.test(recipient))
        return recipient;
    if (ADDRESS_REGEX.test(recipient))
        return recipient;
    return null;
}
function queryParametersToSwapState(parsedQs, chainId) {
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
        [actions_1.Field.INPUT]: {
            currencyId: inputCurrency,
        },
        [actions_1.Field.OUTPUT]: {
            currencyId: outputCurrency,
        },
        typedValue: parseTokenAmountURLParameter(parsedQs.exactAmount),
        independentField: parseIndependentFieldURLParameter(parsedQs.exactField),
        recipient,
    };
}
exports.queryParametersToSwapState = queryParametersToSwapState;
// updates the swap state to use the defaults for a given network
function useDefaultsFromURLSearch() {
    const { network } = (0, use_contractkit_1.useContractKit)();
    const chainId = network.chainId;
    const dispatch = (0, react_redux_1.useDispatch)();
    const parsedQs = (0, useParsedQueryString_1.default)();
    const [result, setResult] = (0, react_1.useState)();
    (0, react_1.useEffect)(() => {
        if (!chainId)
            return;
        const parsed = queryParametersToSwapState(parsedQs, chainId);
        dispatch((0, actions_1.replaceSwapState)({
            typedValue: parsed.typedValue,
            field: parsed.independentField,
            inputCurrencyId: parsed[actions_1.Field.INPUT].currencyId,
            outputCurrencyId: parsed[actions_1.Field.OUTPUT].currencyId,
            recipient: parsed.recipient,
        }));
        setResult({ inputCurrencyId: parsed[actions_1.Field.INPUT].currencyId, outputCurrencyId: parsed[actions_1.Field.OUTPUT].currencyId });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, chainId]);
    return result;
}
exports.useDefaultsFromURLSearch = useDefaultsFromURLSearch;
