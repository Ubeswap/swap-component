"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeInput = exports.Field = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
var Field;
(function (Field) {
    Field["LIQUIDITY_PERCENT"] = "LIQUIDITY_PERCENT";
    Field["LIQUIDITY"] = "LIQUIDITY";
    Field["CURRENCY_A"] = "CURRENCY_A";
    Field["CURRENCY_B"] = "CURRENCY_B";
})(Field = exports.Field || (exports.Field = {}));
exports.typeInput = (0, toolkit_1.createAction)('burn/typeInputBurn');
