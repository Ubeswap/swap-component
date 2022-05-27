"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hexToUint8Array = void 0;
const cids_1 = __importDefault(require("cids"));
const multicodec_1 = require("multicodec");
const multihashes_1 = require("multihashes");
function hexToUint8Array(hex) {
    hex = hex.startsWith('0x') ? hex.substr(2) : hex;
    if (hex.length % 2 !== 0)
        throw new Error('hex must have length that is multiple of 2');
    const arr = new Uint8Array(hex.length / 2);
    for (let i = 0; i < arr.length; i++) {
        arr[i] = parseInt(hex.substr(i * 2, 2), 16);
    }
    return arr;
}
exports.hexToUint8Array = hexToUint8Array;
const UTF_8_DECODER = new TextDecoder();
/**
 * Returns the URI representation of the content hash for supported codecs
 * @param contenthash to decode
 */
function contenthashToUri(contenthash) {
    const buff = hexToUint8Array(contenthash);
    const codec = (0, multicodec_1.getNameFromData)(buff);
    switch (codec) {
        case 'ipfs-ns': {
            const data = (0, multicodec_1.rmPrefix)(buff);
            const cid = new cids_1.default(data);
            return `ipfs://${(0, multihashes_1.toB58String)(cid.multihash)}`;
        }
        case 'ipns-ns': {
            const data = (0, multicodec_1.rmPrefix)(buff);
            const cid = new cids_1.default(data);
            const multihash = (0, multihashes_1.decode)(cid.multihash);
            if (multihash.name === 'identity') {
                return `ipns://${UTF_8_DECODER.decode(multihash.digest).trim()}`;
            }
            else {
                return `ipns://${(0, multihashes_1.toB58String)(cid.multihash)}`;
            }
        }
        default:
            throw new Error(`Unrecognized codec: ${codec}`);
    }
}
exports.default = contenthashToUri;
