import { createAction } from '@reduxjs/toolkit';
export var Field;
(function (Field) {
    Field["LIQUIDITY_PERCENT"] = "LIQUIDITY_PERCENT";
    Field["LIQUIDITY"] = "LIQUIDITY";
    Field["CURRENCY_A"] = "CURRENCY_A";
    Field["CURRENCY_B"] = "CURRENCY_B";
})(Field || (Field = {}));
export const typeInput = createAction('burn/typeInputBurn');
