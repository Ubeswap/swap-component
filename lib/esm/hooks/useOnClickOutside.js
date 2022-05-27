import { useEffect, useRef } from 'react';
export function useOnClickOutside(node, handler) {
    const handlerRef = useRef(handler);
    useEffect(() => {
        handlerRef.current = handler;
    }, [handler]);
    useEffect(() => {
        const handleClickOutside = (e) => {
            var _a, _b;
            if ((_b = (_a = node.current) === null || _a === void 0 ? void 0 : _a.contains(e.target)) !== null && _b !== void 0 ? _b : false) {
                return;
            }
            if (handlerRef.current)
                handlerRef.current();
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [node]);
}
