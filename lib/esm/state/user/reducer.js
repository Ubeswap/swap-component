import { createReducer } from '@reduxjs/toolkit';
import { DEFAULT_DEADLINE_FROM_NOW, INITIAL_ALLOWED_SLIPPAGE } from '../../constants';
import { updateVersion } from '../global/actions';
import { addSerializedPair, addSerializedToken, clearValoraAccount, removeSerializedPair, removeSerializedToken, setValoraAccount, toggleURLWarning, updateMatchesDarkMode, updateTheme, updateUserAllowMoolaWithdrawal, updateUserAprMode, updateUserDeadline, updateUserDisableSmartRouting, updateUserExpertMode, updateUserMinApprove, updateUserSingleHopOnly, updateUserSlippageTolerance, } from './actions';
const currentTimestamp = () => new Date().getTime();
function pairKey(token0Address, token1Address) {
    return `${token0Address};${token1Address}`;
}
export const initialState = {
    theme: null,
    matchesDarkMode: false,
    userExpertMode: false,
    userSingleHopOnly: false,
    userMinApprove: false,
    userAllowMoolaWithdrawal: false,
    userDisableSmartRouting: false,
    userSlippageTolerance: INITIAL_ALLOWED_SLIPPAGE,
    userDeadline: DEFAULT_DEADLINE_FROM_NOW,
    tokens: {},
    pairs: {},
    timestamp: currentTimestamp(),
    URLWarningVisible: true,
    valoraAccount: null,
    userAprMode: false,
};
export default createReducer(initialState, (builder) => builder
    .addCase(updateVersion, (state) => {
    // slippage isnt being tracked in local storage, reset to default
    // noinspection SuspiciousTypeOfGuard
    if (typeof state.userSlippageTolerance !== 'number') {
        state.userSlippageTolerance = INITIAL_ALLOWED_SLIPPAGE;
    }
    // deadline isnt being tracked in local storage, reset to default
    // noinspection SuspiciousTypeOfGuard
    if (typeof state.userDeadline !== 'number') {
        state.userDeadline = DEFAULT_DEADLINE_FROM_NOW;
    }
    state.lastUpdateVersionTimestamp = currentTimestamp();
})
    .addCase(updateTheme, (state, action) => {
    var _a;
    state.theme = (_a = action.payload.theme) !== null && _a !== void 0 ? _a : null;
    state.timestamp = currentTimestamp();
})
    .addCase(updateMatchesDarkMode, (state, action) => {
    state.matchesDarkMode = action.payload.matchesDarkMode;
    state.timestamp = currentTimestamp();
})
    .addCase(updateUserExpertMode, (state, action) => {
    state.userExpertMode = action.payload.userExpertMode;
    state.timestamp = currentTimestamp();
})
    .addCase(updateUserSlippageTolerance, (state, action) => {
    state.userSlippageTolerance = action.payload.userSlippageTolerance;
    state.timestamp = currentTimestamp();
})
    .addCase(updateUserDeadline, (state, action) => {
    state.userDeadline = action.payload.userDeadline;
    state.timestamp = currentTimestamp();
})
    .addCase(updateUserSingleHopOnly, (state, action) => {
    state.userSingleHopOnly = action.payload.userSingleHopOnly;
})
    .addCase(updateUserMinApprove, (state, action) => {
    state.userMinApprove = action.payload.userMinApprove;
})
    .addCase(updateUserAllowMoolaWithdrawal, (state, action) => {
    state.userAllowMoolaWithdrawal = action.payload.userAllowMoolaWithdrawal;
})
    .addCase(updateUserDisableSmartRouting, (state, action) => {
    state.userDisableSmartRouting = action.payload.userDisableSmartRouting;
})
    .addCase(addSerializedToken, (state, { payload: { serializedToken } }) => {
    state.tokens[serializedToken.chainId] = state.tokens[serializedToken.chainId] || {};
    state.tokens[serializedToken.chainId][serializedToken.address] = serializedToken;
    state.timestamp = currentTimestamp();
})
    .addCase(removeSerializedToken, (state, { payload: { address, chainId } }) => {
    state.tokens[chainId] = state.tokens[chainId] || {};
    delete state.tokens[chainId][address];
    state.timestamp = currentTimestamp();
})
    .addCase(addSerializedPair, (state, { payload: { serializedPair } }) => {
    if (serializedPair.token0.chainId === serializedPair.token1.chainId &&
        serializedPair.token0.address !== serializedPair.token1.address) {
        const chainId = serializedPair.token0.chainId;
        state.pairs[chainId] = state.pairs[chainId] || {};
        state.pairs[chainId][pairKey(serializedPair.token0.address, serializedPair.token1.address)] = serializedPair;
    }
    state.timestamp = currentTimestamp();
})
    .addCase(removeSerializedPair, (state, { payload: { chainId, tokenAAddress, tokenBAddress } }) => {
    if (state.pairs[chainId]) {
        // just delete both keys if either exists
        delete state.pairs[chainId][pairKey(tokenAAddress, tokenBAddress)];
        delete state.pairs[chainId][pairKey(tokenBAddress, tokenAAddress)];
    }
    state.timestamp = currentTimestamp();
})
    .addCase(toggleURLWarning, (state) => {
    state.URLWarningVisible = !state.URLWarningVisible;
})
    .addCase(setValoraAccount, (state, { payload }) => {
    state.valoraAccount = payload;
})
    .addCase(clearValoraAccount, (state) => {
    state.valoraAccount = null;
})
    .addCase(updateUserAprMode, (state, action) => {
    state.userAprMode = action.payload.userAprMode;
}));
