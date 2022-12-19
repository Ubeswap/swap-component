"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const toolkit_1 = require("@reduxjs/toolkit");
const actions_1 = require("./actions");
const initialState = {
    independentField: actions_1.Field.INPUT,
    typedValue: '',
    [actions_1.Field.INPUT]: {
        currencyId: '',
    },
    [actions_1.Field.OUTPUT]: {
        currencyId: '',
    },
    recipient: null,
};
exports.default = (0, toolkit_1.createReducer)(initialState, (builder) => builder
    .addCase(actions_1.replaceSwapState, (state, { payload: { typedValue, recipient, field, inputCurrencyId, outputCurrencyId } }) => {
    return {
        [actions_1.Field.INPUT]: {
            currencyId: inputCurrencyId,
        },
        [actions_1.Field.OUTPUT]: {
            currencyId: outputCurrencyId,
        },
        independentField: field,
        typedValue: typedValue,
        recipient,
    };
})
    .addCase(actions_1.selectCurrency, (state, { payload: { currencyId, field } }) => {
    const otherField = field === actions_1.Field.INPUT ? actions_1.Field.OUTPUT : actions_1.Field.INPUT;
    if (currencyId === state[otherField].currencyId) {
        // the case where we have to swap the order
        return Object.assign(Object.assign({}, state), { independentField: state.independentField === actions_1.Field.INPUT ? actions_1.Field.OUTPUT : actions_1.Field.INPUT, [field]: { currencyId: currencyId }, [otherField]: { currencyId: state[field].currencyId } });
    }
    else {
        // the normal case
        return Object.assign(Object.assign({}, state), { [field]: { currencyId: currencyId } });
    }
})
    .addCase(actions_1.switchCurrencies, (state) => {
    return Object.assign(Object.assign({}, state), { 
        // independentField: state.independentField === Field.INPUT ? Field.OUTPUT : Field.INPUT,
        [actions_1.Field.INPUT]: { currencyId: state[actions_1.Field.OUTPUT].currencyId }, [actions_1.Field.OUTPUT]: { currencyId: state[actions_1.Field.INPUT].currencyId } });
})
    .addCase(actions_1.typeInput, (state, { payload: { field, typedValue } }) => {
    return Object.assign(Object.assign({}, state), { independentField: field, typedValue });
})
    .addCase(actions_1.setRecipient, (state, { payload: { recipient } }) => {
    state.recipient = recipient;
})
    .addCase(actions_1.setAccountInfo, (state, { payload: { accountInfo } }) => {
    state.accountInfo = accountInfo;
}));
