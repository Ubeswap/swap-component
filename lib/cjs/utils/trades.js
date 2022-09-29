"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isTradeBetter = void 0;
const calculateBestTrades_1 = require("../components/swap/routing/hooks/calculateBestTrades");
const index_1 = require("../constants/index");
// returns whether tradeB is better than tradeA by at least a threshold percentage amount
function isTradeBetter(tradeA, tradeB, minimumDelta = index_1.ZERO_PERCENT) {
    return (0, calculateBestTrades_1.isDualTradeBetter)(tradeA, tradeB, minimumDelta);
}
exports.isTradeBetter = isTradeBetter;
