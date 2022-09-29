import { ChainId } from '@celo-tools/use-contractkit';
import UBESWAP_TOKEN_LIST from '@ubeswap/default-token-list';
import { Token } from '@ubeswap/sdk';
import UNISWAP_TOKEN_LIST from '@uniswap/default-token-list';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { UNSUPPORTED_LIST_URLS } from '../../constants/lists';
import sortByListPriority from '../../utils/listSort';
/**
 * Token instances created from token info.
 */
export class WrappedTokenInfo extends Token {
    constructor(tokenInfo, tags) {
        super(tokenInfo.chainId, tokenInfo.address, tokenInfo.decimals, tokenInfo.symbol, tokenInfo.name);
        this.tokenInfo = tokenInfo;
        this.tags = tags;
    }
    get logoURI() {
        return this.tokenInfo.logoURI;
    }
}
/**
 * An empty result, useful as a default.
 */
const EMPTY_LIST = {
    [ChainId.Mainnet]: {},
    [ChainId.Alfajores]: {},
    [ChainId.Baklava]: {},
};
const listCache = typeof WeakMap !== 'undefined' ? new WeakMap() : null;
export function listToTokenMap(list) {
    const result = listCache === null || listCache === void 0 ? void 0 : listCache.get(list);
    if (result)
        return result;
    const map = list.tokens.reduce((tokenMap, tokenInfo) => {
        var _a, _b, _c, _d;
        const tags = (_c = (_b = (_a = tokenInfo.tags) === null || _a === void 0 ? void 0 : _a.map((tagId) => {
            var _a;
            if (!((_a = list.tags) === null || _a === void 0 ? void 0 : _a[tagId]))
                return undefined;
            return Object.assign(Object.assign({}, list.tags[tagId]), { id: tagId });
        })) === null || _b === void 0 ? void 0 : _b.filter((x) => Boolean(x))) !== null && _c !== void 0 ? _c : [];
        const token = new WrappedTokenInfo(tokenInfo, tags);
        if (((_d = tokenMap[token.chainId]) === null || _d === void 0 ? void 0 : _d[token.address]) !== undefined)
            throw Error(`Duplicate tokens found for ${token.name}`);
        return Object.assign(Object.assign({}, tokenMap), { [token.chainId]: Object.assign(Object.assign({}, tokenMap[token.chainId]), { [token.address]: {
                    token,
                    list: list,
                } }) });
    }, Object.assign({}, EMPTY_LIST));
    listCache === null || listCache === void 0 ? void 0 : listCache.set(list, map);
    return map;
}
export function useAllLists() {
    return useSelector((state) => state.lists.byUrl);
}
function combineMaps(map1, map2) {
    return {
        [ChainId.Mainnet]: Object.assign(Object.assign({}, map1[ChainId.Mainnet]), map2[ChainId.Mainnet]),
        [ChainId.Alfajores]: Object.assign(Object.assign({}, map1[ChainId.Alfajores]), map2[ChainId.Alfajores]),
        [ChainId.Baklava]: Object.assign(Object.assign({}, map1[ChainId.Baklava]), map2[ChainId.Baklava]),
    };
}
// merge tokens contained within lists from urls
function useCombinedTokenMapFromUrls(urls) {
    const lists = useAllLists();
    return useMemo(() => {
        if (!urls)
            return EMPTY_LIST;
        return (urls
            .slice()
            // sort by priority so top priority goes last
            .sort(sortByListPriority)
            .reduce((allTokens, currentUrl) => {
            var _a;
            const current = (_a = lists[currentUrl]) === null || _a === void 0 ? void 0 : _a.current;
            if (!current)
                return allTokens;
            try {
                const newTokens = Object.assign(listToTokenMap(current));
                return combineMaps(allTokens, newTokens);
            }
            catch (error) {
                console.error('Could not show token list due to error', error);
                return allTokens;
            }
        }, EMPTY_LIST));
    }, [lists, urls]);
}
// filter out unsupported lists
export function useActiveListUrls() {
    var _a;
    return (_a = useSelector((state) => state.lists.activeListUrls)) === null || _a === void 0 ? void 0 : _a.filter((url) => !UNSUPPORTED_LIST_URLS.includes(url));
}
export function useInactiveListUrls() {
    const lists = useAllLists();
    const allActiveListUrls = useActiveListUrls();
    return Object.keys(lists).filter((url) => !(allActiveListUrls === null || allActiveListUrls === void 0 ? void 0 : allActiveListUrls.includes(url)) && !UNSUPPORTED_LIST_URLS.includes(url));
}
// get all the tokens from active lists, combine with local default tokens
export function useCombinedActiveList() {
    const activeListUrls = useActiveListUrls();
    const activeTokens = useCombinedTokenMapFromUrls(activeListUrls);
    const defaultTokenMap = listToTokenMap(Object.assign(Object.assign({}, UBESWAP_TOKEN_LIST), UNISWAP_TOKEN_LIST));
    return combineMaps(activeTokens, defaultTokenMap);
}
// all tokens from inactive lists
export function useCombinedInactiveList() {
    const allInactiveListUrls = useInactiveListUrls();
    return useCombinedTokenMapFromUrls(allInactiveListUrls);
}
// used to hide warnings on import for default tokens
export function useDefaultTokenList() {
    return Object.assign(Object.assign({}, listToTokenMap(UBESWAP_TOKEN_LIST)), listToTokenMap(UNISWAP_TOKEN_LIST));
}
// list of tokens not supported on interface, used to show warnings and prevent swaps and adds
export function useUnsupportedTokenList() {
    // get any loaded unsupported tokens
    const loadedUnsupportedListMap = useCombinedTokenMapFromUrls(UNSUPPORTED_LIST_URLS);
    // format into one token address map
    return loadedUnsupportedListMap;
}
export function useIsListActive(url) {
    const activeListUrls = useActiveListUrls();
    return Boolean(activeListUrls === null || activeListUrls === void 0 ? void 0 : activeListUrls.includes(url));
}
