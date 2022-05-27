"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const toolkit_1 = require("@reduxjs/toolkit");
const actions_1 = require("./actions");
const initialState = {
    blockNumber: {},
    popupList: [],
    openModal: null,
};
exports.default = (0, toolkit_1.createReducer)(initialState, (builder) => builder
    .addCase(actions_1.updateBlockNumber, (state, action) => {
    const { chainId, blockNumber } = action.payload;
    if (typeof state.blockNumber[chainId] !== 'number') {
        state.blockNumber[chainId] = blockNumber;
    }
    else {
        state.blockNumber[chainId] = Math.max(blockNumber, state.blockNumber[chainId]);
    }
})
    .addCase(actions_1.setOpenModal, (state, action) => {
    state.openModal = action.payload;
})
    .addCase(actions_1.addPopup, (state, { payload: { content, key, removeAfterMs = 15000 } }) => {
    state.popupList = (key ? state.popupList.filter((popup) => popup.key !== key) : state.popupList).concat([
        {
            key: key || (0, toolkit_1.nanoid)(),
            show: true,
            content,
            removeAfterMs,
        },
    ]);
})
    .addCase(actions_1.removePopup, (state, { payload: { key } }) => {
    state.popupList.forEach((p) => {
        if (p.key === key) {
            p.show = false;
        }
    });
}));
