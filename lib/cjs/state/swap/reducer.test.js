"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const redux_1 = require("redux");
const actions_1 = require("./actions");
const reducer_1 = __importDefault(require("./reducer"));
describe('swap reducer', () => {
    let store;
    beforeEach(() => {
        store = (0, redux_1.createStore)(reducer_1.default, {
            [actions_1.Field.OUTPUT]: { currencyId: '' },
            [actions_1.Field.INPUT]: { currencyId: '' },
            typedValue: '',
            independentField: actions_1.Field.INPUT,
            recipient: null,
        });
    });
    describe('selectToken', () => {
        it('changes token', () => {
            store.dispatch((0, actions_1.selectCurrency)({
                field: actions_1.Field.OUTPUT,
                currencyId: '0x0000',
            }));
            expect(store.getState()).toEqual({
                [actions_1.Field.OUTPUT]: { currencyId: '0x0000' },
                [actions_1.Field.INPUT]: { currencyId: '' },
                typedValue: '',
                independentField: actions_1.Field.INPUT,
                recipient: null,
            });
        });
    });
});
