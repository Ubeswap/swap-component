"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sdk_1 = require("@ubeswap/sdk");
const redux_1 = require("redux");
const actions_1 = require("./actions");
const reducer_1 = __importDefault(require("./reducer"));
describe('application reducer', () => {
    let store;
    beforeEach(() => {
        store = (0, redux_1.createStore)(reducer_1.default, {
            popupList: [],
            blockNumber: {
                [sdk_1.ChainId.MAINNET]: 3,
            },
            openModal: null,
        });
    });
    describe('addPopup', () => {
        it('adds the popup to list with a generated id', () => {
            store.dispatch((0, actions_1.addPopup)({ content: { txn: { hash: 'abc', summary: 'test', success: true } } }));
            const list = store.getState().popupList;
            expect(list).toHaveLength(1);
            expect(typeof list[0].key).toEqual('string');
            expect(list[0].show).toEqual(true);
            expect(list[0].content).toEqual({ txn: { hash: 'abc', summary: 'test', success: true } });
            expect(list[0].removeAfterMs).toEqual(15000);
        });
        it('replaces any existing popups with the same key', () => {
            store.dispatch((0, actions_1.addPopup)({ key: 'abc', content: { txn: { hash: 'abc', summary: 'test', success: true } } }));
            store.dispatch((0, actions_1.addPopup)({ key: 'abc', content: { txn: { hash: 'def', summary: 'test2', success: false } } }));
            const list = store.getState().popupList;
            expect(list).toHaveLength(1);
            expect(list[0].key).toEqual('abc');
            expect(list[0].show).toEqual(true);
            expect(list[0].content).toEqual({ txn: { hash: 'def', summary: 'test2', success: false } });
            expect(list[0].removeAfterMs).toEqual(15000);
        });
    });
    describe('setOpenModal', () => {
        it('set wallet modal', () => {
            store.dispatch((0, actions_1.setOpenModal)(actions_1.ApplicationModal.WALLET));
            expect(store.getState().openModal).toEqual(actions_1.ApplicationModal.WALLET);
            store.dispatch((0, actions_1.setOpenModal)(actions_1.ApplicationModal.WALLET));
            expect(store.getState().openModal).toEqual(actions_1.ApplicationModal.WALLET);
            store.dispatch((0, actions_1.setOpenModal)(actions_1.ApplicationModal.CLAIM_POPUP));
            expect(store.getState().openModal).toEqual(actions_1.ApplicationModal.CLAIM_POPUP);
            store.dispatch((0, actions_1.setOpenModal)(null));
            expect(store.getState().openModal).toEqual(null);
        });
    });
    describe('updateBlockNumber', () => {
        it('updates block number', () => {
            store.dispatch((0, actions_1.updateBlockNumber)({ chainId: sdk_1.ChainId.MAINNET, blockNumber: 4 }));
            expect(store.getState().blockNumber[sdk_1.ChainId.MAINNET]).toEqual(4);
        });
        it('no op if late', () => {
            store.dispatch((0, actions_1.updateBlockNumber)({ chainId: sdk_1.ChainId.MAINNET, blockNumber: 2 }));
            expect(store.getState().blockNumber[sdk_1.ChainId.MAINNET]).toEqual(3);
        });
        it('works with non-set chains', () => {
            store.dispatch((0, actions_1.updateBlockNumber)({ chainId: sdk_1.ChainId.ALFAJORES, blockNumber: 2 }));
            expect(store.getState().blockNumber).toEqual({
                [sdk_1.ChainId.MAINNET]: 3,
                [sdk_1.ChainId.ALFAJORES]: 2,
            });
        });
    });
    describe('removePopup', () => {
        beforeEach(() => {
            store.dispatch((0, actions_1.addPopup)({ key: 'abc', content: { txn: { hash: 'abc', summary: 'test', success: true } } }));
        });
        it('hides the popup', () => {
            expect(store.getState().popupList[0].show).toBe(true);
            store.dispatch((0, actions_1.removePopup)({ key: 'abc' }));
            expect(store.getState().popupList).toHaveLength(1);
            expect(store.getState().popupList[0].show).toBe(false);
        });
    });
});
