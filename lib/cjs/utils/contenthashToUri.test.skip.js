"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const contenthashToUri_1 = __importStar(require("./contenthashToUri"));
// this test is skipped for now because importing CID results in
// TypeError: TextDecoder is not a constructor
describe('#contenthashToUri', () => {
    it('1inch.tokens.eth contenthash', () => {
        expect((0, contenthashToUri_1.default)('0xe3010170122013e051d1cfff20606de36845d4fe28deb9861a319a5bc8596fa4e610e8803918')).toEqual('ipfs://QmPgEqyV3m8SB52BS2j2mJpu9zGprhj2BGCHtRiiw2fdM1');
    });
    it('uniswap.eth contenthash', () => {
        expect((0, contenthashToUri_1.default)('0xe5010170000f6170702e756e69737761702e6f7267')).toEqual('ipns://app.ubeswap.org');
    });
});
describe('#hexToUint8Array', () => {
    it('common case', () => {
        expect((0, contenthashToUri_1.hexToUint8Array)('0x010203fdfeff')).toEqual(new Uint8Array([1, 2, 3, 253, 254, 255]));
    });
});
