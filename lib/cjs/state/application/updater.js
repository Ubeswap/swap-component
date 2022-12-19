"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const use_contractkit_1 = require("@celo-tools/use-contractkit");
const react_1 = require("react");
const react_redux_1 = require("react-redux");
const useDebounce_1 = __importDefault(require("../../hooks/useDebounce"));
const useIsWindowVisible_1 = __importDefault(require("../../hooks/useIsWindowVisible"));
const actions_1 = require("./actions");
const hooks_1 = require("./hooks");
const BLOCK_NUMBER_MINIMUM_DIFF = 5;
function Updater() {
    const accountInfo = (0, react_redux_1.useSelector)((state) => state.swap.accountInfo);
    const library = (0, use_contractkit_1.useProvider)();
    const provider = accountInfo ? accountInfo.provider : library;
    const { network } = (0, use_contractkit_1.useContractKit)();
    const chainId = accountInfo ? accountInfo.chainId : network.chainId;
    const dispatch = (0, react_redux_1.useDispatch)();
    const blockNumber = (0, hooks_1.useBlockNumber)();
    const windowVisible = (0, useIsWindowVisible_1.default)();
    const [state, setState] = (0, react_1.useState)({
        chainId,
        blockNumber: null,
    });
    const blockNumberCallback = (0, react_1.useCallback)((blockNumber) => {
        setState((state) => {
            if (chainId === state.chainId) {
                if (typeof state.blockNumber !== 'number')
                    return { chainId, blockNumber };
                return { chainId, blockNumber: Math.max(blockNumber, state.blockNumber) };
            }
            return state;
        });
    }, [chainId, setState]);
    // attach/detach listeners
    (0, react_1.useEffect)(() => {
        if (!provider || !chainId || !windowVisible)
            return undefined;
        setState({ chainId, blockNumber: null });
        provider
            .getBlockNumber()
            .then(blockNumberCallback)
            .catch((error) => console.error(`Failed to get block number for chainId: ${chainId}`, error));
        provider.on('block', blockNumberCallback);
        return () => {
            provider.removeListener('block', blockNumberCallback);
        };
    }, [dispatch, chainId, provider, blockNumberCallback, windowVisible]);
    const debouncedState = (0, useDebounce_1.default)(state, 100);
    (0, react_1.useEffect)(() => {
        if (!debouncedState.chainId || !debouncedState.blockNumber || !windowVisible)
            return;
        if (debouncedState.blockNumber - (blockNumber || 0) < BLOCK_NUMBER_MINIMUM_DIFF)
            return;
        dispatch((0, actions_1.updateBlockNumber)({ chainId: debouncedState.chainId, blockNumber: debouncedState.blockNumber }));
    }, [windowVisible, dispatch, debouncedState.blockNumber, debouncedState.chainId, blockNumber]);
    return null;
}
exports.default = Updater;
