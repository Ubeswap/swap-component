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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoolaDirectTradeDetails = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const use_contractkit_1 = require("@celo-tools/use-contractkit");
const sdk_1 = require("@ubeswap/sdk");
const styleds_1 = require("components/swap/styleds");
const Reserves_1 = require("data/Reserves");
const ethers_1 = require("ethers");
const react_1 = require("react");
const styled_components_1 = require("styled-components");
const theme_1 = require("../../../../theme");
const QuestionHelper_1 = __importDefault(require("../../../QuestionHelper"));
const Row_1 = require("../../../Row");
const useMoola_1 = require("../moola/useMoola");
const MoolaDirectTradeDetails = ({ trade }) => {
    const { address: account, network } = (0, use_contractkit_1.useContractKit)();
    const chainId = network.chainId;
    const lendingPool = (0, useMoola_1.useLendingPool)();
    const theme = (0, react_1.useContext)(styled_components_1.ThemeContext);
    const celo = sdk_1.CELO[chainId];
    const [, pair] = (0, Reserves_1.usePair)(celo, sdk_1.cUSD[chainId]);
    const cusdPrice = pair === null || pair === void 0 ? void 0 : pair.priceOf(sdk_1.cUSD[chainId]);
    const [userData, setUserData] = (0, react_1.useState)(null);
    (0, react_1.useEffect)(() => {
        if (account) {
            ;
            (() => __awaiter(void 0, void 0, void 0, function* () {
                const data = yield lendingPool.getUserAccountData(account);
                setUserData(data);
            }))();
        }
    }, [account, lendingPool]);
    let userDataArea = null;
    if (userData) {
        const healthFactor = userData.healthFactor.div(ethers_1.BigNumber.from(10).pow(27));
        const collateral = cusdPrice
            ? new sdk_1.TokenAmount(celo, userData.totalCollateralETH.toString()).multiply(cusdPrice)
            : null;
        const borrows = cusdPrice ? new sdk_1.TokenAmount(celo, userData.totalDebtETH.toString()).multiply(cusdPrice) : null;
        userDataArea = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)(Row_1.RowBetween, { children: [(0, jsx_runtime_1.jsxs)(Row_1.RowFixed, { children: [(0, jsx_runtime_1.jsx)(theme_1.TYPE.black, Object.assign({ color: theme.text2, fontSize: 14, fontWeight: 400 }, { children: "Collateral Balance" }), void 0), (0, jsx_runtime_1.jsx)(QuestionHelper_1.default, { text: "The amount of collateral you have in Moola." }, void 0)] }, void 0), (0, jsx_runtime_1.jsx)(Row_1.RowFixed, { children: (0, jsx_runtime_1.jsx)(theme_1.TYPE.black, Object.assign({ fontSize: 14, marginLeft: '4px' }, { children: collateral ? (collateral.lessThan(new sdk_1.Fraction('1')) ? '<$1' : `$${collateral.toFixed(2)}`) : '--' }), void 0) }, void 0)] }, void 0), (0, jsx_runtime_1.jsxs)(Row_1.RowBetween, { children: [(0, jsx_runtime_1.jsxs)(Row_1.RowFixed, { children: [(0, jsx_runtime_1.jsx)(theme_1.TYPE.black, Object.assign({ color: theme.text2, fontSize: 14, fontWeight: 400 }, { children: "Borrow Balance" }), void 0), (0, jsx_runtime_1.jsx)(QuestionHelper_1.default, { text: "The amount you owe to Moola." }, void 0)] }, void 0), (0, jsx_runtime_1.jsx)(Row_1.RowFixed, { children: (0, jsx_runtime_1.jsx)(theme_1.TYPE.black, Object.assign({ fontSize: 14, marginLeft: '4px' }, { children: borrows ? (borrows.lessThan(new sdk_1.Fraction('1')) ? '<$1' : `$${borrows.toFixed(2)}`) : '--' }), void 0) }, void 0)] }, void 0), (0, jsx_runtime_1.jsxs)(Row_1.RowBetween, { children: [(0, jsx_runtime_1.jsxs)(Row_1.RowFixed, { children: [(0, jsx_runtime_1.jsx)(theme_1.TYPE.black, Object.assign({ color: theme.text2, fontSize: 14, fontWeight: 400 }, { children: "Health Factor" }), void 0), (0, jsx_runtime_1.jsx)(QuestionHelper_1.default, { text: "How risky your position is. If this is below 1, you can be liquidated." }, void 0)] }, void 0), (0, jsx_runtime_1.jsx)(styleds_1.ErrorText, Object.assign({ fontWeight: 500, fontSize: 14, severity: 0 }, { children: healthFactor.gt(100) ? 'Excellent' : healthFactor.toString() }), void 0)] }, void 0)] }, void 0));
    }
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)(Row_1.RowBetween, { children: [(0, jsx_runtime_1.jsxs)(Row_1.RowFixed, { children: [(0, jsx_runtime_1.jsxs)(theme_1.TYPE.black, Object.assign({ fontSize: 14, fontWeight: 400, color: theme.text2 }, { children: [trade.outputAmount.currency.symbol, " received"] }), void 0), (0, jsx_runtime_1.jsx)(QuestionHelper_1.default, { text: `Since this trade is routed through Moola, you are guaranteed to receive 1 ${trade.outputAmount.currency.symbol} per ${trade.inputAmount.currency.symbol}.` }, void 0)] }, void 0), (0, jsx_runtime_1.jsxs)(Row_1.RowFixed, { children: [(0, jsx_runtime_1.jsx)(theme_1.TYPE.black, Object.assign({ fontSize: 14 }, { children: trade.outputAmount.lessThan('10000') ? trade.outputAmount.toSignificant(4) : trade.outputAmount.toFixed(0) }), void 0), (0, jsx_runtime_1.jsx)(theme_1.TYPE.black, Object.assign({ fontSize: 14, marginLeft: '4px' }, { children: trade.tradeType === sdk_1.TradeType.EXACT_INPUT
                                    ? trade.outputAmount.currency.symbol
                                    : trade.inputAmount.currency.symbol }), void 0)] }, void 0)] }, void 0), (0, jsx_runtime_1.jsxs)(Row_1.RowBetween, { children: [(0, jsx_runtime_1.jsxs)(Row_1.RowFixed, { children: [(0, jsx_runtime_1.jsx)(theme_1.TYPE.black, Object.assign({ color: theme.text2, fontSize: 14, fontWeight: 400 }, { children: "Price Impact" }), void 0), (0, jsx_runtime_1.jsx)(QuestionHelper_1.default, { text: "Since this trade is routed through Moola, there is zero price slippage." }, void 0)] }, void 0), (0, jsx_runtime_1.jsx)(styleds_1.ErrorText, Object.assign({ fontWeight: 500, fontSize: 14, severity: 0 }, { children: "0.00%" }), void 0)] }, void 0), userDataArea] }, void 0));
};
exports.MoolaDirectTradeDetails = MoolaDirectTradeDetails;
