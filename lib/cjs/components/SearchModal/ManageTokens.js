"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
const jsx_runtime_1 = require("react/jsx-runtime");
const use_contractkit_1 = require("@celo-tools/use-contractkit");
const Card_1 = __importDefault(require("components/Card"));
const Column_1 = __importDefault(require("components/Column"));
const CurrencyLogo_1 = __importDefault(require("components/CurrencyLogo"));
const Row_1 = __importStar(require("components/Row"));
const Tokens_1 = require("hooks/Tokens");
const react_1 = require("react");
const react_i18next_1 = require("react-i18next");
const hooks_1 = require("state/user/hooks");
const styled_components_1 = __importDefault(require("styled-components"));
const theme_1 = require("theme");
const utils_1 = require("utils");
const useTheme_1 = __importDefault(require("../../hooks/useTheme"));
const CurrencySearchModal_1 = require("./CurrencySearchModal");
const ImportRow_1 = __importDefault(require("./ImportRow"));
const styleds_1 = require("./styleds");
const Wrapper = styled_components_1.default.div `
  width: 100%;
  height: calc(100% - 60px);
  position: relative;
  padding-bottom: 60px;
`;
const Footer = styled_components_1.default.div `
  position: absolute;
  bottom: 0;
  width: 100%;
  border-radius: 20px;
  border-top-right-radius: 0;
  border-top-left-radius: 0;
  border-top: 1px solid ${({ theme }) => theme.bg3};
  padding: 20px;
  text-align: center;
`;
function ManageTokens({ setModalView, setImportToken, }) {
    const { network } = (0, use_contractkit_1.useContractKit)();
    const chainId = network.chainId;
    const [searchQuery, setSearchQuery] = (0, react_1.useState)('');
    const theme = (0, useTheme_1.default)();
    const { t } = (0, react_i18next_1.useTranslation)();
    // manage focus on modal show
    const inputRef = (0, react_1.useRef)();
    const handleInput = (0, react_1.useCallback)((event) => {
        const input = event.target.value;
        const checksummedInput = (0, utils_1.isAddress)(input);
        setSearchQuery(checksummedInput || input);
    }, []);
    // if they input an address, use it
    const isAddressSearch = (0, utils_1.isAddress)(searchQuery);
    const searchToken = (0, Tokens_1.useToken)(searchQuery);
    // all tokens for local lisr
    const userAddedTokens = (0, hooks_1.useUserAddedTokens)();
    const removeToken = (0, hooks_1.useRemoveUserAddedToken)();
    const handleRemoveAll = (0, react_1.useCallback)(() => {
        if (chainId && userAddedTokens) {
            userAddedTokens.map((token) => {
                return removeToken(chainId, token.address);
            });
        }
    }, [removeToken, userAddedTokens, chainId]);
    const tokenList = (0, react_1.useMemo)(() => {
        return (chainId &&
            userAddedTokens.map((token) => ((0, jsx_runtime_1.jsxs)(Row_1.RowBetween, Object.assign({ width: "100%" }, { children: [(0, jsx_runtime_1.jsxs)(Row_1.RowFixed, { children: [(0, jsx_runtime_1.jsx)(CurrencyLogo_1.default, { currency: token, size: '20px' }, void 0), (0, jsx_runtime_1.jsx)(theme_1.ExternalLink, Object.assign({ href: `${network.explorer}/address/${token.address}` }, { children: (0, jsx_runtime_1.jsx)(theme_1.TYPE.main, Object.assign({ ml: '10px', fontWeight: 600 }, { children: token.symbol }), void 0) }), void 0)] }, void 0), (0, jsx_runtime_1.jsxs)(Row_1.RowFixed, { children: [(0, jsx_runtime_1.jsx)(theme_1.TrashIcon, { onClick: () => removeToken(chainId, token.address) }, void 0), (0, jsx_runtime_1.jsx)(theme_1.ExternalLinkIcon, { href: `${network.explorer}/address/${token.address}` }, void 0)] }, void 0)] }), token.address))));
    }, [userAddedTokens, removeToken, network, chainId]);
    return ((0, jsx_runtime_1.jsxs)(Wrapper, { children: [(0, jsx_runtime_1.jsxs)(Column_1.default, Object.assign({ style: { width: '100%', flex: '1 1' } }, { children: [(0, jsx_runtime_1.jsxs)(styleds_1.PaddedColumn, Object.assign({ gap: "14px" }, { children: [(0, jsx_runtime_1.jsx)(Row_1.default, { children: (0, jsx_runtime_1.jsx)(styleds_1.SearchInput, { type: "text", id: "token-search-input", placeholder: '0x0000', value: searchQuery, autoComplete: "off", ref: inputRef, onChange: handleInput }, void 0) }, void 0), searchQuery !== '' && !isAddressSearch && ((0, jsx_runtime_1.jsx)(theme_1.TYPE.error, Object.assign({ error: true }, { children: t('EnterValidTokenAddress') }), void 0)), searchToken && ((0, jsx_runtime_1.jsx)(Card_1.default, Object.assign({ backgroundColor: theme.bg2, padding: "10px 0" }, { children: (0, jsx_runtime_1.jsx)(ImportRow_1.default, { token: searchToken, showImportView: () => setModalView(CurrencySearchModal_1.CurrencyModalView.importToken), setImportToken: setImportToken, style: { height: 'fit-content' } }, void 0) }), void 0))] }), void 0), (0, jsx_runtime_1.jsx)(styleds_1.Separator, {}, void 0), (0, jsx_runtime_1.jsxs)(styleds_1.PaddedColumn, Object.assign({ gap: "lg" }, { children: [(0, jsx_runtime_1.jsxs)(Row_1.RowBetween, { children: [(0, jsx_runtime_1.jsxs)(theme_1.TYPE.main, Object.assign({ fontWeight: 600 }, { children: [userAddedTokens === null || userAddedTokens === void 0 ? void 0 : userAddedTokens.length, " ", t('Custom'), " ", userAddedTokens.length === 1 ? 'Token' : 'Tokens'] }), void 0), userAddedTokens.length > 0 && ((0, jsx_runtime_1.jsx)(theme_1.ButtonText, Object.assign({ onClick: handleRemoveAll }, { children: (0, jsx_runtime_1.jsx)(theme_1.TYPE.blue, { children: t('ClearAll') }, void 0) }), void 0))] }, void 0), tokenList] }), void 0)] }), void 0), (0, jsx_runtime_1.jsx)(Footer, { children: (0, jsx_runtime_1.jsx)(theme_1.TYPE.darkGray, { children: t('TipCustomTokensAreStoredLocallyInYourBrowser') }, void 0) }, void 0)] }, void 0));
}
exports.default = ManageTokens;
