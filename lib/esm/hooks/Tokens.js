import { useContractKit } from '@celo-tools/use-contractkit';
import { parseBytes32String } from '@ethersproject/strings';
import { currencyEquals, Token } from '@ubeswap/sdk';
import { arrayify } from 'ethers/lib/utils';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { filterTokens } from '../components/SearchModal/filtering';
import { useCombinedActiveList, useCombinedInactiveList } from '../state/lists/hooks';
import { NEVER_RELOAD, useSingleCallResult } from '../state/multicall/hooks';
import { useUserAddedTokens } from '../state/user/hooks';
import { isAddress } from '../utils';
import { useDefaultTokenList, useUnsupportedTokenList } from './../state/lists/hooks';
import { useBytes32TokenContract, useTokenContract } from './useContract';
// reduce token map into standard address <-> Token mapping, optionally include user added tokens
function useTokensFromMap(tokenMap, includeUserAdded, chainIdOpt) {
    const { network } = useContractKit();
    const accountInfo = useSelector((state) => state.swap.accountInfo);
    const chainId = chainIdOpt || (accountInfo ? accountInfo.chainId : network.chainId);
    const userAddedTokens = useUserAddedTokens();
    return useMemo(() => {
        if (!chainId || !tokenMap[chainId])
            return {};
        // reduce to just tokens
        const mapWithoutUrls = Object.keys(tokenMap[chainId]).reduce((newMap, address) => {
            newMap[address] = tokenMap[chainId][address].token;
            return newMap;
        }, {});
        if (includeUserAdded) {
            return (userAddedTokens
                // reduce into all ALL_TOKENS filtered by the current chain
                .reduce((tokenMap, token) => {
                tokenMap[token.address] = token;
                return tokenMap;
            }, Object.assign({}, mapWithoutUrls)));
        }
        return mapWithoutUrls;
    }, [chainId, userAddedTokens, tokenMap, includeUserAdded]);
}
export function useDefaultTokens() {
    const defaultList = useDefaultTokenList();
    return useTokensFromMap(defaultList, false);
}
export function useAllTokens(chainId, defaultTokenLists) {
    const allTokens = useCombinedActiveList(defaultTokenLists);
    return useTokensFromMap(allTokens, true, chainId);
}
export function useAllInactiveTokens() {
    // get inactive tokens
    const inactiveTokensMap = useCombinedInactiveList();
    const inactiveTokens = useTokensFromMap(inactiveTokensMap, false);
    // filter out any token that are on active list
    const activeTokensAddresses = Object.keys(useAllTokens());
    const filteredInactive = activeTokensAddresses
        ? Object.keys(inactiveTokens).reduce((newMap, address) => {
            if (!activeTokensAddresses.includes(address)) {
                newMap[address] = inactiveTokens[address];
            }
            return newMap;
        }, {})
        : inactiveTokens;
    return filteredInactive;
}
export function useUnsupportedTokens() {
    const unsupportedTokensMap = useUnsupportedTokenList();
    return useTokensFromMap(unsupportedTokensMap, false);
}
export function useIsTokenActive(token) {
    const activeTokens = useAllTokens();
    if (!activeTokens || !token) {
        return false;
    }
    return !!activeTokens[token.address];
}
// used to detect extra search results
export function useFoundOnInactiveList(searchQuery) {
    const accountInfo = useSelector((state) => state.swap.accountInfo);
    const { network } = useContractKit();
    const chainId = accountInfo ? accountInfo.chainId : network.chainId;
    const inactiveTokens = useAllInactiveTokens();
    return useMemo(() => {
        if (!chainId || searchQuery === '') {
            return undefined;
        }
        else {
            const tokens = filterTokens(Object.values(inactiveTokens), searchQuery);
            return tokens;
        }
    }, [chainId, inactiveTokens, searchQuery]);
}
// Check if currency is included in custom list from user storage
export function useIsUserAddedToken(currency) {
    const userAddedTokens = useUserAddedTokens();
    if (!currency) {
        return false;
    }
    return !!userAddedTokens.find((token) => currencyEquals(currency, token));
}
// parse a name or symbol from a token response
const BYTES32_REGEX = /^0x[a-fA-F0-9]{64}$/;
function parseStringOrBytes32(str, bytes32, defaultValue) {
    return str && str.length > 0
        ? str
        : // need to check for proper bytes string and valid terminator
            bytes32 && BYTES32_REGEX.test(bytes32) && arrayify(bytes32)[31] === 0
                ? parseBytes32String(bytes32)
                : defaultValue;
}
// undefined if invalid or does not exist
// null if loading
// otherwise returns the token
export function useToken(tokenAddress) {
    const accountInfo = useSelector((state) => state.swap.accountInfo);
    const { network } = useContractKit();
    const chainId = accountInfo ? accountInfo.chainId : network.chainId;
    const tokens = useAllTokens();
    const address = isAddress(tokenAddress);
    const tokenContract = useTokenContract(address ? address : undefined, false);
    const tokenContractBytes32 = useBytes32TokenContract(address ? address : undefined, false);
    const token = address ? tokens[address] : undefined;
    const tokenName = useSingleCallResult(token ? undefined : tokenContract, 'name', undefined, NEVER_RELOAD);
    const tokenNameBytes32 = useSingleCallResult(token ? undefined : tokenContractBytes32, 'name', undefined, NEVER_RELOAD);
    const symbol = useSingleCallResult(token ? undefined : tokenContract, 'symbol', undefined, NEVER_RELOAD);
    const symbolBytes32 = useSingleCallResult(token ? undefined : tokenContractBytes32, 'symbol', undefined, NEVER_RELOAD);
    const decimals = useSingleCallResult(token ? undefined : tokenContract, 'decimals', undefined, NEVER_RELOAD);
    return useMemo(() => {
        var _a, _b, _c, _d;
        if (token)
            return token;
        if (!chainId || !address)
            return undefined;
        if (decimals.loading || symbol.loading || tokenName.loading)
            return null;
        if (decimals.result) {
            return new Token(chainId, address, decimals.result[0], parseStringOrBytes32((_a = symbol.result) === null || _a === void 0 ? void 0 : _a[0], (_b = symbolBytes32.result) === null || _b === void 0 ? void 0 : _b[0], 'UNKNOWN'), parseStringOrBytes32((_c = tokenName.result) === null || _c === void 0 ? void 0 : _c[0], (_d = tokenNameBytes32.result) === null || _d === void 0 ? void 0 : _d[0], 'Unknown Token'));
        }
        return undefined;
    }, [
        address,
        chainId,
        decimals.loading,
        decimals.result,
        symbol.loading,
        symbol.result,
        symbolBytes32.result,
        token,
        tokenName.loading,
        tokenName.result,
        tokenNameBytes32.result,
    ]);
}
export function useCurrency(currencyId) {
    const token = useToken(currencyId);
    return token;
}
