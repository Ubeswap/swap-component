import { useContractKit } from '@celo-tools/use-contractkit';
import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTransaction } from './actions';
// helper that can take a ethers library transaction response and add it to the list of transactions
export function useTransactionAdder() {
    const { network, address } = useContractKit();
    const accountInfo = useSelector((state) => state.swap.accountInfo);
    const account = accountInfo ? accountInfo.account : address;
    const chainId = (accountInfo ? accountInfo.chainId : network.chainId);
    const dispatch = useDispatch();
    return useCallback((response, { summary, approval, claim, } = {}) => {
        if (!account)
            return;
        if (!chainId)
            return;
        const { hash } = response;
        if (!hash) {
            throw Error('No transaction hash found.');
        }
        dispatch(addTransaction({ hash, from: account, chainId, approval, summary, claim }));
    }, [dispatch, chainId, account]);
}
// returns all the transactions for the current chain
export function useAllTransactions() {
    var _a;
    const { network } = useContractKit();
    const accountInfo = useSelector((state) => state.swap.accountInfo);
    const chainId = accountInfo ? accountInfo.chainId : network.chainId;
    const state = useSelector((state) => state.transactions);
    return chainId ? (_a = state[chainId]) !== null && _a !== void 0 ? _a : {} : {};
}
export function useIsTransactionPending(transactionHash) {
    const transactions = useAllTransactions();
    if (!transactionHash || !transactions[transactionHash])
        return false;
    return !transactions[transactionHash].receipt;
}
/**
 * Returns whether a transaction happened in the last day (86400 seconds * 1000 milliseconds / second)
 * @param tx to check for recency
 */
export function isTransactionRecent(tx) {
    return new Date().getTime() - tx.addedTime < 86400000;
}
// returns whether a token has a pending approval transaction
export function useHasPendingApproval(tokenAddress, spender) {
    const allTransactions = useAllTransactions();
    return useMemo(() => typeof tokenAddress === 'string' &&
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
// watch for submissions to claim
// return null if not done loading, return undefined if not found
export function useUserHasSubmittedClaim(account) {
    const allTransactions = useAllTransactions();
    // get the txn if it has been submitted
    const claimTxn = useMemo(() => {
        const txnIndex = Object.keys(allTransactions).find((hash) => {
            const tx = allTransactions[hash];
            return tx.claim && tx.claim.recipient === account;
        });
        return txnIndex && allTransactions[txnIndex] ? allTransactions[txnIndex] : undefined;
    }, [account, allTransactions]);
    return { claimSubmitted: Boolean(claimTxn), claimTxn };
}
