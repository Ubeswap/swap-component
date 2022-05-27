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
exports.useQueueLimitOrderTrade = void 0;
const use_contractkit_1 = require("@celo-tools/use-contractkit");
const LimitOrderProtocol__factory_1 = require("generated/factories/LimitOrderProtocol__factory");
const OrderBook__factory_1 = require("generated/factories/OrderBook__factory");
const react_1 = require("react");
const limitOrder_1 = require("utils/limitOrder");
const constants_1 = require("../../../../constants");
const __1 = require("..");
function cutLastArg(data, padding = 0) {
    return data.substr(0, data.length - 64 - padding);
}
/**
 * Queues a limit order trade.
 * @returns
 */
const useQueueLimitOrderTrade = () => {
    const getConnectedSigner = (0, use_contractkit_1.useGetConnectedSigner)();
    const doTransaction = (0, __1.useDoTransaction)();
    const [loading, setLoading] = (0, react_1.useState)(false);
    const queueLimitOrderCallback = (0, react_1.useCallback)(({ inputAmount, outputAmount, chainId, }) => __awaiter(void 0, void 0, void 0, function* () {
        const signer = yield getConnectedSigner();
        const limitOrderAddr = constants_1.LIMIT_ORDER_ADDRESS[chainId];
        const orderBookAddr = constants_1.ORDER_BOOK_ADDRESS[chainId];
        const rewardDistributorAddr = constants_1.ORDER_BOOK_REWARD_DISTRIBUTOR_ADDRESS[chainId];
        const limitOrderProtocolIface = LimitOrderProtocol__factory_1.LimitOrderProtocol__factory.createInterface();
        const orderBook = OrderBook__factory_1.OrderBook__factory.connect(orderBookAddr, signer);
        const makingAmount = inputAmount.raw.toString();
        const takingAmount = outputAmount.raw.toString();
        const limitOrder = {
            salt: Math.floor(Math.random() * 1000000000),
            makerAsset: inputAmount.currency.address,
            takerAsset: outputAmount.currency.address,
            maker: yield signer.getAddress(),
            receiver: constants_1.ZERO_ADDRESS,
            allowedSender: constants_1.ZERO_ADDRESS,
            makingAmount,
            takingAmount,
            makerAssetData: '0x',
            takerAssetData: '0x',
            getMakerAmount: cutLastArg(limitOrderProtocolIface.encodeFunctionData('getMakerAmount', [makingAmount, takingAmount, 0])),
            getTakerAmount: cutLastArg(limitOrderProtocolIface.encodeFunctionData('getTakerAmount', [makingAmount, takingAmount, 0])),
            predicate: '0x',
            permit: '0x',
            interaction: '0x',
        };
        try {
            setLoading(true);
            const limitOrderTypedData = (0, limitOrder_1.buildOrderData)(chainId.toString(), limitOrderAddr, limitOrder);
            const limitOrderSignature = yield signer._signTypedData(limitOrderTypedData.domain, limitOrderTypedData.types, limitOrder);
            yield doTransaction(orderBook, 'broadcastOrder', {
                args: [limitOrder, limitOrderSignature, rewardDistributorAddr],
                summary: `Place limit order for ${outputAmount.toSignificant(2)} ${outputAmount.currency.symbol}`,
            });
        }
        catch (e) {
            console.error(e);
        }
        finally {
            setLoading(false);
        }
    }), [doTransaction, getConnectedSigner]);
    return { queueLimitOrderCallback, loading };
};
exports.useQueueLimitOrderTrade = useQueueLimitOrderTrade;
