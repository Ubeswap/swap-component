import { useContractKit } from '@celo-tools/use-contractkit';
import { Pair, Token } from '@ubeswap/sdk';
import flatMap from 'lodash.flatmap';
import { useCallback, useMemo } from 'react';
import ReactGA from 'react-ga';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { BASES_TO_TRACK_LIQUIDITY_FOR, PINNED_PAIRS } from '../../constants';
import { useAllTokens } from '../../hooks/Tokens';
import { addSerializedPair, addSerializedToken, removeSerializedToken, toggleURLWarning, updateUserAllowMoolaWithdrawal, updateUserDarkMode, updateUserDeadline, updateUserDisableSmartRouting, updateUserExpertMode, updateUserMinApprove, updateUserSingleHopOnly, updateUserSlippageTolerance, } from './actions';
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
    return new Token(serializedToken.chainId, serializedToken.address, serializedToken.decimals, serializedToken.symbol, serializedToken.name);
}
export function useIsDarkMode() {
    const { userDarkMode, matchesDarkMode } = useSelector(({ user: { matchesDarkMode, userDarkMode } }) => ({
        userDarkMode,
        matchesDarkMode,
    }), shallowEqual);
    return userDarkMode === null ? matchesDarkMode : userDarkMode;
}
export function useDarkModeManager() {
    const dispatch = useDispatch();
    const darkMode = useIsDarkMode();
    const toggleSetDarkMode = useCallback(() => {
        dispatch(updateUserDarkMode({ userDarkMode: !darkMode }));
    }, [darkMode, dispatch]);
    return [darkMode, toggleSetDarkMode];
}
export function useIsExpertMode() {
    return useSelector((state) => state.user.userExpertMode);
}
export function useExpertModeManager() {
    const dispatch = useDispatch();
    const expertMode = useIsExpertMode();
    const toggleSetExpertMode = useCallback(() => {
        dispatch(updateUserExpertMode({ userExpertMode: !expertMode }));
    }, [expertMode, dispatch]);
    return [expertMode, toggleSetExpertMode];
}
export function useUserMinApprove() {
    const dispatch = useDispatch();
    const minApprove = useSelector((state) => state.user.userMinApprove);
    const setMinApprove = useCallback((newMinApprove) => {
        dispatch(updateUserMinApprove({ userMinApprove: newMinApprove }));
    }, [dispatch]);
    return [minApprove, setMinApprove];
}
export function useUserAllowMoolaWithdrawal() {
    const dispatch = useDispatch();
    const allowMoolaWithdrawal = useSelector((state) => state.user.userAllowMoolaWithdrawal);
    const setAllowMoolaWithdrawal = useCallback((newallowMoolaWithdrawal) => {
        dispatch(updateUserAllowMoolaWithdrawal({ userAllowMoolaWithdrawal: newallowMoolaWithdrawal }));
    }, [dispatch]);
    return [allowMoolaWithdrawal, setAllowMoolaWithdrawal];
}
export function useUserDisableSmartRouting() {
    const dispatch = useDispatch();
    const disableSmartRouting = useSelector((state) => state.user.userDisableSmartRouting);
    const setDisableSmartRouting = useCallback((newSmartRouting) => {
        dispatch(updateUserDisableSmartRouting({ userDisableSmartRouting: newSmartRouting }));
    }, [dispatch]);
    return [disableSmartRouting, setDisableSmartRouting];
}
export function useUserSingleHopOnly() {
    const dispatch = useDispatch();
    const singleHopOnly = useSelector((state) => state.user.userSingleHopOnly);
    const setSingleHopOnly = useCallback((newSingleHopOnly) => {
        ReactGA.event({
            category: 'Routing',
            action: newSingleHopOnly ? 'enable single hop' : 'disable single hop',
        });
        dispatch(updateUserSingleHopOnly({ userSingleHopOnly: newSingleHopOnly }));
    }, [dispatch]);
    return [singleHopOnly, setSingleHopOnly];
}
export function useUserSlippageTolerance() {
    const dispatch = useDispatch();
    const userSlippageTolerance = useSelector((state) => {
        return state.user.userSlippageTolerance;
    });
    const setUserSlippageTolerance = useCallback((userSlippageTolerance) => {
        dispatch(updateUserSlippageTolerance({ userSlippageTolerance }));
    }, [dispatch]);
    return [userSlippageTolerance, setUserSlippageTolerance];
}
export function useUserTransactionTTL() {
    const dispatch = useDispatch();
    const userDeadline = useSelector((state) => {
        return state.user.userDeadline;
    });
    const setUserDeadline = useCallback((userDeadline) => {
        dispatch(updateUserDeadline({ userDeadline }));
    }, [dispatch]);
    return [userDeadline, setUserDeadline];
}
export function useAddUserToken() {
    const dispatch = useDispatch();
    return useCallback((token) => {
        dispatch(addSerializedToken({ serializedToken: serializeToken(token) }));
    }, [dispatch]);
}
export function useRemoveUserAddedToken() {
    const dispatch = useDispatch();
    return useCallback((chainId, address) => {
        dispatch(removeSerializedToken({ chainId, address }));
    }, [dispatch]);
}
export function useUserAddedTokens() {
    const { network } = useContractKit();
    const chainId = network.chainId;
    const serializedTokensMap = useSelector(({ user: { tokens } }) => tokens);
    return useMemo(() => {
        var _a;
        if (!chainId)
            return [];
        return Object.values((_a = serializedTokensMap[chainId]) !== null && _a !== void 0 ? _a : {}).map(deserializeToken);
    }, [serializedTokensMap, chainId]);
}
function serializePair(pair) {
    return {
        token0: serializeToken(pair.token0),
        token1: serializeToken(pair.token1),
    };
}
export function usePairAdder() {
    const dispatch = useDispatch();
    return useCallback((pair) => {
        dispatch(addSerializedPair({ serializedPair: serializePair(pair) }));
    }, [dispatch]);
}
export function useURLWarningVisible() {
    return useSelector((state) => state.user.URLWarningVisible);
}
export function useURLWarningToggle() {
    const dispatch = useDispatch();
    return useCallback(() => dispatch(toggleURLWarning()), [dispatch]);
}
/**
 * Given two tokens return the liquidity token that represents its liquidity shares
 * @param tokenA one of the two tokens
 * @param tokenB the other token
 */
