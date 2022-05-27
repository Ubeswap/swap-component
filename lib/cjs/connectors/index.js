"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NETWORK_CHAIN_NAME = exports.NETWORK_CHAIN_ID = void 0;
const sdk_1 = require("@ubeswap/sdk");
const networkChainIDFromHostname = window.location.hostname.includes('alfajores')
    ? sdk_1.ChainId.ALFAJORES
    : window.location.hostname.includes('baklava')
        ? sdk_1.ChainId.BAKLAVA
        : sdk_1.ChainId.MAINNET;
exports.NETWORK_CHAIN_ID = process.env.REACT_APP_CHAIN_ID
    ? (0, sdk_1.parseNetwork)(parseInt(process.env.REACT_APP_CHAIN_ID))
    : networkChainIDFromHostname;
const chainIdToName = (chainId) => {
    switch (chainId) {
        case sdk_1.ChainId.ALFAJORES:
            return 'alfajores';
        case sdk_1.ChainId.BAKLAVA:
            return 'baklava';
        case sdk_1.ChainId.MAINNET:
            return 'mainnet';
        default:
            return 'unknown';
    }
};
exports.NETWORK_CHAIN_NAME = chainIdToName(exports.NETWORK_CHAIN_ID);
console.log('Loading Ubeswap interface at', window.location.hostname, networkChainIDFromHostname, exports.NETWORK_CHAIN_ID);
