"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const qs_1 = require("qs");
const react_1 = require("react");
const react_redux_1 = require("react-redux");
const actions_1 = require("../state/user/actions");
function DarkModeQueryParamReader({ location: { search } }) {
    const dispatch = (0, react_redux_1.useDispatch)();
    (0, react_1.useEffect)(() => {
        if (!search)
            return;
        if (search.length < 2)
            return;
        const parsed = (0, qs_1.parse)(search, {
            parseArrays: false,
            ignoreQueryPrefix: true,
        });
        const theme = parsed.theme;
        if (typeof theme !== 'string')
            return;
        if (theme.toLowerCase() === 'light') {
            dispatch((0, actions_1.updateTheme)({ theme: { userDarkMode: false } }));
        }
        else if (theme.toLowerCase() === 'dark') {
            dispatch((0, actions_1.updateTheme)({ theme: { userDarkMode: true } }));
        }
    }, [dispatch, search]);
    return null;
}
exports.default = DarkModeQueryParamReader;
