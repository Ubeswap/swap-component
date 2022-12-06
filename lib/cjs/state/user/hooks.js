"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useIsAprMode = exports.useTrackedTokenPairs = exports.toV2LiquidityToken = exports.useURLWarningToggle = exports.useURLWarningVisible = exports.usePairAdder = exports.useUserAddedTokens = exports.useRemoveUserAddedToken = exports.useAddUserToken = exports.useUserTransactionTTL = exports.useUserSlippageTolerance = exports.useUserSingleHopOnly = exports.useUserDisableSmartRouting = exports.useUserAllowMoolaWithdrawal = exports.useUserMinApprove = exports.useExpertModeManager = exports.useIsExpertMode = exports.useSwapTheme = void 0;
const use_contractkit_1 = require("@celo-tools/use-contractkit");
const sdk_1 = require("@ubeswap/sdk");
const lodash_flatmap_1 = __importDefault(require("lodash.flatmap"));
const react_1 = require("react");
const react_ga_1 = __importDefault(require("react-ga"));
const react_redux_1 = require("react-redux");
const constants_1 = require("../../constants");
const Tokens_1 = require("../../hooks/Tokens");
const actions_1 = require("./actions");
function serializeToken(token) {
    return {
        chainId: token.chainId,
        address: token.address,
        decimals: token.decimals,
        symbol: token.symbol,
        name: token.name,
    };
}
function deserializeToken(serializedToken) {
    return new sdk_1.Token(serializedToken.chainId, serializedToken.address, serializedToken.decimals, serializedToken.symbol, serializedToken.name);
}
function useSwapTheme() {
    const { theme } = (0, react_redux_1.useSelector)(({ user: { theme } }) => ({
        theme,
    }), react_redux_1.shallowEqual);
    return theme;
}
exports.useSwapTheme = useSwapTheme;
function useIsExpertMode() {
    return (0, react_redux_1.useSelector)((state) => state.user.userExpertMode);
}
exports.useIsExpertMode = useIsExpertMode;
function useExpertModeManager() {
    const dispatch = (0, react_redux_1.useDispatch)();
    const expertMode = useIsExpertMode();
    const toggleSetExpertMode = (0, react_1.useCallback)(() => {
        dispatch((0, actions_1.updateUserExpertMode)({ userExpertMode: !expertMode }));
    }, [expertMode, dispatch]);
    return [expertMode, toggleSetExpertMode];
}
exports.useExpertModeManager = useExpertModeManager;
function useUserMinApprove() {
    const dispatch = (0, react_redux_1.useDispatch)();
    const minApprove = (0, react_redux_1.useSelector)((state) => state.user.userMinApprove);
    const setMinApprove = (0, react_1.useCallback)((newMinApprove) => {
        dispatch((0, actions_1.updateUserMinApprove)({ userMinApprove: newMinApprove }));
    }, [dispatch]);
    return [minApprove, setMinApprove];
}
exports.useUserMinApprove = useUserMinApprove;
function useUserAllowMoolaWithdrawal() {
    const dispatch = (0, react_redux_1.useDispatch)();
    const allowMoolaWithdrawal = (0, react_redux_1.useSelector)((state) => state.user.userAllowMoolaWithdrawal);
    const setAllowMoolaWithdrawal = (0, react_1.useCallback)((newallowMoolaWithdrawal) => {
        dispatch((0, actions_1.updateUserAllowMoolaWithdrawal)({ userAllowMoolaWithdrawal: newallowMoolaWithdrawal }));
    }, [dispatch]);
    return [allowMoolaWithdrawal, setAllowMoolaWithdrawal];
}
exports.useUserAllowMoolaWithdrawal = useUserAllowMoolaWithdrawal;
function useUserDisableSmartRouting() {
    const dispatch = (0, react_redux_1.useDispatch)();
    const disableSmartRouting = (0, react_redux_1.useSelector)((state) => state.user.userDisableSmartRouting);
    const setDisableSmartRouting = (0, react_1.useCallback)((newSmartRouting) => {
        dispatch((0, actions_1.updateUserDisableSmartRouting)({ userDisableSmartRouting: newSmartRouting }));
    }, [dispatch]);
    return [disableSmartRouting, setDisableSmartRouting];
}
exports.useUserDisableSmartRouting = useUserDisableSmartRouting;
function useUserSingleHopOnly() {
    const dispatch = (0, react_redux_1.useDispatch)();
    const singleHopOnly = (0, react_redux_1.useSelector)((state) => state.user.userSingleHopOnly);
    const setSingleHopOnly = (0, react_1.useCallback)((newSingleHopOnly) => {
        react_ga_1.default.event({
            category: 'Routing',
            action: newSingleHopOnly ? 'enable single hop' : 'disable single hop',
        });
        dispatch((0, actions_1.updateUserSingleHopOnly)({ userSingleHopOnly: newSingleHopOnly }));
    }, [dispatch]);
    return [singleHopOnly, setSingleHopOnly];
}
exports.useUserSingleHopOnly = useUserSingleHopOnly;
function useUserSlippageTolerance() {
    const dispatch = (0, react_redux_1.useDispatch)();
    const userSlippageTolerance = (0, react_redux_1.useSelector)((state) => {
        return state.user.userSlippageTolerance;
    });
    const setUserSlippageTolerance = (0, react_1.useCallback)((userSlippageTolerance) => {
        dispatch((0, actions_1.updateUserSlippageTolerance)({ userSlippageTolerance }));
    }, [dispatch]);
    return [userSlippageTolerance, setUserSlippageTolerance];
}
exports.useUserSlippageTolerance = useUserSlippageTolerance;
function useUserTransactionTTL() {
    const dispatch = (0, react_redux_1.useDispatch)();
    const userDeadline = (0, react_redux_1.useSelector)((state) => {
        return state.user.userDeadline;
    });
    const setUserDeadline = (0, react_1.useCallback)((userDeadline) => {
        dispatch((0, actions_1.updateUserDeadline)({ userDeadline }));
    }, [dispatch]);
    return [userDeadline, setUserDeadline];
}
exports.useUserTransactionTTL = useUserTransactionTTL;
function useAddUserToken() {
    const dispatch = (0, react_redux_1.useDispatch)();
    return (0, react_1.useCallback)((token) => {
        dispatch((0, actions_1.addSerializedToken)({ serializedToken: serializeToken(token) }));
    }, [dispatch]);
}
exports.useAddUserToken = useAddUserToken;
function useRemoveUserAddedToken() {
    const dispatch = (0, react_redux_1.useDispatch)();
    return (0, react_1.useCallback)((chainId, address) => {
        dispatch((0, actions_1.removeSerializedToken)({ chainId, address }));
    }, [dispatch]);
}
exports.useRemoveUserAddedToken = useRemoveUserAddedToken;
function useUserAddedTokens() {
    const { network } = (0, use_contractkit_1.useContractKit)();
    const chainId = network.chainId;
    const serializedTokensMap = (0, react_redux_1.useSelector)(({ user: { tokens } }) => tokens);
    return (0, react_1.useMemo)(() => {
        var _a;
        if (!chainId)
            return [];
        return Object.values((_a = serializedTokensMap[chainId]) !== null && _a !== void 0 ? _a : {}).map(deserializeToken);
    }, [serializedTokensMap, chainId]);
}
exports.useUserAddedTokens = useUserAddedTokens;
function serializePair(pair) {
    return {
        token0: serializeToken(pair.token0),
        token1: serializeToken(pair.token1),
    };
}
function usePairAdder() {
    const dispatch = (0, react_redux_1.useDispatch)();
    return (0, react_1.useCallback)((pair) => {
        dispatch((0, actions_1.addSerializedPair)({ serializedPair: serializePair(pair) }));
    }, [dispatch]);
}
exports.usePairAdder = usePairAdder;
function useURLWarningVisible() {
    return (0, react_redux_1.useSelector)((state) => state.user.URLWarningVisible);
}
exports.useURLWarningVisible = useURLWarningVisible;
function useURLWarningToggle() {
    const dispatch = (0, react_redux_1.useDispatch)();
    return (0, react_1.useCallback)(() => dispatch((0, actions_1.toggleURLWarning)()), [dispatch]);
}
exports.useURLWarningToggle = useURLWarningToggle;
/**
 * Given two tokens return the liquidity token that represents its liquidity shares
 * @param tokenA one of the two tokens
 * @param tokenB the other token
 */
