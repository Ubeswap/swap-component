"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const sdk_1 = require("@ubeswap/sdk");
const Tokens_1 = require("hooks/Tokens");
const react_i18next_1 = require("react-i18next");
const rebass_1 = require("rebass");
const styled_components_1 = __importDefault(require("styled-components"));
const constants_1 = require("../../constants");
const Column_1 = require("../Column");
const CurrencyLogo_1 = __importDefault(require("../CurrencyLogo"));
const QuestionHelper_1 = __importDefault(require("../QuestionHelper"));
const Row_1 = require("../Row");
const BaseWrapper = styled_components_1.default.div `
  border: 1px solid ${({ theme, disable }) => (disable ? 'transparent' : theme.bg3)};
  border-radius: 10px;
  display: flex;
  padding: 6px;

  align-items: center;
  :hover {
    cursor: ${({ disable }) => !disable && 'pointer'};
    background-color: ${({ theme, disable }) => !disable && theme.bg2};
  }

  background-color: ${({ theme, disable }) => disable && theme.bg3};
  opacity: ${({ disable }) => disable && '0.4'};
`;
function CommonBases({ chainId, onSelect, selectedCurrency, }) {
    const allTokens = (0, Tokens_1.useAllTokens)();
    const { t } = (0, react_i18next_1.useTranslation)();
    return ((0, jsx_runtime_1.jsxs)(Column_1.AutoColumn, Object.assign({ gap: "md" }, { children: [(0, jsx_runtime_1.jsxs)(Row_1.AutoRow, { children: [(0, jsx_runtime_1.jsx)(rebass_1.Text, Object.assign({ fontWeight: 500, fontSize: 14 }, { children: t('CommonBases') }), void 0), (0, jsx_runtime_1.jsx)(QuestionHelper_1.default, { text: t('TheseTokensAreCommonlyPairedWithOtherTokens') }, void 0)] }, void 0), (0, jsx_runtime_1.jsx)(Row_1.AutoRow, Object.assign({ gap: "4px" }, { children: (chainId ? constants_1.SUGGESTED_BASES[chainId] : []).map((token) => {
                    var _a;
                    const selected = selectedCurrency instanceof sdk_1.Token && selectedCurrency.address === token.address;
                    return ((0, jsx_runtime_1.jsxs)(BaseWrapper, Object.assign({ onClick: () => !selected && onSelect(token), disable: selected }, { children: [(0, jsx_runtime_1.jsx)(CurrencyLogo_1.default, { currency: (_a = allTokens[token.address]) !== null && _a !== void 0 ? _a : token, style: { marginRight: 8 } }, void 0), (0, jsx_runtime_1.jsx)(rebass_1.Text, Object.assign({ fontWeight: 500, fontSize: 16 }, { children: token.symbol }), void 0)] }), token.address));
                }) }), void 0)] }), void 0));
}
exports.default = CommonBases;
