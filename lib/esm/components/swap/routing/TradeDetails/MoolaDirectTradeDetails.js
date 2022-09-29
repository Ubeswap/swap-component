var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useContractKit } from '@celo-tools/use-contractkit';
import { CELO, cUSD, Fraction, TokenAmount, TradeType } from '@ubeswap/sdk';
import { BigNumber } from 'ethers';
import { useContext, useEffect, useState } from 'react';
import { ThemeContext } from 'styled-components';
import { usePair } from '../../../../data/Reserves';
import { TYPE } from '../../../../theme';
import QuestionHelper from '../../../QuestionHelper';
import { RowBetween, RowFixed } from '../../../Row';
import { ErrorText } from '../../../swap/styleds';
import { useLendingPool } from '../moola/useMoola';
export const MoolaDirectTradeDetails = ({ trade }) => {
    const { address: account, network } = useContractKit();
    const chainId = network.chainId;
    const lendingPool = useLendingPool();
    const theme = useContext(ThemeContext);
    const celo = CELO[chainId];
    const [, pair] = usePair(celo, cUSD[chainId]);
    const cusdPrice = pair === null || pair === void 0 ? void 0 : pair.priceOf(cUSD[chainId]);
    const [userData, setUserData] = useState(null);
    useEffect(() => {
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
        const healthFactor = userData.healthFactor.div(BigNumber.from(10).pow(27));
        const collateral = cusdPrice
            ? new TokenAmount(celo, userData.totalCollateralETH.toString()).multiply(cusdPrice)
            : null;
        const borrows = cusdPrice ? new TokenAmount(celo, userData.totalDebtETH.toString()).multiply(cusdPrice) : null;
        userDataArea = (_jsxs(_Fragment, { children: [_jsxs(RowBetween, { children: [_jsxs(RowFixed, { children: [_jsx(TYPE.black, Object.assign({ color: theme.text2, fontSize: 14, fontWeight: 400 }, { children: "Collateral Balance" })), _jsx(QuestionHelper, { text: "The amount of collateral you have in Moola." })] }), _jsx(RowFixed, { children: _jsx(TYPE.black, Object.assign({ fontSize: 14, marginLeft: '4px' }, { children: collateral ? (collateral.lessThan(new Fraction('1')) ? '<$1' : `$${collateral.toFixed(2)}`) : '--' })) })] }), _jsxs(RowBetween, { children: [_jsxs(RowFixed, { children: [_jsx(TYPE.black, Object.assign({ color: theme.text2, fontSize: 14, fontWeight: 400 }, { children: "Borrow Balance" })), _jsx(QuestionHelper, { text: "The amount you owe to Moola." })] }), _jsx(RowFixed, { children: _jsx(TYPE.black, Object.assign({ fontSize: 14, marginLeft: '4px' }, { children: borrows ? (borrows.lessThan(new Fraction('1')) ? '<$1' : `$${borrows.toFixed(2)}`) : '--' })) })] }), _jsxs(RowBetween, { children: [_jsxs(RowFixed, { children: [_jsx(TYPE.black, Object.assign({ color: theme.text2, fontSize: 14, fontWeight: 400 }, { children: "Health Factor" })), _jsx(QuestionHelper, { text: "How risky your position is. If this is below 1, you can be liquidated." })] }), _jsx(ErrorText, Object.assign({ fontWeight: 500, fontSize: 14, severity: 0 }, { children: healthFactor.gt(100) ? 'Excellent' : healthFactor.toString() }))] })] }));
    }
    return (_jsxs(_Fragment, { children: [_jsxs(RowBetween, { children: [_jsxs(RowFixed, { children: [_jsxs(TYPE.black, Object.assign({ fontSize: 14, fontWeight: 400, color: theme.text2 }, { children: [trade.outputAmount.currency.symbol, " received"] })), _jsx(QuestionHelper, { text: `Since this trade is routed through Moola, you are guaranteed to receive 1 ${trade.outputAmount.currency.symbol} per ${trade.inputAmount.currency.symbol}.` })] }), _jsxs(RowFixed, { children: [_jsx(TYPE.black, Object.assign({ fontSize: 14 }, { children: trade.outputAmount.lessThan('10000') ? trade.outputAmount.toSignificant(4) : trade.outputAmount.toFixed(0) })), _jsx(TYPE.black, Object.assign({ fontSize: 14, marginLeft: '4px' }, { children: trade.tradeType === TradeType.EXACT_INPUT
                                    ? trade.outputAmount.currency.symbol
                                    : trade.inputAmount.currency.symbol }))] })] }), _jsxs(RowBetween, { children: [_jsxs(RowFixed, { children: [_jsx(TYPE.black, Object.assign({ color: theme.text2, fontSize: 14, fontWeight: 400 }, { children: "Price Impact" })), _jsx(QuestionHelper, { text: "Since this trade is routed through Moola, there is zero price slippage." })] }), _jsx(ErrorText, Object.assign({ fontWeight: 500, fontSize: 14, severity: 0 }, { children: "0.00%" }))] }), userDataArea] }));
};
