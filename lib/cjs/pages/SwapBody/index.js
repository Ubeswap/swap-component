"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const use_contractkit_1 = require("@celo-tools/use-contractkit");
const ramp_instant_sdk_1 = require("@ramp-network/ramp-instant-sdk");
const sdk_1 = require("@ubeswap/sdk");
const OpticsV1Warning_1 = __importDefault(require("components/Header/OpticsV1Warning"));
const describeTrade_1 = require("components/swap/routing/describeTrade");
const MoolaDirectTrade_1 = require("components/swap/routing/moola/MoolaDirectTrade");
const useTradeCallback_1 = require("components/swap/routing/useTradeCallback");
const UnsupportedCurrencyFooter_1 = __importDefault(require("components/swap/UnsupportedCurrencyFooter"));
const Trades_1 = require("hooks/Trades");
const useENS_1 = __importDefault(require("hooks/useENS"));
const react_1 = require("react");
const react_feather_1 = require("react-feather");
const react_ga_1 = __importDefault(require("react-ga"));
const react_i18next_1 = require("react-i18next");
const react_redux_1 = require("react-redux");
const rebass_1 = require("rebass");
const actions_1 = require("state/user/actions");
const styled_components_1 = require("styled-components");
const AddressInputPanel_1 = __importDefault(require("../../components/AddressInputPanel"));
const Button_1 = require("../../components/Button");
const Card_1 = __importStar(require("../../components/Card"));
const Column_1 = __importStar(require("../../components/Column"));
const CurrencyInputPanel_1 = __importDefault(require("../../components/CurrencyInputPanel"));
const Loader_1 = __importDefault(require("../../components/Loader"));
const NavigationTabs_1 = require("../../components/NavigationTabs");
const ProgressSteps_1 = __importDefault(require("../../components/ProgressSteps"));
const Row_1 = require("../../components/Row");
const AdvancedSwapDetailsDropdown_1 = __importDefault(require("../../components/swap/AdvancedSwapDetailsDropdown"));
const confirmPriceImpactWithoutFee_1 = __importDefault(require("../../components/swap/confirmPriceImpactWithoutFee"));
const ConfirmSwapModal_1 = __importDefault(require("../../components/swap/ConfirmSwapModal"));
const styleds_1 = require("../../components/swap/styleds");
const SwapHeader_1 = __importDefault(require("../../components/swap/SwapHeader"));
const TradePrice_1 = __importDefault(require("../../components/swap/TradePrice"));
const TokenWarningModal_1 = __importDefault(require("../../components/TokenWarningModal"));
const constants_1 = require("../../constants");
const Tokens_1 = require("../../hooks/Tokens");
const useApproveCallback_1 = require("../../hooks/useApproveCallback");
const hooks_1 = require("../../state/application/hooks");
const actions_2 = require("../../state/swap/actions");
const hooks_2 = require("../../state/swap/hooks");
const hooks_3 = require("../../state/user/hooks");
const theme_1 = require("../../theme");
const maxAmountSpend_1 = require("../../utils/maxAmountSpend");
const prices_1 = require("../../utils/prices");
const AppBody_1 = __importDefault(require("../AppBody"));
function SwapBody({ useDarkMode }) {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    const dispatch = (0, react_redux_1.useDispatch)();
    dispatch((0, actions_1.updateUserDarkMode)({ userDarkMode: useDarkMode !== null && useDarkMode !== void 0 ? useDarkMode : false }));
    const { t } = (0, react_i18next_1.useTranslation)();
    const loadedUrlParams = (0, hooks_2.useDefaultsFromURLSearch)();
    // token warning stuff
    const [loadedInputCurrency, loadedOutputCurrency] = [
        (0, Tokens_1.useCurrency)(loadedUrlParams === null || loadedUrlParams === void 0 ? void 0 : loadedUrlParams.inputCurrencyId),
        (0, Tokens_1.useCurrency)(loadedUrlParams === null || loadedUrlParams === void 0 ? void 0 : loadedUrlParams.outputCurrencyId),
    ];
    const [dismissTokenWarning, setDismissTokenWarning] = (0, react_1.useState)(false);
    const urlLoadedTokens = (0, react_1.useMemo)(() => { var _a, _b; return (_b = (_a = [loadedInputCurrency, loadedOutputCurrency]) === null || _a === void 0 ? void 0 : _a.filter((c) => c instanceof sdk_1.Token)) !== null && _b !== void 0 ? _b : []; }, [loadedInputCurrency, loadedOutputCurrency]);
    const handleConfirmTokenWarning = (0, react_1.useCallback)(() => {
        setDismissTokenWarning(true);
    }, []);
    // dismiss warning if all imported tokens are in active lists
    const defaultTokens = (0, Tokens_1.useAllTokens)();
    const importTokensNotInDefault = urlLoadedTokens &&
        urlLoadedTokens.filter((token) => {
            return !(token.address in defaultTokens);
        });
    const { address: account, network } = (0, use_contractkit_1.useContractKit)();
    const chainId = network.chainId;
    const theme = (0, react_1.useContext)(styled_components_1.ThemeContext);
    // toggle wallet when disconnected
    const toggleWalletModal = (0, hooks_1.useWalletModalToggle)();
    // for expert mode
    const toggleSettings = (0, hooks_1.useToggleSettingsMenu)();
    const [isExpertMode] = (0, hooks_3.useExpertModeManager)();
    // get custom setting values for user
    const [allowedSlippage] = (0, hooks_3.useUserSlippageTolerance)();
    // swap state
    const { independentField, typedValue, recipient } = (0, hooks_2.useSwapState)();
    const { v2Trade, currencyBalances, parsedAmount, currencies, inputError: swapInputError, showRamp, } = (0, hooks_2.useDerivedSwapInfo)();
    const { address: recipientAddress } = (0, useENS_1.default)(recipient);
    const trade = v2Trade;
    const parsedAmounts = {
        [actions_2.Field.INPUT]: independentField === actions_2.Field.INPUT ? parsedAmount : trade === null || trade === void 0 ? void 0 : trade.inputAmount,
        [actions_2.Field.OUTPUT]: independentField === actions_2.Field.OUTPUT ? parsedAmount : trade === null || trade === void 0 ? void 0 : trade.outputAmount,
    };
    const { onSwitchTokens, onCurrencySelection, onUserInput, onChangeRecipient } = (0, hooks_2.useSwapActionHandlers)();
    const isValid = !swapInputError;
    const dependentField = independentField === actions_2.Field.INPUT ? actions_2.Field.OUTPUT : actions_2.Field.INPUT;
    const handleTypeInput = (0, react_1.useCallback)((value) => {
        onUserInput(actions_2.Field.INPUT, value);
    }, [onUserInput]);
    const handleTypeOutput = (0, react_1.useCallback)((value) => {
        onUserInput(actions_2.Field.OUTPUT, value);
    }, [onUserInput]);
    // modal and loading
    const [{ showConfirm, tradeToConfirm, swapErrorMessage, attemptingTxn, txHash }, setSwapState] = (0, react_1.useState)({
        showConfirm: false,
        tradeToConfirm: undefined,
        attemptingTxn: false,
        swapErrorMessage: undefined,
        txHash: undefined,
    });
    const formattedAmounts = {
        [independentField]: typedValue,
        [dependentField]: (_c = (trade instanceof MoolaDirectTrade_1.MoolaDirectTrade
            ? (_a = parsedAmounts[dependentField]) === null || _a === void 0 ? void 0 : _a.toExact()
            : (_b = parsedAmounts[dependentField]) === null || _b === void 0 ? void 0 : _b.toSignificant(6))) !== null && _c !== void 0 ? _c : '',
    };
    const userHasSpecifiedInputOutput = Boolean(currencies[actions_2.Field.INPUT] && currencies[actions_2.Field.OUTPUT] && ((_d = parsedAmounts[independentField]) === null || _d === void 0 ? void 0 : _d.greaterThan(sdk_1.JSBI.BigInt(0))));
    const route = trade === null || trade === void 0 ? void 0 : trade.route;
    const noRoute = !route;
    // check whether the user has approved the router on the input token
    const [approval, approveCallback] = (0, useApproveCallback_1.useApproveCallbackFromTrade)(trade, allowedSlippage);
    // check if user has gone through approval process, used to show two step buttons, reset on token change
    const [approvalSubmitted, setApprovalSubmitted] = (0, react_1.useState)(false);
    // mark when a user has submitted an approval, reset onTokenSelection for input field
    (0, react_1.useEffect)(() => {
        if (approval === useApproveCallback_1.ApprovalState.PENDING) {
            setApprovalSubmitted(true);
        }
    }, [approval, approvalSubmitted]);
    const maxAmountInput = (0, maxAmountSpend_1.maxAmountSpend)(currencyBalances[actions_2.Field.INPUT]);
    const atMaxAmountInput = Boolean(maxAmountInput && ((_e = parsedAmounts[actions_2.Field.INPUT]) === null || _e === void 0 ? void 0 : _e.equalTo(maxAmountInput)));
    const atHalfAmountInput = Boolean(maxAmountInput && Number(maxAmountInput.toExact()) * 0.5 === Number((_f = parsedAmounts[actions_2.Field.INPUT]) === null || _f === void 0 ? void 0 : _f.toExact()));
    // the callback to execute the swap
    const { callback: swapCallback, error: swapCallbackError } = (0, useTradeCallback_1.useTradeCallback)(trade, allowedSlippage, recipient);
    const { priceImpactWithoutFee } = (0, prices_1.computeTradePriceBreakdown)(trade);
    const [singleHopOnly] = (0, hooks_3.useUserSingleHopOnly)();
    const handleSwap = (0, react_1.useCallback)(() => {
        if (priceImpactWithoutFee && !(0, confirmPriceImpactWithoutFee_1.default)(priceImpactWithoutFee)) {
            return;
        }
        if (!swapCallback) {
            return;
        }
        setSwapState({ attemptingTxn: true, tradeToConfirm, showConfirm, swapErrorMessage: undefined, txHash: undefined });
        swapCallback()
            .then((hash) => {
            var _a, _b, _c, _d;
            setSwapState({ attemptingTxn: false, tradeToConfirm, showConfirm, swapErrorMessage: undefined, txHash: hash });
            react_ga_1.default.event({
                category: 'Swap',
                action: recipient === null
                    ? 'Swap w/o Send'
                    : (recipientAddress !== null && recipientAddress !== void 0 ? recipientAddress : recipient) === account
                        ? 'Swap w/o Send + recipient'
                        : 'Swap w/ Send',
                label: [(_b = (_a = trade === null || trade === void 0 ? void 0 : trade.inputAmount) === null || _a === void 0 ? void 0 : _a.currency) === null || _b === void 0 ? void 0 : _b.symbol, (_d = (_c = trade === null || trade === void 0 ? void 0 : trade.outputAmount) === null || _c === void 0 ? void 0 : _c.currency) === null || _d === void 0 ? void 0 : _d.symbol].join('/'),
            });
            react_ga_1.default.event({
                category: 'Routing',
                action: singleHopOnly ? 'Swap with multihop disabled' : 'Swap with multihop enabled',
            });
        })
            .catch((error) => {
            setSwapState({
                attemptingTxn: false,
                tradeToConfirm,
                showConfirm,
                swapErrorMessage: error.message,
                txHash: undefined,
            });
        });
    }, [
        priceImpactWithoutFee,
        swapCallback,
        tradeToConfirm,
        showConfirm,
        recipient,
        recipientAddress,
        account,
        trade,
        singleHopOnly,
    ]);
    // errors
    const [showInverted, setShowInverted] = (0, react_1.useState)(false);
    // warnings on slippage
    const priceImpactSeverity = (0, prices_1.warningSeverity)(priceImpactWithoutFee);
    // show approve flow when: no error on inputs, not approved or pending, or approved in current session
    // never show if price impact is above threshold in non expert mode
    const showApproveFlow = !swapInputError &&
        (approval === useApproveCallback_1.ApprovalState.NOT_APPROVED ||
            approval === useApproveCallback_1.ApprovalState.PENDING ||
            (approvalSubmitted && approval === useApproveCallback_1.ApprovalState.APPROVED)) &&
        !(priceImpactSeverity > 3 && !isExpertMode);
    const handleConfirmDismiss = (0, react_1.useCallback)(() => {
        setSwapState({ showConfirm: false, tradeToConfirm, attemptingTxn, swapErrorMessage, txHash });
        // if there was a tx hash, we want to clear the input
        if (txHash) {
            onUserInput(actions_2.Field.INPUT, '');
        }
    }, [attemptingTxn, onUserInput, swapErrorMessage, tradeToConfirm, txHash]);
    const handleAcceptChanges = (0, react_1.useCallback)(() => {
        setSwapState({ tradeToConfirm: trade, swapErrorMessage, txHash, attemptingTxn, showConfirm });
    }, [attemptingTxn, showConfirm, swapErrorMessage, trade, txHash]);
    const handleInputSelect = (0, react_1.useCallback)((inputCurrency) => {
        setApprovalSubmitted(false); // reset 2 step UI for approvals
        onCurrencySelection(actions_2.Field.INPUT, inputCurrency);
    }, [onCurrencySelection]);
    const handleMaxInput = (0, react_1.useCallback)(() => {
        var _a;
        if (maxAmountInput) {
            if (((_a = currencies === null || currencies === void 0 ? void 0 : currencies.INPUT) === null || _a === void 0 ? void 0 : _a.address) === sdk_1.CELO[chainId].address) {
                onUserInput(actions_2.Field.INPUT, Math.max(Number(maxAmountInput.toExact()) - 0.01, 0).toString());
            }
            else {
                onUserInput(actions_2.Field.INPUT, maxAmountInput.toExact());
            }
        }
    }, [maxAmountInput, onUserInput, currencies, chainId]);
    const handleHalfInput = (0, react_1.useCallback)(() => {
        if (maxAmountInput) {
            onUserInput(actions_2.Field.INPUT, Math.max(Number(maxAmountInput.toExact()) * 0.5, 0).toString());
        }
    }, [maxAmountInput, onUserInput]);
    const handleOutputSelect = (0, react_1.useCallback)((outputCurrency) => onCurrencySelection(actions_2.Field.OUTPUT, outputCurrency), [onCurrencySelection]);
    const swapIsUnsupported = (0, Trades_1.useIsTransactionUnsupported)(currencies === null || currencies === void 0 ? void 0 : currencies.INPUT, currencies === null || currencies === void 0 ? void 0 : currencies.OUTPUT);
    const { isEstimate, makeLabel } = (0, describeTrade_1.describeTrade)(trade);
    const actionLabel = t(makeLabel(independentField !== actions_2.Field.INPUT));
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(TokenWarningModal_1.default, { isOpen: importTokensNotInDefault.length > 0 && !dismissTokenWarning, tokens: importTokensNotInDefault, onConfirm: handleConfirmTokenWarning }, void 0), (0, jsx_runtime_1.jsx)(OpticsV1Warning_1.default, {}, void 0), (0, jsx_runtime_1.jsx)(NavigationTabs_1.SwapPoolTabs, { active: 'swap' }, void 0), (0, jsx_runtime_1.jsxs)(AppBody_1.default, { children: [(0, jsx_runtime_1.jsx)(SwapHeader_1.default, { title: actionLabel }, void 0), (0, jsx_runtime_1.jsxs)(styleds_1.Wrapper, Object.assign({ id: "swap-page" }, { children: [(0, jsx_runtime_1.jsx)(ConfirmSwapModal_1.default, { isOpen: showConfirm, trade: trade, originalTrade: tradeToConfirm, onAcceptChanges: handleAcceptChanges, attemptingTxn: attemptingTxn, txHash: txHash, recipient: recipient, allowedSlippage: allowedSlippage, onConfirm: handleSwap, swapErrorMessage: swapErrorMessage, onDismiss: handleConfirmDismiss }, void 0), (0, jsx_runtime_1.jsxs)(Column_1.AutoColumn, Object.assign({ gap: 'md' }, { children: [(0, jsx_runtime_1.jsx)(CurrencyInputPanel_1.default, { label: independentField === actions_2.Field.OUTPUT && trade
                                            ? `${t('from')}${isEstimate ? ' (estimated)' : ''}`
                                            : t('from'), value: formattedAmounts[actions_2.Field.INPUT], showMaxButton: !atMaxAmountInput, showHalfButton: !atHalfAmountInput, currency: currencies[actions_2.Field.INPUT], onUserInput: handleTypeInput, onMax: handleMaxInput, onHalf: handleHalfInput, onCurrencySelect: handleInputSelect, otherCurrency: currencies[actions_2.Field.OUTPUT], id: "swap-currency-input" }, void 0), (0, jsx_runtime_1.jsx)(Column_1.AutoColumn, Object.assign({ justify: "space-between" }, { children: (0, jsx_runtime_1.jsxs)(Row_1.AutoRow, Object.assign({ justify: isExpertMode ? 'space-between' : 'center', style: { padding: '0 1rem' } }, { children: [(0, jsx_runtime_1.jsx)(styleds_1.ArrowWrapper, Object.assign({ clickable: true }, { children: (0, jsx_runtime_1.jsx)(react_feather_1.ArrowDown, { size: "16", onClick: () => {
                                                            setApprovalSubmitted(false); // reset 2 step UI for approvals
                                                            onSwitchTokens();
                                                        }, color: currencies[actions_2.Field.INPUT] && currencies[actions_2.Field.OUTPUT] ? theme.primary1 : theme.text2 }, void 0) }), void 0), recipient === null && isExpertMode ? ((0, jsx_runtime_1.jsx)(theme_1.LinkStyledButton, Object.assign({ id: "add-recipient-button", onClick: () => onChangeRecipient('') }, { children: "+ Add a send (optional)" }), void 0)) : null] }), void 0) }), void 0), (0, jsx_runtime_1.jsx)(CurrencyInputPanel_1.default, { value: formattedAmounts[actions_2.Field.OUTPUT], onUserInput: handleTypeOutput, label: independentField === actions_2.Field.INPUT && trade ? `${t('to')}${isEstimate ? ' (estimated)' : ''}` : t('to'), showMaxButton: false, currency: currencies[actions_2.Field.OUTPUT], onCurrencySelect: handleOutputSelect, otherCurrency: currencies[actions_2.Field.INPUT], id: "swap-currency-output" }, void 0), recipient !== null ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)(Row_1.AutoRow, Object.assign({ justify: "space-between", style: { padding: '0 1rem' } }, { children: [(0, jsx_runtime_1.jsx)(styleds_1.ArrowWrapper, Object.assign({ clickable: false }, { children: (0, jsx_runtime_1.jsx)(react_feather_1.ArrowDown, { size: "16", color: theme.text2 }, void 0) }), void 0), (0, jsx_runtime_1.jsx)(theme_1.LinkStyledButton, Object.assign({ id: "remove-recipient-button", onClick: () => onChangeRecipient(null) }, { children: "- Remove send" }), void 0)] }), void 0), (0, jsx_runtime_1.jsx)(AddressInputPanel_1.default, { id: "recipient", value: recipient, onChange: onChangeRecipient }, void 0)] }, void 0)) : null, (0, jsx_runtime_1.jsx)(Card_1.default, Object.assign({ padding: '0px', borderRadius: '20px' }, { children: (0, jsx_runtime_1.jsxs)(Column_1.AutoColumn, Object.assign({ gap: "8px", style: { padding: '0 16px' } }, { children: [Boolean(trade) && ((0, jsx_runtime_1.jsxs)(Row_1.RowBetween, Object.assign({ align: "center" }, { children: [(0, jsx_runtime_1.jsx)(rebass_1.Text, Object.assign({ fontWeight: 500, fontSize: 14, color: theme.text2 }, { children: "Price" }), void 0), (0, jsx_runtime_1.jsx)(TradePrice_1.default, { price: trade === null || trade === void 0 ? void 0 : trade.executionPrice, showInverted: showInverted, setShowInverted: setShowInverted }, void 0)] }), void 0)), allowedSlippage !== constants_1.INITIAL_ALLOWED_SLIPPAGE && ((0, jsx_runtime_1.jsxs)(Row_1.RowBetween, Object.assign({ align: "center" }, { children: [(0, jsx_runtime_1.jsx)(theme_1.ClickableText, Object.assign({ fontWeight: 500, fontSize: 14, color: theme.text2, onClick: toggleSettings }, { children: "Slippage Tolerance" }), void 0), (0, jsx_runtime_1.jsxs)(theme_1.ClickableText, Object.assign({ fontWeight: 500, fontSize: 14, color: theme.text2, onClick: toggleSettings }, { children: [allowedSlippage / 100, "%"] }), void 0)] }), void 0))] }), void 0) }), void 0)] }), void 0), (0, jsx_runtime_1.jsxs)(styleds_1.BottomGrouping, { children: [swapIsUnsupported ? ((0, jsx_runtime_1.jsx)(Button_1.ButtonPrimary, Object.assign({ disabled: true }, { children: (0, jsx_runtime_1.jsx)(theme_1.TYPE.main, Object.assign({ mb: "4px" }, { children: "Unsupported Asset" }), void 0) }), void 0)) : !account ? ((0, jsx_runtime_1.jsx)(Button_1.ButtonLight, Object.assign({ onClick: toggleWalletModal }, { children: t('connectWallet') }), void 0)) : noRoute && userHasSpecifiedInputOutput ? ((0, jsx_runtime_1.jsxs)(Card_1.GreyCard, Object.assign({ style: { textAlign: 'center' } }, { children: [(0, jsx_runtime_1.jsx)(theme_1.TYPE.main, Object.assign({ mb: "4px" }, { children: "Insufficient liquidity for this trade." }), void 0), singleHopOnly && (0, jsx_runtime_1.jsx)(theme_1.TYPE.main, Object.assign({ mb: "4px" }, { children: "Try enabling multi-hop trades." }), void 0)] }), void 0)) : showRamp ? ((0, jsx_runtime_1.jsxs)(Button_1.ButtonLight, Object.assign({ onClick: () => {
                                            var _a;
                                            new ramp_instant_sdk_1.RampInstantSDK({
                                                hostAppName: 'Ubeswap',
                                                hostLogoUrl: 'https://info.ubeswap.org/favicon.png',
                                                userAddress: account,
                                                swapAsset: (_a = currencies.INPUT) === null || _a === void 0 ? void 0 : _a.symbol,
                                                hostApiKey: process.env.REACT_APP_RAMP_KEY,
                                            }).show();
                                        } }, { children: ["Get more ", (_g = currencies.INPUT) === null || _g === void 0 ? void 0 : _g.symbol, " via Ramp"] }), void 0)) : showApproveFlow ? ((0, jsx_runtime_1.jsxs)(Row_1.RowBetween, { children: [(0, jsx_runtime_1.jsx)(Button_1.ButtonConfirmed, Object.assign({ onClick: approveCallback, disabled: approval !== useApproveCallback_1.ApprovalState.NOT_APPROVED || approvalSubmitted, width: "48%", altDisabledStyle: approval === useApproveCallback_1.ApprovalState.PENDING, confirmed: approval === useApproveCallback_1.ApprovalState.APPROVED }, { children: approval === useApproveCallback_1.ApprovalState.PENDING ? ((0, jsx_runtime_1.jsxs)(Row_1.AutoRow, Object.assign({ gap: "6px", justify: "center" }, { children: ["Approving ", (0, jsx_runtime_1.jsx)(Loader_1.default, { stroke: "white" }, void 0)] }), void 0)) : approvalSubmitted && approval === useApproveCallback_1.ApprovalState.APPROVED ? ('Approved') : ('Approve ' + ((_h = currencies[actions_2.Field.INPUT]) === null || _h === void 0 ? void 0 : _h.symbol)) }), void 0), (0, jsx_runtime_1.jsx)(Button_1.ButtonError, Object.assign({ onClick: () => {
                                                    if (isExpertMode) {
                                                        handleSwap();
                                                    }
                                                    else {
                                                        setSwapState({
                                                            tradeToConfirm: trade,
                                                            attemptingTxn: false,
                                                            swapErrorMessage: undefined,
                                                            showConfirm: true,
                                                            txHash: undefined,
                                                        });
                                                    }
                                                }, width: "48%", id: "swap-button", disabled: !isValid || approval !== useApproveCallback_1.ApprovalState.APPROVED || (priceImpactSeverity > 3 && !isExpertMode), error: isValid && priceImpactSeverity > 2 }, { children: (0, jsx_runtime_1.jsx)(rebass_1.Text, Object.assign({ fontSize: 16, fontWeight: 500 }, { children: priceImpactSeverity > 3 && !isExpertMode
                                                        ? `Price Impact High`
                                                        : `${actionLabel}${priceImpactSeverity > 2 ? ' Anyway' : ''}` }), void 0) }), void 0)] }, void 0)) : ((0, jsx_runtime_1.jsx)(Button_1.ButtonError, Object.assign({ onClick: () => {
                                            if (isExpertMode) {
                                                handleSwap();
                                            }
                                            else {
                                                setSwapState({
                                                    tradeToConfirm: trade,
                                                    attemptingTxn: false,
                                                    swapErrorMessage: undefined,
                                                    showConfirm: true,
                                                    txHash: undefined,
                                                });
                                            }
                                        }, id: "swap-button", disabled: !isValid || (priceImpactSeverity > 3 && !isExpertMode) || !!swapCallbackError, error: isValid && priceImpactSeverity > 2 && !swapCallbackError }, { children: (0, jsx_runtime_1.jsx)(rebass_1.Text, Object.assign({ fontSize: 20, fontWeight: 500 }, { children: swapInputError
                                                ? swapInputError
                                                : priceImpactSeverity > 3 && !isExpertMode
                                                    ? `Price Impact Too High`
                                                    : `${actionLabel}${priceImpactSeverity > 2 ? ' Anyway' : ''}` }), void 0) }), void 0)), showApproveFlow && ((0, jsx_runtime_1.jsx)(Column_1.default, Object.assign({ style: { marginTop: '1rem' } }, { children: (0, jsx_runtime_1.jsx)(ProgressSteps_1.default, { steps: [approval === useApproveCallback_1.ApprovalState.APPROVED] }, void 0) }), void 0)), isExpertMode && swapErrorMessage ? (0, jsx_runtime_1.jsx)(styleds_1.SwapCallbackError, { error: swapErrorMessage }, void 0) : null] }, void 0)] }), void 0)] }, void 0), !swapIsUnsupported ? ((0, jsx_runtime_1.jsx)(AdvancedSwapDetailsDropdown_1.default, { trade: trade }, void 0)) : ((0, jsx_runtime_1.jsx)(UnsupportedCurrencyFooter_1.default, { show: swapIsUnsupported, currencies: [currencies.INPUT, currencies.OUTPUT] }, void 0))] }, void 0));
}
exports.default = SwapBody;
