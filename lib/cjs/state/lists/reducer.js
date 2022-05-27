"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const toolkit_1 = require("@reduxjs/toolkit");
const token_lists_1 = require("@uniswap/token-lists");
const lists_1 = require("../../constants/lists");
const actions_1 = require("../global/actions");
const lists_2 = require("./../../constants/lists");
const actions_2 = require("./actions");
const NEW_LIST_STATE = {
    error: null,
    current: null,
    loadingRequestId: null,
    pendingUpdate: null,
};
const initialState = {
    lastInitializedDefaultListOfLists: lists_1.DEFAULT_LIST_OF_LISTS,
    byUrl: Object.assign({}, lists_1.DEFAULT_LIST_OF_LISTS.reduce((memo, listUrl) => {
        memo[listUrl] = NEW_LIST_STATE;
        return memo;
    }, {})),
    activeListUrls: lists_2.DEFAULT_ACTIVE_LIST_URLS,
};
exports.default = (0, toolkit_1.createReducer)(initialState, (builder) => builder
    .addCase(actions_2.fetchTokenList.pending, (state, { payload: { requestId, url } }) => {
    var _a, _b, _c, _d;
    const current = ((_a = state.byUrl[url]) === null || _a === void 0 ? void 0 : _a.current) ? (_b = state.byUrl[url]) === null || _b === void 0 ? void 0 : _b.current : null;
    const pendingUpdate = ((_c = state.byUrl[url]) === null || _c === void 0 ? void 0 : _c.pendingUpdate) ? (_d = state.byUrl[url]) === null || _d === void 0 ? void 0 : _d.pendingUpdate : null;
    state.byUrl[url] = Object.assign(Object.assign({}, state.byUrl[url]), { current: current, pendingUpdate: pendingUpdate, loadingRequestId: requestId, error: null });
})
    .addCase(actions_2.fetchTokenList.fulfilled, (state, { payload: { requestId, tokenList, url } }) => {
    var _a, _b, _c;
    const current = (_a = state.byUrl[url]) === null || _a === void 0 ? void 0 : _a.current;
    const loadingRequestId = (_b = state.byUrl[url]) === null || _b === void 0 ? void 0 : _b.loadingRequestId;
    // no-op if update does nothing
    if (current) {
        const upgradeType = (0, token_lists_1.getVersionUpgrade)(current.version, tokenList.version);
        if (upgradeType === token_lists_1.VersionUpgrade.NONE)
            return;
        if (loadingRequestId === null || loadingRequestId === requestId) {
            state.byUrl[url] = Object.assign(Object.assign({}, state.byUrl[url]), { loadingRequestId: null, error: null, current: current, pendingUpdate: tokenList });
        }
    }
    else {
        // activate if on default active
        if (lists_2.DEFAULT_ACTIVE_LIST_URLS.includes(url)) {
            (_c = state.activeListUrls) === null || _c === void 0 ? void 0 : _c.push(url);
        }
        state.byUrl[url] = Object.assign(Object.assign({}, state.byUrl[url]), { loadingRequestId: null, error: null, current: tokenList, pendingUpdate: null });
    }
})
    .addCase(actions_2.fetchTokenList.rejected, (state, { payload: { url, requestId, errorMessage } }) => {
    var _a;
    if (((_a = state.byUrl[url]) === null || _a === void 0 ? void 0 : _a.loadingRequestId) !== requestId) {
        // no-op since it's not the latest request
        return;
    }
    state.byUrl[url] = Object.assign(Object.assign({}, state.byUrl[url]), { loadingRequestId: null, error: errorMessage, current: null, pendingUpdate: null });
})
    .addCase(actions_2.addList, (state, { payload: url }) => {
    if (!state.byUrl[url]) {
        state.byUrl[url] = NEW_LIST_STATE;
    }
})
    .addCase(actions_2.removeList, (state, { payload: url }) => {
    if (state.byUrl[url]) {
        delete state.byUrl[url];
    }
    // remove list from active urls if needed
    if (state.activeListUrls && state.activeListUrls.includes(url)) {
        state.activeListUrls = state.activeListUrls.filter((u) => u !== url);
    }
})
    .addCase(actions_2.enableList, (state, { payload: url }) => {
    if (!state.byUrl[url]) {
        state.byUrl[url] = NEW_LIST_STATE;
    }
    if (state.activeListUrls && !state.activeListUrls.includes(url)) {
        state.activeListUrls.push(url);
    }
    if (!state.activeListUrls) {
        state.activeListUrls = [url];
    }
})
    .addCase(actions_2.disableList, (state, { payload: url }) => {
    if (state.activeListUrls && state.activeListUrls.includes(url)) {
        state.activeListUrls = state.activeListUrls.filter((u) => u !== url);
    }
})
    .addCase(actions_2.acceptListUpdate, (state, { payload: url }) => {
    var _a;
    if (!((_a = state.byUrl[url]) === null || _a === void 0 ? void 0 : _a.pendingUpdate)) {
        throw new Error('accept list update called without pending update');
    }
    state.byUrl[url] = Object.assign(Object.assign({}, state.byUrl[url]), { pendingUpdate: null, current: state.byUrl[url].pendingUpdate });
})
    .addCase(actions_1.updateVersion, (state) => {
    // state loaded from localStorage, but new lists have never been initialized
    if (!state.lastInitializedDefaultListOfLists) {
        state.byUrl = initialState.byUrl;
        state.activeListUrls = initialState.activeListUrls;
    }
    else if (state.lastInitializedDefaultListOfLists) {
        const lastInitializedSet = state.lastInitializedDefaultListOfLists.reduce((s, l) => s.add(l), new Set());
        const newListOfListsSet = lists_1.DEFAULT_LIST_OF_LISTS.reduce((s, l) => s.add(l), new Set());
        lists_1.DEFAULT_LIST_OF_LISTS.forEach((listUrl) => {
            if (!lastInitializedSet.has(listUrl)) {
                state.byUrl[listUrl] = NEW_LIST_STATE;
            }
        });
        state.lastInitializedDefaultListOfLists.forEach((listUrl) => {
            if (!newListOfListsSet.has(listUrl)) {
                delete state.byUrl[listUrl];
            }
        });
    }
    state.lastInitializedDefaultListOfLists = lists_1.DEFAULT_LIST_OF_LISTS;
    // if no active lists, activate defaults
    if (!state.activeListUrls) {
        state.activeListUrls = lists_2.DEFAULT_ACTIVE_LIST_URLS;
        // for each list on default list, initialize if needed
        lists_2.DEFAULT_ACTIVE_LIST_URLS.map((listUrl) => {
            if (!state.byUrl[listUrl]) {
                state.byUrl[listUrl] = NEW_LIST_STATE;
            }
            return true;
        });
    }
}));
