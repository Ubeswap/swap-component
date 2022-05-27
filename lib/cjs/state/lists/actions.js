"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rejectVersionUpdate = exports.acceptListUpdate = exports.disableList = exports.enableList = exports.removeList = exports.addList = exports.fetchTokenList = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
exports.fetchTokenList = {
    pending: (0, toolkit_1.createAction)('lists/fetchTokenList/pending'),
    fulfilled: (0, toolkit_1.createAction)('lists/fetchTokenList/fulfilled'),
    rejected: (0, toolkit_1.createAction)('lists/fetchTokenList/rejected'),
};
// add and remove from list options
exports.addList = (0, toolkit_1.createAction)('lists/addList');
exports.removeList = (0, toolkit_1.createAction)('lists/removeList');
// select which lists to search across from loaded lists
exports.enableList = (0, toolkit_1.createAction)('lists/enableList');
exports.disableList = (0, toolkit_1.createAction)('lists/disableList');
// versioning
exports.acceptListUpdate = (0, toolkit_1.createAction)('lists/acceptListUpdate');
exports.rejectVersionUpdate = (0, toolkit_1.createAction)('lists/rejectVersionUpdate');
