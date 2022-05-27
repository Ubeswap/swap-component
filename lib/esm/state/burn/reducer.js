import { createReducer } from '@reduxjs/toolkit';
import { Field, typeInput } from './actions';
const initialState = {
    independentField: Field.LIQUIDITY_PERCENT,
    typedValue: '0',
};
export default createReducer(initialState, (builder) => builder.addCase(typeInput, (state, { payload: { field, typedValue } }) => {
    return Object.assign(Object.assign({}, state), { independentField: field, typedValue });
}));
