import { TokenList } from '@uniswap/token-lists';
export declare type PopupContent = {
    txn: {
        hash: string;
        success: boolean;
        summary?: string;
    };
} | {
    listUpdate: {
        listUrl: string;
        oldList: TokenList;
        newList: TokenList;
        auto: boolean;
    };
};
export declare enum ApplicationModal {
    WALLET = 0,
    BRIDGE = 1,
    SETTINGS = 2,
    SELF_CLAIM = 3,
    ADDRESS_CLAIM = 4,
    CLAIM_POPUP = 5,
    MENU = 6,
    DELEGATE = 7,
    VOTE = 8,
    CHARTS = 9
}
export declare const updateBlockNumber: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
    chainId: number;
    blockNumber: number;
}, string>;
export declare const setOpenModal: import("@reduxjs/toolkit").ActionCreatorWithPayload<ApplicationModal | null, string>;
export declare const addPopup: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
    key?: string | undefined;
    removeAfterMs?: number | null | undefined;
    content: PopupContent;
}, string>;
export declare const removePopup: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
    key: string;
}, string>;
