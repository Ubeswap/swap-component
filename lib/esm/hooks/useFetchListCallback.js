var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { nanoid } from '@reduxjs/toolkit';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { fetchTokenList } from '../state/lists/actions';
import getTokenList from '../utils/getTokenList';
export function useFetchListCallback() {
    const dispatch = useDispatch();
    // note: prevent dispatch if using for list search or unsupported list
    return useCallback((listUrl, sendDispatch = true) => __awaiter(this, void 0, void 0, function* () {
        const requestId = nanoid();
        sendDispatch && dispatch(fetchTokenList.pending({ requestId, url: listUrl }));
        return getTokenList(listUrl)
            .then((tokenList) => {
            sendDispatch && dispatch(fetchTokenList.fulfilled({ url: listUrl, tokenList, requestId }));
            return tokenList;
        })
            .catch((error) => {
            console.debug(`Failed to get list at url ${listUrl}`, error);
            sendDispatch && dispatch(fetchTokenList.rejected({ url: listUrl, requestId, errorMessage: error.message }));
            throw error;
        });
    }), [dispatch]);
}
