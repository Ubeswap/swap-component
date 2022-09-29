"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_feather_1 = require("react-feather");
const rebass_1 = require("rebass");
const styled_components_1 = require("styled-components");
const prices_1 = require("../../utils/prices");
const Button_1 = require("../Button");
const Column_1 = require("../Column");
const Row_1 = require("../Row");
const describeTrade_1 = require("./routing/describeTrade");
const TradeDetails_1 = require("./routing/TradeDetails");
const styleds_1 = require("./styleds");
function SwapModalFooter({ trade, onConfirm, allowedSlippage, swapErrorMessage, disabledConfirm, }) {
    const { label, routingMethod } = (0, describeTrade_1.describeTrade)(trade);
    const [showInverted, setShowInverted] = (0, react_1.useState)(false);
    const theme = (0, react_1.useContext)(styled_components_1.ThemeContext);
    const { priceImpactWithoutFee } = (0, react_1.useMemo)(() => (0, prices_1.computeTradePriceBreakdown)(trade), [trade]);
    const severity = (0, prices_1.warningSeverity)(priceImpactWithoutFee);
    let info = null;
    if (routingMethod === describeTrade_1.RoutingMethod.MOOLA) {
        info = ((0, jsx_runtime_1.jsxs)(Column_1.AutoColumn, Object.assign({ gap: "0px" }, { children: [(0, jsx_runtime_1.jsxs)(Row_1.RowBetween, Object.assign({ align: "center" }, { children: [(0, jsx_runtime_1.jsx)(rebass_1.Text, Object.assign({ fontWeight: 400, fontSize: 14, color: theme.text2 }, { children: "Price" })), (0, jsx_runtime_1.jsxs)(rebass_1.Text, Object.assign({ fontWeight: 500, fontSize: 14, color: theme.text1, style: {
                                justifyContent: 'center',
                                alignItems: 'center',
                                display: 'flex',
                                textAlign: 'right',
                                paddingLeft: '10px',
                            } }, { children: [(0, prices_1.formatExecutionPrice)(trade, showInverted), (0, jsx_runtime_1.jsx)(styleds_1.StyledBalanceMaxMini, Object.assign({ onClick: () => setShowInverted(!showInverted) }, { children: (0, jsx_runtime_1.jsx)(react_feather_1.Repeat, { size: 14 }) }))] }))] })), (0, jsx_runtime_1.jsx)(TradeDetails_1.TradeDetails, { trade: trade, allowedSlippage: allowedSlippage })] })));
    }
    else if (routingMethod === describeTrade_1.RoutingMethod.LIMIT) {
        info = ((0, jsx_runtime_1.jsx)(Column_1.AutoColumn, Object.assign({ gap: "0px" }, { children: (0, jsx_runtime_1.jsxs)(Row_1.RowBetween, Object.assign({ align: "center" }, { children: [(0, jsx_runtime_1.jsx)(rebass_1.Text, Object.assign({ fontWeight: 400, fontSize: 14, color: theme.text2 }, { children: "Price" })), (0, jsx_runtime_1.jsxs)(rebass_1.Text, Object.assign({ fontWeight: 500, fontSize: 14, color: theme.text1, style: {
                            justifyContent: 'center',
                            alignItems: 'center',
                            display: 'flex',
                            textAlign: 'right',
                            paddingLeft: '10px',
                        } }, { children: [(0, prices_1.formatExecutionPrice)(trade, showInverted), (0, jsx_runtime_1.jsx)(styleds_1.StyledBalanceMaxMini, Object.assign({ onClick: () => setShowInverted(!showInverted) }, { children: (0, jsx_runtime_1.jsx)(react_feather_1.Repeat, { size: 14 }) }))] }))] })) })));
    }
    else {
        info = ((0, jsx_runtime_1.jsxs)(Column_1.AutoColumn, Object.assign({ gap: "0px" }, { children: [(0, jsx_runtime_1.jsxs)(Row_1.RowBetween, Object.assign({ align: "center" }, { children: [(0, jsx_runtime_1.jsx)(rebass_1.Text, Object.assign({ fontWeight: 400, fontSize: 14, color: theme.text2 }, { children: "Price" })), (0, jsx_runtime_1.jsxs)(rebass_1.Text, Object.assign({ fontWeight: 500, fontSize: 14, color: theme.text1, style: {
                                justifyContent: 'center',
                                alignItems: 'center',
                                display: 'flex',
                                textAlign: 'right',
                                paddingLeft: '10px',
                            } }, { children: [(0, prices_1.formatExecutionPrice)(trade, showInverted), (0, jsx_runtime_1.jsx)(styleds_1.StyledBalanceMaxMini, Object.assign({ onClick: () => setShowInverted(!showInverted) }, { children: (0, jsx_runtime_1.jsx)(react_feather_1.Repeat, { size: 14 }) }))] }))] })), (0, jsx_runtime_1.jsx)(TradeDetails_1.TradeDetails, { trade: trade, allowedSlippage: allowedSlippage })] })));
    }
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [info, (0, jsx_runtime_1.jsxs)(Row_1.AutoRow, { children: [(0, jsx_runtime_1.jsx)(Button_1.ButtonError, Object.assign({ onClick: onConfirm, disabled: disabledConfirm, error: severity > 2, style: { margin: '10px 0 0 0' }, id: "confirm-swap-or-send" }, { children: (0, jsx_runtime_1.jsx)(rebass_1.Text, Object.assign({ fontSize: 20, fontWeight: 500 }, { children: severity > 2 ? 'Swap Anyway' : `Confirm ${label}` })) })), swapErrorMessage ? (0, jsx_runtime_1.jsx)(styleds_1.SwapCallbackError, { error: swapErrorMessage }) : null] })] }));
}
exports.default = SwapModalFooter;
