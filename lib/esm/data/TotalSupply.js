import { TokenAmount } from '@ubeswap/sdk';
import { useTokenContract } from '../hooks/useContract';
import { useSingleCallResult } from '../state/multicall/hooks';
// returns undefined if input token is undefined, or fails to get token contract,
// or contract total supply cannot be fetched
export function useTotalSupply(token) {
    var _a, _b;
    const contract = useTokenContract(token === null || token === void 0 ? void 0 : token.address, false);
    const totalSupply = (_b = (_a = useSingleCallResult(contract, 'totalSupply')) === null || _a === void 0 ? void 0 : _a.result) === null || _b === void 0 ? void 0 : _b[0];
    return token && totalSupply ? new TokenAmount(token, totalSupply.toString()) : undefined;
}
