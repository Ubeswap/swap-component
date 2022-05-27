"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TopSectionLimitOrder = exports.TopSection = exports.AutoColumn = exports.ColumnCenter = void 0;
const styled_components_1 = __importDefault(require("styled-components"));
const Column = styled_components_1.default.div `
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;
exports.ColumnCenter = (0, styled_components_1.default)(Column) `
  width: 100%;
  align-items: center;
`;
exports.AutoColumn = styled_components_1.default.div `
  display: grid;
  grid-auto-rows: auto;
  grid-row-gap: ${({ gap }) => (gap === 'sm' && '8px') || (gap === 'md' && '12px') || (gap === 'lg' && '24px') || gap};
  justify-items: ${({ justify }) => justify && justify};
`;
exports.TopSection = (0, styled_components_1.default)(exports.AutoColumn) `
  max-width: 720px;
  width: 100%;
  margin-bottom: 24px;
`;
exports.TopSectionLimitOrder = (0, styled_components_1.default)(exports.TopSection) `
  max-width: 420px;
`;
exports.default = Column;
