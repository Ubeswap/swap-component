"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const toolkit_1 = require("@reduxjs/toolkit");
const redux_localstorage_simple_1 = require("redux-localstorage-simple");
const reducer_1 = __importDefault(require("./application/reducer"));
const reducer_2 = __importDefault(require("./burn/reducer"));
const actions_1 = require("./global/actions");
const reducer_3 = __importDefault(require("./limit/reducer"));
const reducer_4 = __importDefault(require("./lists/reducer"));
const reducer_5 = __importDefault(require("./mint/reducer"));
const reducer_6 = __importDefault(require("./multicall/reducer"));
const reducer_7 = __importDefault(require("./swap/reducer"));
const reducer_8 = __importDefault(require("./transactions/reducer"));
const reducer_9 = __importDefault(require("./user/reducer"));
const PERSISTED_KEYS = ['user', 'transactions', 'lists'];
const store = (0, toolkit_1.configureStore)({
    reducer: {
        application: reducer_1.default,
        user: reducer_9.default,
        transactions: reducer_8.default,
        swap: reducer_7.default,
        limit: reducer_3.default,
        mint: reducer_5.default,
        burn: reducer_2.default,
        multicall: reducer_6.default,
        lists: reducer_4.default,
    },
    middleware: [...(0, toolkit_1.getDefaultMiddleware)({ thunk: false, serializableCheck: false }), (0, redux_localstorage_simple_1.save)({ states: PERSISTED_KEYS })],
    preloadedState: (0, redux_localstorage_simple_1.load)({ states: PERSISTED_KEYS }),
});
store.dispatch((0, actions_1.updateVersion)());
exports.default = store;
