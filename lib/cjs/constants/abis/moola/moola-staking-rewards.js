"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MOOLA_STAKING_REWARDS_INTERFACE = void 0;
const abi_1 = require("@ethersproject/abi");
const MoolaStakingRewards_json_1 = __importDefault(require("./MoolaStakingRewards.json"));
exports.MOOLA_STAKING_REWARDS_INTERFACE = new abi_1.Interface(MoolaStakingRewards_json_1.default);
