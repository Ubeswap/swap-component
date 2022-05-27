import { createReducer } from '@reduxjs/toolkit';
import { Field, replaceSwapState, selectCurrency, setRecipient, switchCurrencies, typeInput } from './actions';
const initialState = {
    independentField: Field.INPUT,
    typedValue: '',
    [Field.INPUT]: {
        currencyId: '',
    },
    [Field.OUTPUT]: {
        currencyId: '',
    },
    recipient: null,
};
export default createReducer(initialState, (builder) => builder
    .addCase(replaceSwapState, (state, { payload: { typedValue, recipient, field, inputCurrencyId, outputCurrencyId } }) => {
    return {
        [Field.INPUT]: {
            currencyId: inputCurrencyId,
        },
        [Field.OUTPUT]: {
            currencyId: outputCurrencyId,
        },
        independentField: field,
        typedValue: typedValue,
        recipient,
    };
})
    .addCase(selectCurrency, (state, { payload: { currencyId, field } }) => {
    const otherField = field === Field.INPUT ? Field.OUTPUT : Field.INPUT;
    if (currencyId === state[otherField].currencyId) {
        // the case where we have to swap the order
        return Object.assign(Object.assign({}, state), { independentField: state.independentField === Field.INPUT ? Field.OUTPUT : Field.INPUT, [field]: { currencyId: currencyId }, [otherField]: { currencyId: state[field].currencyId } });
    }
    else {
        // the normal case
        return Object.assign(Object.assign({}, state), { [field]: { currencyId: currencyId } });
    }
})
    .addCase(switchCurrencies, (state) => {
    return Object.assign(Object.assign({}, state), { independentField: state.independentField === Field.INPUT ? Field.OUTPUT : Field.INPUT, [Field.INPUT]: { currencyId: state[Field.OUTPUT].currencyId }, [Field.OUTPUT]: { currencyId: state[Field.INPUT].currencyId } });
})
    .addCase(typeInput, (state, { payload: { field, typedValue } }) => {
    return Object.assign(Object.assign({}, state), { independentField: field, typedValue });
})
    .addCase(setRecipient, (state, { payload: { recipient } }) => {
    state.recipient = recipient;
}));
