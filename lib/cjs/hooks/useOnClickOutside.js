"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useOnClickOutside = void 0;
const react_1 = require("react");
function useOnClickOutside(node, handler) {
    const handlerRef = (0, react_1.useRef)(handler);
    (0, react_1.useEffect)(() => {
        handlerRef.current = handler;
    }, [handler]);
    (0, react_1.useEffect)(() => {
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
exports.useOnClickOutside = useOnClickOutside;
