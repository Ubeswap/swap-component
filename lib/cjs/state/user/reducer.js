"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initialState = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const constants_1 = require("../../constants");
const actions_1 = require("../global/actions");
const actions_2 = require("./actions");
const currentTimestamp = () => new Date().getTime();
function pairKey(token0Address, token1Address) {
    return `${token0Address};${token1Address}`;
}
exports.initialState = {
    theme: null,
    matchesDarkMode: false,
    userExpertMode: false,
    userSingleHopOnly: false,
    userMinApprove: false,
    userAllowMoolaWithdrawal: false,
    userDisableSmartRouting: false,
    userSlippageTolerance: constants_1.INITIAL_ALLOWED_SLIPPAGE,
    userDeadline: constants_1.DEFAULT_DEADLINE_FROM_NOW,
    tokens: {},
    pairs: {},
    timestamp: currentTimestamp(),
    URLWarningVisible: true,
    valoraAccount: null,
    userAprMode: false,
};
exports.default = (0, toolkit_1.createReducer)(exports.initialState, (builder) => builder
    .addCase(actions_1.updateVersion, (state) => {
    // slippage isnt being tracked in local storage, reset to default
    // noinspection SuspiciousTypeOfGuard
    if (typeof state.userSlippageTolerance !== 'number') {
        state.userSlippageTolerance = constants_1.INITIAL_ALLOWED_SLIPPAGE;
    }
    // deadline isnt being tracked in local storage, reset to default
    // noinspection SuspiciousTypeOfGuard
    if (typeof state.userDeadline !== 'number') {
        state.userDeadline = constants_1.DEFAULT_DEADLINE_FROM_NOW;
    }
    state.lastUpdateVersionTimestamp = currentTimestamp();
})
    .addCase(actions_2.updateTheme, (state, action) => {
    var _a;
    state.theme = (_a = action.payload.theme) !== null && _a !== void 0 ? _a : null;
    state.timestamp = currentTimestamp();
})
    .addCase(actions_2.updateMatchesDarkMode, (state, action) => {
    state.matchesDarkMode = action.payload.matchesDarkMode;
    state.timestamp = currentTimestamp();
})
    .addCase(actions_2.updateUserExpertMode, (state, action) => {
    state.userExpertMode = action.payload.userExpertMode;
    state.timestamp = currentTimestamp();
})
    .addCase(actions_2.updateUserSlippageTolerance, (state, action) => {
    state.userSlippageTolerance = action.payload.userSlippageTolerance;
    state.timestamp = currentTimestamp();
})
    .addCase(actions_2.updateUserDeadline, (state, action) => {
    state.userDeadline = action.payload.userDeadline;
    state.timestamp = currentTimestamp();
})
    .addCase(actions_2.updateUserSingleHopOnly, (state, action) => {
    state.userSingleHopOnly = action.payload.userSingleHopOnly;
})
    .addCase(actions_2.updateUserMinApprove, (state, action) => {
    state.userMinApprove = action.payload.userMinApprove;
})
    .addCase(actions_2.updateUserAllowMoolaWithdrawal, (state, action) => {
    state.userAllowMoolaWithdrawal = action.payload.userAllowMoolaWithdrawal;
})
    .addCase(actions_2.updateUserDisableSmartRouting, (state, action) => {
    state.userDisableSmartRouting = action.payload.userDisableSmartRouting;
})
    .addCase(actions_2.addSerializedToken, (state, { payload: { serializedToken } }) => {
    state.tokens[serializedToken.chainId] = state.tokens[serializedToken.chainId] || {};
    state.tokens[serializedToken.chainId][serializedToken.address] = serializedToken;
    state.timestamp = currentTimestamp();
})
    .addCase(actions_2.removeSerializedToken, (state, { payload: { address, chainId } }) => {
    state.tokens[chainId] = state.tokens[chainId] || {};
    delete state.tokens[chainId][address];
    state.timestamp = currentTimestamp();
})
    .addCase(actions_2.addSerializedPair, (state, { payload: { serializedPair } }) => {
    if (serializedPair.token0.chainId === serializedPair.token1.chainId &&
        serializedPair.token0.address !== serializedPair.token1.address) {
        const chainId = serializedPair.token0.chainId;
        state.pairs[chainId] = state.pairs[chainId] || {};
        state.pairs[chainId][pairKey(serializedPair.token0.address, serializedPair.token1.address)] = serializedPair;
    }
    state.timestamp = currentTimestamp();
})
    .addCase(actions_2.removeSerializedPair, (state, { payload: { chainId, tokenAAddress, tokenBAddress } }) => {
    if (state.pairs[chainId]) {
        // just delete both keys if either exists
        delete state.pairs[chainId][pairKey(tokenAAddress, tokenBAddress)];
        delete state.pairs[chainId][pairKey(tokenBAddress, tokenAAddress)];
    }
    state.timestamp = currentTimestamp();
})
    .addCase(actions_2.toggleURLWarning, (state) => {
    state.URLWarningVisible = !state.URLWarningVisible;
})
    .addCase(actions_2.setValoraAccount, (state, { payload }) => {
    state.valoraAccount = payload;
})
    .addCase(actions_2.clearValoraAccount, (state) => {
    state.valoraAccount = null;
})
    .addCase(actions_2.updateUserAprMode, (state, action) => {
    state.userAprMode = action.payload.userAprMode;
}));
