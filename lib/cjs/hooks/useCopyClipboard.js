"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const copy_to_clipboard_1 = __importDefault(require("copy-to-clipboard"));
const react_1 = require("react");
function useCopyClipboard(timeout = 500) {
    const [isCopied, setIsCopied] = (0, react_1.useState)(false);
    const staticCopy = (0, react_1.useCallback)((text) => {
        const didCopy = (0, copy_to_clipboard_1.default)(text);
        setIsCopied(didCopy);
    }, []);
    (0, react_1.useEffect)(() => {
        if (isCopied) {
            const hide = setTimeout(() => {
                setIsCopied(false);
            }, timeout);
            return () => {
                clearTimeout(hide);
            };
        }
        return undefined;
    }, [isCopied, setIsCopied, timeout]);
    return [isCopied, staticCopy];
}
exports.default = useCopyClipboard;
