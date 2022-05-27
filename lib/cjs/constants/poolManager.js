"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.POOL_MANAGER = void 0;
const use_contractkit_1 = require("@celo-tools/use-contractkit");
//todo: replace Mainnet and Baklava PoolManager Addresses
exports.POOL_MANAGER = {
    [use_contractkit_1.ChainId.CeloMainnet]: '0x9Ee3600543eCcc85020D6bc77EB553d1747a65D2',
    [use_contractkit_1.ChainId.Alfajores]: '0x9Ee3600543eCcc85020D6bc77EB553d1747a65D2',
};
