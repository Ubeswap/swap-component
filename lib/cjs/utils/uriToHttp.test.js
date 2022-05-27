"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uriToHttp_1 = __importDefault(require("./uriToHttp"));
describe('uriToHttp', () => {
    it('returns .eth.link for ens names', () => {
        expect((0, uriToHttp_1.default)('t2crtokens.eth')).toEqual([]);
    });
    it('returns https first for http', () => {
        expect((0, uriToHttp_1.default)('http://test.com')).toEqual(['https://test.com', 'http://test.com']);
    });
    it('returns https for https', () => {
        expect((0, uriToHttp_1.default)('https://test.com')).toEqual(['https://test.com']);
    });
    it('returns ipfs gateways for ipfs:// urls', () => {
        expect((0, uriToHttp_1.default)('ipfs://QmV8AfDE8GFSGQvt3vck8EwAzsPuNTmtP8VcQJE3qxRPaZ')).toEqual([
            'https://cloudflare-ipfs.com/ipfs/QmV8AfDE8GFSGQvt3vck8EwAzsPuNTmtP8VcQJE3qxRPaZ/',
            'https://ipfs.io/ipfs/QmV8AfDE8GFSGQvt3vck8EwAzsPuNTmtP8VcQJE3qxRPaZ/',
        ]);
    });
    it('returns ipns gateways for ipns:// urls', () => {
        expect((0, uriToHttp_1.default)('ipns://app.ubeswap.org')).toEqual([
            'https://cloudflare-ipfs.com/ipns/app.ubeswap.org/',
            'https://ipfs.io/ipns/app.ubeswap.org/',
        ]);
    });
    it('returns empty array for invalid scheme', () => {
        expect((0, uriToHttp_1.default)('blah:test')).toEqual([]);
    });
});
