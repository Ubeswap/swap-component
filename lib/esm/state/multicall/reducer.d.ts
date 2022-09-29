export interface MulticallState {
    callListeners?: {
        [chainId: number]: {
            [callKey: string]: {
                [blocksPerFetch: number]: number;
            };
        };
    };
    callResults: {
        [chainId: number]: {
            [callKey: string]: {
                data?: string | null;
                blockNumber?: number;
                fetchingBlockNumber?: number;
            };
        };
    };
}
declare const _default: import("@reduxjs/toolkit/dist/createReducer").ReducerWithInitialState<MulticallState>;
export default _default;
