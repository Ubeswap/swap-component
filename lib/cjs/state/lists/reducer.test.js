"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const redux_1 = require("redux");
const lists_1 = require("../../constants/lists");
const actions_1 = require("../global/actions");
const lists_2 = require("./../../constants/lists");
const actions_2 = require("./actions");
const reducer_1 = __importDefault(require("./reducer"));
const STUB_TOKEN_LIST = {
    name: '',
    timestamp: '',
    version: { major: 1, minor: 1, patch: 1 },
    tokens: [],
};
const PATCHED_STUB_LIST = Object.assign(Object.assign({}, STUB_TOKEN_LIST), { version: Object.assign(Object.assign({}, STUB_TOKEN_LIST.version), { patch: STUB_TOKEN_LIST.version.patch + 1 }) });
const MINOR_UPDATED_STUB_LIST = Object.assign(Object.assign({}, STUB_TOKEN_LIST), { version: Object.assign(Object.assign({}, STUB_TOKEN_LIST.version), { minor: STUB_TOKEN_LIST.version.minor + 1 }) });
const MAJOR_UPDATED_STUB_LIST = Object.assign(Object.assign({}, STUB_TOKEN_LIST), { version: Object.assign(Object.assign({}, STUB_TOKEN_LIST.version), { major: STUB_TOKEN_LIST.version.major + 1 }) });
describe('list reducer', () => {
    let store;
    beforeEach(() => {
        store = (0, redux_1.createStore)(reducer_1.default, {
            byUrl: {},
            activeListUrls: undefined,
        });
    });
    describe('fetchTokenList', () => {
        describe('pending', () => {
            it('sets pending', () => {
                store.dispatch(actions_2.fetchTokenList.pending({ requestId: 'request-id', url: 'fake-url' }));
                expect(store.getState()).toEqual({
                    byUrl: {
                        'fake-url': {
                            error: null,
                            loadingRequestId: 'request-id',
                            current: null,
                            pendingUpdate: null,
                        },
                    },
                    selectedListUrl: undefined,
                });
            });
            it('does not clear current list', () => {
                store = (0, redux_1.createStore)(reducer_1.default, {
                    byUrl: {
                        'fake-url': {
                            error: null,
                            current: STUB_TOKEN_LIST,
                            pendingUpdate: null,
                            loadingRequestId: null,
                        },
                    },
                    activeListUrls: undefined,
                });
                store.dispatch(actions_2.fetchTokenList.pending({ requestId: 'request-id', url: 'fake-url' }));
                expect(store.getState()).toEqual({
                    byUrl: {
                        'fake-url': {
                            error: null,
                            current: STUB_TOKEN_LIST,
                            loadingRequestId: 'request-id',
                            pendingUpdate: null,
                        },
                    },
                    activeListUrls: undefined,
                });
            });
        });
        describe('fulfilled', () => {
            it('saves the list', () => {
                store.dispatch(actions_2.fetchTokenList.fulfilled({ tokenList: STUB_TOKEN_LIST, requestId: 'request-id', url: 'fake-url' }));
                expect(store.getState()).toEqual({
                    byUrl: {
                        'fake-url': {
                            error: null,
                            current: STUB_TOKEN_LIST,
                            loadingRequestId: null,
                            pendingUpdate: null,
                        },
                    },
                    activeListUrls: undefined,
                });
            });
            it('does not save the list in pending if current is same', () => {
                store.dispatch(actions_2.fetchTokenList.fulfilled({ tokenList: STUB_TOKEN_LIST, requestId: 'request-id', url: 'fake-url' }));
                store.dispatch(actions_2.fetchTokenList.fulfilled({ tokenList: STUB_TOKEN_LIST, requestId: 'request-id', url: 'fake-url' }));
                expect(store.getState()).toEqual({
                    byUrl: {
                        'fake-url': {
                            error: null,
                            current: STUB_TOKEN_LIST,
                            loadingRequestId: null,
                            pendingUpdate: null,
                        },
                    },
                    activeListUrls: undefined,
                });
            });
            it('does not save to current if list is newer patch version', () => {
                store.dispatch(actions_2.fetchTokenList.fulfilled({ tokenList: STUB_TOKEN_LIST, requestId: 'request-id', url: 'fake-url' }));
                store.dispatch(actions_2.fetchTokenList.fulfilled({ tokenList: PATCHED_STUB_LIST, requestId: 'request-id', url: 'fake-url' }));
                expect(store.getState()).toEqual({
                    byUrl: {
                        'fake-url': {
                            error: null,
                            current: STUB_TOKEN_LIST,
                            loadingRequestId: null,
                            pendingUpdate: PATCHED_STUB_LIST,
                        },
                    },
                    activeListUrls: undefined,
                });
            });
            it('does not save to current if list is newer minor version', () => {
                store.dispatch(actions_2.fetchTokenList.fulfilled({ tokenList: STUB_TOKEN_LIST, requestId: 'request-id', url: 'fake-url' }));
                store.dispatch(actions_2.fetchTokenList.fulfilled({ tokenList: MINOR_UPDATED_STUB_LIST, requestId: 'request-id', url: 'fake-url' }));
                expect(store.getState()).toEqual({
                    byUrl: {
                        'fake-url': {
                            error: null,
                            current: STUB_TOKEN_LIST,
                            loadingRequestId: null,
                            pendingUpdate: MINOR_UPDATED_STUB_LIST,
                        },
                    },
                    activeListUrls: undefined,
                });
            });
            it('does not save to pending if list is newer major version', () => {
                store.dispatch(actions_2.fetchTokenList.fulfilled({ tokenList: STUB_TOKEN_LIST, requestId: 'request-id', url: 'fake-url' }));
                store.dispatch(actions_2.fetchTokenList.fulfilled({ tokenList: MAJOR_UPDATED_STUB_LIST, requestId: 'request-id', url: 'fake-url' }));
                expect(store.getState()).toEqual({
                    byUrl: {
                        'fake-url': {
                            error: null,
                            current: STUB_TOKEN_LIST,
                            loadingRequestId: null,
                            pendingUpdate: MAJOR_UPDATED_STUB_LIST,
                        },
                    },
                    activeListUrls: undefined,
                });
            });
        });
        describe('rejected', () => {
            it('no-op if not loading', () => {
                store.dispatch(actions_2.fetchTokenList.rejected({ requestId: 'request-id', errorMessage: 'abcd', url: 'fake-url' }));
                expect(store.getState()).toEqual({
                    byUrl: {},
                    activeListUrls: undefined,
                });
            });
            it('sets the error if loading', () => {
                store = (0, redux_1.createStore)(reducer_1.default, {
                    byUrl: {
                        'fake-url': {
                            error: null,
                            current: null,
                            loadingRequestId: 'request-id',
                            pendingUpdate: null,
                        },
                    },
                    activeListUrls: undefined,
                });
                store.dispatch(actions_2.fetchTokenList.rejected({ requestId: 'request-id', errorMessage: 'abcd', url: 'fake-url' }));
                expect(store.getState()).toEqual({
                    byUrl: {
                        'fake-url': {
                            error: 'abcd',
                            current: null,
                            loadingRequestId: null,
                            pendingUpdate: null,
                        },
                    },
                    activeListUrls: undefined,
                });
            });
        });
    });
    describe('addList', () => {
        it('adds the list key to byUrl', () => {
            store.dispatch((0, actions_2.addList)('list-id'));
            expect(store.getState()).toEqual({
                byUrl: {
                    'list-id': {
                        error: null,
                        current: null,
                        loadingRequestId: null,
                        pendingUpdate: null,
                    },
                },
                activeListUrls: undefined,
            });
        });
        it('no op for existing list', () => {
            store = (0, redux_1.createStore)(reducer_1.default, {
                byUrl: {
                    'fake-url': {
                        error: null,
                        current: STUB_TOKEN_LIST,
                        loadingRequestId: null,
                        pendingUpdate: null,
                    },
                },
                activeListUrls: undefined,
            });
            store.dispatch((0, actions_2.addList)('fake-url'));
            expect(store.getState()).toEqual({
                byUrl: {
                    'fake-url': {
                        error: null,
                        current: STUB_TOKEN_LIST,
                        loadingRequestId: null,
                        pendingUpdate: null,
                    },
                },
                activeListUrls: undefined,
            });
        });
    });
    describe('acceptListUpdate', () => {
        it('swaps pending update into current', () => {
            store = (0, redux_1.createStore)(reducer_1.default, {
                byUrl: {
                    'fake-url': {
                        error: null,
                        current: STUB_TOKEN_LIST,
                        loadingRequestId: null,
                        pendingUpdate: PATCHED_STUB_LIST,
                    },
                },
                activeListUrls: undefined,
            });
            store.dispatch((0, actions_2.acceptListUpdate)('fake-url'));
            expect(store.getState()).toEqual({
                byUrl: {
                    'fake-url': {
                        error: null,
                        current: PATCHED_STUB_LIST,
                        loadingRequestId: null,
                        pendingUpdate: null,
                    },
                },
                activeListUrls: undefined,
            });
        });
    });
    describe('removeList', () => {
        it('deletes the list key', () => {
            store = (0, redux_1.createStore)(reducer_1.default, {
                byUrl: {
                    'fake-url': {
                        error: null,
                        current: STUB_TOKEN_LIST,
                        loadingRequestId: null,
                        pendingUpdate: PATCHED_STUB_LIST,
                    },
                },
                activeListUrls: undefined,
            });
            store.dispatch((0, actions_2.removeList)('fake-url'));
            expect(store.getState()).toEqual({
                byUrl: {},
                activeListUrls: undefined,
            });
        });
        it('Removes from active lists if active list is removed', () => {
            store = (0, redux_1.createStore)(reducer_1.default, {
                byUrl: {
                    'fake-url': {
                        error: null,
                        current: STUB_TOKEN_LIST,
                        loadingRequestId: null,
                        pendingUpdate: PATCHED_STUB_LIST,
                    },
                },
                activeListUrls: ['fake-url'],
            });
            store.dispatch((0, actions_2.removeList)('fake-url'));
            expect(store.getState()).toEqual({
                byUrl: {},
                activeListUrls: [],
            });
        });
    });
    describe('enableList', () => {
        it('enables a list url', () => {
            store = (0, redux_1.createStore)(reducer_1.default, {
                byUrl: {
                    'fake-url': {
                        error: null,
                        current: STUB_TOKEN_LIST,
                        loadingRequestId: null,
                        pendingUpdate: PATCHED_STUB_LIST,
                    },
                },
                activeListUrls: undefined,
            });
            store.dispatch((0, actions_2.enableList)('fake-url'));
            expect(store.getState()).toEqual({
                byUrl: {
                    'fake-url': {
                        error: null,
                        current: STUB_TOKEN_LIST,
                        loadingRequestId: null,
                        pendingUpdate: PATCHED_STUB_LIST,
                    },
                },
                activeListUrls: ['fake-url'],
            });
        });
        it('adds to url keys if not present already on enable', () => {
            store = (0, redux_1.createStore)(reducer_1.default, {
                byUrl: {
                    'fake-url': {
                        error: null,
                        current: STUB_TOKEN_LIST,
                        loadingRequestId: null,
                        pendingUpdate: PATCHED_STUB_LIST,
                    },
                },
                activeListUrls: undefined,
            });
            store.dispatch((0, actions_2.enableList)('fake-url-invalid'));
            expect(store.getState()).toEqual({
                byUrl: {
                    'fake-url': {
                        error: null,
                        current: STUB_TOKEN_LIST,
                        loadingRequestId: null,
                        pendingUpdate: PATCHED_STUB_LIST,
                    },
                    'fake-url-invalid': {
                        error: null,
                        current: null,
                        loadingRequestId: null,
                        pendingUpdate: null,
                    },
                },
                activeListUrls: ['fake-url-invalid'],
            });
        });
        it('enable works if list already added', () => {
            store = (0, redux_1.createStore)(reducer_1.default, {
                byUrl: {
                    'fake-url': {
                        error: null,
                        current: null,
                        loadingRequestId: null,
                        pendingUpdate: null,
                    },
                },
                activeListUrls: undefined,
            });
            store.dispatch((0, actions_2.enableList)('fake-url'));
            expect(store.getState()).toEqual({
                byUrl: {
                    'fake-url': {
                        error: null,
                        current: null,
                        loadingRequestId: null,
                        pendingUpdate: null,
                    },
                },
                activeListUrls: ['fake-url'],
            });
        });
    });
    describe('updateVersion', () => {
        describe('never initialized', () => {
            beforeEach(() => {
                store = (0, redux_1.createStore)(reducer_1.default, {
                    byUrl: {
                        'https://unpkg.com/@uniswap/default-token-list@latest/uniswap-default.tokenlist.json': {
                            error: null,
                            current: STUB_TOKEN_LIST,
                            loadingRequestId: null,
                            pendingUpdate: null,
                        },
                        'https://unpkg.com/@uniswap/default-token-list@latest': {
                            error: null,
                            current: STUB_TOKEN_LIST,
                            loadingRequestId: null,
                            pendingUpdate: null,
                        },
                    },
                    activeListUrls: undefined,
                });
                store.dispatch((0, actions_1.updateVersion)());
            });
            it('clears the current lists', () => {
                expect(store.getState().byUrl['https://unpkg.com/@uniswap/default-token-list@latest/uniswap-default.tokenlist.json']).toBeUndefined();
                expect(store.getState().byUrl['https://unpkg.com/@uniswap/default-token-list@latest']).toBeUndefined();
            });
            it('puts in all the new lists', () => {
                expect(Object.keys(store.getState().byUrl)).toEqual(lists_1.DEFAULT_LIST_OF_LISTS);
            });
            it('all lists are empty', () => {
                const s = store.getState();
                Object.keys(s.byUrl).forEach((url) => {
                    expect(s.byUrl[url]).toEqual({
                        error: null,
                        current: null,
                        loadingRequestId: null,
                        pendingUpdate: null,
                    });
                });
            });
            it('sets initialized lists', () => {
                expect(store.getState().lastInitializedDefaultListOfLists).toEqual(lists_1.DEFAULT_LIST_OF_LISTS);
            });
            it('sets selected list', () => {
                expect(store.getState().activeListUrls).toEqual(lists_2.DEFAULT_ACTIVE_LIST_URLS);
            });
        });
        describe('initialized with a different set of lists', () => {
            beforeEach(() => {
                store = (0, redux_1.createStore)(reducer_1.default, {
                    byUrl: {
                        'https://unpkg.com/@uniswap/default-token-list@latest/uniswap-default.tokenlist.json': {
                            error: null,
                            current: STUB_TOKEN_LIST,
                            loadingRequestId: null,
                            pendingUpdate: null,
                        },
                        'https://unpkg.com/@uniswap/default-token-list@latest': {
                            error: null,
                            current: STUB_TOKEN_LIST,
                            loadingRequestId: null,
                            pendingUpdate: null,
                        },
                    },
                    activeListUrls: undefined,
                    lastInitializedDefaultListOfLists: ['https://unpkg.com/@uniswap/default-token-list@latest'],
                });
                store.dispatch((0, actions_1.updateVersion)());
            });
            it('does not remove lists not in last initialized list of lists', () => {
                expect(store.getState().byUrl['https://unpkg.com/@uniswap/default-token-list@latest/uniswap-default.tokenlist.json']).toEqual({
                    error: null,
                    current: STUB_TOKEN_LIST,
                    loadingRequestId: null,
                    pendingUpdate: null,
                });
            });
            it('removes lists in the last initialized list of lists', () => {
                expect(store.getState().byUrl['https://unpkg.com/@uniswap/default-token-list@latest']).toBeUndefined();
            });
            it('each of those initialized lists is empty', () => {
                const byUrl = store.getState().byUrl;
                // note we don't expect the uniswap default list to be prepopulated
                // this is ok.
                Object.keys(byUrl).forEach((url) => {
                    if (url !== 'https://unpkg.com/@uniswap/default-token-list@latest/uniswap-default.tokenlist.json') {
                        expect(byUrl[url]).toEqual({
                            error: null,
                            current: null,
                            loadingRequestId: null,
                            pendingUpdate: null,
                        });
                    }
                });
            });
            it('sets initialized lists', () => {
                expect(store.getState().lastInitializedDefaultListOfLists).toEqual(lists_1.DEFAULT_LIST_OF_LISTS);
            });
            it('sets default list to selected list', () => {
                expect(store.getState().activeListUrls).toEqual(lists_2.DEFAULT_ACTIVE_LIST_URLS);
            });
        });
    });
});
