"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ERC20_BYTES32_INTERFACE = exports.ERC20_BYTES32_ABI = exports.ERC20_ABI = void 0;
const abi_1 = require("@ethersproject/abi");
const erc20_json_1 = __importDefault(require("./erc20.json"));
exports.ERC20_ABI = erc20_json_1.default;
const erc20_bytes32_json_1 = __importDefault(require("./erc20_bytes32.json"));
exports.ERC20_BYTES32_ABI = erc20_bytes32_json_1.default;
const ERC20_INTERFACE = new abi_1.Interface(erc20_json_1.default);
const ERC20_BYTES32_INTERFACE = new abi_1.Interface(erc20_bytes32_json_1.default);
exports.ERC20_BYTES32_INTERFACE = ERC20_BYTES32_INTERFACE;
exports.default = ERC20_INTERFACE;
