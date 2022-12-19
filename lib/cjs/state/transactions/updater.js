"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shouldCheck = void 0;
const use_contractkit_1 = require("@celo-tools/use-contractkit");
const react_1 = require("react");
const react_redux_1 = require("react-redux");
const hooks_1 = require("../application/hooks");
const actions_1 = require("./actions");
function shouldCheck(lastBlockNumber, tx) {
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
exports.shouldCheck = shouldCheck;
function Updater() {
    const { network } = (0, use_contractkit_1.useContractKit)();
    const accountInfo = (0, react_redux_1.useSelector)((state) => state.swap.accountInfo);
    const chainId = (accountInfo ? accountInfo.chainId : network.chainId);
    const library = (0, use_contractkit_1.useProvider)();
    const provider = accountInfo ? accountInfo.provider : library;
    const lastBlockNumber = (0, hooks_1.useBlockNumber)();
    const dispatch = (0, react_redux_1.useDispatch)();
    const state = (0, react_redux_1.useSelector)((state) => state.transactions);
    const transactions = (0, react_1.useMemo)(() => { var _a; return (chainId ? (_a = state[chainId]) !== null && _a !== void 0 ? _a : {} : {}); }, [chainId, state]);
    // show popup on confirm
    const addPopup = (0, hooks_1.useAddPopup)();
    (0, react_1.useEffect)(() => {
        if (!chainId || !provider || !lastBlockNumber)
            return;
        Object.keys(transactions)
            .filter((hash) => shouldCheck(lastBlockNumber, transactions[hash]))
            .forEach((hash) => {
            provider
                .getTransactionReceipt(hash)
                .then((receipt) => {
                var _a;
                if (receipt) {
                    dispatch((0, actions_1.finalizeTransaction)({
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
                    dispatch((0, actions_1.checkedTransaction)({ chainId, hash, blockNumber: lastBlockNumber }));
                }
            })
                .catch((error) => {
                console.error(`failed to check transaction hash: ${hash}`, error);
            });
        });
    }, [chainId, provider, transactions, lastBlockNumber, dispatch, addPopup]);
    return null;
}
exports.default = Updater;
