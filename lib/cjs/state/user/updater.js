"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_redux_1 = require("react-redux");
const actions_1 = require("./actions");
function Updater() {
    const dispatch = (0, react_redux_1.useDispatch)();
    // keep dark mode in sync with the system
    (0, react_1.useEffect)(() => {
        const darkHandler = (match) => {
            dispatch((0, actions_1.updateMatchesDarkMode)({ matchesDarkMode: match.matches }));
        };
        const match = window === null || window === void 0 ? void 0 : window.matchMedia('(prefers-color-scheme: dark)');
        dispatch((0, actions_1.updateMatchesDarkMode)({ matchesDarkMode: match.matches }));
        if (match === null || match === void 0 ? void 0 : match.addListener) {
            match === null || match === void 0 ? void 0 : match.addListener(darkHandler);
        }
        else if (match === null || match === void 0 ? void 0 : match.addEventListener) {
            match === null || match === void 0 ? void 0 : match.addEventListener('change', darkHandler);
        }
        return () => {
            if (match === null || match === void 0 ? void 0 : match.removeListener) {
                match === null || match === void 0 ? void 0 : match.removeListener(darkHandler);
            }
            else if (match === null || match === void 0 ? void 0 : match.removeEventListener) {
                match === null || match === void 0 ? void 0 : match.removeEventListener('change', darkHandler);
            }
        };
    }, [dispatch]);
    return null;
}
exports.default = Updater;
