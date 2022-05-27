"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MULTICALL_NETWORKS = exports.MULTICALL_ABI = void 0;
const use_contractkit_1 = require("@celo-tools/use-contractkit");
const abi_json_1 = __importDefault(require("./abi.json"));
exports.MULTICALL_ABI = abi_json_1.default;
const MULTICALL_NETWORKS = {
    [use_contractkit_1.ChainId.CeloMainnet]: '0x75f59534dd892c1f8a7b172d639fa854d529ada3',
    [use_contractkit_1.ChainId.Alfajores]: '0x75f59534dd892c1f8a7b172d639fa854d529ada3',
    [use_contractkit_1.ChainId.Baklava]: '0x75f59534dd892c1f8a7b172d639fa854d529ada3',
    [use_contractkit_1.ChainId.EthereumMainnet]: '0xeefba1e63905ef1d7acba5a8513c70307c1ce441',
    [use_contractkit_1.ChainId.Kovan]: '0x2cc8688c5f75e365aaeeb4ea8d6a480405a48d2a',
};
exports.MULTICALL_NETWORKS = MULTICALL_NETWORKS;
