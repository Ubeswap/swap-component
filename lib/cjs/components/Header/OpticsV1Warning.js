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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardSection = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const use_contractkit_1 = require("@celo-tools/use-contractkit");
const sdk_1 = require("@ubeswap/sdk");
const react_1 = require("react");
const react_feather_1 = require("react-feather");
const styled_components_1 = __importStar(require("styled-components"));
const Tokens_1 = require("../../hooks/Tokens");
const hooks_1 = require("../../state/wallet/hooks");
const theme_1 = require("../../theme");
const Column_1 = require("../Column");
const Row_1 = require("../Row");
const filtering_1 = require("../SearchModal/filtering");
exports.CardSection = (0, styled_components_1.default)(Column_1.AutoColumn) `
  padding: 1rem;
  z-index: 1;
  opacity: ${({ disabled }) => disabled && '0.4'};
`;
const WarningCard = (0, styled_components_1.default)(Column_1.AutoColumn) `
  background-color: ${(props) => props.theme.bg1};
  border-top: 3px solid ${(props) => props.theme.primary1};
  width: 100%;
  position: relative;
  overflow: hidden;
`;
function OpticsV1Warning() {
    const { address: account, network } = (0, use_contractkit_1.useContractKit)();
    const theme = (0, react_1.useContext)(styled_components_1.ThemeContext);
    const chainId = network.chainId;
    const allTokens = (0, Tokens_1.useAllTokens)(chainId);
    const opticsv1Tokens = (0, react_1.useMemo)(() => {
        return (0, filtering_1.filterTokens)(Object.values(allTokens), 'Optics v1');
    }, [allTokens]);
    const opticsV1Balance = (0, hooks_1.useTokenBalances)(account !== null && account !== void 0 ? account : undefined, opticsv1Tokens);
    const opticsV1TokensWithBalances = Object.values(opticsV1Balance).length > 0 &&
        Object.values(opticsV1Balance)
            .filter((balance) => (balance === null || balance === void 0 ? void 0 : balance.numerator) && sdk_1.JSBI.greaterThan(balance.numerator, sdk_1.JSBI.BigInt(0)))
            .map((balance) => (0, jsx_runtime_1.jsxs)("span", { children: [balance === null || balance === void 0 ? void 0 : balance.currency.symbol, " "] }, balance === null || balance === void 0 ? void 0 : balance.currency.address));
    return ((0, jsx_runtime_1.jsx)(Column_1.TopSection, Object.assign({ gap: "md" }, { children: opticsV1TokensWithBalances && opticsV1TokensWithBalances.length > 0 && ((0, jsx_runtime_1.jsx)(WarningCard, { children: (0, jsx_runtime_1.jsx)(exports.CardSection, { children: (0, jsx_runtime_1.jsxs)(Row_1.RowStart, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ style: { paddingRight: 16 } }, { children: (0, jsx_runtime_1.jsx)(react_feather_1.AlertTriangle, { color: theme.yellow2, size: 36 }) })), (0, jsx_runtime_1.jsxs)(Column_1.AutoColumn, Object.assign({ gap: "md" }, { children: [(0, jsx_runtime_1.jsx)(Row_1.RowBetween, { children: (0, jsx_runtime_1.jsxs)(theme_1.TYPE.black, Object.assign({ fontWeight: 600 }, { children: ["You have the following Optics V1 Tokens: ", opticsV1TokensWithBalances] })) }), (0, jsx_runtime_1.jsx)(Row_1.RowBetween, { children: (0, jsx_runtime_1.jsx)(theme_1.TYPE.black, Object.assign({ fontSize: 14 }, { children: "Please either migrate your tokens to Optics v2 tokens or bridge your tokens" })) }), (0, jsx_runtime_1.jsxs)(Row_1.RowStart, { children: [(0, jsx_runtime_1.jsx)(theme_1.ExternalLink, Object.assign({ href: "https://www.mobius.money/#/opensum" }, { children: "Migrate" })), "\u00A0", (0, jsx_runtime_1.jsx)(theme_1.ExternalLink, Object.assign({ href: "https://old.optics.app/" }, { children: "Bridge" }))] })] }))] }) }) })) })));
}
exports.default = OpticsV1Warning;
