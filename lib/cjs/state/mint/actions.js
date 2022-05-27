"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetMintState = exports.typeInput = exports.Field = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
var Field;
(function (Field) {
    Field["CURRENCY_A"] = "CURRENCY_A";
    Field["CURRENCY_B"] = "CURRENCY_B";
})(Field = exports.Field || (exports.Field = {}));
exports.typeInput = (0, toolkit_1.createAction)('mint/typeInputMint');
exports.resetMintState = (0, toolkit_1.createAction)('mint/resetMintState');
