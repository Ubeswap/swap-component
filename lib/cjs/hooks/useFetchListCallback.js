"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useFetchListCallback = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const react_1 = require("react");
const react_redux_1 = require("react-redux");
const actions_1 = require("../state/lists/actions");
const getTokenList_1 = __importDefault(require("../utils/getTokenList"));
function useFetchListCallback() {
    const dispatch = (0, react_redux_1.useDispatch)();
    // note: prevent dispatch if using for list search or unsupported list
    return (0, react_1.useCallback)((listUrl, sendDispatch = true) => __awaiter(this, void 0, void 0, function* () {
        const requestId = (0, toolkit_1.nanoid)();
        sendDispatch && dispatch(actions_1.fetchTokenList.pending({ requestId, url: listUrl }));
        return (0, getTokenList_1.default)(listUrl)
            .then((tokenList) => {
            sendDispatch && dispatch(actions_1.fetchTokenList.fulfilled({ url: listUrl, tokenList, requestId }));
            return tokenList;
        })
            .catch((error) => {
            console.debug(`Failed to get list at url ${listUrl}`, error);
            sendDispatch && dispatch(actions_1.fetchTokenList.rejected({ url: listUrl, requestId, errorMessage: error.message }));
            throw error;
        });
    }), [dispatch]);
}
exports.useFetchListCallback = useFetchListCallback;
