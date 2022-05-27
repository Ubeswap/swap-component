"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const styled_components_1 = __importDefault(require("styled-components"));
const CurrencyLogo_1 = __importDefault(require("../CurrencyLogo"));
const Wrapper = styled_components_1.default.div `
  position: relative;
  display: flex;
  flex-direction: row;
  margin-right: ${({ sizeraw, margin }) => margin && (sizeraw / 3 + 8).toString() + 'px'};
`;
const HigherLogo = (0, styled_components_1.default)(CurrencyLogo_1.default) `
  z-index: 2;
`;
const CoveredLogo = (0, styled_components_1.default)(CurrencyLogo_1.default) `
  position: absolute;
  left: ${({ sizeraw }) => '-' + (sizeraw / 2).toString() + 'px'} !important;
`;
function DoubleCurrencyLogo({ currency0, currency1, size = 16, margin = false, }) {
    return ((0, jsx_runtime_1.jsxs)(Wrapper, Object.assign({ sizeraw: size, margin: margin }, { children: [currency0 && (0, jsx_runtime_1.jsx)(HigherLogo, { currency: currency0, size: size.toString() + 'px' }, void 0), currency1 && (0, jsx_runtime_1.jsx)(CoveredLogo, { currency: currency1, size: size.toString() + 'px', sizeraw: size }, void 0)] }), void 0));
}
exports.default = DoubleCurrencyLogo;
