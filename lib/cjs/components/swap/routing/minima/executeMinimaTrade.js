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
exports.executeMinimaTrade = void 0;
const constants_1 = require("../../../../constants");
const generated_1 = require("../../../../generated");
/**
 * Executes a trade on Minima.
 * @param trade
 * @returns
 */
const executeMinimaTrade = ({ trade, signer, doTransaction, recipient, withRecipient, }) => __awaiter(void 0, void 0, void 0, function* () {
    const contract = generated_1.MinimaRouter__factory.connect(constants_1.MINIMA_ROUTER_ADDRESS, signer);
    const { details, inputAmount, outputAmount } = trade;
    const inputToken = inputAmount.token;
    const outputToken = outputAmount.token;
    const convert = () => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        const inputSymbol = (_a = inputToken.symbol) !== null && _a !== void 0 ? _a : null;
        const outputSymbol = (_b = outputToken.symbol) !== null && _b !== void 0 ? _b : null;
        const tokenAmountIn = inputAmount.toSignificant(3);
        const tokenAmountOut = outputAmount.toSignificant(3);
        yield contract.callStatic
            .swapExactInputForOutput(Object.assign(Object.assign({}, details), { to: recipient !== null && recipient !== void 0 ? recipient : '' }))
            .then((data) => {
            console.log(data);
        })
            .catch((err) => {
            console.log(err);
        });
        return yield doTransaction(contract, 'swapExactInputForOutput', {
            args: [Object.assign(Object.assign({}, details), { to: recipient !== null && recipient !== void 0 ? recipient : '' })],
            summary: `Swap ${tokenAmountIn} ${inputSymbol} for ${tokenAmountOut} ${outputSymbol}${withRecipient}`,
        });
    });
    return { hash: (yield convert()).hash };
});
exports.executeMinimaTrade = executeMinimaTrade;
