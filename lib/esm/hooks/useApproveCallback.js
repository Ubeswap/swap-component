var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { useContractKit, useGetConnectedSigner } from '@celo-tools/use-contractkit';
import { MaxUint256 } from '@ethersproject/constants';
import { TokenAmount } from '@ubeswap/sdk';
import { useDoTransaction } from 'components/swap/routing';
import { MoolaRouterTrade } from 'components/swap/routing/hooks/useTrade';
import { MoolaDirectTrade } from 'components/swap/routing/moola/MoolaDirectTrade';
import { useMoolaConfig } from 'components/swap/routing/moola/useMoola';
import { useCallback, useMemo } from 'react';
import { useUserMinApprove } from 'state/user/hooks';
import { ROUTER_ADDRESS, UBESWAP_MOOLA_ROUTER_ADDRESS } from '../constants';
import { useTokenAllowance } from '../data/Allowances';
import { Field } from '../state/swap/actions';
import { useHasPendingApproval } from '../state/transactions/hooks';
import { computeSlippageAdjustedAmounts } from '../utils/prices';
import { useTokenContract } from './useContract';
export var ApprovalState;
(function (ApprovalState) {
    ApprovalState[ApprovalState["UNKNOWN"] = 0] = "UNKNOWN";
    ApprovalState[ApprovalState["NOT_APPROVED"] = 1] = "NOT_APPROVED";
    ApprovalState[ApprovalState["PENDING"] = 2] = "PENDING";
    ApprovalState[ApprovalState["APPROVED"] = 3] = "APPROVED";
})(ApprovalState || (ApprovalState = {}));
// returns a variable indicating the state of the approval and a function which approves if necessary or early returns
export function useApproveCallback(amountToApprove, spender) {
    const { address: account } = useContractKit();
    const getConnectedSigner = useGetConnectedSigner();
    const token = amountToApprove instanceof TokenAmount ? amountToApprove.token : undefined;
    const [minApprove] = useUserMinApprove();
    const currentAllowance = useTokenAllowance(token, account !== null && account !== void 0 ? account : undefined, spender);
    const pendingApproval = useHasPendingApproval(token === null || token === void 0 ? void 0 : token.address, spender);
    // check the current approval status
    const approvalState = useMemo(() => {
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
    const tokenContractDisconnected = useTokenContract(token === null || token === void 0 ? void 0 : token.address);
    const doTransaction = useDoTransaction();
    const approve = useCallback(() => __awaiter(this, void 0, void 0, function* () {
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
                args: [spender, MaxUint256],
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
// wraps useApproveCallback in the context of a swap
export function useApproveCallbackFromTrade(trade, allowedSlippage = 0) {
    const amountToApprove = useMemo(() => (trade ? computeSlippageAdjustedAmounts(trade, allowedSlippage)[Field.INPUT] : undefined), [trade, allowedSlippage]);
    const moola = useMoolaConfig();
    return useApproveCallback(amountToApprove, trade instanceof MoolaDirectTrade
        ? moola === null || moola === void 0 ? void 0 : moola.lendingPool
        : trade instanceof MoolaRouterTrade
            ? UBESWAP_MOOLA_ROUTER_ADDRESS
            : ROUTER_ADDRESS);
}
