import { Percent } from '@ubeswap/sdk';
import { UbeswapTrade } from 'components/swap/routing/trade';
export declare function isTradeBetter(tradeA: UbeswapTrade | undefined | null, tradeB: UbeswapTrade | undefined | null, minimumDelta?: Percent): boolean | undefined;
