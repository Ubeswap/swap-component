declare const store: import("@reduxjs/toolkit").EnhancedStore<{
    application: import("./application/reducer").ApplicationState;
    user: import("./user/reducer").UserState;
    transactions: import("./transactions/reducer").TransactionState;
    swap: import("./swap/reducer").SwapState;
    limit: import("./limit/reducer").LimitState;
    mint: import("./mint/reducer").MintState;
    burn: import("./burn/reducer").BurnState;
    multicall: import("./multicall/reducer").MulticallState;
    lists: import("./lists/reducer").ListsState;
}, import("redux").AnyAction, import("redux").Middleware<{}, any, import("redux").Dispatch<import("redux").AnyAction>>[]>;
export default store;
export declare type AppState = ReturnType<typeof store.getState>;
export declare type AppDispatch = typeof store.dispatch;
