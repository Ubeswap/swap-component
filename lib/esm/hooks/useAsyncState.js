import { useEffect, useState } from 'react';
export function useAsyncState(initialState, asyncGetter) {
    const [state, setState] = useState(initialState);
    const [dirty, setDirty] = useState(true);
    useEffect(() => {
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
