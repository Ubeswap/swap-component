"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_feather_1 = require("react-feather");
const react_i18next_1 = require("react-i18next");
const rebass_1 = require("rebass");
const styled_components_1 = __importDefault(require("styled-components"));
const Button_1 = require("../Button");
const Column_1 = require("../Column");
const Modal_1 = __importDefault(require("../Modal"));
const Row_1 = require("../Row");
const styled_1 = require("./styled");
const ModalContentWrapper = styled_components_1.default.div `
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 0;
  background-color: ${({ theme }) => theme.bg2};
  border-radius: 20px;
`;
const StyledCloseIcon = (0, styled_components_1.default)(react_feather_1.X) `
  height: 20px;
  width: 20px;
  :hover {
    cursor: pointer;
  }
  > * {
    stroke: ${({ theme }) => theme.text1};
  }
`;
function RemoveFarmModal({ isOpen, onClose, onConfirm }) {
    const { t } = (0, react_i18next_1.useTranslation)();
    const onDismiss = () => {
        onClose();
    };
    return ((0, jsx_runtime_1.jsx)(Modal_1.default, Object.assign({ isOpen: isOpen, onDismiss: onDismiss, maxHeight: 100 }, { children: (0, jsx_runtime_1.jsx)(ModalContentWrapper, { children: (0, jsx_runtime_1.jsxs)(Column_1.AutoColumn, Object.assign({ gap: "lg" }, { children: [(0, jsx_runtime_1.jsxs)(Row_1.RowBetween, Object.assign({ style: { padding: '0 2rem' } }, { children: [(0, jsx_runtime_1.jsx)("div", {}, void 0), (0, jsx_runtime_1.jsx)(rebass_1.Text, Object.assign({ fontWeight: 500, fontSize: 20 }, { children: t('AreYouSure') }), void 0), (0, jsx_runtime_1.jsx)(StyledCloseIcon, { onClick: () => onClose() }, void 0)] }), void 0), (0, jsx_runtime_1.jsx)(styled_1.Break, {}, void 0), (0, jsx_runtime_1.jsxs)(Column_1.AutoColumn, Object.assign({ gap: "lg", style: { padding: '0 2rem' } }, { children: [(0, jsx_runtime_1.jsxs)(rebass_1.Text, Object.assign({ fontWeight: 400, fontSize: 16, mb: '1rem' }, { children: ["Selected Farm will be removed from your browser.", (0, jsx_runtime_1.jsx)("br", {}, void 0), "You can import it later whenever you want."] }), void 0), (0, jsx_runtime_1.jsxs)(Row_1.RowBetween, { children: [(0, jsx_runtime_1.jsx)(Button_1.ButtonSecondary, Object.assign({ mr: "0.5rem", padding: "18px", onClick: onDismiss }, { children: `${t('cancel')}` }), void 0), (0, jsx_runtime_1.jsx)(Button_1.ButtonPrimary, Object.assign({ borderRadius: "12px", onClick: onConfirm }, { children: `${t('continue')}` }), void 0)] }, void 0)] }), void 0)] }), void 0) }, void 0) }), void 0));
}
exports.default = RemoveFarmModal;
