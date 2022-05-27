import { createReducer } from '@reduxjs/toolkit';
import { Field, resetMintState, typeInput } from './actions';
const initialState = {
    independentField: Field.CURRENCY_A,
    typedValue: '',
    otherTypedValue: '',
};
export default createReducer(initialState, (builder) => builder
    .addCase(resetMintState, () => initialState)
    .addCase(typeInput, (state, { payload: { field, typedValue, noLiquidity } }) => {
    if (noLiquidity) {
        // they're typing into the field they've last typed in
        if (field === state.independentField) {
            return Object.assign(Object.assign({}, state), { independentField: field, typedValue });
        }
        // they're typing into a new field, store the other value
        else {
            return Object.assign(Object.assign({}, state), { independentField: field, typedValue, otherTypedValue: state.typedValue });
        }
    }
    else {
        return Object.assign(Object.assign({}, state), { independentField: field, typedValue, otherTypedValue: '' });
    }
}));
