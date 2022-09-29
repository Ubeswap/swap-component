"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const styled_components_1 = __importDefault(require("styled-components"));
const useLast_1 = require("../../hooks/useLast");
const AdvancedSwapDetails_1 = require("./AdvancedSwapDetails");
const AdvancedDetailsFooter = styled_components_1.default.div `
  padding-top: calc(16px + 2rem);
  padding-bottom: 16px;
  margin-top: -2rem;
  width: 100%;
  max-width: 400px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  color: ${({ theme }) => theme.text2};
  background-color: ${({ theme }) => theme.advancedBG};
  z-index: -1;

  transform: ${({ show }) => (show ? 'translateY(0%)' : 'translateY(-100%)')};
  transition: transform 300ms ease-in-out;
`;
function AdvancedSwapDetailsDropdown(_a) {
    var _b;
    var { trade } = _a, rest = __rest(_a, ["trade"]);
    const lastTrade = (0, useLast_1.useLastTruthy)(trade);
    return ((0, jsx_runtime_1.jsx)(AdvancedDetailsFooter, Object.assign({ show: Boolean(trade) }, { children: (0, jsx_runtime_1.jsx)(AdvancedSwapDetails_1.AdvancedSwapDetails, Object.assign({}, rest, { trade: (_b = trade !== null && trade !== void 0 ? trade : lastTrade) !== null && _b !== void 0 ? _b : undefined })) })));
}
exports.default = AdvancedSwapDetailsDropdown;
