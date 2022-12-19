import { SwapTheme } from '../../pages/Swap';
export interface SerializedToken {
    chainId: number;
    address: string;
    decimals: number;
    symbol?: string;
    name?: string;
}
export interface SerializedPair {
    token0: SerializedToken;
    token1: SerializedToken;
}
export declare const updateMatchesDarkMode: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
    matchesDarkMode: boolean;
}, string>;
export declare const updateTheme: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
    theme: SwapTheme | undefined;
}, string>;
export declare const updateUserExpertMode: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
    userExpertMode: boolean;
}, string>;
export declare const updateUserSingleHopOnly: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
    userSingleHopOnly: boolean;
}, string>;
export declare const updateUserMinApprove: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
    userMinApprove: boolean;
}, string>;
export declare const updateUserAllowMoolaWithdrawal: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
    userAllowMoolaWithdrawal: boolean;
}, string>;
export declare const updateUserDisableSmartRouting: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
    userDisableSmartRouting: boolean;
}, string>;
export declare const updateUserSlippageTolerance: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
    userSlippageTolerance: number;
}, string>;
export declare const updateUserDeadline: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
    userDeadline: number;
}, string>;
export declare const addSerializedToken: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
    serializedToken: SerializedToken;
}, string>;
export declare const removeSerializedToken: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
    chainId: number;
    address: string;
}, string>;
export declare const addSerializedPair: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
    serializedPair: SerializedPair;
}, string>;
export declare const removeSerializedPair: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
    chainId: number;
    tokenAAddress: string;
    tokenBAddress: string;
}, string>;
export declare const toggleURLWarning: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<string>;
export declare const setValoraAccount: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
    address: string;
    phoneNumber: string;
}, string>;
export declare const clearValoraAccount: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<string>;
export declare const updateUserAprMode: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
    userAprMode: boolean;
}, string>;
