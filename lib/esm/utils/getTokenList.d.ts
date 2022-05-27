import { TokenList } from '@uniswap/token-lists';
/**
 * Contains the logic for resolving a list URL to a validated token list
 * @param listUrl list url
 * @param resolveENSContentHash resolves an ens name to a contenthash
 */
export default function getTokenList(listUrl: string): Promise<TokenList>;
