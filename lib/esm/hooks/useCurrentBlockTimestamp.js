import { useSingleCallResult } from '../state/multicall/hooks';
import { useMulticallContract } from './useContract';
// gets the current timestamp from the blockchain
export default function useCurrentBlockTimestamp() {
    var _a, _b;
    const multicall = useMulticallContract();
    return (_b = (_a = useSingleCallResult(multicall, 'getCurrentBlockTimestamp')) === null || _a === void 0 ? void 0 : _a.result) === null || _b === void 0 ? void 0 : _b[0];
}