export function toV2LiquidityToken([tokenA, tokenB]) {
    return new Token(tokenA.chainId, Pair.getAddress(tokenA, tokenB), 18, 'ULP', 'Ubeswap LP Token');
}
/**
 * Returns all the pairs of tokens that are tracked by the user for the current chain ID.
 */
export function useTrackedTokenPairs() {
    const { network } = useContractKit();
    const chainId = network.chainId;
    const tokens = useAllTokens();
    // pinned pairs
    const pinnedPairs = useMemo(() => { var _a; return (chainId ? (_a = PINNED_PAIRS[chainId]) !== null && _a !== void 0 ? _a : [] : []); }, [chainId]);
    // pairs for every token against every base
    const generatedPairs = useMemo(() => chainId
        ? flatMap(Object.keys(tokens), (tokenAddress) => {
            var _a;
            const token = tokens[tokenAddress];
            // for each token on the current chain,
            return (
            // loop though all bases on the current chain
            ((_a = BASES_TO_TRACK_LIQUIDITY_FOR[chainId]) !== null && _a !== void 0 ? _a : [])
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
    const savedSerializedPairs = useSelector(({ user: { pairs } }) => pairs);
    const userPairs = useMemo(() => {
        if (!chainId || !savedSerializedPairs)
            return [];
        const forChain = savedSerializedPairs[chainId];
        if (!forChain)
            return [];
        return Object.keys(forChain).map((pairId) => {
            return [deserializeToken(forChain[pairId].token0), deserializeToken(forChain[pairId].token1)];
        });
    }, [savedSerializedPairs, chainId]);
    const combinedList = useMemo(() => userPairs.concat(generatedPairs).concat(pinnedPairs), [generatedPairs, pinnedPairs, userPairs]);
    return useMemo(() => {
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
export function useIsAprMode() {
    return useSelector((state) => state.user.userAprMode);
}
