"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StyledClose = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const use_contractkit_1 = require("@celo-tools/use-contractkit");
const sdk_1 = require("@ubeswap/sdk");
const react_device_detect_1 = require("react-device-detect");
const react_feather_1 = require("react-feather");
const react_redux_1 = require("react-redux");
const styled_components_1 = __importDefault(require("styled-components"));
const hooks_1 = require("../../state/user/hooks");
const PhishAlert = styled_components_1.default.div `
  width: 100%;
  padding: 6px 6px;
  background-color: ${({ theme }) => theme.blue1};
  color: white;
  font-size: 11px;
  justify-content: space-between;
  align-items: center;
  display: ${({ isActive }) => (isActive ? 'flex' : 'none')};
`;
exports.StyledClose = (0, styled_components_1.default)(react_feather_1.X) `
  :hover {
    cursor: pointer;
  }
`;
const defaultAppUrl = 'app.ubeswap.org';
const appURL = {
    [sdk_1.ChainId.MAINNET]: 'app.ubeswap.org',
    [sdk_1.ChainId.ALFAJORES]: 'app-alfajores.ubeswap.org',
    [sdk_1.ChainId.BAKLAVA]: 'app-baklava.ubeswap.org',
};
function URLWarning() {
    const toggleURLWarning = (0, hooks_1.useURLWarningToggle)();
    const showURLWarning = (0, hooks_1.useURLWarningVisible)();
    const { network } = (0, use_contractkit_1.useContractKit)();
    const accountInfo = (0, react_redux_1.useSelector)((state) => state.swap.accountInfo);
    const chainId = accountInfo ? accountInfo.chainId : network.chainId;
    return react_device_detect_1.isMobile ? ((0, jsx_runtime_1.jsxs)(PhishAlert, Object.assign({ isActive: showURLWarning }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ style: { display: 'flex' } }, { children: [(0, jsx_runtime_1.jsx)(react_feather_1.AlertTriangle, { style: { marginRight: 6 }, size: 12 }), " Make sure the URL is", (0, jsx_runtime_1.jsx)("code", Object.assign({ style: { padding: '0 4px', display: 'inline', fontWeight: 'bold' } }, { children: appURL[chainId] || defaultAppUrl }))] })), (0, jsx_runtime_1.jsx)(exports.StyledClose, { size: 12, onClick: toggleURLWarning })] }))) : window.location.hostname === 'app.ubeswap.org' ? ((0, jsx_runtime_1.jsxs)(PhishAlert, Object.assign({ isActive: showURLWarning }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ style: { display: 'flex' } }, { children: [(0, jsx_runtime_1.jsx)(react_feather_1.AlertTriangle, { style: { marginRight: 6 }, size: 12 }), " Always make sure the URL is", (0, jsx_runtime_1.jsx)("code", Object.assign({ style: { padding: '0 4px', display: 'inline', fontWeight: 'bold' } }, { children: appURL[chainId] || defaultAppUrl })), ' ', "- bookmark it to be safe."] })), (0, jsx_runtime_1.jsx)(exports.StyledClose, { size: 12, onClick: toggleURLWarning })] }))) : null;
}
exports.default = URLWarning;
