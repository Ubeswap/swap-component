"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useTokenComparator = void 0;
const react_1 = require("react");
const hooks_1 = require("../../state/wallet/hooks");
// compare two token amounts with highest one coming first
function balanceComparator(balanceA, balanceB) {
    if (balanceA && balanceB) {
        return balanceA.greaterThan(balanceB) ? -1 : balanceA.equalTo(balanceB) ? 0 : 1;
    }
    else if (balanceA && balanceA.greaterThan('0')) {
        return -1;
    }
    else if (balanceB && balanceB.greaterThan('0')) {
        return 1;
    }
    return 0;
}
function getTokenComparator(balances) {
    return function sortTokens(tokenA, tokenB) {
        // -1 = a is first
        // 1 = b is first
        // sort by balances
        const balanceA = balances[tokenA.address];
        const balanceB = balances[tokenB.address];
        const balanceComp = balanceComparator(balanceA, balanceB);
        if (balanceComp !== 0)
            return balanceComp;
        if (tokenA.symbol && tokenB.symbol) {
            // sort by symbol
            return tokenA.symbol.toLowerCase() < tokenB.symbol.toLowerCase() ? -1 : 1;
        }
        else {
            return tokenA.symbol ? -1 : tokenB.symbol ? -1 : 0;
        }
    };
}
function useTokenComparator(inverted) {
    const balances = (0, hooks_1.useAllTokenBalances)();
    const comparator = (0, react_1.useMemo)(() => getTokenComparator(balances !== null && balances !== void 0 ? balances : {}), [balances]);
    return (0, react_1.useMemo)(() => {
        if (inverted) {
            return (tokenA, tokenB) => comparator(tokenA, tokenB) * -1;
        }
        else {
            return comparator;
        }
    }, [inverted, comparator]);
}
exports.useTokenComparator = useTokenComparator;
