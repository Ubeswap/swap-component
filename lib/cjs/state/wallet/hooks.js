"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAggregateUbeBalance = exports.useAllTokenBalances = exports.useCurrencyBalance = exports.useCurrencyBalances = exports.useTokenBalance = exports.useTokenBalances = exports.useTokenBalancesWithLoadingIndicator = void 0;
const use_contractkit_1 = require("@celo-tools/use-contractkit");
const sdk_1 = require("@ubeswap/sdk");
const react_1 = require("react");
const react_redux_1 = require("react-redux");
const erc20_1 = __importDefault(require("../../constants/abis/erc20"));
const tokens_1 = require("../../constants/tokens");
const Tokens_1 = require("../../hooks/Tokens");
const utils_1 = require("../../utils");
const hooks_1 = require("../multicall/hooks");
/**
 * Returns a map of token addresses to their eventually consistent token balances for a single account.
 */
function useTokenBalancesWithLoadingIndicator(address, tokens) {
    const validatedTokens = (0, react_1.useMemo)(() => { var _a; return (_a = tokens === null || tokens === void 0 ? void 0 : tokens.filter((t) => (0, utils_1.isAddress)(t === null || t === void 0 ? void 0 : t.address) !== false)) !== null && _a !== void 0 ? _a : []; }, [tokens]);
    const validatedTokenAddresses = (0, react_1.useMemo)(() => validatedTokens.map((vt) => vt.address), [validatedTokens]);
    const balances = (0, hooks_1.useMultipleContractSingleData)(validatedTokenAddresses, erc20_1.default, 'balanceOf', [address]);
    const anyLoading = (0, react_1.useMemo)(() => balances.some((callState) => callState.loading), [balances]);
    return [
        (0, react_1.useMemo)(() => address && validatedTokens.length > 0
            ? validatedTokens.reduce((memo, token, i) => {
                var _a, _b;
                const value = (_b = (_a = balances === null || balances === void 0 ? void 0 : balances[i]) === null || _a === void 0 ? void 0 : _a.result) === null || _b === void 0 ? void 0 : _b[0];
                const amount = value ? sdk_1.JSBI.BigInt(value.toString()) : undefined;
                if (amount) {
                    memo[token.address] = new sdk_1.TokenAmount(token, amount);
                }
                return memo;
            }, {})
            : {}, [address, validatedTokens, balances]),
        anyLoading,
    ];
}
exports.useTokenBalancesWithLoadingIndicator = useTokenBalancesWithLoadingIndicator;
function useTokenBalances(address, tokens) {
    return useTokenBalancesWithLoadingIndicator(address, tokens)[0];
}
exports.useTokenBalances = useTokenBalances;
// get the balance for a single token/account combo
function useTokenBalance(account, token) {
    const tokenBalances = useTokenBalances(account, [token]);
    if (!token)
        return undefined;
    return tokenBalances[token.address];
}
exports.useTokenBalance = useTokenBalance;
function useCurrencyBalances(account, currencies) {
    const tokens = (0, react_1.useMemo)(() => { var _a; return (_a = currencies === null || currencies === void 0 ? void 0 : currencies.filter((currency) => currency instanceof sdk_1.Token)) !== null && _a !== void 0 ? _a : []; }, [currencies]);
    const tokenBalances = useTokenBalances(account, tokens);
    return (0, react_1.useMemo)(() => {
        var _a;
        return (_a = currencies === null || currencies === void 0 ? void 0 : currencies.map((currency) => {
            if (!account || !currency)
                return undefined;
            if (currency instanceof sdk_1.Token)
                return tokenBalances[currency.address];
            return undefined;
        })) !== null && _a !== void 0 ? _a : [];
    }, [account, currencies, tokenBalances]);
}
exports.useCurrencyBalances = useCurrencyBalances;
function useCurrencyBalance(account, currency) {
    return useCurrencyBalances(account, [currency])[0];
}
exports.useCurrencyBalance = useCurrencyBalance;
// mimics useAllBalances
function useAllTokenBalances() {
    const { address } = (0, use_contractkit_1.useContractKit)();
    const accountInfo = (0, react_redux_1.useSelector)((state) => state.swap.accountInfo);
    const account = accountInfo ? accountInfo.account : address;
    const allTokens = (0, Tokens_1.useAllTokens)();
    const allTokensArray = (0, react_1.useMemo)(() => Object.values(allTokens !== null && allTokens !== void 0 ? allTokens : {}), [allTokens]);
    const balances = useTokenBalances(account !== null && account !== void 0 ? account : undefined, allTokensArray);
    return balances !== null && balances !== void 0 ? balances : {};
}
exports.useAllTokenBalances = useAllTokenBalances;
// get the total owned, unclaimed, and unharvested UBE for account
function useAggregateUbeBalance() {
    const { address, network } = (0, use_contractkit_1.useContractKit)();
    const accountInfo = (0, react_redux_1.useSelector)((state) => state.swap.accountInfo);
    const chainId = accountInfo ? accountInfo.chainId : network.chainId;
    const ube = chainId ? tokens_1.UBE[chainId] : undefined;
    const ubeBalance = useTokenBalance(address !== null && address !== void 0 ? address : undefined, ube);
    if (!ube)
        return undefined;
    return ubeBalance;
}
exports.useAggregateUbeBalance = useAggregateUbeBalance;