function toV2LiquidityToken([tokenA, tokenB]) {
    return new sdk_1.Token(tokenA.chainId, sdk_1.Pair.getAddress(tokenA, tokenB), 18, 'ULP', 'Ubeswap LP Token');
}
exports.toV2LiquidityToken = toV2LiquidityToken;
/**
 * Returns all the pairs of tokens that are tracked by the user for the current chain ID.
 */
function useTrackedTokenPairs() {
    const { network } = (0, use_contractkit_1.useContractKit)();
    const chainId = network.chainId;
    const tokens = (0, Tokens_1.useAllTokens)();
    // pinned pairs
    const pinnedPairs = (0, react_1.useMemo)(() => { var _a; return (chainId ? (_a = constants_1.PINNED_PAIRS[chainId]) !== null && _a !== void 0 ? _a : [] : []); }, [chainId]);
    // pairs for every token against every base
    const generatedPairs = (0, react_1.useMemo)(() => chainId
        ? (0, lodash_flatmap_1.default)(Object.keys(tokens), (tokenAddress) => {
            var _a;
            const token = tokens[tokenAddress];
            // for each token on the current chain,
            return (
            // loop though all bases on the current chain
            ((_a = constants_1.BASES_TO_TRACK_LIQUIDITY_FOR[chainId]) !== null && _a !== void 0 ? _a : [])
                // to construct pairs of the given token with each base
                .map((base) => {
                if (base.address === token.address) {
                    return null;
                }
                else {
                    return [base, token];
                }
            })
                .filter((p) => p !== null));
        })
        : [], [tokens, chainId]);
    // pairs saved by users
    const savedSerializedPairs = (0, react_redux_1.useSelector)(({ user: { pairs } }) => pairs);
    const userPairs = (0, react_1.useMemo)(() => {
        if (!chainId || !savedSerializedPairs)
            return [];
        const forChain = savedSerializedPairs[chainId];
        if (!forChain)
            return [];
        return Object.keys(forChain).map((pairId) => {
            return [deserializeToken(forChain[pairId].token0), deserializeToken(forChain[pairId].token1)];
        });
    }, [savedSerializedPairs, chainId]);
    const combinedList = (0, react_1.useMemo)(() => userPairs.concat(generatedPairs).concat(pinnedPairs), [generatedPairs, pinnedPairs, userPairs]);
    return (0, react_1.useMemo)(() => {
        // dedupes pairs of tokens in the combined list
        const keyed = combinedList.reduce((memo, [tokenA, tokenB]) => {
            const sorted = tokenA.sortsBefore(tokenB);
            const key = sorted ? `${tokenA.address}:${tokenB.address}` : `${tokenB.address}:${tokenA.address}`;
            if (memo[key])
                return memo;
            memo[key] = sorted ? [tokenA, tokenB] : [tokenB, tokenA];
            return memo;
        }, {});
        return Object.keys(keyed).map((key) => keyed[key]);
    }, [combinedList]);
}
exports.useTrackedTokenPairs = useTrackedTokenPairs;
function useIsAprMode() {
    return (0, react_redux_1.useSelector)((state) => state.user.userAprMode);
}
exports.useIsAprMode = useIsAprMode;
