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
exports.BlueCard = exports.PinkCard = exports.YellowCard = exports.OutlineCard = exports.GreyCard = exports.LightCard = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const rebass_1 = require("rebass");
const styled_components_1 = require("rebass/styled-components");
const styled_components_2 = __importDefault(require("styled-components"));
const Card = (0, styled_components_2.default)(styled_components_1.Box) `
  width: ${({ width }) => width !== null && width !== void 0 ? width : '100%'};
  border-radius: 16px;
  padding: 1.25rem;
  padding: ${({ padding }) => padding};
  border: ${({ border }) => border};
  border-radius: ${({ borderRadius }) => borderRadius};
`;
exports.default = Card;
exports.LightCard = (0, styled_components_2.default)(Card) `
  border: 1px solid ${({ theme }) => theme.bg2};
  background-color: ${({ theme }) => theme.bg1};
`;
exports.GreyCard = (0, styled_components_2.default)(Card) `
  background-color: ${({ theme }) => theme.bg3};
`;
exports.OutlineCard = (0, styled_components_2.default)(Card) `
  border: 1px solid ${({ theme }) => theme.bg3};
`;
exports.YellowCard = (0, styled_components_2.default)(Card) `
  background-color: rgba(243, 132, 30, 0.05);
  color: ${({ theme }) => theme.yellow2};
  font-weight: 500;
`;
exports.PinkCard = (0, styled_components_2.default)(Card) `
  background-color: rgba(255, 0, 122, 0.03);
  color: ${({ theme }) => theme.primary1};
  font-weight: 500;
`;
const BlueCardStyled = (0, styled_components_2.default)(Card) `
  background-color: ${({ theme }) => theme.primary5};
  color: ${({ theme }) => theme.primary1};
  border-radius: 12px;
  width: fit-content;
`;
const BlueCard = (_a) => {
    var { children } = _a, rest = __rest(_a, ["children"]);
    return ((0, jsx_runtime_1.jsx)(BlueCardStyled, Object.assign({}, rest, { children: (0, jsx_runtime_1.jsx)(rebass_1.Text, Object.assign({ fontWeight: 500, color: "#2172E5" }, { children: children })) })));
};
exports.BlueCard = BlueCard;
