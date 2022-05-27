"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setRecipient = exports.replaceLimitState = exports.setBuying = exports.typeInput = exports.switchCurrencies = exports.selectCurrency = exports.Field = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
var Field;
(function (Field) {
    Field["TOKEN"] = "TOKEN";
    Field["PRICE"] = "PRICE";
})(Field = exports.Field || (exports.Field = {}));
exports.selectCurrency = (0, toolkit_1.createAction)('limit/selectCurrency');
exports.switchCurrencies = (0, toolkit_1.createAction)('limit/switchCurrencies');
exports.typeInput = (0, toolkit_1.createAction)('limit/typeInput');
exports.setBuying = (0, toolkit_1.createAction)('limit/setBuying');
exports.replaceLimitState = (0, toolkit_1.createAction)('limit/replaceLimitState');
exports.setRecipient = (0, toolkit_1.createAction)('limit/setRecipient');
