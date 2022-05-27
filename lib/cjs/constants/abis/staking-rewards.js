"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.STAKING_REWARDS_INTERFACE = void 0;
const abi_1 = require("@ethersproject/abi");
const StakingRewards_json_1 = __importDefault(require("./StakingRewards.json"));
exports.STAKING_REWARDS_INTERFACE = new abi_1.Interface(StakingRewards_json_1.default);
