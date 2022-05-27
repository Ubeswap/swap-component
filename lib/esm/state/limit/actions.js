import { createAction } from '@reduxjs/toolkit';
export var Field;
(function (Field) {
    Field["TOKEN"] = "TOKEN";
    Field["PRICE"] = "PRICE";
})(Field || (Field = {}));
export const selectCurrency = createAction('limit/selectCurrency');
export const switchCurrencies = createAction('limit/switchCurrencies');
export const typeInput = createAction('limit/typeInput');
export const setBuying = createAction('limit/setBuying');
export const replaceLimitState = createAction('limit/replaceLimitState');
export const setRecipient = createAction('limit/setRecipient');
