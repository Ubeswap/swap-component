import { useContractKit, useProvider } from '@celo-tools/use-contractkit';
import { ChainId, currencyEquals, JSBI, Pair, Route, TokenAmount } from '@ubeswap/sdk';
import { useMemo } from 'react';
import { useUserAllowMoolaWithdrawal } from '../../../../state/user/hooks';
import { moolaDuals } from './useMoola';
const BIG_NUMBER = JSBI.exponentiate(JSBI.BigInt(2), JSBI.BigInt(255));
export const useMoolaDirectRoute = (inputCurrency, outputCurrency) => {
    const library = useProvider();
    const { network } = useContractKit();
    const chainId = network.chainId;
    const [allowMoolaWithdrawal] = useUserAllowMoolaWithdrawal();
    return useMemo(() => {
        if (chainId === ChainId.BAKLAVA) {
            return null;
        }
        if (!library) {
            return null;
        }
        if (!inputCurrency || !outputCurrency) {
            return null;
        }
        const withdrawalRoutes = moolaDuals.map((dual) => dual.map((token) => token[chainId]));
        const depositRoutes = withdrawalRoutes.map((route) => route.reverse());
        const routes = [...depositRoutes, ...(allowMoolaWithdrawal ? withdrawalRoutes : [])];
        const routeRaw = inputCurrency &&
            outputCurrency &&
            routes.find(([a, b]) => currencyEquals(inputCurrency, a) && currencyEquals(outputCurrency, b));
        if (!routeRaw) {
            return null;
        }
        return new Route([new Pair(new TokenAmount(inputCurrency, BIG_NUMBER), new TokenAmount(outputCurrency, BIG_NUMBER))], inputCurrency, outputCurrency);
    }, [inputCurrency, outputCurrency, allowMoolaWithdrawal, chainId, library]);
};
