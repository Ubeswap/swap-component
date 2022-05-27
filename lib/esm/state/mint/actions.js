import { createAction } from '@reduxjs/toolkit';
export var Field;
(function (Field) {
    Field["CURRENCY_A"] = "CURRENCY_A";
    Field["CURRENCY_B"] = "CURRENCY_B";
})(Field || (Field = {}));
export const typeInput = createAction('mint/typeInputMint');
export const resetMintState = createAction('mint/resetMintState');
