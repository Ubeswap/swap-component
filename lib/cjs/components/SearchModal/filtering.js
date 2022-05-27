"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterTokens = void 0;
const utils_1 = require("../../utils");
function filterTokens(tokens, search) {
    if (search.length === 0)
        return tokens;
    const searchingAddress = (0, utils_1.isAddress)(search);
    if (searchingAddress) {
        return tokens.filter((token) => token.address === searchingAddress);
    }
    const lowerSearchParts = search
        .toLowerCase()
        .split(/\s+/)
        .filter((s) => s.length > 0);
    if (lowerSearchParts.length === 0) {
        return tokens;
    }
    const matchesSearch = (s) => {
        const sParts = s
            .toLowerCase()
            .split(/\s+/)
            .filter((s) => s.length > 0);
        return lowerSearchParts.every((p) => p.length === 0 || sParts.some((sp) => sp.startsWith(p) || sp.endsWith(p)));
    };
    return tokens.filter((token) => {
        const { symbol, name } = token;
        return (symbol && matchesSearch(symbol)) || (name && matchesSearch(name));
    });
    // .sort((t0: Token, t1: Token) => {
    //   if (t0.symbol && matchesSearch(t0.symbol) && t1.symbol && !matchesSearch(t1.symbol)) {
    //     return -1
    //   }
    //   if (t0.symbol && !matchesSearch(t0.symbol) && t1.symbol && matchesSearch(t1.symbol)) {
    //     return 1
    //   }
    //   return 0
    // })
}
exports.filterTokens = filterTokens;
