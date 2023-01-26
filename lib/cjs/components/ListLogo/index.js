"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const styled_components_1 = __importDefault(require("styled-components"));
const useHttpLocations_1 = __importDefault(require("../../hooks/useHttpLocations"));
const Logo_1 = __importDefault(require("../Logo"));
const StyledListLogo = (0, styled_components_1.default)(Logo_1.default) `
  width: ${({ size }) => size};
  height: ${({ size }) => size};
`;
function ListLogo({ logoURI, style, size = '24px', alt, }) {
    const srcs = (0, useHttpLocations_1.default)(logoURI);
    return (0, jsx_runtime_1.jsx)(StyledListLogo, { alt: alt, size: size, srcs: srcs, style: style });
}
exports.default = ListLogo;
