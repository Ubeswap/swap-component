"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const VISIBILITY_STATE_SUPPORTED = 'visibilityState' in document;
function isWindowVisible() {
    return !VISIBILITY_STATE_SUPPORTED || document.visibilityState !== 'hidden';
}
/**
 * Returns whether the window is currently visible to the user.
 */
function useIsWindowVisible() {
    const [focused, setFocused] = (0, react_1.useState)(isWindowVisible());
    const listener = (0, react_1.useCallback)(() => {
        setFocused(isWindowVisible());
    }, [setFocused]);
    (0, react_1.useEffect)(() => {
        if (!VISIBILITY_STATE_SUPPORTED)
            return undefined;
        document.addEventListener('visibilitychange', listener);
        return () => {
            document.removeEventListener('visibilitychange', listener);
        };
    }, [listener]);
    return focused;
}
exports.default = useIsWindowVisible;
