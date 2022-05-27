"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_i18next_1 = require("react-i18next");
const Modal_1 = __importDefault(require("../Modal"));
const ChangeNetworkModal = () => {
    const { t } = (0, react_i18next_1.useTranslation)();
    return ((0, jsx_runtime_1.jsx)(Modal_1.default, Object.assign({ isOpen: true, onDismiss: () => null, maxHeight: 24, minHeight: 24 }, { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ style: { width: '100%', margin: '16px' } }, { children: [(0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)("span", { children: t('unsupportedNetwork') }, void 0) }, void 0), (0, jsx_runtime_1.jsx)("hr", { style: { marginBottom: '28px' } }, void 0), (0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)("span", { children: t('unsupportedNetworkDesc') }, void 0) }, void 0)] }), void 0) }), void 0));
};
exports.default = ChangeNetworkModal;
