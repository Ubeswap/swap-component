"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const toolkit_1 = require("@reduxjs/toolkit");
const actions_1 = require("./actions");
const initialState = {
    priceTypedValue: '',
    tokenTypedValue: '',
    [actions_1.Field.TOKEN]: {
        currencyId: '',
    },
    [actions_1.Field.PRICE]: {
        currencyId: '',
    },
    recipient: null,
    buying: true,
};
exports.default = (0, toolkit_1.createReducer)(initialState, (builder) => builder
    .addCase(actions_1.replaceLimitState, (state, { payload: { tokenTypedValue, priceTypedValue, recipient, field, tokenCurrencyId, priceCurrencyId, buying } }) => {
    return {
        [actions_1.Field.TOKEN]: {
            currencyId: tokenCurrencyId,
        },
        [actions_1.Field.PRICE]: {
            currencyId: priceCurrencyId,
        },
        independentField: field,
        tokenTypedValue,
        priceTypedValue,
        recipient,
        buying,
    };
})
    .addCase(actions_1.selectCurrency, (state, { payload: { currencyId, field } }) => {
    const otherField = field === actions_1.Field.TOKEN ? actions_1.Field.PRICE : actions_1.Field.TOKEN;
    if (currencyId === state[otherField].currencyId) {
        // the case where we have to Limit the order
        return Object.assign(Object.assign({}, state), { [field]: { currencyId: currencyId }, [otherField]: { currencyId: state[field].currencyId } });
    }
    else {
        // the normal case
        return Object.assign(Object.assign({}, state), { [field]: { currencyId: currencyId } });
    }
})
    .addCase(actions_1.switchCurrencies, (state) => {
    return Object.assign(Object.assign({}, state), { [actions_1.Field.TOKEN]: { currencyId: state[actions_1.Field.PRICE].currencyId }, [actions_1.Field.PRICE]: { currencyId: state[actions_1.Field.TOKEN].currencyId } });
})
    .addCase(actions_1.typeInput, (state, { payload: { field, typedValue } }) => {
    if (field === actions_1.Field.PRICE) {
        return Object.assign(Object.assign({}, state), { priceTypedValue: typedValue });
    }
    else if (field === actions_1.Field.TOKEN) {
        return Object.assign(Object.assign({}, state), { tokenTypedValue: typedValue });
    }
    return state;
})
    .addCase(actions_1.setRecipient, (state, { payload: { recipient } }) => {
    state.recipient = recipient;
})
    .addCase(actions_1.setBuying, (state, { payload: { buying } }) => {
    state.buying = buying;
}));
