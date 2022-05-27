import { ChainId, parseNetwork } from '@ubeswap/sdk';
const networkChainIDFromHostname = window.location.hostname.includes('alfajores')
    ? ChainId.ALFAJORES
    : window.location.hostname.includes('baklava')
        ? ChainId.BAKLAVA
        : ChainId.MAINNET;
export const NETWORK_CHAIN_ID = process.env.REACT_APP_CHAIN_ID
    ? parseNetwork(parseInt(process.env.REACT_APP_CHAIN_ID))
    : networkChainIDFromHostname;
const chainIdToName = (chainId) => {
    switch (chainId) {
        case ChainId.ALFAJORES:
            return 'alfajores';
        case ChainId.BAKLAVA:
            return 'baklava';
        case ChainId.MAINNET:
            return 'mainnet';
        default:
            return 'unknown';
    }
};
export const NETWORK_CHAIN_NAME = chainIdToName(NETWORK_CHAIN_ID);
console.log('Loading Ubeswap interface at', window.location.hostname, networkChainIDFromHostname, NETWORK_CHAIN_ID);
