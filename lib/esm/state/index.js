import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { load, save } from 'redux-localstorage-simple';
import application from './application/reducer';
import burn from './burn/reducer';
import { updateVersion } from './global/actions';
import limit from './limit/reducer';
import lists from './lists/reducer';
import mint from './mint/reducer';
import multicall from './multicall/reducer';
import swap from './swap/reducer';
import transactions from './transactions/reducer';
import user from './user/reducer';
const PERSISTED_KEYS = ['user', 'transactions', 'lists'];
const store = configureStore({
    reducer: {
        application,
        user,
        transactions,
        swap,
        limit,
        mint,
        burn,
        multicall,
        lists,
    },
    middleware: [...getDefaultMiddleware({ thunk: false, serializableCheck: false }), save({ states: PERSISTED_KEYS })],
    preloadedState: load({ states: PERSISTED_KEYS }),
});
store.dispatch(updateVersion());
export default store;
