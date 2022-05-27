import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { ApplicationModal, setOpenModal } from '../../state/application/actions';
// Redirects to swap but only replace the pathname
export function RedirectPathToSwapOnly({ location }) {
    return _jsx(Redirect, { to: Object.assign(Object.assign({}, location), { pathname: '/swap' }) }, void 0);
}
// Redirects from the /swap/:outputCurrency path to the /swap?outputCurrency=:outputCurrency format
export function RedirectToSwap(props) {
    const { location: { search }, match: { params: { outputCurrency }, }, } = props;
    return (_jsx(Redirect, { to: Object.assign(Object.assign({}, props.location), { pathname: '/swap', search: search && search.length > 1
                ? `${search}&outputCurrency=${outputCurrency}`
                : `?outputCurrency=${outputCurrency}` }) }, void 0));
}
export function OpenClaimAddressModalAndRedirectToSwap(props) {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setOpenModal(ApplicationModal.ADDRESS_CLAIM));
    }, [dispatch]);
    return _jsx(RedirectPathToSwapOnly, Object.assign({}, props), void 0);
}
