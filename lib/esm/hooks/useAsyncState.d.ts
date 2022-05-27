export declare function useAsyncState<T>(initialState: T, asyncGetter: () => Promise<T> | undefined): [T, () => void];
