import { Trade } from '@ubeswap/sdk';
import React from 'react';
interface Props {
    trade: Trade;
    allowedSlippage: number;
}
export declare const UbeswapTradeDetails: React.FC<Props>;
export {};
