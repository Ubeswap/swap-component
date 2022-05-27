"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.POOL_MANAGER_INTERFACE = void 0;
const abi_1 = require("@ethersproject/abi");
const pool_manager_json_1 = __importDefault(require("./pool-manager.json"));
exports.POOL_MANAGER_INTERFACE = new abi_1.Interface(pool_manager_json_1.default);
