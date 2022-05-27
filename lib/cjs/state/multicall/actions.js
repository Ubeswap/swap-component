"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateMulticallResults = exports.errorFetchingMulticallResults = exports.fetchingMulticallResults = exports.removeMulticallListeners = exports.addMulticallListeners = exports.parseCallKey = exports.toCallKey = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const ADDRESS_REGEX = /^0x[a-fA-F0-9]{40}$/;
const LOWER_HEX_REGEX = /^0x[a-f0-9]*$/;
function toCallKey(call) {
    if (!ADDRESS_REGEX.test(call.address)) {
        throw new Error(`Invalid address: ${call.address}`);
    }
    if (!LOWER_HEX_REGEX.test(call.callData)) {
        throw new Error(`Invalid hex: ${call.callData}`);
    }
    return `${call.address}-${call.callData}`;
}
exports.toCallKey = toCallKey;
function parseCallKey(callKey) {
    const pcs = callKey.split('-');
    if (pcs.length !== 2) {
        throw new Error(`Invalid call key: ${callKey}`);
    }
    return {
        address: pcs[0],
        callData: pcs[1],
    };
}
exports.parseCallKey = parseCallKey;
exports.addMulticallListeners = (0, toolkit_1.createAction)('multicall/addMulticallListeners');
exports.removeMulticallListeners = (0, toolkit_1.createAction)('multicall/removeMulticallListeners');
exports.fetchingMulticallResults = (0, toolkit_1.createAction)('multicall/fetchingMulticallResults');
exports.errorFetchingMulticallResults = (0, toolkit_1.createAction)('multicall/errorFetchingMulticallResults');
exports.updateMulticallResults = (0, toolkit_1.createAction)('multicall/updateMulticallResults');
