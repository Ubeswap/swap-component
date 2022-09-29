"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChangesList = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const token_lists_1 = require("@uniswap/token-lists");
const react_1 = __importStar(require("react"));
const react_ga_1 = __importDefault(require("react-ga"));
const react_i18next_1 = require("react-i18next");
const react_redux_1 = require("react-redux");
const rebass_1 = require("rebass");
const styled_components_1 = __importDefault(require("styled-components"));
const hooks_1 = require("../../state/application/hooks");
const actions_1 = require("../../state/lists/actions");
const theme_1 = require("../../theme");
const listVersionLabel_1 = __importDefault(require("../../utils/listVersionLabel"));
const Button_1 = require("../Button");
const Column_1 = require("../Column");
const Row_1 = require("../Row");
exports.ChangesList = styled_components_1.default.ul `
  max-height: 400px;
  overflow: auto;
`;
function ListUpdatePopup({ popKey, listUrl, oldList, newList, auto, }) {
    const removePopup = (0, hooks_1.useRemovePopup)();
    const removeThisPopup = (0, react_1.useCallback)(() => removePopup(popKey), [popKey, removePopup]);
    const dispatch = (0, react_redux_1.useDispatch)();
    const { t } = (0, react_i18next_1.useTranslation)();
    const handleAcceptUpdate = (0, react_1.useCallback)(() => {
        if (auto)
            return;
        react_ga_1.default.event({
            category: 'Lists',
            action: 'Update List from Popup',
            label: listUrl,
        });
        dispatch((0, actions_1.acceptListUpdate)(listUrl));
        removeThisPopup();
    }, [auto, dispatch, listUrl, removeThisPopup]);
    const { added: tokensAdded, changed: tokensChanged, removed: tokensRemoved, } = (0, react_1.useMemo)(() => {
        return (0, token_lists_1.diffTokenLists)(oldList.tokens, newList.tokens);
    }, [newList.tokens, oldList.tokens]);
    const numTokensChanged = (0, react_1.useMemo)(() => Object.keys(tokensChanged).reduce((memo, chainId) => memo + Object.keys(tokensChanged[chainId]).length, 0), [tokensChanged]);
    return ((0, jsx_runtime_1.jsx)(Row_1.AutoRow, { children: (0, jsx_runtime_1.jsx)(Column_1.AutoColumn, Object.assign({ style: { flex: '1' }, gap: "8px" }, { children: auto ? ((0, jsx_runtime_1.jsxs)(theme_1.TYPE.body, Object.assign({ fontWeight: 500 }, { children: [t('TheTokenList'), " \"", oldList.name, "\" ", t('HasBeenUpdatedTo'), ' ', (0, jsx_runtime_1.jsx)("strong", { children: (0, listVersionLabel_1.default)(newList.version) }), "."] }))) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)(rebass_1.Text, { children: [t('AnUpdateIsAvailableForTheTokenList'), " \"", oldList.name, "\" (", (0, listVersionLabel_1.default)(oldList.version), " to ", (0, listVersionLabel_1.default)(newList.version), ")."] }), (0, jsx_runtime_1.jsxs)(exports.ChangesList, { children: [tokensAdded.length > 0 ? ((0, jsx_runtime_1.jsxs)("li", { children: [tokensAdded.map((token, i) => ((0, jsx_runtime_1.jsxs)(react_1.default.Fragment, { children: [(0, jsx_runtime_1.jsx)("strong", Object.assign({ title: token.address }, { children: token.symbol })), i === tokensAdded.length - 1 ? null : ', '] }, `${token.chainId}-${token.address}`))), ' ', t('Added')] })) : null, tokensRemoved.length > 0 ? ((0, jsx_runtime_1.jsxs)("li", { children: [tokensRemoved.map((token, i) => ((0, jsx_runtime_1.jsxs)(react_1.default.Fragment, { children: [(0, jsx_runtime_1.jsx)("strong", Object.assign({ title: token.address }, { children: token.symbol })), i === tokensRemoved.length - 1 ? null : ', '] }, `${token.chainId}-${token.address}`))), ' ', t('Removed')] })) : null, numTokensChanged > 0 ? ((0, jsx_runtime_1.jsxs)("li", { children: [numTokensChanged, " ", t('TokensUpdated')] })) : null] })] }), (0, jsx_runtime_1.jsxs)(Row_1.AutoRow, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ style: { flexGrow: 1, marginRight: 12 } }, { children: (0, jsx_runtime_1.jsx)(Button_1.ButtonSecondary, Object.assign({ onClick: handleAcceptUpdate }, { children: t('AcceptUpdate') })) })), (0, jsx_runtime_1.jsx)("div", Object.assign({ style: { flexGrow: 1 } }, { children: (0, jsx_runtime_1.jsx)(Button_1.ButtonSecondary, Object.assign({ onClick: removeThisPopup }, { children: t('Dismiss') })) }))] })] })) })) }));
}
exports.default = ListUpdatePopup;
