"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
require("./i18n");
require("@celo-tools/use-contractkit/lib/styles.css");
const react_1 = __importDefault(require("react"));
const react_dom_1 = __importDefault(require("react-dom"));
const Swap_1 = __importDefault(require("./pages/Swap"));
react_dom_1.default.render((0, jsx_runtime_1.jsx)(react_1.default.StrictMode, { children: (0, jsx_runtime_1.jsx)(Swap_1.default, {}) }), document.getElementById('root'));
exports.default = Swap_1.default;
