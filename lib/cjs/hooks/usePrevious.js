"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
// modified from https://usehooks.com/usePrevious/
function usePrevious(value) {
    // The ref object is a generic container whose current property is mutable ...
    // ... and can hold any value, similar to an instance property on a class
    const ref = (0, react_1.useRef)();
    // Store current value in ref
    (0, react_1.useEffect)(() => {
        ref.current = value;
    }, [value]); // Only re-run if value changes
    // Return previous value (happens before update in useEffect above)
    return ref.current;
}
exports.default = usePrevious;
