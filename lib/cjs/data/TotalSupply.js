"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useTotalSupply = void 0;
const sdk_1 = require("@ubeswap/sdk");
const useContract_1 = require("../hooks/useContract");
const hooks_1 = require("../state/multicall/hooks");
// returns undefined if input token is undefined, or fails to get token contract,
// or contract total supply cannot be fetched
function useTotalSupply(token) {
    var _a, _b;
    const contract = (0, useContract_1.useTokenContract)(token === null || token === void 0 ? void 0 : token.address, false);
    const totalSupply = (_b = (_a = (0, hooks_1.useSingleCallResult)(contract, 'totalSupply')) === null || _a === void 0 ? void 0 : _a.result) === null || _b === void 0 ? void 0 : _b[0];
    return token && totalSupply ? new sdk_1.TokenAmount(token, totalSupply.toString()) : undefined;
}
exports.useTotalSupply = useTotalSupply;
