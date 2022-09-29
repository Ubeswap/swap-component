"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useApproveCallbackFromTrade = exports.useApproveCallback = exports.ApprovalState = void 0;
const use_contractkit_1 = require("@celo-tools/use-contractkit");
const constants_1 = require("@ethersproject/constants");
const sdk_1 = require("@ubeswap/sdk");
const react_1 = require("react");
const routing_1 = require("../components/swap/routing");
const useTrade_1 = require("../components/swap/routing/hooks/useTrade");
const MoolaDirectTrade_1 = require("../components/swap/routing/moola/MoolaDirectTrade");
const useMoola_1 = require("../components/swap/routing/moola/useMoola");
const trade_1 = require("../components/swap/routing/trade");
const constants_2 = require("../constants");
const Allowances_1 = require("../data/Allowances");
const actions_1 = require("../state/swap/actions");
const hooks_1 = require("../state/transactions/hooks");
const hooks_2 = require("../state/user/hooks");
const prices_1 = require("../utils/prices");
const useContract_1 = require("./useContract");
var ApprovalState;
(function (ApprovalState) {
    ApprovalState[ApprovalState["UNKNOWN"] = 0] = "UNKNOWN";
    ApprovalState[ApprovalState["NOT_APPROVED"] = 1] = "NOT_APPROVED";
    ApprovalState[ApprovalState["PENDING"] = 2] = "PENDING";
    ApprovalState[ApprovalState["APPROVED"] = 3] = "APPROVED";
})(ApprovalState = exports.ApprovalState || (exports.ApprovalState = {}));
// returns a variable indicating the state of the approval and a function which approves if necessary or early returns
function useApproveCallback(amountToApprove, spender) {
    const { address: account } = (0, use_contractkit_1.useContractKit)();
    const getConnectedSigner = (0, use_contractkit_1.useGetConnectedSigner)();
    const token = amountToApprove instanceof sdk_1.TokenAmount ? amountToApprove.token : undefined;
    const [minApprove] = (0, hooks_2.useUserMinApprove)();
    const currentAllowance = (0, Allowances_1.useTokenAllowance)(token, account !== null && account !== void 0 ? account : undefined, spender);
    const pendingApproval = (0, hooks_1.useHasPendingApproval)(token === null || token === void 0 ? void 0 : token.address, spender);
    // check the current approval status
    const approvalState = (0, react_1.useMemo)(() => {
        if (!amountToApprove || !spender)
            return ApprovalState.UNKNOWN;
        // we might not have enough data to know whether or not we need to approve
        if (!currentAllowance)
            return ApprovalState.UNKNOWN;
        // amountToApprove will be defined if currentAllowance is
        return currentAllowance.lessThan(amountToApprove)
            ? pendingApproval
                ? ApprovalState.PENDING
                : ApprovalState.NOT_APPROVED
            : ApprovalState.APPROVED;
    }, [amountToApprove, currentAllowance, pendingApproval, spender]);
    const tokenContractDisconnected = (0, useContract_1.useTokenContract)(token === null || token === void 0 ? void 0 : token.address);
    const doTransaction = (0, routing_1.useDoTransaction)();
    const approve = (0, react_1.useCallback)(() => __awaiter(this, void 0, void 0, function* () {
        if (approvalState !== ApprovalState.NOT_APPROVED) {
            console.error('approve was called unnecessarily');
            return;
        }
        if (!token) {
            console.error('no token');
            return;
        }
        if (!tokenContractDisconnected) {
            console.error('tokenContract is null');
            return;
        }
        if (!amountToApprove) {
            console.error('missing amount to approve');
            return;
        }
        if (!spender) {
            console.error('no spender');
            return;
        }
        // connect
        const tokenContract = tokenContractDisconnected.connect(yield getConnectedSigner());
        if (minApprove) {
            yield doTransaction(tokenContract, 'approve', {
                args: [spender, amountToApprove.raw.toString()],
                summary: `Approve ${amountToApprove.toSignificant(6)} ${amountToApprove.currency.symbol}`,
                approval: { tokenAddress: token.address, spender: spender },
            });
        }
        else {
            yield doTransaction(tokenContract, 'approve', {
                args: [spender, constants_1.MaxUint256],
                summary: `Approve ${amountToApprove.currency.symbol}`,
                approval: { tokenAddress: token.address, spender: spender },
            });
        }
    }), [
        approvalState,
        token,
        tokenContractDisconnected,
        amountToApprove,
        spender,
        getConnectedSigner,
        minApprove,
        doTransaction,
    ]);
    return [approvalState, approve];
}
exports.useApproveCallback = useApproveCallback;
// wraps useApproveCallback in the context of a swap
function useApproveCallbackFromTrade(trade, allowedSlippage = 0) {
    const amountToApprove = (0, react_1.useMemo)(() => (trade ? (0, prices_1.computeSlippageAdjustedAmounts)(trade, allowedSlippage)[actions_1.Field.INPUT] : undefined), [trade, allowedSlippage]);
    const moola = (0, useMoola_1.useMoolaConfig)();
    return useApproveCallback(amountToApprove, trade instanceof trade_1.MinimaRouterTrade
        ? constants_2.MINIMA_ROUTER_ADDRESS
        : trade instanceof MoolaDirectTrade_1.MoolaDirectTrade
            ? moola === null || moola === void 0 ? void 0 : moola.lendingPool
            : trade instanceof useTrade_1.MoolaRouterTrade
                ? constants_2.UBESWAP_MOOLA_ROUTER_ADDRESS
                : constants_2.ROUTER_ADDRESS);
}
exports.useApproveCallbackFromTrade = useApproveCallbackFromTrade;
