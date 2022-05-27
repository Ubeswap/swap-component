"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.outdatedListeningKeys = exports.activeListeningKeys = void 0;
const use_contractkit_1 = require("@celo-tools/use-contractkit");
const react_1 = require("react");
const react_redux_1 = require("react-redux");
const useContract_1 = require("../../hooks/useContract");
const useDebounce_1 = __importDefault(require("../../hooks/useDebounce"));
const chunkArray_1 = __importDefault(require("../../utils/chunkArray"));
const retry_1 = require("../../utils/retry");
const hooks_1 = require("../application/hooks");
const actions_1 = require("./actions");
// chunk calls so we do not exceed the gas limit
const CALL_CHUNK_SIZE = 500;
/**
 * Fetches a chunk of calls, enforcing a minimum block number constraint
 * @param multicallContract multicall contract to fetch against
 * @param chunk chunk of calls to make
 * @param minBlockNumber minimum block number of the result set
 */
function fetchChunk(multicallContract, chunk, minBlockNumber) {
    return __awaiter(this, void 0, void 0, function* () {
        console.debug('Fetching chunk', multicallContract, chunk, minBlockNumber);
        let resultsBlockNumber, returnData;
        try {
            ;
            [resultsBlockNumber, returnData] = yield multicallContract.aggregate(chunk.map((obj) => [obj.address, obj.callData]));
        }
        catch (error) {
            console.debug('Failed to fetch chunk inside retry', error);
            throw error;
        }
        if (resultsBlockNumber.toNumber() < minBlockNumber) {
            console.debug(`Fetched results for old block number: ${resultsBlockNumber.toString()} vs. ${minBlockNumber}`);
            throw new retry_1.RetryableError('Fetched for old block number');
        }
        return { results: returnData, blockNumber: resultsBlockNumber.toNumber() };
    });
}
/**
 * From the current all listeners state, return each call key mapped to the
 * minimum number of blocks per fetch. This is how often each key must be fetched.
 * @param allListeners the all listeners state
 * @param chainId the current chain id
 */
function activeListeningKeys(allListeners, chainId) {
    if (!allListeners || !chainId)
        return {};
    const listeners = allListeners[chainId];
    if (!listeners)
        return {};
    return Object.keys(listeners).reduce((memo, callKey) => {
        const keyListeners = listeners[callKey];
        memo[callKey] = Object.keys(keyListeners)
            .filter((key) => {
            const blocksPerFetch = parseInt(key);
            if (blocksPerFetch <= 0)
                return false;
            return keyListeners[blocksPerFetch] > 0;
        })
            .reduce((previousMin, current) => {
            return Math.min(previousMin, parseInt(current));
        }, Infinity);
        return memo;
    }, {});
}
exports.activeListeningKeys = activeListeningKeys;
/**
 * Return the keys that need to be refetched
 * @param callResults current call result state
 * @param listeningKeys each call key mapped to how old the data can be in blocks
 * @param chainId the current chain id
 * @param latestBlockNumber the latest block number
 */
