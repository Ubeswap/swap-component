"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UBE = void 0;
const sdk_1 = require("@ubeswap/sdk");
const mapValues_1 = __importDefault(require("lodash/mapValues"));
const makeTokens = (addresses, decimals, symbol, name) => {
    return (0, mapValues_1.default)(addresses, (tokenAddress, network) => {
        return new sdk_1.Token(parseInt(network), tokenAddress, decimals, symbol, name);
    });
};
exports.UBE = makeTokens({
    [sdk_1.ChainId.MAINNET]: '0x00Be915B9dCf56a3CBE739D9B9c202ca692409EC',
    [sdk_1.ChainId.ALFAJORES]: '0x00Be915B9dCf56a3CBE739D9B9c202ca692409EC',
    [sdk_1.ChainId.BAKLAVA]: '0x00Be915B9dCf56a3CBE739D9B9c202ca692409EC',
}, 18, 'UBE', 'Ubeswap');
