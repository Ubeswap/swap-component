"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setAccountInfo = exports.setRecipient = exports.replaceSwapState = exports.typeInput = exports.switchCurrencies = exports.selectCurrency = exports.Field = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
var Field;
(function (Field) {
    Field["INPUT"] = "INPUT";
    Field["OUTPUT"] = "OUTPUT";
})(Field = exports.Field || (exports.Field = {}));
exports.selectCurrency = (0, toolkit_1.createAction)('swap/selectCurrency');
exports.switchCurrencies = (0, toolkit_1.createAction)('swap/switchCurrencies');
exports.typeInput = (0, toolkit_1.createAction)('swap/typeInput');
exports.replaceSwapState = (0, toolkit_1.createAction)('swap/replaceSwapState');
exports.setRecipient = (0, toolkit_1.createAction)('swap/setRecipient');
exports.setAccountInfo = (0, toolkit_1.createAction)('swap/setAccountInfo');
