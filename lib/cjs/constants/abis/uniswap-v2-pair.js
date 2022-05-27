"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UNISWAP_V2_PAIR_INTERFACE = void 0;
const abi_1 = require("@ethersproject/abi");
const IUniswapV2Pair_json_1 = __importDefault(require("@ubeswap/core/build/abi/IUniswapV2Pair.json"));
exports.UNISWAP_V2_PAIR_INTERFACE = new abi_1.Interface(IUniswapV2Pair_json_1.default);
