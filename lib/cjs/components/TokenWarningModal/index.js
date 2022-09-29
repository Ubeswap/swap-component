"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const Modal_1 = __importDefault(require("../Modal"));
const ImportToken_1 = require("../SearchModal/ImportToken");
function TokenWarningModal({ isOpen, tokens, onConfirm, }) {
    const handleDismiss = (0, react_1.useCallback)(() => null, []);
    return ((0, jsx_runtime_1.jsx)(Modal_1.default, Object.assign({ isOpen: isOpen, onDismiss: handleDismiss, maxHeight: 90 }, { children: (0, jsx_runtime_1.jsx)(ImportToken_1.ImportToken, { tokens: tokens, handleCurrencySelect: onConfirm }) })));
}
exports.default = TokenWarningModal;
