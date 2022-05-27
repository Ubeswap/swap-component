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
exports.executeMoolaDirectTrade = void 0;
const contractkit_1 = require("@celo/contractkit");
const sdk_1 = require("@ubeswap/sdk");
const generated_1 = require("../../../../generated");
const useMoola_1 = require("./useMoola");
/**
 * Executes a trade on Moola.
 * @param trade
 * @returns
 */
const executeMoolaDirectTrade = ({ trade, signer, chainId, doTransaction, }) => __awaiter(void 0, void 0, void 0, function* () {
    const chainCfg = useMoola_1.moolaLendingPools[chainId];
    const { mcUSD, mCELO } = chainCfg;
    const pool = generated_1.LendingPool__factory.connect(chainCfg.lendingPool, signer);
    const { inputAmount, outputAmount } = trade;
    const token = inputAmount.token;
    const convert = () => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const symbol = (0, sdk_1.currencyEquals)(token, chainCfg[contractkit_1.CeloContract.StableToken])
            ? 'cUSD'
            : (0, sdk_1.currencyEquals)(token, chainCfg[contractkit_1.CeloContract.GoldToken])
                ? 'CELO'
                : (0, sdk_1.currencyEquals)(token, mcUSD)
                    ? 'mcUSD'
                    : (0, sdk_1.currencyEquals)(token, mCELO)
                        ? 'mCELO'
                        : (_a = token.symbol) !== null && _a !== void 0 ? _a : null;
        if (symbol === null || symbol === void 0 ? void 0 : symbol.startsWith('m')) {
            const recipient = yield signer.getAddress();
            return yield doTransaction(pool, 'withdraw', {
                args: [outputAmount.token.address, outputAmount.raw.toString(), recipient],
                summary: `Withdraw ${inputAmount.toSignificant(2)} ${symbol} from Moola`,
            });
        }
        if (symbol) {
            const recipient = yield signer.getAddress();
            return yield doTransaction(pool, 'deposit', {
                args: [inputAmount.token.address, inputAmount.raw.toString(), recipient, 0x0421],
                summary: `Deposit ${inputAmount.toSignificant(2)} ${symbol} into Moola`,
            });
        }
        throw new Error(`unknown currency: ${token.address}`);
    });
    return { hash: (yield convert()).hash };
});
exports.executeMoolaDirectTrade = executeMoolaDirectTrade;
