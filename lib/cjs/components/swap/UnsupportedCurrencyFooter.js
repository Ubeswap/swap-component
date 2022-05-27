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
const Button_1 = require("components/Button");
const Card_1 = __importStar(require("components/Card"));
const Column_1 = require("components/Column");
const CurrencyLogo_1 = __importDefault(require("components/CurrencyLogo"));
const Modal_1 = __importDefault(require("components/Modal"));
const Row_1 = require("components/Row");
const react_1 = require("react");
const styled_components_1 = __importDefault(require("styled-components"));
const theme_1 = require("theme");
const Tokens_1 = require("../../hooks/Tokens");
const DetailsFooter = styled_components_1.default.div `
  padding-top: calc(16px + 2rem);
  padding-bottom: 20px;
  margin-top: -2rem;
  width: 100%;
  max-width: 400px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  color: ${({ theme }) => theme.text2};
  background-color: ${({ theme }) => theme.advancedBG};
  z-index: -1;

  transform: ${({ show }) => (show ? 'translateY(0%)' : 'translateY(-100%)')};
  transition: transform 300ms ease-in-out;
  text-align: center;
`;
const AddressText = (0, styled_components_1.default)(theme_1.TYPE.blue) `
  font-size: 12px;

  ${({ theme }) => theme.mediaWidth.upToSmall `
    font-size: 10px;
`}
`;
function UnsupportedCurrencyFooter({ show, currencies, }) {
    const { network } = (0, use_contractkit_1.useContractKit)();
    const chainId = network.chainId;
    const [showDetails, setShowDetails] = (0, react_1.useState)(false);
    const tokens = currencies;
    const unsupportedTokens = (0, Tokens_1.useUnsupportedTokens)();
    return ((0, jsx_runtime_1.jsxs)(DetailsFooter, Object.assign({ show: show }, { children: [(0, jsx_runtime_1.jsx)(Modal_1.default, Object.assign({ isOpen: showDetails, onDismiss: () => setShowDetails(false) }, { children: (0, jsx_runtime_1.jsx)(Card_1.default, Object.assign({ padding: "2rem" }, { children: (0, jsx_runtime_1.jsxs)(Column_1.AutoColumn, Object.assign({ gap: "lg" }, { children: [(0, jsx_runtime_1.jsxs)(Row_1.RowBetween, { children: [(0, jsx_runtime_1.jsx)(theme_1.TYPE.mediumHeader, { children: "Unsupported Assets" }, void 0), (0, jsx_runtime_1.jsx)(theme_1.CloseIcon, { onClick: () => setShowDetails(false) }, void 0)] }, void 0), tokens.map((token) => {
                                var _a;
                                return (token &&
                                    unsupportedTokens &&
                                    Object.keys(unsupportedTokens).includes(token.address) && ((0, jsx_runtime_1.jsx)(Card_1.OutlineCard, { children: (0, jsx_runtime_1.jsxs)(Column_1.AutoColumn, Object.assign({ gap: "10px" }, { children: [(0, jsx_runtime_1.jsxs)(Row_1.AutoRow, Object.assign({ gap: "5px", align: "center" }, { children: [(0, jsx_runtime_1.jsx)(CurrencyLogo_1.default, { currency: token, size: '24px' }, void 0), (0, jsx_runtime_1.jsx)(theme_1.TYPE.body, Object.assign({ fontWeight: 500 }, { children: token.symbol }), void 0)] }), void 0), chainId && ((0, jsx_runtime_1.jsx)(theme_1.ExternalLink, Object.assign({ href: `${network.explorer}/address/${token.address}` }, { children: (0, jsx_runtime_1.jsx)(AddressText, { children: token.address }, void 0) }), void 0))] }), void 0) }, (_a = token.address) === null || _a === void 0 ? void 0 : _a.concat('not-supported'))));
                            }), (0, jsx_runtime_1.jsx)(Column_1.AutoColumn, Object.assign({ gap: "lg" }, { children: (0, jsx_runtime_1.jsx)(theme_1.TYPE.body, Object.assign({ fontWeight: 500 }, { children: "Some assets are not available through this interface because they may not work well with our smart contract or we are unable to allow trading for legal reasons." }), void 0) }), void 0)] }), void 0) }), void 0) }), void 0), (0, jsx_runtime_1.jsx)(Button_1.ButtonEmpty, Object.assign({ padding: '0', onClick: () => setShowDetails(true) }, { children: (0, jsx_runtime_1.jsx)(theme_1.TYPE.blue, { children: "Read more about unsupported assets" }, void 0) }), void 0)] }), void 0));
}
exports.default = UnsupportedCurrencyFooter;
