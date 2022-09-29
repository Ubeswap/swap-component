"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useIsSupportedNetwork = void 0;
const use_contractkit_1 = require("@celo-tools/use-contractkit");
const useIsSupportedNetwork = () => {
    const { network } = (0, use_contractkit_1.useContractKit)();
    return [use_contractkit_1.ChainId.Mainnet, use_contractkit_1.ChainId.Alfajores].includes(network.chainId);
};
exports.useIsSupportedNetwork = useIsSupportedNetwork;
