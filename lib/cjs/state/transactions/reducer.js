"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initialState = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const actions_1 = require("./actions");
const now = () => new Date().getTime();
exports.initialState = {};
exports.default = (0, toolkit_1.createReducer)(exports.initialState, (builder) => builder
    .addCase(actions_1.addTransaction, (transactions, { payload: { chainId, from, hash, approval, summary, claim } }) => {
    var _a, _b;
    if ((_a = transactions[chainId]) === null || _a === void 0 ? void 0 : _a[hash]) {
        throw Error('Attempted to add existing transaction.');
    }
    const txs = (_b = transactions[chainId]) !== null && _b !== void 0 ? _b : {};
    txs[hash] = { hash, approval, summary, claim, from, addedTime: now() };
    transactions[chainId] = txs;
})
    .addCase(actions_1.clearAllTransactions, (transactions, { payload: { chainId } }) => {
    if (!transactions[chainId])
        return;
    transactions[chainId] = {};
})
    .addCase(actions_1.checkedTransaction, (transactions, { payload: { chainId, hash, blockNumber } }) => {
    var _a;
    const tx = (_a = transactions[chainId]) === null || _a === void 0 ? void 0 : _a[hash];
    if (!tx) {
        return;
    }
    if (!tx.lastCheckedBlockNumber) {
        tx.lastCheckedBlockNumber = blockNumber;
    }
    else {
        tx.lastCheckedBlockNumber = Math.max(blockNumber, tx.lastCheckedBlockNumber);
    }
})
    .addCase(actions_1.finalizeTransaction, (transactions, { payload: { hash, chainId, receipt } }) => {
    var _a;
    const tx = (_a = transactions[chainId]) === null || _a === void 0 ? void 0 : _a[hash];
    if (!tx) {
        return;
    }
    tx.receipt = receipt;
    tx.confirmedTime = now();
}));
