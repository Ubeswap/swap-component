"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useMoolaDirectRoute = void 0;
const use_contractkit_1 = require("@celo-tools/use-contractkit");
const sdk_1 = require("@ubeswap/sdk");
const react_1 = require("react");
const hooks_1 = require("../../../../state/user/hooks");
const useMoola_1 = require("./useMoola");
const BIG_NUMBER = sdk_1.JSBI.exponentiate(sdk_1.JSBI.BigInt(2), sdk_1.JSBI.BigInt(255));
const useMoolaDirectRoute = (inputCurrency, outputCurrency) => {
    const library = (0, use_contractkit_1.useProvider)();
    const { network } = (0, use_contractkit_1.useContractKit)();
    const chainId = network.chainId;
    const [allowMoolaWithdrawal] = (0, hooks_1.useUserAllowMoolaWithdrawal)();
    return (0, react_1.useMemo)(() => {
        if (chainId === sdk_1.ChainId.BAKLAVA) {
            return null;
        }
        if (!library) {
            return null;
        }
        if (!inputCurrency || !outputCurrency) {
            return null;
        }
        const withdrawalRoutes = useMoola_1.moolaDuals.map((dual) => dual.map((token) => token[chainId]));
        const depositRoutes = withdrawalRoutes.map((route) => route.reverse());
        const routes = [...depositRoutes, ...(allowMoolaWithdrawal ? withdrawalRoutes : [])];
        const routeRaw = inputCurrency &&
            outputCurrency &&
            routes.find(([a, b]) => (0, sdk_1.currencyEquals)(inputCurrency, a) && (0, sdk_1.currencyEquals)(outputCurrency, b));
        if (!routeRaw) {
            return null;
        }
        return new sdk_1.Route([new sdk_1.Pair(new sdk_1.TokenAmount(inputCurrency, BIG_NUMBER), new sdk_1.TokenAmount(outputCurrency, BIG_NUMBER))], inputCurrency, outputCurrency);
    }, [inputCurrency, outputCurrency, allowMoolaWithdrawal, chainId, library]);
};
exports.useMoolaDirectRoute = useMoolaDirectRoute;
