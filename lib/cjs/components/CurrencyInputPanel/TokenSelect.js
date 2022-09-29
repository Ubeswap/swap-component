"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const free_solid_svg_icons_1 = require("@fortawesome/free-solid-svg-icons");
const react_fontawesome_1 = require("@fortawesome/react-fontawesome");
const react_1 = require("react");
const react_i18next_1 = require("react-i18next");
const styled_components_1 = __importDefault(require("styled-components"));
const Close_1 = __importDefault(require("../../assets/svgs/Close"));
const CurrencyLogo_1 = __importDefault(require("../CurrencyLogo"));
const CurrencySearchModal_1 = __importDefault(require("../SearchModal/CurrencySearchModal"));
const CurrencySelect_1 = require("./CurrencySelect");
const Aligner = styled_components_1.default.span `
  display: flex;
  align-items: center;
`;
const CloseIcon = styled_components_1.default.div `
  margin-left: 12px;
  background-color: ${({ theme }) => theme.bg2};
  border-radius: 16px;
  padding: 5px 7px;
  &:hover {
    cursor: pointer;
    opacity: 0.6;
  }
  &:active {
    transform: rotate(360deg);
  }
  transition-duration: 1s;
  transition-property: transform;
`;
const CloseColor = (0, styled_components_1.default)(Close_1.default) `
  transform: translateX(-2px);
  path {
    stroke: ${({ theme }) => theme.text1};
  }
`;
const StyledTokenName = styled_components_1.default.span `
  ${({ active }) => (active ? '  margin: 0 0.25rem 0 0.75rem;' : '  margin: 0 0.25rem 0 0.25rem;')}
  font-size:  ${({ active }) => (active ? '20px' : '16px')};
`;
function TokenSelect(props) {
    const { t } = (0, react_i18next_1.useTranslation)();
    const [modalOpen, setModalOpen] = (0, react_1.useState)(false);
    const handleDismissSearch = (0, react_1.useCallback)(() => {
        setModalOpen(false);
    }, [setModalOpen]);
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)(Aligner, { children: [(0, jsx_runtime_1.jsx)(CurrencySelect_1.CurrencySelect, Object.assign({ selected: !props.token, className: "open-currency-select-button", onClick: () => {
                            setModalOpen(true);
                        } }, { children: (0, jsx_runtime_1.jsx)(Aligner, { children: props.token ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(CurrencyLogo_1.default, { currency: props.token, size: '24px' }), (0, jsx_runtime_1.jsxs)(StyledTokenName, { children: [" ", props.token.symbol, " "] })] })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(react_fontawesome_1.FontAwesomeIcon, { icon: free_solid_svg_icons_1.faFilter, width: '16px' }), (0, jsx_runtime_1.jsx)(StyledTokenName, { children: t('Token') })] })) }) })), props.token && ((0, jsx_runtime_1.jsx)(CloseIcon, Object.assign({ onClick: () => props.onTokenSelect(null) }, { children: (0, jsx_runtime_1.jsx)(CloseColor, {}) })))] }), (0, jsx_runtime_1.jsx)(CurrencySearchModal_1.default, { isOpen: modalOpen, onDismiss: handleDismissSearch, onCurrencySelect: props.onTokenSelect, selectedCurrency: props === null || props === void 0 ? void 0 : props.token, showCommonBases: true })] }));
}
exports.default = TokenSelect;
