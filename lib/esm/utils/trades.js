import { isDualTradeBetter } from '../components/swap/routing/hooks/calculateBestTrades';
import { ZERO_PERCENT } from '../constants/index';
// returns whether tradeB is better than tradeA by at least a threshold percentage amount
export function isTradeBetter(tradeA, tradeB, minimumDelta = ZERO_PERCENT) {
    return isDualTradeBetter(tradeA, tradeB, minimumDelta);
}
