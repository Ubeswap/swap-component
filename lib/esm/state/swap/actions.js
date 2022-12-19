import { createAction } from '@reduxjs/toolkit';
export var Field;
(function (Field) {
    Field["INPUT"] = "INPUT";
    Field["OUTPUT"] = "OUTPUT";
})(Field || (Field = {}));
export const selectCurrency = createAction('swap/selectCurrency');
export const switchCurrencies = createAction('swap/switchCurrencies');
export const typeInput = createAction('swap/typeInput');
export const replaceSwapState = createAction('swap/replaceSwapState');
export const setRecipient = createAction('swap/setRecipient');
export const setAccountInfo = createAction('swap/setAccountInfo');
