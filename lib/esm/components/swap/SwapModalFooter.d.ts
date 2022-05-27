/// <reference types="react" />
import { Trade } from '@ubeswap/sdk';
export default function SwapModalFooter({ trade, onConfirm, allowedSlippage, swapErrorMessage, disabledConfirm, }: {
    trade: Trade;
    allowedSlippage: number;
    onConfirm: () => void;
    swapErrorMessage: string | undefined;
    disabledConfirm: boolean;
}): JSX.Element;
