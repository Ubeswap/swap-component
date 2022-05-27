"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useWindowSize = void 0;
const react_1 = require("react");
const isClient = typeof window === 'object';
function getSize() {
    return {
        width: isClient ? window.innerWidth : undefined,
        height: isClient ? window.innerHeight : undefined,
    };
}
// https://usehooks.com/useWindowSize/
function useWindowSize() {
    const [windowSize, setWindowSize] = (0, react_1.useState)(getSize);
    (0, react_1.useEffect)(() => {
        function handleResize() {
            setWindowSize(getSize());
        }
        if (isClient) {
            window.addEventListener('resize', handleResize);
            return () => {
                window.removeEventListener('resize', handleResize);
            };
        }
        return undefined;
    }, []);
    return windowSize;
}
exports.useWindowSize = useWindowSize;
