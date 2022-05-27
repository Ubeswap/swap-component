export declare enum Field {
    TOKEN = "TOKEN",
    PRICE = "PRICE"
}
export declare const selectCurrency: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
    field: Field;
    currencyId: string;
}, string>;
export declare const switchCurrencies: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<string>;
export declare const typeInput: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
    field: Field;
    typedValue: string;
}, string>;
export declare const setBuying: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
    buying: boolean;
}, string>;
export declare const replaceLimitState: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
    field: Field;
    priceTypedValue: string;
    tokenTypedValue: string;
    priceCurrencyId?: string | undefined;
    tokenCurrencyId?: string | undefined;
    recipient: string | null;
    buying: boolean;
}, string>;
export declare const setRecipient: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
    recipient: string | null;
}, string>;
