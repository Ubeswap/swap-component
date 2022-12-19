"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useUserHasSubmittedClaim = exports.useHasPendingApproval = exports.isTransactionRecent = exports.useIsTransactionPending = exports.useAllTransactions = exports.useTransactionAdder = void 0;
const use_contractkit_1 = require("@celo-tools/use-contractkit");
const react_1 = require("react");
const react_redux_1 = require("react-redux");
const actions_1 = require("./actions");
// helper that can take a ethers library transaction response and add it to the list of transactions
function useTransactionAdder() {
    const { network, address } = (0, use_contractkit_1.useContractKit)();
    const accountInfo = (0, react_redux_1.useSelector)((state) => state.swap.accountInfo);
    const account = accountInfo ? accountInfo.account : address;
    const chainId = (accountInfo ? accountInfo.chainId : network.chainId);
    const dispatch = (0, react_redux_1.useDispatch)();
    return (0, react_1.useCallback)((response, { summary, approval, claim, } = {}) => {
        if (!account)
            return;
        if (!chainId)
            return;
        const { hash } = response;
        if (!hash) {
            throw Error('No transaction hash found.');
        }
        dispatch((0, actions_1.addTransaction)({ hash, from: account, chainId, approval, summary, claim }));
    }, [dispatch, chainId, account]);
}
exports.useTransactionAdder = useTransactionAdder;
// returns all the transactions for the current chain
function useAllTransactions() {
    var _a;
    const { network } = (0, use_contractkit_1.useContractKit)();
    const accountInfo = (0, react_redux_1.useSelector)((state) => state.swap.accountInfo);
    const chainId = accountInfo ? accountInfo.chainId : network.chainId;
    const state = (0, react_redux_1.useSelector)((state) => state.transactions);
    return chainId ? (_a = state[chainId]) !== null && _a !== void 0 ? _a : {} : {};
}
exports.useAllTransactions = useAllTransactions;
function useIsTransactionPending(transactionHash) {
    const transactions = useAllTransactions();
    if (!transactionHash || !transactions[transactionHash])
        return false;
    return !transactions[transactionHash].receipt;
}
exports.useIsTransactionPending = useIsTransactionPending;
/**
 * Returns whether a transaction happened in the last day (86400 seconds * 1000 milliseconds / second)
 * @param tx to check for recency
 */
function isTransactionRecent(tx) {
    return new Date().getTime() - tx.addedTime < 86400000;
}
exports.isTransactionRecent = isTransactionRecent;
// returns whether a token has a pending approval transaction
function useHasPendingApproval(tokenAddress, spender) {
    const allTransactions = useAllTransactions();
    return (0, react_1.useMemo)(() => typeof tokenAddress === 'string' &&
        typeof spender === 'string' &&
        Object.keys(allTransactions).some((hash) => {
            const tx = allTransactions[hash];
            if (!tx)
                return false;
            if (tx.receipt) {
                return false;
            }
            else {
                const approval = tx.approval;
                if (!approval)
                    return false;
                return approval.spender === spender && approval.tokenAddress === tokenAddress && isTransactionRecent(tx);
            }
        }), [allTransactions, spender, tokenAddress]);
}
exports.useHasPendingApproval = useHasPendingApproval;
// watch for submissions to claim
// return null if not done loading, return undefined if not found
function useUserHasSubmittedClaim(account) {
    const allTransactions = useAllTransactions();
    // get the txn if it has been submitted
    const claimTxn = (0, react_1.useMemo)(() => {
        const txnIndex = Object.keys(allTransactions).find((hash) => {
            const tx = allTransactions[hash];
            return tx.claim && tx.claim.recipient === account;
        });
        return txnIndex && allTransactions[txnIndex] ? allTransactions[txnIndex] : undefined;
    }, [account, allTransactions]);
    return { claimSubmitted: Boolean(claimTxn), claimTxn };
}
exports.useUserHasSubmittedClaim = useUserHasSubmittedClaim;
