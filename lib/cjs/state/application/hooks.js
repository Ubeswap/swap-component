"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useActivePopups = exports.useRemovePopup = exports.useAddPopup = exports.useToggleVoteModal = exports.useToggleDelegateModal = exports.useToggleSelfClaimModal = exports.useToggleShowClaimPopup = exports.useShowClaimPopup = exports.useToggleSettingsMenu = exports.useWalletModalToggle = exports.useCloseModals = exports.useOpenModal = exports.useToggleModal = exports.useModalOpen = exports.useBlockNumber = void 0;
const use_contractkit_1 = require("@celo-tools/use-contractkit");
const react_1 = require("react");
const react_redux_1 = require("react-redux");
const actions_1 = require("./actions");
function useBlockNumber() {
    const { network } = (0, use_contractkit_1.useContractKit)();
    const accountInfo = (0, react_redux_1.useSelector)((state) => state.swap.accountInfo);
    const chainId = accountInfo ? accountInfo.chainId : network.chainId;
    return (0, react_redux_1.useSelector)((state) => state.application.blockNumber[chainId !== null && chainId !== void 0 ? chainId : -1]);
}
exports.useBlockNumber = useBlockNumber;
function useModalOpen(modal) {
    const openModal = (0, react_redux_1.useSelector)((state) => state.application.openModal);
    return openModal === modal;
}
exports.useModalOpen = useModalOpen;
function useToggleModal(modal) {
    const open = useModalOpen(modal);
    const dispatch = (0, react_redux_1.useDispatch)();
    return (0, react_1.useCallback)(() => dispatch((0, actions_1.setOpenModal)(open ? null : modal)), [dispatch, modal, open]);
}
exports.useToggleModal = useToggleModal;
function useOpenModal(modal) {
    const dispatch = (0, react_redux_1.useDispatch)();
    return (0, react_1.useCallback)(() => dispatch((0, actions_1.setOpenModal)(modal)), [dispatch, modal]);
}
exports.useOpenModal = useOpenModal;
function useCloseModals() {
    const dispatch = (0, react_redux_1.useDispatch)();
    return (0, react_1.useCallback)(() => dispatch((0, actions_1.setOpenModal)(null)), [dispatch]);
}
exports.useCloseModals = useCloseModals;
function useWalletModalToggle() {
    const { connect, address } = (0, use_contractkit_1.useContractKit)();
    const toggle = useToggleModal(actions_1.ApplicationModal.WALLET);
    return address === null ? connect : toggle;
}
exports.useWalletModalToggle = useWalletModalToggle;
function useToggleSettingsMenu() {
    return useToggleModal(actions_1.ApplicationModal.SETTINGS);
}
exports.useToggleSettingsMenu = useToggleSettingsMenu;
function useShowClaimPopup() {
    return useModalOpen(actions_1.ApplicationModal.CLAIM_POPUP);
}
exports.useShowClaimPopup = useShowClaimPopup;
function useToggleShowClaimPopup() {
    return useToggleModal(actions_1.ApplicationModal.CLAIM_POPUP);
}
exports.useToggleShowClaimPopup = useToggleShowClaimPopup;
function useToggleSelfClaimModal() {
    return useToggleModal(actions_1.ApplicationModal.SELF_CLAIM);
}
exports.useToggleSelfClaimModal = useToggleSelfClaimModal;
function useToggleDelegateModal() {
    return useToggleModal(actions_1.ApplicationModal.DELEGATE);
}
exports.useToggleDelegateModal = useToggleDelegateModal;
function useToggleVoteModal() {
    return useToggleModal(actions_1.ApplicationModal.VOTE);
}
exports.useToggleVoteModal = useToggleVoteModal;
// returns a function that allows adding a popup
function useAddPopup() {
    const dispatch = (0, react_redux_1.useDispatch)();
    return (0, react_1.useCallback)((content, key) => {
        dispatch((0, actions_1.addPopup)({ content, key }));
    }, [dispatch]);
}
exports.useAddPopup = useAddPopup;
// returns a function that allows removing a popup via its key
function useRemovePopup() {
    const dispatch = (0, react_redux_1.useDispatch)();
    return (0, react_1.useCallback)((key) => {
        dispatch((0, actions_1.removePopup)({ key }));
    }, [dispatch]);
}
exports.useRemovePopup = useRemovePopup;
// get the list of active popups
function useActivePopups() {
    const list = (0, react_redux_1.useSelector)((state) => state.application.popupList);
    return (0, react_1.useMemo)(() => list.filter((item) => item.show), [list]);
}
exports.useActivePopups = useActivePopups;
