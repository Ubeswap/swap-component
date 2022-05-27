"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
/**
 * Easy way to debounce the handling of a rapidly changing value, e.g. a changing slider input
 * @param value value that is rapidly changing
 * @param onChange change handler that should receive the debounced updates to the value
 * @param debouncedMs how long we should wait for changes to be applied
 */
function useDebouncedChangeHandler(value, onChange, debouncedMs = 100) {
    const [inner, setInner] = (0, react_1.useState)(() => value);
    const timer = (0, react_1.useRef)();
    const onChangeInner = (0, react_1.useCallback)((newValue) => {
        setInner(newValue);
        if (timer.current) {
            clearTimeout(timer.current);
        }
        timer.current = setTimeout(() => {
            onChange(newValue);
            timer.current = undefined;
        }, debouncedMs);
    }, [debouncedMs, onChange]);
    (0, react_1.useEffect)(() => {
        if (timer.current) {
            clearTimeout(timer.current);
            timer.current = undefined;
        }
        setInner(value);
    }, [value]);
    return [inner, onChangeInner];
}
exports.default = useDebouncedChangeHandler;
