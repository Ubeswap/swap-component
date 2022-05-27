import { createAction } from '@reduxjs/toolkit';
export var ApplicationModal;
(function (ApplicationModal) {
    ApplicationModal[ApplicationModal["WALLET"] = 0] = "WALLET";
    ApplicationModal[ApplicationModal["BRIDGE"] = 1] = "BRIDGE";
    ApplicationModal[ApplicationModal["SETTINGS"] = 2] = "SETTINGS";
    ApplicationModal[ApplicationModal["SELF_CLAIM"] = 3] = "SELF_CLAIM";
    ApplicationModal[ApplicationModal["ADDRESS_CLAIM"] = 4] = "ADDRESS_CLAIM";
    ApplicationModal[ApplicationModal["CLAIM_POPUP"] = 5] = "CLAIM_POPUP";
    ApplicationModal[ApplicationModal["MENU"] = 6] = "MENU";
    ApplicationModal[ApplicationModal["DELEGATE"] = 7] = "DELEGATE";
    ApplicationModal[ApplicationModal["VOTE"] = 8] = "VOTE";
    ApplicationModal[ApplicationModal["CHARTS"] = 9] = "CHARTS";
})(ApplicationModal || (ApplicationModal = {}));
export const updateBlockNumber = createAction('application/updateBlockNumber');
export const setOpenModal = createAction('application/setOpenModal');
export const addPopup = createAction('application/addPopup');
export const removePopup = createAction('application/removePopup');
