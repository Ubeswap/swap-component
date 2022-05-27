"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useTokenAllowance = void 0;
const sdk_1 = require("@ubeswap/sdk");
const react_1 = require("react");
const useContract_1 = require("../hooks/useContract");
const hooks_1 = require("../state/multicall/hooks");
function useTokenAllowance(token, owner, spender) {
    const contract = (0, useContract_1.useTokenContract)(token === null || token === void 0 ? void 0 : token.address, false);
    const inputs = (0, react_1.useMemo)(() => [owner, spender], [owner, spender]);
    const allowance = (0, hooks_1.useSingleCallResult)(contract, 'allowance', inputs).result;
    return (0, react_1.useMemo)(() => (token && allowance ? new sdk_1.TokenAmount(token, allowance.toString()) : undefined), [token, allowance]);
}
exports.useTokenAllowance = useTokenAllowance;