function outdatedListeningKeys(callResults, listeningKeys, chainId, latestBlockNumber) {
    if (!chainId || !latestBlockNumber)
        return [];
    const results = callResults[chainId];
    // no results at all, load everything
    if (!results)
        return Object.keys(listeningKeys);
    return Object.keys(listeningKeys).filter((callKey) => {
        const blocksPerFetch = listeningKeys[callKey];
        const data = callResults[chainId][callKey];
        // no data, must fetch
        if (!data)
            return true;
        const minDataBlockNumber = latestBlockNumber - (blocksPerFetch - 1);
        // already fetching it for a recent enough block, don't refetch it
        if (data.fetchingBlockNumber && data.fetchingBlockNumber >= minDataBlockNumber)
            return false;
        // if data is older than minDataBlockNumber, fetch it
        return !data.blockNumber || data.blockNumber < minDataBlockNumber;
    });
}
exports.outdatedListeningKeys = outdatedListeningKeys;
function Updater() {
    const dispatch = (0, react_redux_1.useDispatch)();
    const state = (0, react_redux_1.useSelector)((state) => state.multicall);
    // wait for listeners to settle before triggering updates
    const debouncedListeners = (0, useDebounce_1.default)(state.callListeners, 100);
    const latestBlockNumber = (0, hooks_1.useBlockNumber)();
    const { network } = (0, use_contractkit_1.useContractKit)();
    const chainId = network.chainId;
    const multicallContract = (0, useContract_1.useMulticallContract)();
    const cancellations = (0, react_1.useRef)();
    const listeningKeys = (0, react_1.useMemo)(() => {
        return activeListeningKeys(debouncedListeners, chainId);
    }, [debouncedListeners, chainId]);
    const unserializedOutdatedCallKeys = (0, react_1.useMemo)(() => {
        return outdatedListeningKeys(state.callResults, listeningKeys, chainId, latestBlockNumber);
    }, [chainId, state.callResults, listeningKeys, latestBlockNumber]);
    const serializedOutdatedCallKeys = (0, react_1.useMemo)(() => JSON.stringify(unserializedOutdatedCallKeys.sort()), [unserializedOutdatedCallKeys]);
    (0, react_1.useEffect)(() => {
        var _a, _b, _c;
        if (!latestBlockNumber || !chainId || !multicallContract)
            return;
        const outdatedCallKeys = JSON.parse(serializedOutdatedCallKeys);
        if (outdatedCallKeys.length === 0)
            return;
        const calls = outdatedCallKeys.map((key) => (0, actions_1.parseCallKey)(key));
        const chunkedCalls = (0, chunkArray_1.default)(calls, CALL_CHUNK_SIZE);
        if (cancellations.current && latestBlockNumber - ((_a = cancellations.current) === null || _a === void 0 ? void 0 : _a.blockNumber) > 2) {
            (_c = (_b = cancellations.current) === null || _b === void 0 ? void 0 : _b.cancellations) === null || _c === void 0 ? void 0 : _c.forEach((c) => c());
        }
        dispatch((0, actions_1.fetchingMulticallResults)({
            calls,
            chainId,
            fetchingBlockNumber: latestBlockNumber,
        }));
        cancellations.current = {
            blockNumber: latestBlockNumber,
            cancellations: chunkedCalls.map((chunk, index) => {
                const { cancel, promise } = (0, retry_1.retry)(() => fetchChunk(multicallContract, chunk, latestBlockNumber), {
                    n: Infinity,
                    minWait: 2500,
                    maxWait: 3500,
                });
                promise
                    .then(({ results: returnData, blockNumber: fetchBlockNumber }) => {
                    cancellations.current = { cancellations: [], blockNumber: latestBlockNumber };
                    // accumulates the length of all previous indices
                    const firstCallKeyIndex = chunkedCalls.slice(0, index).reduce((memo, curr) => memo + curr.length, 0);
                    const lastCallKeyIndex = firstCallKeyIndex + returnData.length;
                    dispatch((0, actions_1.updateMulticallResults)({
                        chainId,
                        results: outdatedCallKeys
                            .slice(firstCallKeyIndex, lastCallKeyIndex)
                            .reduce((memo, callKey, i) => {
                            var _a;
                            memo[callKey] = (_a = returnData[i]) !== null && _a !== void 0 ? _a : null;
                            return memo;
                        }, {}),
                        blockNumber: fetchBlockNumber,
                    }));
                })
                    .catch((error) => {
                    if (error instanceof retry_1.CancelledError) {
                        console.debug('Cancelled fetch for blockNumber', latestBlockNumber);
                        return;
                    }
                    console.error('Failed to fetch multicall chunk', chunk, chainId, error);
                    dispatch((0, actions_1.errorFetchingMulticallResults)({
                        calls: chunk,
                        chainId,
                        fetchingBlockNumber: latestBlockNumber,
                    }));
                });
                return cancel;
            }),
        };
    }, [chainId, multicallContract, dispatch, serializedOutdatedCallKeys, latestBlockNumber]);
    return null;
}
exports.default = Updater;
