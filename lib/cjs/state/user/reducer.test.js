"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const redux_1 = require("redux");
const constants_1 = require("../../constants");
const actions_1 = require("../global/actions");
const reducer_1 = __importStar(require("./reducer"));
describe('swap reducer', () => {
    let store;
    beforeEach(() => {
        store = (0, redux_1.createStore)(reducer_1.default, reducer_1.initialState);
    });
    describe('updateVersion', () => {
        it('has no timestamp originally', () => {
            expect(store.getState().lastUpdateVersionTimestamp).toBeUndefined();
        });
        it('sets the lastUpdateVersionTimestamp', () => {
            const time = new Date().getTime();
            store.dispatch((0, actions_1.updateVersion)());
            expect(store.getState().lastUpdateVersionTimestamp).toBeGreaterThanOrEqual(time);
        });
        it('sets allowed slippage and deadline', () => {
            store = (0, redux_1.createStore)(reducer_1.default, Object.assign(Object.assign({}, reducer_1.initialState), { userDeadline: undefined, userSlippageTolerance: undefined }));
            store.dispatch((0, actions_1.updateVersion)());
            expect(store.getState().userDeadline).toEqual(constants_1.DEFAULT_DEADLINE_FROM_NOW);
            expect(store.getState().userSlippageTolerance).toEqual(constants_1.INITIAL_ALLOWED_SLIPPAGE);
        });
    });
});
