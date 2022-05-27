"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateVersion = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
// fired once when the app reloads but before the app renders
// allows any updates to be applied to store data loaded from localStorage
exports.updateVersion = (0, toolkit_1.createAction)('global/updateVersion');
