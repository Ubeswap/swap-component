import { ChainId, NetworkNames } from '@celo-tools/use-contractkit';
// We do an unsafe cast so we can use a custom network name
export const Mainnet = {
    name: 'QNMainnet',
    rpcUrl: 'https://celo.quickestnode.com',
    graphQl: 'https://explorer.celo.org/graphiql',
    explorer: 'https://explorer.celo.org',
    chainId: ChainId.Mainnet,
};
export const Alfajores = {
    name: NetworkNames.Alfajores,
    rpcUrl: 'https://alfajores-forno.celo-testnet.org',
    graphQl: 'https://alfajores-blockscout.celo-testnet.org/graphiql',
    explorer: 'https://alfajores-blockscout.celo-testnet.org',
    chainId: ChainId.Alfajores,
};
