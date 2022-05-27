"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenClaimAddressModalAndRedirectToSwap = exports.RedirectToSwap = exports.RedirectPathToSwapOnly = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_redux_1 = require("react-redux");
const react_router_dom_1 = require("react-router-dom");
const actions_1 = require("../../state/application/actions");
// Redirects to swap but only replace the pathname
function RedirectPathToSwapOnly({ location }) {
    return (0, jsx_runtime_1.jsx)(react_router_dom_1.Redirect, { to: Object.assign(Object.assign({}, location), { pathname: '/swap' }) }, void 0);
}
exports.RedirectPathToSwapOnly = RedirectPathToSwapOnly;
// Redirects from the /swap/:outputCurrency path to the /swap?outputCurrency=:outputCurrency format
function RedirectToSwap(props) {
    const { location: { search }, match: { params: { outputCurrency }, }, } = props;
    return ((0, jsx_runtime_1.jsx)(react_router_dom_1.Redirect, { to: Object.assign(Object.assign({}, props.location), { pathname: '/swap', search: search && search.length > 1
                ? `${search}&outputCurrency=${outputCurrency}`
                : `?outputCurrency=${outputCurrency}` }) }, void 0));
}
exports.RedirectToSwap = RedirectToSwap;
function OpenClaimAddressModalAndRedirectToSwap(props) {
    const dispatch = (0, react_redux_1.useDispatch)();
    (0, react_1.useEffect)(() => {
        dispatch((0, actions_1.setOpenModal)(actions_1.ApplicationModal.ADDRESS_CLAIM));
    }, [dispatch]);
    return (0, jsx_runtime_1.jsx)(RedirectPathToSwapOnly, Object.assign({}, props), void 0);
}
exports.OpenClaimAddressModalAndRedirectToSwap = OpenClaimAddressModalAndRedirectToSwap;
