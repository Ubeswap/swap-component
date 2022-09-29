"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_i18next_1 = require("react-i18next");
const styled_components_1 = __importDefault(require("styled-components"));
const theme_1 = require("../../theme");
const NumericalInput_1 = require("../NumericalInput");
const InputRow = styled_components_1.default.div `
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: center;
  padding: ${({ selected }) => (selected ? '0.75rem 0.5rem 0.75rem 1rem' : '0.75rem 0.75rem 0.75rem 1rem')};
`;
const InputPanel = styled_components_1.default.div `
  ${({ theme }) => theme.flexColumnNoWrap}
  position: relative;
  border-radius: ${({ hideInput }) => (hideInput ? '8px' : '20px')};
  background-color: ${({ theme }) => theme.bg2};
  z-index: 1;
`;
const Container = styled_components_1.default.div `
  border-radius: ${({ hideInput }) => (hideInput ? '8px' : '20px')};
  border: 1px solid ${({ theme }) => theme.bg2};
  background-color: ${({ theme }) => theme.bg1};
`;
function PriceInputPanel({ value, placeholder, onUserInput, disableCurrencySelect = false, hideInput = false, id, }) {
    const { t } = (0, react_i18next_1.useTranslation)();
    return ((0, jsx_runtime_1.jsx)(InputPanel, Object.assign({ id: id }, { children: (0, jsx_runtime_1.jsx)(Container, Object.assign({ hideInput: hideInput }, { children: (0, jsx_runtime_1.jsx)(InputRow, Object.assign({ style: hideInput ? { padding: '0', borderRadius: '8px' } : {}, selected: disableCurrencySelect }, { children: !hideInput && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(theme_1.TYPE.body, { children: t('price') }), (0, jsx_runtime_1.jsx)(NumericalInput_1.Input, { style: { textAlign: 'right' }, value: value, onUserInput: (val) => {
                                onUserInput(val);
                            }, placeholder: placeholder })] })) })) })) })));
}
exports.default = PriceInputPanel;
