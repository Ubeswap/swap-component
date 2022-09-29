import { SerializedPair, SerializedToken } from './actions';
export interface UserState {
    lastUpdateVersionTimestamp?: number;
    userDarkMode: boolean | null;
    matchesDarkMode: boolean;
    userExpertMode: boolean;
    userSingleHopOnly: boolean;
    userMinApprove: boolean;
    userAllowMoolaWithdrawal: boolean;
    userDisableSmartRouting: boolean;
    userSlippageTolerance: number;
    userDeadline: number;
    tokens: {
        [chainId: number]: {
            [address: string]: SerializedToken;
        };
    };
    pairs: {
        [chainId: number]: {
            [key: string]: SerializedPair;
        };
    };
    timestamp: number;
    URLWarningVisible: boolean;
    valoraAccount: {
        address: string;
        phoneNumber: string;
    } | null;
    userAprMode: boolean;
}
export declare const initialState: UserState;
declare const _default: import("@reduxjs/toolkit/dist/createReducer").ReducerWithInitialState<UserState>;
export default _default;
