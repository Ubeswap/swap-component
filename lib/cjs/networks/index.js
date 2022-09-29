"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Alfajores = exports.Mainnet = void 0;
const use_contractkit_1 = require("@celo-tools/use-contractkit");
// We do an unsafe cast so we can use a custom network name
exports.Mainnet = {
    name: 'QNMainnet',
    rpcUrl: 'https://celo.quickestnode.com',
    graphQl: 'https://explorer.celo.org/graphiql',
    explorer: 'https://explorer.celo.org',
    chainId: use_contractkit_1.ChainId.Mainnet,
};
exports.Alfajores = {
    name: use_contractkit_1.NetworkNames.Alfajores,
    rpcUrl: 'https://alfajores-forno.celo-testnet.org',
    graphQl: 'https://alfajores-blockscout.celo-testnet.org/graphiql',
    explorer: 'https://alfajores-blockscout.celo-testnet.org',
    chainId: use_contractkit_1.ChainId.Alfajores,
};
