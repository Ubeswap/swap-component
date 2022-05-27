"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RowCenter = exports.RowStart = exports.RowFixed = exports.AutoRow = exports.RowFlat = exports.RowBetween = void 0;
const styled_components_1 = require("rebass/styled-components");
const styled_components_2 = __importDefault(require("styled-components"));
const Row = (0, styled_components_2.default)(styled_components_1.Box) `
  width: ${({ width }) => width !== null && width !== void 0 ? width : '100%'};
  display: flex;
  padding: 0;
  align-items: ${({ align }) => align !== null && align !== void 0 ? align : 'center'};
  justify-content: ${({ justify }) => justify !== null && justify !== void 0 ? justify : 'flex-start'};
  padding: ${({ padding }) => padding};
  border: ${({ border }) => border};
  border-radius: ${({ borderRadius }) => borderRadius};
`;
exports.RowBetween = (0, styled_components_2.default)(Row) `
  justify-content: space-between;
`;
exports.RowFlat = styled_components_2.default.div `
  display: flex;
  align-items: flex-end;
`;
exports.AutoRow = (0, styled_components_2.default)(Row) `
  flex-wrap: wrap;
  margin: ${({ gap }) => gap && `-${gap}`};
  justify-content: ${({ justify }) => justify && justify};

  & > * {
    margin: ${({ gap }) => gap} !important;
  }
`;
exports.RowFixed = (0, styled_components_2.default)(Row) `
  width: fit-content;
  margin: ${({ gap }) => gap && `-${gap}`};
`;
exports.RowStart = (0, styled_components_2.default)(exports.AutoRow) `
  align-items: start;
`;
exports.RowCenter = (0, styled_components_2.default)(exports.AutoRow) `
  align-items: center;
`;
exports.default = Row;
