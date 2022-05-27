/// <reference types="react" />
import { Trade } from '@ubeswap/sdk';
export default function LimitOrderModalHeader({ trade, allowedSlippage, recipient, showAcceptChanges, onAcceptChanges, }: {
    trade: Trade;
    allowedSlippage: number;
    recipient: string | null;
    showAcceptChanges: boolean;
    onAcceptChanges: () => void;
}): JSX.Element;
