"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const styled_components_1 = __importDefault(require("styled-components"));
const hooks_1 = require("../../state/application/hooks");
const hooks_2 = require("../../state/user/hooks");
const Column_1 = require("../Column");
const PopupItem_1 = __importDefault(require("./PopupItem"));
const MobilePopupWrapper = styled_components_1.default.div `
  position: relative;
  max-width: 100%;
  height: ${({ height }) => height};
  margin: ${({ height }) => (height ? '0 auto;' : 0)};
  margin-bottom: ${({ height }) => (height ? '20px' : 0)}};

  display: none;
  ${({ theme }) => theme.mediaWidth.upToSmall `
    display: block;
  `};
`;
const MobilePopupInner = styled_components_1.default.div `
  height: 99%;
  overflow-x: auto;
  overflow-y: hidden;
  display: flex;
  flex-direction: row;
  -webkit-overflow-scrolling: touch;
  ::-webkit-scrollbar {
    display: none;
  }
`;
const FixedPopupColumn = (0, styled_components_1.default)(Column_1.AutoColumn) `
  position: fixed;
  top: ${({ extraPadding }) => (extraPadding ? '108px' : '88px')};
  right: 1rem;
  max-width: 355px !important;
  width: 100%;
  z-index: 3;

  ${({ theme }) => theme.mediaWidth.upToSmall `
    display: none;
  `};
`;
function Popups() {
    // get all popups
    const activePopups = (0, hooks_1.useActivePopups)();
    const urlWarningActive = (0, hooks_2.useURLWarningVisible)();
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(FixedPopupColumn, Object.assign({ gap: "20px", extraPadding: urlWarningActive }, { children: activePopups.map((item) => ((0, jsx_runtime_1.jsx)(PopupItem_1.default, { content: item.content, popKey: item.key, removeAfterMs: item.removeAfterMs }, item.key))) })), (0, jsx_runtime_1.jsx)(MobilePopupWrapper, Object.assign({ height: (activePopups === null || activePopups === void 0 ? void 0 : activePopups.length) > 0 ? 'fit-content' : 0 }, { children: (0, jsx_runtime_1.jsx)(MobilePopupInner, { children: activePopups // reverse so new items up front
                        .slice(0)
                        .reverse()
                        .map((item) => ((0, jsx_runtime_1.jsx)(PopupItem_1.default, { content: item.content, popKey: item.key, removeAfterMs: item.removeAfterMs }, item.key))) }) }))] }));
}
exports.default = Popups;
