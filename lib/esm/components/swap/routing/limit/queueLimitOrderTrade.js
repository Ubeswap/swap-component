var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { useGetConnectedSigner } from '@celo-tools/use-contractkit';
import { useCallback, useState } from 'react';
import { LIMIT_ORDER_ADDRESS, ORDER_BOOK_ADDRESS, ORDER_BOOK_REWARD_DISTRIBUTOR_ADDRESS, ZERO_ADDRESS, } from '../../../../constants';
import { LimitOrderProtocol__factory } from '../../../../generated/factories/LimitOrderProtocol__factory';
import { OrderBook__factory } from '../../../../generated/factories/OrderBook__factory';
import { buildOrderData } from '../../../../utils/limitOrder';
import { useDoTransaction } from '..';
function cutLastArg(data, padding = 0) {
    return data.substr(0, data.length - 64 - padding);
}
/**
 * Queues a limit order trade.
 * @returns
 */
export const useQueueLimitOrderTrade = () => {
    const getConnectedSigner = useGetConnectedSigner();
    const doTransaction = useDoTransaction();
    const [loading, setLoading] = useState(false);
    const queueLimitOrderCallback = useCallback(({ inputAmount, outputAmount, chainId, }) => __awaiter(void 0, void 0, void 0, function* () {
        const signer = yield getConnectedSigner();
        const limitOrderAddr = LIMIT_ORDER_ADDRESS[chainId];
        const orderBookAddr = ORDER_BOOK_ADDRESS[chainId];
        const rewardDistributorAddr = ORDER_BOOK_REWARD_DISTRIBUTOR_ADDRESS[chainId];
        const limitOrderProtocolIface = LimitOrderProtocol__factory.createInterface();
        const orderBook = OrderBook__factory.connect(orderBookAddr, signer);
        const makingAmount = inputAmount.raw.toString();
        const takingAmount = outputAmount.raw.toString();
        const limitOrder = {
            salt: Math.floor(Math.random() * 1000000000),
            makerAsset: inputAmount.currency.address,
            takerAsset: outputAmount.currency.address,
            maker: yield signer.getAddress(),
            receiver: ZERO_ADDRESS,
            allowedSender: ZERO_ADDRESS,
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
            const limitOrderTypedData = buildOrderData(chainId.toString(), limitOrderAddr, limitOrder);
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
