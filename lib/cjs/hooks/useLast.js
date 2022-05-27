"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useLastTruthy = void 0;
const react_1 = require("react");
/**
 * Returns the last value of type T that passes a filter function
 * @param value changing value
 * @param filterFn function that determines whether a given value should be considered for the last value
 */
function useLast(value, filterFn) {
    const [last, setLast] = (0, react_1.useState)(filterFn && filterFn(value) ? value : undefined);
    (0, react_1.useEffect)(() => {
        setLast((last) => {
            const shouldUse = filterFn ? filterFn(value) : true;
            if (shouldUse)
                return value;
            return last;
        });
    }, [filterFn, value]);
    return last;
}
exports.default = useLast;
function isDefined(x) {
    return x !== null && x !== undefined;
}
/**
 * Returns the last truthy value of type T
 * @param value changing value
 */
function useLastTruthy(value) {
    return useLast(value, isDefined);
}
exports.useLastTruthy = useLastTruthy;
