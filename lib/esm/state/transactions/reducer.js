import { createReducer } from '@reduxjs/toolkit';
import { addTransaction, checkedTransaction, clearAllTransactions, finalizeTransaction, } from './actions';
const now = () => new Date().getTime();
export const initialState = {};
export default createReducer(initialState, (builder) => builder
    .addCase(addTransaction, (transactions, { payload: { chainId, from, hash, approval, summary, claim } }) => {
    var _a, _b;
    if ((_a = transactions[chainId]) === null || _a === void 0 ? void 0 : _a[hash]) {
        throw Error('Attempted to add existing transaction.');
    }
    const txs = (_b = transactions[chainId]) !== null && _b !== void 0 ? _b : {};
    txs[hash] = { hash, approval, summary, claim, from, addedTime: now() };
    transactions[chainId] = txs;
})
    .addCase(clearAllTransactions, (transactions, { payload: { chainId } }) => {
    if (!transactions[chainId])
        return;
    transactions[chainId] = {};
})
    .addCase(checkedTransaction, (transactions, { payload: { chainId, hash, blockNumber } }) => {
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
    .addCase(finalizeTransaction, (transactions, { payload: { hash, chainId, receipt } }) => {
    var _a;
    const tx = (_a = transactions[chainId]) === null || _a === void 0 ? void 0 : _a[hash];
    if (!tx) {
        return;
    }
    tx.receipt = receipt;
    tx.confirmedTime = now();
}));
