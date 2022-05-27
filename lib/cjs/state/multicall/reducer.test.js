"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const toolkit_1 = require("@reduxjs/toolkit");
const actions_1 = require("./actions");
const reducer_1 = __importDefault(require("./reducer"));
const DAI_ADDRESS = '0x6b175474e89094c44da98b954eedeac495271d0f';
describe('multicall reducer', () => {
    let store;
    beforeEach(() => {
        store = (0, toolkit_1.createStore)(reducer_1.default);
    });
    it('has correct initial state', () => {
        expect(store.getState().callResults).toEqual({});
        expect(store.getState().callListeners).toEqual(undefined);
    });
    describe('addMulticallListeners', () => {
        it('adds listeners', () => {
            store.dispatch((0, actions_1.addMulticallListeners)({
                chainId: 1,
                calls: [
                    {
                        address: DAI_ADDRESS,
                        callData: '0x',
                    },
                ],
            }));
            expect(store.getState()).toEqual({
                callListeners: {
                    [1]: {
                        [`${DAI_ADDRESS}-0x`]: {
                            [1]: 1,
                        },
                    },
                },
                callResults: {},
            });
        });
    });
    describe('removeMulticallListeners', () => {
        it('noop', () => {
            store.dispatch((0, actions_1.removeMulticallListeners)({
                calls: [
                    {
                        address: DAI_ADDRESS,
                        callData: '0x',
                    },
                ],
                chainId: 1,
            }));
            expect(store.getState()).toEqual({ callResults: {}, callListeners: {} });
        });
        it('removes listeners', () => {
            store.dispatch((0, actions_1.addMulticallListeners)({
                chainId: 1,
                calls: [
                    {
                        address: DAI_ADDRESS,
                        callData: '0x',
                    },
                ],
            }));
            store.dispatch((0, actions_1.removeMulticallListeners)({
                calls: [
                    {
                        address: DAI_ADDRESS,
                        callData: '0x',
                    },
                ],
                chainId: 1,
            }));
            expect(store.getState()).toEqual({
                callResults: {},
                callListeners: { [1]: { [`${DAI_ADDRESS}-0x`]: {} } },
            });
        });
    });
    describe('updateMulticallResults', () => {
        it('updates data if not present', () => {
            store.dispatch((0, actions_1.updateMulticallResults)({
                chainId: 1,
                blockNumber: 1,
                results: {
                    abc: '0x',
                },
            }));
            expect(store.getState()).toEqual({
                callResults: {
                    [1]: {
                        abc: {
                            blockNumber: 1,
                            data: '0x',
                        },
                    },
                },
            });
        });
        it('updates old data', () => {
            store.dispatch((0, actions_1.updateMulticallResults)({
                chainId: 1,
                blockNumber: 1,
                results: {
                    abc: '0x',
                },
            }));
            store.dispatch((0, actions_1.updateMulticallResults)({
                chainId: 1,
                blockNumber: 2,
                results: {
                    abc: '0x2',
                },
            }));
            expect(store.getState()).toEqual({
                callResults: {
                    [1]: {
                        abc: {
                            blockNumber: 2,
                            data: '0x2',
                        },
                    },
                },
            });
        });
        it('ignores late updates', () => {
            store.dispatch((0, actions_1.updateMulticallResults)({
                chainId: 1,
                blockNumber: 2,
                results: {
                    abc: '0x2',
                },
            }));
            store.dispatch((0, actions_1.updateMulticallResults)({
                chainId: 1,
                blockNumber: 1,
                results: {
                    abc: '0x1',
                },
            }));
            expect(store.getState()).toEqual({
                callResults: {
                    [1]: {
                        abc: {
                            blockNumber: 2,
                            data: '0x2',
                        },
                    },
                },
            });
        });
    });
    describe('fetchingMulticallResults', () => {
        it('updates state to fetching', () => {
            store.dispatch((0, actions_1.fetchingMulticallResults)({
                chainId: 1,
                fetchingBlockNumber: 2,
                calls: [{ address: DAI_ADDRESS, callData: '0x0' }],
            }));
            expect(store.getState()).toEqual({
                callResults: {
                    [1]: {
                        [`${DAI_ADDRESS}-0x0`]: { fetchingBlockNumber: 2 },
                    },
                },
            });
        });
        it('updates state to fetching even if already fetching older block', () => {
            store.dispatch((0, actions_1.fetchingMulticallResults)({
                chainId: 1,
                fetchingBlockNumber: 2,
                calls: [{ address: DAI_ADDRESS, callData: '0x0' }],
            }));
            store.dispatch((0, actions_1.fetchingMulticallResults)({
                chainId: 1,
                fetchingBlockNumber: 3,
                calls: [{ address: DAI_ADDRESS, callData: '0x0' }],
            }));
            expect(store.getState()).toEqual({
                callResults: {
                    [1]: {
                        [`${DAI_ADDRESS}-0x0`]: { fetchingBlockNumber: 3 },
                    },
                },
            });
        });
        it('does not do update if fetching newer block', () => {
            store.dispatch((0, actions_1.fetchingMulticallResults)({
                chainId: 1,
                fetchingBlockNumber: 2,
                calls: [{ address: DAI_ADDRESS, callData: '0x0' }],
            }));
            store.dispatch((0, actions_1.fetchingMulticallResults)({
                chainId: 1,
                fetchingBlockNumber: 1,
                calls: [{ address: DAI_ADDRESS, callData: '0x0' }],
            }));
            expect(store.getState()).toEqual({
                callResults: {
                    [1]: {
                        [`${DAI_ADDRESS}-0x0`]: { fetchingBlockNumber: 2 },
                    },
                },
            });
        });
    });
    describe('errorFetchingMulticallResults', () => {
        it('does nothing if not fetching', () => {
            store.dispatch((0, actions_1.errorFetchingMulticallResults)({
                chainId: 1,
                fetchingBlockNumber: 1,
                calls: [{ address: DAI_ADDRESS, callData: '0x0' }],
            }));
            expect(store.getState()).toEqual({
                callResults: {
                    [1]: {},
                },
            });
        });
        it('updates block number if we were fetching', () => {
            store.dispatch((0, actions_1.fetchingMulticallResults)({
                chainId: 1,
                fetchingBlockNumber: 2,
                calls: [{ address: DAI_ADDRESS, callData: '0x0' }],
            }));
            store.dispatch((0, actions_1.errorFetchingMulticallResults)({
                chainId: 1,
                fetchingBlockNumber: 2,
                calls: [{ address: DAI_ADDRESS, callData: '0x0' }],
            }));
            expect(store.getState()).toEqual({
                callResults: {
                    [1]: {
                        [`${DAI_ADDRESS}-0x0`]: {
                            blockNumber: 2,
                            // null data indicates error
                            data: null,
                        },
                    },
                },
            });
        });
        it('does nothing if not errored on latest block', () => {
            store.dispatch((0, actions_1.fetchingMulticallResults)({
                chainId: 1,
                fetchingBlockNumber: 3,
                calls: [{ address: DAI_ADDRESS, callData: '0x0' }],
            }));
            store.dispatch((0, actions_1.errorFetchingMulticallResults)({
                chainId: 1,
                fetchingBlockNumber: 2,
                calls: [{ address: DAI_ADDRESS, callData: '0x0' }],
            }));
            expect(store.getState()).toEqual({
                callResults: {
                    [1]: {
                        [`${DAI_ADDRESS}-0x0`]: { fetchingBlockNumber: 3 },
                    },
                },
            });
        });
    });
});
