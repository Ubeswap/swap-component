"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useIsListActive = exports.useUnsupportedTokenList = exports.useDefaultTokenList = exports.useCombinedInactiveList = exports.useCombinedActiveList = exports.useInactiveListUrls = exports.useActiveListUrls = exports.useAllLists = exports.listToTokenMap = exports.WrappedTokenInfo = void 0;
const use_contractkit_1 = require("@celo-tools/use-contractkit");
const default_token_list_1 = __importDefault(require("@ubeswap/default-token-list"));
const sdk_1 = require("@ubeswap/sdk");
const default_token_list_2 = __importDefault(require("@uniswap/default-token-list"));
const react_1 = require("react");
const react_redux_1 = require("react-redux");
const listSort_1 = __importDefault(require("utils/listSort"));
const lists_1 = require("./../../constants/lists");
/**
 * Token instances created from token info.
 */
class WrappedTokenInfo extends sdk_1.Token {
    constructor(tokenInfo, tags) {
        super(tokenInfo.chainId, tokenInfo.address, tokenInfo.decimals, tokenInfo.symbol, tokenInfo.name);
        this.tokenInfo = tokenInfo;
        this.tags = tags;
    }
    get logoURI() {
        return this.tokenInfo.logoURI;
    }
}
exports.WrappedTokenInfo = WrappedTokenInfo;
/**
 * An empty result, useful as a default.
 */
const EMPTY_LIST = {
    [use_contractkit_1.ChainId.CeloMainnet]: {},
    [use_contractkit_1.ChainId.Alfajores]: {},
    [use_contractkit_1.ChainId.Baklava]: {},
    [use_contractkit_1.ChainId.EthereumMainnet]: {},
    [use_contractkit_1.ChainId.Kovan]: {},
};
const listCache = typeof WeakMap !== 'undefined' ? new WeakMap() : null;
function listToTokenMap(list) {
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
exports.listToTokenMap = listToTokenMap;
function useAllLists() {
    return (0, react_redux_1.useSelector)((state) => state.lists.byUrl);
}
exports.useAllLists = useAllLists;
function combineMaps(map1, map2) {
    return {
        [use_contractkit_1.ChainId.CeloMainnet]: Object.assign(Object.assign({}, map1[use_contractkit_1.ChainId.CeloMainnet]), map2[use_contractkit_1.ChainId.CeloMainnet]),
        [use_contractkit_1.ChainId.Alfajores]: Object.assign(Object.assign({}, map1[use_contractkit_1.ChainId.Alfajores]), map2[use_contractkit_1.ChainId.Alfajores]),
        [use_contractkit_1.ChainId.Baklava]: Object.assign(Object.assign({}, map1[use_contractkit_1.ChainId.Baklava]), map2[use_contractkit_1.ChainId.Baklava]),
        [use_contractkit_1.ChainId.EthereumMainnet]: Object.assign(Object.assign({}, map1[use_contractkit_1.ChainId.EthereumMainnet]), map2[use_contractkit_1.ChainId.EthereumMainnet]),
        [use_contractkit_1.ChainId.Kovan]: Object.assign(Object.assign({}, map1[use_contractkit_1.ChainId.Kovan]), map2[use_contractkit_1.ChainId.Kovan]),
    };
}
// merge tokens contained within lists from urls
function useCombinedTokenMapFromUrls(urls) {
    const lists = useAllLists();
    return (0, react_1.useMemo)(() => {
        if (!urls)
            return EMPTY_LIST;
        return (urls
            .slice()
            // sort by priority so top priority goes last
            .sort(listSort_1.default)
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
function useActiveListUrls() {
    var _a;
    return (_a = (0, react_redux_1.useSelector)((state) => state.lists.activeListUrls)) === null || _a === void 0 ? void 0 : _a.filter((url) => !lists_1.UNSUPPORTED_LIST_URLS.includes(url));
}
exports.useActiveListUrls = useActiveListUrls;
function useInactiveListUrls() {
    const lists = useAllLists();
    const allActiveListUrls = useActiveListUrls();
    return Object.keys(lists).filter((url) => !(allActiveListUrls === null || allActiveListUrls === void 0 ? void 0 : allActiveListUrls.includes(url)) && !lists_1.UNSUPPORTED_LIST_URLS.includes(url));
}
exports.useInactiveListUrls = useInactiveListUrls;
// get all the tokens from active lists, combine with local default tokens
function useCombinedActiveList() {
    const activeListUrls = useActiveListUrls();
    const activeTokens = useCombinedTokenMapFromUrls(activeListUrls);
    const defaultTokenMap = listToTokenMap(Object.assign(Object.assign({}, default_token_list_1.default), default_token_list_2.default));
    return combineMaps(activeTokens, defaultTokenMap);
}
exports.useCombinedActiveList = useCombinedActiveList;
// all tokens from inactive lists
function useCombinedInactiveList() {
    const allInactiveListUrls = useInactiveListUrls();
    return useCombinedTokenMapFromUrls(allInactiveListUrls);
}
exports.useCombinedInactiveList = useCombinedInactiveList;
// used to hide warnings on import for default tokens
function useDefaultTokenList() {
    return Object.assign(Object.assign({}, listToTokenMap(default_token_list_1.default)), listToTokenMap(default_token_list_2.default));
}
exports.useDefaultTokenList = useDefaultTokenList;
// list of tokens not supported on interface, used to show warnings and prevent swaps and adds
function useUnsupportedTokenList() {
    // get any loaded unsupported tokens
    const loadedUnsupportedListMap = useCombinedTokenMapFromUrls(lists_1.UNSUPPORTED_LIST_URLS);
    // format into one token address map
    return loadedUnsupportedListMap;
}
exports.useUnsupportedTokenList = useUnsupportedTokenList;
function useIsListActive(url) {
    const activeListUrls = useActiveListUrls();
    return Boolean(activeListUrls === null || activeListUrls === void 0 ? void 0 : activeListUrls.includes(url));
}
exports.useIsListActive = useIsListActive;
