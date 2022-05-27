"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const toolkit_1 = require("@reduxjs/toolkit");
const actions_1 = require("./actions");
const initialState = {
    callResults: {},
};
exports.default = (0, toolkit_1.createReducer)(initialState, (builder) => builder
    .addCase(actions_1.addMulticallListeners, (state, { payload: { calls, chainId, options: { blocksPerFetch = 1 } = {} } }) => {
    var _a;
    const listeners = state.callListeners
        ? state.callListeners
        : (state.callListeners = {});
    listeners[chainId] = (_a = listeners[chainId]) !== null && _a !== void 0 ? _a : {};
    calls.forEach((call) => {
        var _a, _b;
        const callKey = (0, actions_1.toCallKey)(call);
        listeners[chainId][callKey] = (_a = listeners[chainId][callKey]) !== null && _a !== void 0 ? _a : {};
        listeners[chainId][callKey][blocksPerFetch] = ((_b = listeners[chainId][callKey][blocksPerFetch]) !== null && _b !== void 0 ? _b : 0) + 1;
    });
})
    .addCase(actions_1.removeMulticallListeners, (state, { payload: { chainId, calls, options: { blocksPerFetch = 1 } = {} } }) => {
    const listeners = state.callListeners
        ? state.callListeners
        : (state.callListeners = {});
    if (!listeners[chainId])
        return;
    calls.forEach((call) => {
        const callKey = (0, actions_1.toCallKey)(call);
        if (!listeners[chainId][callKey])
            return;
        if (!listeners[chainId][callKey][blocksPerFetch])
            return;
        if (listeners[chainId][callKey][blocksPerFetch] === 1) {
            delete listeners[chainId][callKey][blocksPerFetch];
        }
        else {
            listeners[chainId][callKey][blocksPerFetch]--;
        }
    });
})
    .addCase(actions_1.fetchingMulticallResults, (state, { payload: { chainId, fetchingBlockNumber, calls } }) => {
    var _a;
    state.callResults[chainId] = (_a = state.callResults[chainId]) !== null && _a !== void 0 ? _a : {};
    calls.forEach((call) => {
        var _a;
        const callKey = (0, actions_1.toCallKey)(call);
        const current = state.callResults[chainId][callKey];
        if (!current) {
            state.callResults[chainId][callKey] = {
                fetchingBlockNumber,
            };
        }
        else {
            if (((_a = current.fetchingBlockNumber) !== null && _a !== void 0 ? _a : 0) >= fetchingBlockNumber)
                return;
            state.callResults[chainId][callKey].fetchingBlockNumber = fetchingBlockNumber;
        }
    });
})
    .addCase(actions_1.errorFetchingMulticallResults, (state, { payload: { fetchingBlockNumber, chainId, calls } }) => {
    var _a;
    state.callResults[chainId] = (_a = state.callResults[chainId]) !== null && _a !== void 0 ? _a : {};
    calls.forEach((call) => {
        const callKey = (0, actions_1.toCallKey)(call);
        const current = state.callResults[chainId][callKey];
        if (!current)
            return; // only should be dispatched if we are already fetching
        if (current.fetchingBlockNumber === fetchingBlockNumber) {
            delete current.fetchingBlockNumber;
            current.data = null;
            current.blockNumber = fetchingBlockNumber;
        }
    });
})
    .addCase(actions_1.updateMulticallResults, (state, { payload: { chainId, results, blockNumber } }) => {
    var _a;
    state.callResults[chainId] = (_a = state.callResults[chainId]) !== null && _a !== void 0 ? _a : {};
    Object.keys(results).forEach((callKey) => {
        var _a;
        const current = state.callResults[chainId][callKey];
        if (((_a = current === null || current === void 0 ? void 0 : current.blockNumber) !== null && _a !== void 0 ? _a : 0) > blockNumber)
            return;
        state.callResults[chainId][callKey] = {
            data: results[callKey],
            blockNumber,
        };
    });
}));
