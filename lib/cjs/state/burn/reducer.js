"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const toolkit_1 = require("@reduxjs/toolkit");
const actions_1 = require("./actions");
const initialState = {
    independentField: actions_1.Field.LIQUIDITY_PERCENT,
    typedValue: '0',
};
exports.default = (0, toolkit_1.createReducer)(initialState, (builder) => builder.addCase(actions_1.typeInput, (state, { payload: { field, typedValue } }) => {
    return Object.assign(Object.assign({}, state), { independentField: field, typedValue });
}));
