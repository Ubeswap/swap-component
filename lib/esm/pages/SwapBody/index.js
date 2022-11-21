import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useContractKit } from '@celo-tools/use-contractkit';
import { RampInstantSDK } from '@ramp-network/ramp-instant-sdk';
import { CELO, JSBI, Token } from '@ubeswap/sdk';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { ArrowDown } from 'react-feather';
import ReactGA from 'react-ga';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Text } from 'rebass';
import { ThemeContext } from 'styled-components';
import AddressInputPanel from '../../components/AddressInputPanel';
import { ButtonConfirmed, ButtonError, ButtonLight, ButtonPrimary } from '../../components/Button';
import Card, { GreyCard } from '../../components/Card';
import Column, { AutoColumn } from '../../components/Column';
import CurrencyInputPanel from '../../components/CurrencyInputPanel';
import OpticsV1Warning from '../../components/Header/OpticsV1Warning';
import Loader from '../../components/Loader';
import { SwapPoolTabs } from '../../components/NavigationTabs';
import ProgressSteps from '../../components/ProgressSteps';
import { AutoRow, RowBetween } from '../../components/Row';
import AdvancedSwapDetailsDropdown from '../../components/swap/AdvancedSwapDetailsDropdown';
import confirmPriceImpactWithoutFee from '../../components/swap/confirmPriceImpactWithoutFee';
import ConfirmSwapModal from '../../components/swap/ConfirmSwapModal';
import { describeTrade } from '../../components/swap/routing/describeTrade';
import { MoolaDirectTrade } from '../../components/swap/routing/moola/MoolaDirectTrade';
import { useTradeCallback } from '../../components/swap/routing/useTradeCallback';
import { ArrowWrapper, BottomGrouping, SwapCallbackError, Wrapper } from '../../components/swap/styleds';
import SwapHeader from '../../components/swap/SwapHeader';
import TradePrice from '../../components/swap/TradePrice';
import UnsupportedCurrencyFooter from '../../components/swap/UnsupportedCurrencyFooter';
import TokenWarningModal from '../../components/TokenWarningModal';
import { INITIAL_ALLOWED_SLIPPAGE } from '../../constants';
import { useAllTokens, useCurrency } from '../../hooks/Tokens';
import { useIsTransactionUnsupported } from '../../hooks/Trades';
import { ApprovalState, useApproveCallbackFromTrade } from '../../hooks/useApproveCallback';
import useENS from '../../hooks/useENS';
import { useToggleSettingsMenu, useWalletModalToggle } from '../../state/application/hooks';
import { Field } from '../../state/swap/actions';
import { useDefaultsFromURLSearch, useDerivedSwapInfo, useSwapActionHandlers, useSwapState, } from '../../state/swap/hooks';
import { updateUserDarkMode } from '../../state/user/actions';
import { useExpertModeManager, useUserSingleHopOnly, useUserSlippageTolerance } from '../../state/user/hooks';
import { ClickableText, LinkStyledButton, TYPE } from '../../theme';
import { maxAmountSpend } from '../../utils/maxAmountSpend';
import { computeTradePriceBreakdown, warningSeverity } from '../../utils/prices';
import AppBody from '../AppBody';
export default function SwapBody({ defaultSwapToken, defaultTokenLists, minimaPartnerId, useDarkMode }) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    const dispatch = useDispatch();
    dispatch(updateUserDarkMode({ userDarkMode: useDarkMode !== null && useDarkMode !== void 0 ? useDarkMode : false }));
    const { t } = useTranslation();
    const loadedUrlParams = useDefaultsFromURLSearch(defaultSwapToken === null || defaultSwapToken === void 0 ? void 0 : defaultSwapToken.address);
    // token warning stuff
    const [loadedInputCurrency, loadedOutputCurrency] = [
        useCurrency(loadedUrlParams === null || loadedUrlParams === void 0 ? void 0 : loadedUrlParams.inputCurrencyId),
        useCurrency(loadedUrlParams === null || loadedUrlParams === void 0 ? void 0 : loadedUrlParams.outputCurrencyId),
    ];
    const [dismissTokenWarning, setDismissTokenWarning] = useState(false);
    const urlLoadedTokens = useMemo(() => { var _a, _b; return (_b = (_a = [loadedInputCurrency, loadedOutputCurrency]) === null || _a === void 0 ? void 0 : _a.filter((c) => c instanceof Token)) !== null && _b !== void 0 ? _b : []; }, [loadedInputCurrency, loadedOutputCurrency]);
    const handleConfirmTokenWarning = useCallback(() => {
        setDismissTokenWarning(true);
    }, []);
    // dismiss warning if all imported tokens are in active lists
    const defaultTokens = useAllTokens();
    const importTokensNotInDefault = urlLoadedTokens &&
        urlLoadedTokens.filter((token) => {
            return !(token.address in defaultTokens);
        });
    const { address: account, network } = useContractKit();
    const chainId = network.chainId;
    const theme = useContext(ThemeContext);
    // toggle wallet when disconnected
    const toggleWalletModal = useWalletModalToggle();
    // for expert mode
    const toggleSettings = useToggleSettingsMenu();
    const [isExpertMode] = useExpertModeManager();
    // get custom setting values for user
    const [allowedSlippage] = useUserSlippageTolerance();
    // swap state
    const { independentField, typedValue, recipient } = useSwapState();
    const { v2Trade, currencyBalances, parsedAmount, currencies, inputError: swapInputError, showRamp, } = useDerivedSwapInfo(minimaPartnerId);
    const { address: recipientAddress } = useENS(recipient);
    const trade = v2Trade;
    const parsedAmounts = {
        [Field.INPUT]: independentField === Field.INPUT ? parsedAmount : trade === null || trade === void 0 ? void 0 : trade.inputAmount,
        [Field.OUTPUT]: independentField === Field.OUTPUT ? parsedAmount : trade === null || trade === void 0 ? void 0 : trade.outputAmount,
    };
    const { onSwitchTokens, onCurrencySelection, onUserInput, onChangeRecipient } = useSwapActionHandlers();
    const isValid = !swapInputError;
    const dependentField = independentField === Field.INPUT ? Field.OUTPUT : Field.INPUT;
    const handleTypeInput = useCallback((value) => {
        onUserInput(Field.INPUT, value);
    }, [onUserInput]);
    const handleTypeOutput = useCallback((value) => {
        onUserInput(Field.OUTPUT, value);
    }, [onUserInput]);
    // modal and loading
    const [{ showConfirm, tradeToConfirm, swapErrorMessage, attemptingTxn, txHash }, setSwapState] = useState({
        showConfirm: false,
        tradeToConfirm: undefined,
        attemptingTxn: false,
        swapErrorMessage: undefined,
        txHash: undefined,
    });
    const formattedAmounts = {
        [independentField]: typedValue,
        [dependentField]: (_c = (trade instanceof MoolaDirectTrade
            ? (_a = parsedAmounts[dependentField]) === null || _a === void 0 ? void 0 : _a.toExact()
            : (_b = parsedAmounts[dependentField]) === null || _b === void 0 ? void 0 : _b.toSignificant(6))) !== null && _c !== void 0 ? _c : '',
    };
    const userHasSpecifiedInputOutput = Boolean(currencies[Field.INPUT] && currencies[Field.OUTPUT] && ((_d = parsedAmounts[independentField]) === null || _d === void 0 ? void 0 : _d.greaterThan(JSBI.BigInt(0))));
    const route = trade === null || trade === void 0 ? void 0 : trade.route;
    const noRoute = !route;
    // check whether the user has approved the router on the input token
    const [approval, approveCallback] = useApproveCallbackFromTrade(trade, allowedSlippage);
    // check if user has gone through approval process, used to show two step buttons, reset on token change
    const [approvalSubmitted, setApprovalSubmitted] = useState(false);
    // mark when a user has submitted an approval, reset onTokenSelection for input field
    useEffect(() => {
        if (approval === ApprovalState.PENDING) {
            setApprovalSubmitted(true);
        }
    }, [approval, approvalSubmitted]);
    const maxAmountInput = maxAmountSpend(currencyBalances[Field.INPUT]);
    const atMaxAmountInput = Boolean(maxAmountInput && ((_e = parsedAmounts[Field.INPUT]) === null || _e === void 0 ? void 0 : _e.equalTo(maxAmountInput)));
    const atHalfAmountInput = Boolean(maxAmountInput && Number(maxAmountInput.toExact()) * 0.5 === Number((_f = parsedAmounts[Field.INPUT]) === null || _f === void 0 ? void 0 : _f.toExact()));
    // the callback to execute the swap
    const { callback: swapCallback, error: swapCallbackError } = useTradeCallback(trade, allowedSlippage, recipient);
    const { priceImpactWithoutFee } = computeTradePriceBreakdown(trade);
    const [singleHopOnly] = useUserSingleHopOnly();
    const handleSwap = useCallback(() => {
        if (priceImpactWithoutFee && !confirmPriceImpactWithoutFee(priceImpactWithoutFee)) {
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
            ReactGA.event({
                category: 'Swap',
                action: recipient === null
                    ? 'Swap w/o Send'
                    : (recipientAddress !== null && recipientAddress !== void 0 ? recipientAddress : recipient) === account
                        ? 'Swap w/o Send + recipient'
                        : 'Swap w/ Send',
                label: [(_b = (_a = trade === null || trade === void 0 ? void 0 : trade.inputAmount) === null || _a === void 0 ? void 0 : _a.currency) === null || _b === void 0 ? void 0 : _b.symbol, (_d = (_c = trade === null || trade === void 0 ? void 0 : trade.outputAmount) === null || _c === void 0 ? void 0 : _c.currency) === null || _d === void 0 ? void 0 : _d.symbol].join('/'),
            });
            ReactGA.event({
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
    const [showInverted, setShowInverted] = useState(false);
    // warnings on slippage
    const priceImpactSeverity = warningSeverity(priceImpactWithoutFee);
    // show approve flow when: no error on inputs, not approved or pending, or approved in current session
    // never show if price impact is above threshold in non expert mode
    const showApproveFlow = !swapInputError &&
        (approval === ApprovalState.NOT_APPROVED ||
            approval === ApprovalState.PENDING ||
            (approvalSubmitted && approval === ApprovalState.APPROVED)) &&
        !(priceImpactSeverity > 3 && !isExpertMode);
    const handleConfirmDismiss = useCallback(() => {
        setSwapState({ showConfirm: false, tradeToConfirm, attemptingTxn, swapErrorMessage, txHash });
        // if there was a tx hash, we want to clear the input
        if (txHash) {
            onUserInput(Field.INPUT, '');
        }
    }, [attemptingTxn, onUserInput, swapErrorMessage, tradeToConfirm, txHash]);
    const handleAcceptChanges = useCallback(() => {
        setSwapState({ tradeToConfirm: trade, swapErrorMessage, txHash, attemptingTxn, showConfirm });
    }, [attemptingTxn, showConfirm, swapErrorMessage, trade, txHash]);
    const handleInputSelect = useCallback((inputCurrency) => {
        setApprovalSubmitted(false); // reset 2 step UI for approvals
        onCurrencySelection(Field.INPUT, inputCurrency);
    }, [onCurrencySelection]);
    const handleMaxInput = useCallback(() => {
        var _a;
        if (maxAmountInput) {
            if (((_a = currencies === null || currencies === void 0 ? void 0 : currencies.INPUT) === null || _a === void 0 ? void 0 : _a.address) === CELO[chainId].address) {
                onUserInput(Field.INPUT, Math.max(Number(maxAmountInput.toExact()) - 0.01, 0).toString());
            }
            else {
                onUserInput(Field.INPUT, maxAmountInput.toExact());
            }
        }
    }, [maxAmountInput, onUserInput, currencies, chainId]);
    const handleHalfInput = useCallback(() => {
        if (maxAmountInput) {
            onUserInput(Field.INPUT, Math.max(Number(maxAmountInput.toExact()) * 0.5, 0).toString());
        }
    }, [maxAmountInput, onUserInput]);
    const handleOutputSelect = useCallback((outputCurrency) => onCurrencySelection(Field.OUTPUT, outputCurrency), [onCurrencySelection]);
    const swapIsUnsupported = useIsTransactionUnsupported(currencies === null || currencies === void 0 ? void 0 : currencies.INPUT, currencies === null || currencies === void 0 ? void 0 : currencies.OUTPUT);
    const { isEstimate, makeLabel } = describeTrade(trade);
    const actionLabel = t(makeLabel(independentField !== Field.INPUT));
    return (_jsxs(_Fragment, { children: [_jsx(TokenWarningModal, { isOpen: importTokensNotInDefault.length > 0 && !dismissTokenWarning, tokens: importTokensNotInDefault, onConfirm: handleConfirmTokenWarning }), _jsx(OpticsV1Warning, {}), _jsx(SwapPoolTabs, { active: 'swap' }), _jsxs(AppBody, { children: [_jsx(SwapHeader, { title: actionLabel }), _jsxs(Wrapper, Object.assign({ id: "swap-page" }, { children: [_jsx(ConfirmSwapModal, { isOpen: showConfirm, trade: trade, originalTrade: tradeToConfirm, onAcceptChanges: handleAcceptChanges, attemptingTxn: attemptingTxn, txHash: txHash, recipient: recipient, allowedSlippage: allowedSlippage, onConfirm: handleSwap, swapErrorMessage: swapErrorMessage, onDismiss: handleConfirmDismiss }), _jsxs(AutoColumn, Object.assign({ gap: 'md' }, { children: [_jsx(CurrencyInputPanel, { label: independentField === Field.OUTPUT && trade
                                            ? `${t('from')}${isEstimate ? ' (estimated)' : ''}`
                                            : t('from'), value: formattedAmounts[Field.INPUT], showMaxButton: !atMaxAmountInput, showHalfButton: !atHalfAmountInput, currency: currencies[Field.INPUT], onUserInput: handleTypeInput, onMax: handleMaxInput, onHalf: handleHalfInput, onCurrencySelect: handleInputSelect, otherCurrency: currencies[Field.OUTPUT], defaultTokenLists: defaultTokenLists, disableCurrencySelect: defaultSwapToken && ((_g = currencies[Field.INPUT]) === null || _g === void 0 ? void 0 : _g.address) === defaultSwapToken.address, id: "swap-currency-input" }), _jsx(AutoColumn, Object.assign({ justify: "space-between" }, { children: _jsxs(AutoRow, Object.assign({ justify: isExpertMode ? 'space-between' : 'center', style: { padding: '0 1rem' } }, { children: [_jsx(ArrowWrapper, Object.assign({ clickable: true }, { children: _jsx(ArrowDown, { size: "16", onClick: () => {
                                                            setApprovalSubmitted(false); // reset 2 step UI for approvals
                                                            onSwitchTokens();
                                                        }, color: currencies[Field.INPUT] && currencies[Field.OUTPUT] ? theme.primary1 : theme.text2 }) })), recipient === null && isExpertMode ? (_jsx(LinkStyledButton, Object.assign({ id: "add-recipient-button", onClick: () => onChangeRecipient('') }, { children: "+ Add a send (optional)" }))) : null] })) })), _jsx(CurrencyInputPanel, { value: formattedAmounts[Field.OUTPUT], onUserInput: handleTypeOutput, label: independentField === Field.INPUT && trade ? `${t('to')}${isEstimate ? ' (estimated)' : ''}` : t('to'), showMaxButton: false, currency: currencies[Field.OUTPUT], onCurrencySelect: handleOutputSelect, otherCurrency: currencies[Field.INPUT], defaultTokenLists: defaultTokenLists, id: "swap-currency-output", disableCurrencySelect: defaultSwapToken && ((_h = currencies[Field.OUTPUT]) === null || _h === void 0 ? void 0 : _h.address) === defaultSwapToken.address, disabled: true }), recipient !== null ? (_jsxs(_Fragment, { children: [_jsxs(AutoRow, Object.assign({ justify: "space-between", style: { padding: '0 1rem' } }, { children: [_jsx(ArrowWrapper, Object.assign({ clickable: false }, { children: _jsx(ArrowDown, { size: "16", color: theme.text2 }) })), _jsx(LinkStyledButton, Object.assign({ id: "remove-recipient-button", onClick: () => onChangeRecipient(null) }, { children: "- Remove send" }))] })), _jsx(AddressInputPanel, { id: "recipient", value: recipient, onChange: onChangeRecipient })] })) : null, _jsx(Card, Object.assign({ padding: '0px', borderRadius: '20px' }, { children: _jsxs(AutoColumn, Object.assign({ gap: "8px", style: { padding: '0 16px' } }, { children: [Boolean(trade) && (_jsxs(RowBetween, Object.assign({ align: "center" }, { children: [_jsx(Text, Object.assign({ fontWeight: 500, fontSize: 14, color: theme.text2 }, { children: "Price" })), _jsx(TradePrice, { price: trade === null || trade === void 0 ? void 0 : trade.executionPrice, showInverted: showInverted, setShowInverted: setShowInverted })] }))), allowedSlippage !== INITIAL_ALLOWED_SLIPPAGE && (_jsxs(RowBetween, Object.assign({ align: "center" }, { children: [_jsx(ClickableText, Object.assign({ fontWeight: 500, fontSize: 14, color: theme.text2, onClick: toggleSettings }, { children: "Slippage Tolerance" })), _jsxs(ClickableText, Object.assign({ fontWeight: 500, fontSize: 14, color: theme.text2, onClick: toggleSettings }, { children: [allowedSlippage / 100, "%"] }))] })))] })) }))] })), _jsxs(BottomGrouping, { children: [swapIsUnsupported ? (_jsx(ButtonPrimary, Object.assign({ disabled: true }, { children: _jsx(TYPE.main, Object.assign({ mb: "4px" }, { children: "Unsupported Asset" })) }))) : !account ? (_jsx(ButtonLight, Object.assign({ onClick: toggleWalletModal }, { children: t('connectWallet') }))) : noRoute && userHasSpecifiedInputOutput ? (_jsxs(GreyCard, Object.assign({ style: { textAlign: 'center' } }, { children: [_jsx(TYPE.main, Object.assign({ mb: "4px" }, { children: "Insufficient liquidity for this trade." })), singleHopOnly && _jsx(TYPE.main, Object.assign({ mb: "4px" }, { children: "Try enabling multi-hop trades." }))] }))) : showRamp ? (_jsxs(ButtonLight, Object.assign({ onClick: () => {
                                            var _a;
                                            new RampInstantSDK({
                                                hostAppName: 'Ubeswap',
                                                hostLogoUrl: 'https://info.ubeswap.org/favicon.png',
                                                userAddress: account,
                                                swapAsset: (_a = currencies.INPUT) === null || _a === void 0 ? void 0 : _a.symbol,
                                                hostApiKey: undefined,
                                            }).show();
                                        } }, { children: ["Get more ", (_j = currencies.INPUT) === null || _j === void 0 ? void 0 : _j.symbol, " via Ramp"] }))) : showApproveFlow ? (_jsxs(RowBetween, { children: [_jsx(ButtonConfirmed, Object.assign({ onClick: approveCallback, disabled: approval !== ApprovalState.NOT_APPROVED || approvalSubmitted, width: "48%", altDisabledStyle: approval === ApprovalState.PENDING, confirmed: approval === ApprovalState.APPROVED }, { children: approval === ApprovalState.PENDING ? (_jsxs(AutoRow, Object.assign({ gap: "6px", justify: "center" }, { children: ["Approving ", _jsx(Loader, { stroke: "white" })] }))) : approvalSubmitted && approval === ApprovalState.APPROVED ? ('Approved') : ('Approve ' + ((_k = currencies[Field.INPUT]) === null || _k === void 0 ? void 0 : _k.symbol)) })), _jsx(ButtonError, Object.assign({ onClick: () => {
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
                                                }, width: "48%", id: "swap-button", disabled: !isValid || approval !== ApprovalState.APPROVED || (priceImpactSeverity > 3 && !isExpertMode), error: isValid && priceImpactSeverity > 2 }, { children: _jsx(Text, Object.assign({ fontSize: 16, fontWeight: 500 }, { children: priceImpactSeverity > 3 && !isExpertMode
                                                        ? `Price Impact High`
                                                        : `${actionLabel}${priceImpactSeverity > 2 ? ' Anyway' : ''}` })) }))] })) : (_jsx(ButtonError, Object.assign({ onClick: () => {
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
                                        }, id: "swap-button", disabled: !isValid || (priceImpactSeverity > 3 && !isExpertMode) || !!swapCallbackError, error: isValid && priceImpactSeverity > 2 && !swapCallbackError }, { children: _jsx(Text, Object.assign({ fontSize: 20, fontWeight: 500 }, { children: swapInputError
                                                ? swapInputError
                                                : priceImpactSeverity > 3 && !isExpertMode
                                                    ? `Price Impact Too High`
                                                    : `${actionLabel}${priceImpactSeverity > 2 ? ' Anyway' : ''}` })) }))), showApproveFlow && (_jsx(Column, Object.assign({ style: { marginTop: '1rem' } }, { children: _jsx(ProgressSteps, { steps: [approval === ApprovalState.APPROVED] }) }))), isExpertMode && swapErrorMessage ? _jsx(SwapCallbackError, { error: swapErrorMessage }) : null] })] }))] }), !swapIsUnsupported ? (_jsx(AdvancedSwapDetailsDropdown, { trade: trade })) : (_jsx(UnsupportedCurrencyFooter, { show: swapIsUnsupported, currencies: [currencies.INPUT, currencies.OUTPUT] }))] }));
}
