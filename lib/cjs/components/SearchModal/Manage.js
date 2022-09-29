"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_feather_1 = require("react-feather");
const react_i18next_1 = require("react-i18next");
const rebass_1 = require("rebass");
const styled_components_1 = __importDefault(require("styled-components"));
const theme_1 = require("../../theme");
const Row_1 = require("../Row");
const CurrencySearchModal_1 = require("./CurrencySearchModal");
const ManageLists_1 = require("./ManageLists");
const ManageTokens_1 = __importDefault(require("./ManageTokens"));
const styleds_1 = require("./styleds");
const Wrapper = styled_components_1.default.div `
  width: 100%;
  position: relative;
  padding-bottom: 80px;
`;
const ToggleWrapper = (0, styled_components_1.default)(Row_1.RowBetween) `
  background-color: ${({ theme }) => theme.bg3};
  border-radius: 12px;
  padding: 6px;
`;
const ToggleOption = styled_components_1.default.div `
  width: 48%;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  font-weight: 600;
  background-color: ${({ theme, active }) => (active ? theme.bg1 : theme.bg3)};
  color: ${({ theme, active }) => (active ? theme.text1 : theme.text2)};
  user-select: none;

  :hover {
    cursor: pointer;
    opacity: 0.7;
  }
`;
function Manage({ onDismiss, setModalView, setImportList, setImportToken, setListUrl, }) {
    // toggle between tokens and lists
    const [showLists, setShowLists] = (0, react_1.useState)(true);
    const { t } = (0, react_i18next_1.useTranslation)();
    return ((0, jsx_runtime_1.jsxs)(Wrapper, { children: [(0, jsx_runtime_1.jsx)(styleds_1.PaddedColumn, { children: (0, jsx_runtime_1.jsxs)(Row_1.RowBetween, { children: [(0, jsx_runtime_1.jsx)(react_feather_1.ArrowLeft, { style: { cursor: 'pointer' }, onClick: () => setModalView(CurrencySearchModal_1.CurrencyModalView.search) }), (0, jsx_runtime_1.jsx)(rebass_1.Text, Object.assign({ fontWeight: 500, fontSize: 20 }, { children: t('manage') })), (0, jsx_runtime_1.jsx)(theme_1.CloseIcon, { onClick: onDismiss })] }) }), (0, jsx_runtime_1.jsx)(styleds_1.Separator, {}), (0, jsx_runtime_1.jsx)(styleds_1.PaddedColumn, Object.assign({ style: { paddingBottom: 0 } }, { children: (0, jsx_runtime_1.jsxs)(ToggleWrapper, { children: [(0, jsx_runtime_1.jsx)(ToggleOption, Object.assign({ onClick: () => setShowLists(!showLists), active: showLists }, { children: t('Lists') })), (0, jsx_runtime_1.jsx)(ToggleOption, Object.assign({ onClick: () => setShowLists(!showLists), active: !showLists }, { children: t('Tokens') }))] }) })), showLists ? ((0, jsx_runtime_1.jsx)(ManageLists_1.ManageLists, { setModalView: setModalView, setImportList: setImportList, setListUrl: setListUrl })) : ((0, jsx_runtime_1.jsx)(ManageTokens_1.default, { setModalView: setModalView, setImportToken: setImportToken }))] }));
}
exports.default = Manage;
