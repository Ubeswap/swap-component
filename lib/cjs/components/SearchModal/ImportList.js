"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImportList = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const polished_1 = require("polished");
const react_1 = require("react");
const react_feather_1 = require("react-feather");
const react_ga_1 = __importDefault(require("react-ga"));
const react_i18next_1 = require("react-i18next");
const react_redux_1 = require("react-redux");
const styled_components_1 = __importDefault(require("styled-components"));
const useFetchListCallback_1 = require("../../hooks/useFetchListCallback");
const useTheme_1 = __importDefault(require("../../hooks/useTheme"));
const actions_1 = require("../../state/lists/actions");
const hooks_1 = require("../../state/lists/hooks");
const theme_1 = require("../../theme");
const components_1 = require("../../theme/components");
const Button_1 = require("../Button");
const Card_1 = __importDefault(require("../Card"));
const Column_1 = require("../Column");
const ListLogo_1 = __importDefault(require("../ListLogo"));
const Row_1 = require("../Row");
const styleds_1 = require("../swap/styleds");
const CurrencySearchModal_1 = require("./CurrencySearchModal");
const styleds_2 = require("./styleds");
const Wrapper = styled_components_1.default.div `
  position: relative;
  width: 100%;
  overflow: auto;
`;
function ImportList({ listURL, list, setModalView, onDismiss }) {
    var _a;
    const theme = (0, useTheme_1.default)();
    const dispatch = (0, react_redux_1.useDispatch)();
    // user must accept
    const [confirmed, setConfirmed] = (0, react_1.useState)(false);
    const lists = (0, hooks_1.useAllLists)();
    const fetchList = (0, useFetchListCallback_1.useFetchListCallback)();
    const { t } = (0, react_i18next_1.useTranslation)();
    // monitor is list is loading
    const adding = Boolean((_a = lists[listURL]) === null || _a === void 0 ? void 0 : _a.loadingRequestId);
    const [addError, setAddError] = (0, react_1.useState)(null);
    const handleAddList = (0, react_1.useCallback)(() => {
        if (adding)
            return;
        setAddError(null);
        fetchList(listURL)
            .then(() => {
            react_ga_1.default.event({
                category: 'Lists',
                action: 'Add List',
                label: listURL,
            });
            // turn list on
            dispatch((0, actions_1.enableList)(listURL));
            // go back to lists
            setModalView(CurrencySearchModal_1.CurrencyModalView.manage);
        })
            .catch((error) => {
            react_ga_1.default.event({
                category: 'Lists',
                action: 'Add List Failed',
                label: listURL,
            });
            setAddError(error.message);
            dispatch((0, actions_1.removeList)(listURL));
        });
    }, [adding, dispatch, fetchList, listURL, setModalView]);
    return ((0, jsx_runtime_1.jsxs)(Wrapper, { children: [(0, jsx_runtime_1.jsx)(styleds_2.PaddedColumn, Object.assign({ gap: "14px", style: { width: '100%', flex: '1 1' } }, { children: (0, jsx_runtime_1.jsxs)(Row_1.RowBetween, { children: [(0, jsx_runtime_1.jsx)(react_feather_1.ArrowLeft, { style: { cursor: 'pointer' }, onClick: () => setModalView(CurrencySearchModal_1.CurrencyModalView.manage) }), (0, jsx_runtime_1.jsx)(theme_1.TYPE.mediumHeader, { children: t('ImportList') }), (0, jsx_runtime_1.jsx)(theme_1.CloseIcon, { onClick: onDismiss })] }) })), (0, jsx_runtime_1.jsx)(styleds_1.SectionBreak, {}), (0, jsx_runtime_1.jsx)(styleds_2.PaddedColumn, Object.assign({ gap: "md" }, { children: (0, jsx_runtime_1.jsxs)(Column_1.AutoColumn, Object.assign({ gap: "md" }, { children: [(0, jsx_runtime_1.jsx)(Card_1.default, Object.assign({ backgroundColor: theme.bg2, padding: "12px 20px" }, { children: (0, jsx_runtime_1.jsx)(Row_1.RowBetween, { children: (0, jsx_runtime_1.jsxs)(Row_1.RowFixed, { children: [list.logoURI && (0, jsx_runtime_1.jsx)(ListLogo_1.default, { logoURI: list.logoURI, size: "40px" }), (0, jsx_runtime_1.jsxs)(Column_1.AutoColumn, Object.assign({ gap: "sm", style: { marginLeft: '20px' } }, { children: [(0, jsx_runtime_1.jsxs)(Row_1.RowFixed, { children: [(0, jsx_runtime_1.jsx)(theme_1.TYPE.body, Object.assign({ fontWeight: 600, mr: "6px" }, { children: list.name })), (0, jsx_runtime_1.jsx)(styleds_2.TextDot, {}), (0, jsx_runtime_1.jsxs)(theme_1.TYPE.main, Object.assign({ fontSize: '16px', ml: "6px" }, { children: [list.tokens.length, " ", t('Tokens')] }))] }), (0, jsx_runtime_1.jsx)(components_1.ExternalLink, Object.assign({ href: `https://tokenlists.org/token-list?url=${listURL}` }, { children: (0, jsx_runtime_1.jsx)(theme_1.TYPE.main, Object.assign({ fontSize: '12px', color: theme.blue1 }, { children: listURL })) }))] }))] }) }) })), (0, jsx_runtime_1.jsxs)(Card_1.default, Object.assign({ style: { backgroundColor: (0, polished_1.transparentize)(0.8, theme.red1) } }, { children: [(0, jsx_runtime_1.jsxs)(Column_1.AutoColumn, Object.assign({ justify: "center", style: { textAlign: 'center', gap: '16px', marginBottom: '12px' } }, { children: [(0, jsx_runtime_1.jsx)(react_feather_1.AlertTriangle, { stroke: theme.red1, size: 32 }), (0, jsx_runtime_1.jsxs)(theme_1.TYPE.body, Object.assign({ fontWeight: 500, fontSize: 20, color: theme.red1 }, { children: [t('ImportAtYourOwnRisk'), ' '] }))] })), (0, jsx_runtime_1.jsxs)(Column_1.AutoColumn, Object.assign({ style: { textAlign: 'center', gap: '16px', marginBottom: '12px' } }, { children: [(0, jsx_runtime_1.jsx)(theme_1.TYPE.body, Object.assign({ fontWeight: 500, color: theme.red1 }, { children: t('tokenExpExpl') })), (0, jsx_runtime_1.jsx)(theme_1.TYPE.body, Object.assign({ fontWeight: 600, color: theme.red1 }, { children: t('tokenImportRisk') }))] })), (0, jsx_runtime_1.jsxs)(Row_1.AutoRow, Object.assign({ justify: "center", style: { cursor: 'pointer' }, onClick: () => setConfirmed(!confirmed) }, { children: [(0, jsx_runtime_1.jsx)(styleds_2.Checkbox, { name: "confirmed", type: "checkbox", checked: confirmed, onChange: () => setConfirmed(!confirmed) }), (0, jsx_runtime_1.jsx)(theme_1.TYPE.body, Object.assign({ ml: "10px", fontSize: "16px", color: theme.red1, fontWeight: 500 }, { children: t('IUnderstand') }))] }))] })), (0, jsx_runtime_1.jsx)(Button_1.ButtonPrimary, Object.assign({ disabled: !confirmed, altDisabledStyle: true, borderRadius: "20px", padding: "10px 1rem", onClick: handleAddList }, { children: t('Import') })), addError ? ((0, jsx_runtime_1.jsx)(theme_1.TYPE.error, Object.assign({ title: addError, style: { textOverflow: 'ellipsis', overflow: 'hidden' }, error: true }, { children: addError }))) : null] })) }))] }));
}
exports.ImportList = ImportList;
