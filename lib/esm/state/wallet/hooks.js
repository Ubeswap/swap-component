import { useContractKit } from '@celo-tools/use-contractkit';
import { JSBI, Token, TokenAmount } from '@ubeswap/sdk';
import { UBE } from 'constants/tokens';
import { useMemo } from 'react';
import ERC20_INTERFACE from '../../constants/abis/erc20';
import { useAllTokens } from '../../hooks/Tokens';
import { isAddress } from '../../utils';
import { useMultipleContractSingleData } from '../multicall/hooks';
/**
 * Returns a map of token addresses to their eventually consistent token balances for a single account.
 */
export function useTokenBalancesWithLoadingIndicator(address, tokens) {
    const validatedTokens = useMemo(() => { var _a; return (_a = tokens === null || tokens === void 0 ? void 0 : tokens.filter((t) => isAddress(t === null || t === void 0 ? void 0 : t.address) !== false)) !== null && _a !== void 0 ? _a : []; }, [tokens]);
    const validatedTokenAddresses = useMemo(() => validatedTokens.map((vt) => vt.address), [validatedTokens]);
    const balances = useMultipleContractSingleData(validatedTokenAddresses, ERC20_INTERFACE, 'balanceOf', [address]);
    const anyLoading = useMemo(() => balances.some((callState) => callState.loading), [balances]);
    return [
        useMemo(() => address && validatedTokens.length > 0
            ? validatedTokens.reduce((memo, token, i) => {
                var _a, _b;
                const value = (_b = (_a = balances === null || balances === void 0 ? void 0 : balances[i]) === null || _a === void 0 ? void 0 : _a.result) === null || _b === void 0 ? void 0 : _b[0];
                const amount = value ? JSBI.BigInt(value.toString()) : undefined;
                if (amount) {
                    memo[token.address] = new TokenAmount(token, amount);
                }
                return memo;
            }, {})
            : {}, [address, validatedTokens, balances]),
        anyLoading,
    ];
}
export function useTokenBalances(address, tokens) {
    return useTokenBalancesWithLoadingIndicator(address, tokens)[0];
}
// get the balance for a single token/account combo
export function useTokenBalance(account, token) {
    const tokenBalances = useTokenBalances(account, [token]);
    if (!token)
        return undefined;
    return tokenBalances[token.address];
}
export function useCurrencyBalances(account, currencies) {
    const tokens = useMemo(() => { var _a; return (_a = currencies === null || currencies === void 0 ? void 0 : currencies.filter((currency) => currency instanceof Token)) !== null && _a !== void 0 ? _a : []; }, [currencies]);
    const tokenBalances = useTokenBalances(account, tokens);
    return useMemo(() => {
        var _a;
        return (_a = currencies === null || currencies === void 0 ? void 0 : currencies.map((currency) => {
            if (!account || !currency)
                return undefined;
            if (currency instanceof Token)
                return tokenBalances[currency.address];
            return undefined;
        })) !== null && _a !== void 0 ? _a : [];
    }, [account, currencies, tokenBalances]);
}
export function useCurrencyBalance(account, currency) {
    return useCurrencyBalances(account, [currency])[0];
}
// mimics useAllBalances
export function useAllTokenBalances() {
    const { address: account } = useContractKit();
    const allTokens = useAllTokens();
    const allTokensArray = useMemo(() => Object.values(allTokens !== null && allTokens !== void 0 ? allTokens : {}), [allTokens]);
    const balances = useTokenBalances(account !== null && account !== void 0 ? account : undefined, allTokensArray);
    return balances !== null && balances !== void 0 ? balances : {};
}
// get the total owned, unclaimed, and unharvested UBE for account
export function useAggregateUbeBalance() {
    const { address, network: { chainId }, } = useContractKit();
    const ube = chainId ? UBE[chainId] : undefined;
    const ubeBalance = useTokenBalance(address !== null && address !== void 0 ? address : undefined, ube);
    if (!ube)
        return undefined;
    return ubeBalance;
}
