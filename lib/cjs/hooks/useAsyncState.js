"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAsyncState = void 0;
const react_1 = require("react");
function useAsyncState(initialState, asyncGetter) {
    const [state, setState] = (0, react_1.useState)(initialState);
    const [dirty, setDirty] = (0, react_1.useState)(true);
    (0, react_1.useEffect)(() => {
        var _a;
        (_a = asyncGetter()) === null || _a === void 0 ? void 0 : _a.then((v) => {
            setState(v);
            setDirty(false);
        }).catch(console.warn);
    }, [asyncGetter, dirty]);
    const refetch = () => {
        setDirty(true);
    };
    return [state, refetch];
}
exports.useAsyncState = useAsyncState;
