"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_ACTIVE_LIST_URLS = exports.DEFAULT_LIST_OF_LISTS = exports.UNSUPPORTED_LIST_URLS = void 0;
/**
 * @TODO add list from blockchain association
 */
exports.UNSUPPORTED_LIST_URLS = [];
const UBESWAP_LIST = 'https://raw.githubusercontent.com/Ubeswap/default-token-list/master/ubeswap.token-list.json';
const UBESWAP_EXPERIMENTAL_LIST = 'https://raw.githubusercontent.com/Ubeswap/default-token-list/master/ubeswap-experimental.token-list.json';
const UNISWAP_LIST = 'https://raw.githubusercontent.com/compound-finance/token-list/master/compound.tokenlist.json';
// lower index == higher priority for token import
exports.DEFAULT_LIST_OF_LISTS = [
    UBESWAP_LIST,
    UBESWAP_EXPERIMENTAL_LIST,
    UNISWAP_LIST,
    ...exports.UNSUPPORTED_LIST_URLS, // need to load unsupported tokens as well
];
// default lists to be 'active' aka searched across
exports.DEFAULT_ACTIVE_LIST_URLS = [UBESWAP_LIST, UNISWAP_LIST];
