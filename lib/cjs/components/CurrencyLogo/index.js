"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const sdk_1 = require("@ubeswap/sdk");
const react_1 = require("react");
const styled_components_1 = __importDefault(require("styled-components"));
const useHttpLocations_1 = __importDefault(require("../../hooks/useHttpLocations"));
const hooks_1 = require("../../state/lists/hooks");
const Logo_1 = __importDefault(require("../Logo"));
const StyledLogo = (0, styled_components_1.default)(Logo_1.default) `
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  border-radius: ${({ size }) => size};
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.075);
  background-color: ${({ theme }) => theme.white};
`;
function CurrencyLogo({ currency, size = '24px', style, defaultTokenLogoURI, }) {
    var _a;
    const uriLocations = (0, useHttpLocations_1.default)(currency instanceof hooks_1.WrappedTokenInfo ? currency.logoURI : undefined);
    const srcs = (0, react_1.useMemo)(() => {
        var _a;
        if (defaultTokenLogoURI)
            return [defaultTokenLogoURI];
        if (currency instanceof sdk_1.Token) {
            if (currency instanceof hooks_1.WrappedTokenInfo) {
                return [...uriLocations, (_a = currency.logoURI) !== null && _a !== void 0 ? _a : currency.address];
            }
            return [];
        }
        return [];
    }, [currency, uriLocations, defaultTokenLogoURI]);
    return (0, jsx_runtime_1.jsx)(StyledLogo, { size: size, srcs: srcs, alt: `${(_a = currency === null || currency === void 0 ? void 0 : currency.symbol) !== null && _a !== void 0 ? _a : 'token'} logo`, style: style });
}
exports.default = CurrencyLogo;
