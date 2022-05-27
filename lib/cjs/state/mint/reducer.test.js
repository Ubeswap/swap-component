"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const redux_1 = require("redux");
const actions_1 = require("./actions");
const reducer_1 = __importDefault(require("./reducer"));
describe('mint reducer', () => {
    let store;
    beforeEach(() => {
        store = (0, redux_1.createStore)(reducer_1.default, {
            independentField: actions_1.Field.CURRENCY_A,
            typedValue: '',
            otherTypedValue: '',
        });
    });
    describe('typeInput', () => {
        it('sets typed value', () => {
            store.dispatch((0, actions_1.typeInput)({ field: actions_1.Field.CURRENCY_A, typedValue: '1.0', noLiquidity: false }));
            expect(store.getState()).toEqual({ independentField: actions_1.Field.CURRENCY_A, typedValue: '1.0', otherTypedValue: '' });
        });
        it('clears other value', () => {
            store.dispatch((0, actions_1.typeInput)({ field: actions_1.Field.CURRENCY_A, typedValue: '1.0', noLiquidity: false }));
            store.dispatch((0, actions_1.typeInput)({ field: actions_1.Field.CURRENCY_B, typedValue: '1.0', noLiquidity: false }));
            expect(store.getState()).toEqual({ independentField: actions_1.Field.CURRENCY_B, typedValue: '1.0', otherTypedValue: '' });
        });
    });
});
