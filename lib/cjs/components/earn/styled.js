"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TopBorderCard = exports.Break = exports.CardSection = exports.CardNoise = exports.CardBGImageSmaller = exports.CardBGImage = exports.DataCard = exports.TextBox = void 0;
const styled_components_1 = __importDefault(require("styled-components"));
const big_unicorn_png_1 = __importDefault(require("../../assets/images/big_unicorn.png"));
const noise_webp_1 = __importDefault(require("../../assets/images/noise.webp"));
const xl_uni_png_1 = __importDefault(require("../../assets/images/xl_uni.png"));
const Column_1 = require("../Column");
exports.TextBox = styled_components_1.default.div `
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px 12px;
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 20px;
  width: fit-content;
  justify-self: flex-end;
`;
exports.DataCard = (0, styled_components_1.default)(Column_1.AutoColumn) `
  background: radial-gradient(
    96.02% 99.41% at 1.84% 0%,
    ${(props) => props.theme.primary1} 30%,
    ${(props) => props.theme.bg5} 100%
  );
  border-radius: 12px;
  width: 100%;
  position: relative;
  overflow: hidden;
`;
exports.CardBGImage = styled_components_1.default.span `
  background: url(${big_unicorn_png_1.default});
  width: 1000px;
  height: 600px;
  position: absolute;
  border-radius: 12px;
  opacity: 0.4;
  top: -100px;
  left: -100px;
  transform: rotate(-15deg);
  user-select: none;

  ${({ desaturate }) => desaturate && `filter: saturate(0)`}
`;
exports.CardBGImageSmaller = styled_components_1.default.span `
  background: url(${xl_uni_png_1.default});
  width: 1200px;
  height: 1200px;
  position: absolute;
  border-radius: 12px;
  top: -300px;
  left: -300px;
  opacity: 0.4;
  user-select: none;

  ${({ desaturate }) => desaturate && `filter: saturate(0)`}
`;
exports.CardNoise = styled_components_1.default.span `
  background: url(${noise_webp_1.default});
  background-size: cover;
  mix-blend-mode: overlay;
  border-radius: 12px;
  width: 100%;
  height: 100%;
  opacity: 0.15;
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
`;
exports.CardSection = (0, styled_components_1.default)(Column_1.AutoColumn) `
  padding: 1rem;
  z-index: 1;
  opacity: ${({ disabled }) => disabled && '0.4'};
`;
exports.Break = styled_components_1.default.div `
  width: 100%;
  background-color: rgba(255, 255, 255, 0.2);
  height: 1px;
`;
exports.TopBorderCard = (0, styled_components_1.default)(Column_1.AutoColumn) `
  background-color: ${(props) => props.theme.bg1};
  border-top: 3px solid ${(props) => props.theme.primary1};
  width: 100%;
  position: relative;
  overflow: hidden;
`;
