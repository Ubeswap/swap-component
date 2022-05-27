"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usePair = exports.usePairs = exports.PairState = void 0;
const abi_1 = require("@ethersproject/abi");
const IUniswapV2Pair_json_1 = __importDefault(require("@ubeswap/core/build/abi/IUniswapV2Pair.json"));
const sdk_1 = require("@ubeswap/sdk");
const react_1 = require("react");
const hooks_1 = require("../state/multicall/hooks");
const PAIR_INTERFACE = new abi_1.Interface(IUniswapV2Pair_json_1.default);
var PairState;
(function (PairState) {
    PairState[PairState["LOADING"] = 0] = "LOADING";
    PairState[PairState["NOT_EXISTS"] = 1] = "NOT_EXISTS";
    PairState[PairState["EXISTS"] = 2] = "EXISTS";
    PairState[PairState["INVALID"] = 3] = "INVALID";
})(PairState = exports.PairState || (exports.PairState = {}));
function usePairs(tokens) {
    const pairAddresses = (0, react_1.useMemo)(() => tokens.map(([tokenA, tokenB]) => {
        return tokenA && tokenB && !tokenA.equals(tokenB) ? sdk_1.Pair.getAddress(tokenA, tokenB) : undefined;
    }), [tokens]);
    const results = (0, hooks_1.useMultipleContractSingleData)(pairAddresses, PAIR_INTERFACE, 'getReserves');
    return (0, react_1.useMemo)(() => {
        return results.map((result, i) => {
            const { result: reserves, loading } = result;
            const tokenA = tokens[i][0];
            const tokenB = tokens[i][1];
            if (loading)
                return [PairState.LOADING, null];
            if (!tokenA || !tokenB || tokenA.equals(tokenB))
                return [PairState.INVALID, null];
            if (!reserves)
                return [PairState.NOT_EXISTS, null];
            const { reserve0, reserve1 } = reserves;
            const [token0, token1] = tokenA.sortsBefore(tokenB) ? [tokenA, tokenB] : [tokenB, tokenA];
            return [
                PairState.EXISTS,
                new sdk_1.Pair(new sdk_1.TokenAmount(token0, reserve0.toString()), new sdk_1.TokenAmount(token1, reserve1.toString())),
            ];
        });
    }, [results, tokens]);
}
exports.usePairs = usePairs;
function usePair(tokenA, tokenB) {
    // if we dont memoize the array then every time this function is ran the tokens variable passed used to create pairAddresses in usePairs is new and therefor no memoization happens :(
    const tokens = (0, react_1.useMemo)(() => [[tokenA, tokenB]], [tokenA, tokenB]);
    return usePairs(tokens)[0];
}
exports.usePair = usePair;
