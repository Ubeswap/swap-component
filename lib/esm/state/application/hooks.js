import { useContractKit } from '@celo-tools/use-contractkit';
import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPopup, ApplicationModal, removePopup, setOpenModal } from './actions';
export function useBlockNumber() {
    const { network } = useContractKit();
    const chainId = network.chainId;
    return useSelector((state) => state.application.blockNumber[chainId !== null && chainId !== void 0 ? chainId : -1]);
}
export function useModalOpen(modal) {
    const openModal = useSelector((state) => state.application.openModal);
    return openModal === modal;
}
export function useToggleModal(modal) {
    const open = useModalOpen(modal);
    const dispatch = useDispatch();
    return useCallback(() => dispatch(setOpenModal(open ? null : modal)), [dispatch, modal, open]);
}
export function useOpenModal(modal) {
    const dispatch = useDispatch();
    return useCallback(() => dispatch(setOpenModal(modal)), [dispatch, modal]);
}
export function useCloseModals() {
    const dispatch = useDispatch();
    return useCallback(() => dispatch(setOpenModal(null)), [dispatch]);
}
export function useWalletModalToggle() {
    const { connect, address } = useContractKit();
    const toggle = useToggleModal(ApplicationModal.WALLET);
    return address === null ? connect : toggle;
}
export function useToggleSettingsMenu() {
    return useToggleModal(ApplicationModal.SETTINGS);
}
export function useShowClaimPopup() {
    return useModalOpen(ApplicationModal.CLAIM_POPUP);
}
export function useToggleShowClaimPopup() {
    return useToggleModal(ApplicationModal.CLAIM_POPUP);
}
export function useToggleSelfClaimModal() {
    return useToggleModal(ApplicationModal.SELF_CLAIM);
}
export function useToggleDelegateModal() {
    return useToggleModal(ApplicationModal.DELEGATE);
}
export function useToggleVoteModal() {
    return useToggleModal(ApplicationModal.VOTE);
}
// returns a function that allows adding a popup
export function useAddPopup() {
    const dispatch = useDispatch();
    return useCallback((content, key) => {
        dispatch(addPopup({ content, key }));
    }, [dispatch]);
}
// returns a function that allows removing a popup via its key
export function useRemovePopup() {
    const dispatch = useDispatch();
    return useCallback((key) => {
        dispatch(removePopup({ key }));
    }, [dispatch]);
}
// get the list of active popups
export function useActivePopups() {
    const list = useSelector((state) => state.application.popupList);
    return useMemo(() => list.filter((item) => item.show), [list]);
}
