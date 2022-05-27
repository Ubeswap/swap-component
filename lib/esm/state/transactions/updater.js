import { useContractKit, useProvider } from '@celo-tools/use-contractkit';
import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAddPopup, useBlockNumber } from '../application/hooks';
import { checkedTransaction, finalizeTransaction } from './actions';
export function shouldCheck(lastBlockNumber, tx) {
    if (tx.receipt)
        return false;
    if (!tx.lastCheckedBlockNumber)
        return true;
    const blocksSinceCheck = lastBlockNumber - tx.lastCheckedBlockNumber;
    if (blocksSinceCheck < 1)
        return false;
    const minutesPending = (new Date().getTime() - tx.addedTime) / 1000 / 60;
    if (minutesPending > 60) {
        // every 10 blocks if pending for longer than an hour
        return blocksSinceCheck > 9;
    }
    else if (minutesPending > 5) {
        // every 3 blocks if pending more than 5 minutes
        return blocksSinceCheck > 2;
    }
    else {
        // otherwise every block
        return true;
    }
}
export default function Updater() {
    const { network } = useContractKit();
    const chainId = network.chainId;
    const library = useProvider();
    const lastBlockNumber = useBlockNumber();
    const dispatch = useDispatch();
    const state = useSelector((state) => state.transactions);
    const transactions = useMemo(() => { var _a; return (chainId ? (_a = state[chainId]) !== null && _a !== void 0 ? _a : {} : {}); }, [chainId, state]);
    // show popup on confirm
    const addPopup = useAddPopup();
    useEffect(() => {
        if (!chainId || !library || !lastBlockNumber)
            return;
        Object.keys(transactions)
            .filter((hash) => shouldCheck(lastBlockNumber, transactions[hash]))
            .forEach((hash) => {
            library
                .getTransactionReceipt(hash)
                .then((receipt) => {
                var _a;
                if (receipt) {
                    dispatch(finalizeTransaction({
                        chainId,
                        hash,
                        receipt: {
                            blockHash: receipt.blockHash,
                            blockNumber: receipt.blockNumber,
                            contractAddress: receipt.contractAddress,
                            from: receipt.from,
                            status: receipt.status,
                            to: receipt.to,
                            transactionHash: receipt.transactionHash,
                            transactionIndex: receipt.transactionIndex,
                        },
                    }));
                    addPopup({
                        txn: {
                            hash,
                            success: receipt.status === 1,
                            summary: (_a = transactions[hash]) === null || _a === void 0 ? void 0 : _a.summary,
                        },
                    }, hash);
                }
                else {
                    dispatch(checkedTransaction({ chainId, hash, blockNumber: lastBlockNumber }));
                }
            })
                .catch((error) => {
                console.error(`failed to check transaction hash: ${hash}`, error);
            });
        });
    }, [chainId, library, transactions, lastBlockNumber, dispatch, addPopup]);
    return null;
}
