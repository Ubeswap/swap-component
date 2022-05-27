"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const toolkit_1 = require("@reduxjs/toolkit");
const actions_1 = require("./actions");
const initialState = {
    independentField: actions_1.Field.CURRENCY_A,
    typedValue: '',
    otherTypedValue: '',
};
exports.default = (0, toolkit_1.createReducer)(initialState, (builder) => builder
    .addCase(actions_1.resetMintState, () => initialState)
    .addCase(actions_1.typeInput, (state, { payload: { field, typedValue, noLiquidity } }) => {
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
