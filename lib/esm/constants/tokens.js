import { ChainId, Token } from '@ubeswap/sdk';
import mapValues from 'lodash/mapValues';
const makeTokens = (addresses, decimals, symbol, name) => {
    return mapValues(addresses, (tokenAddress, network) => {
        return new Token(parseInt(network), tokenAddress, decimals, symbol, name);
    });
};
export const UBE = makeTokens({
    [ChainId.MAINNET]: '0x00Be915B9dCf56a3CBE739D9B9c202ca692409EC',
    [ChainId.ALFAJORES]: '0x00Be915B9dCf56a3CBE739D9B9c202ca692409EC',
    [ChainId.BAKLAVA]: '0x00Be915B9dCf56a3CBE739D9B9c202ca692409EC',
}, 18, 'UBE', 'Ubeswap');
