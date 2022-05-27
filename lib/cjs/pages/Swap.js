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
var _a, _b, _c, _d, _e, _f, _g, _h;
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
require("../i18n");
require("@celo-tools/use-contractkit/lib/styles.css");
require("../index.css");
const client_1 = require("@apollo/client");
const use_contractkit_1 = require("@celo-tools/use-contractkit");
const react_1 = require("@sentry/react");
const Sentry = __importStar(require("@sentry/react"));
const tracing_1 = require("@sentry/tracing");
const sdk_1 = require("@ubeswap/sdk");
const index_1 = require("connectors/index");
const react_2 = require("react");
const react_device_detect_1 = require("react-device-detect");
const react_ga_1 = __importDefault(require("react-ga"));
const react_redux_1 = require("react-redux");
const react_router_dom_1 = require("react-router-dom");
const styled_components_1 = __importDefault(require("styled-components"));
const GoogleAnalyticsReporter_1 = __importDefault(require("../components/analytics/GoogleAnalyticsReporter"));
const Polling_1 = __importDefault(require("../components/Header/Polling"));
const URLWarning_1 = __importDefault(require("../components/Header/URLWarning"));
const Popups_1 = __importDefault(require("../components/Popups"));
const networks_1 = require("../networks");
const state_1 = __importDefault(require("../state"));
const updater_1 = __importDefault(require("../state/application/updater"));
const updater_2 = __importDefault(require("../state/lists/updater"));
const updater_3 = __importDefault(require("../state/multicall/updater"));
const updater_4 = __importDefault(require("../state/transactions/updater"));
const updater_5 = __importDefault(require("../state/user/updater"));
const theme_1 = __importStar(require("../theme"));
const DarkModeQueryParamReader_1 = __importDefault(require("../theme/DarkModeQueryParamReader"));
const SwapBody_1 = __importDefault(require("./SwapBody"));
if (window.celo) {
    window.celo.autoRefreshOnNetworkChange = false;
}
const client = new client_1.ApolloClient({
    uri: 'https://api.thegraph.com/subgraphs/name/ubeswap/ubeswap',
    cache: new client_1.InMemoryCache(),
});
const GOOGLE_ANALYTICS_IDS = {
    production: {
        [sdk_1.ChainId.MAINNET]: 'UA-189817928-4',
        [sdk_1.ChainId.ALFAJORES]: 'UA-189817928-5',
        [sdk_1.ChainId.BAKLAVA]: 'UA-189817928-6',
    },
    staging: {
        [sdk_1.ChainId.MAINNET]: 'UA-189817928-2',
        [sdk_1.ChainId.ALFAJORES]: 'UA-189817928-3',
        [sdk_1.ChainId.BAKLAVA]: 'UA-189817928-7',
    },
};
const environment = window.location.hostname.includes('app-staging')
    ? 'staging'
    : window.location.hostname.includes('ubeswap.org')
        ? 'production'
        : (_b = (_a = process.env.REACT_APP_SENTRY_ENVIRONMENT) !== null && _a !== void 0 ? _a : process.env.REACT_APP_VERCEL_ENV) !== null && _b !== void 0 ? _b : null;
// google analytics
const analyticsEnv = environment
    ? environment in GOOGLE_ANALYTICS_IDS
        ? environment
        : 'staging'
    : null;
const GOOGLE_ANALYTICS_ID = analyticsEnv ? GOOGLE_ANALYTICS_IDS[analyticsEnv][index_1.NETWORK_CHAIN_ID] : null;
if (GOOGLE_ANALYTICS_ID) {
    console.log(`Initializing GA at ${GOOGLE_ANALYTICS_ID} (${analyticsEnv} ${index_1.NETWORK_CHAIN_NAME})`);
    react_ga_1.default.initialize(GOOGLE_ANALYTICS_ID);
    react_ga_1.default.set({
        customBrowserType: !react_device_detect_1.isMobile ? 'desktop' : 'web3' in window || 'celo' in window ? 'mobileWeb3' : 'mobileRegular',
    });
}
else {
    console.log(`Could not initialize GA (${analyticsEnv} ${index_1.NETWORK_CHAIN_NAME})`);
    react_ga_1.default.initialize('test', { testMode: true, debug: true });
}
if (process.env.REACT_APP_SENTRY_DSN) {
    const sentryCfg = {
        environment: (_c = process.env.REACT_APP_SENTRY_ENVIRONMENT) !== null && _c !== void 0 ? _c : `${(_d = process.env.REACT_APP_VERCEL_ENV) !== null && _d !== void 0 ? _d : 'unknown'}`,
        release: (_e = process.env.REACT_APP_SENTRY_RELEASE) !== null && _e !== void 0 ? _e : `${(_g = (_f = process.env.REACT_APP_VERCEL_GIT_COMMIT_REF) === null || _f === void 0 ? void 0 : _f.replace(/\//g, '--')) !== null && _g !== void 0 ? _g : 'unknown'}-${(_h = process.env.REACT_APP_VERCEL_GIT_COMMIT_SHA) !== null && _h !== void 0 ? _h : 'unknown'}`,
    };
    Sentry.init(Object.assign({ dsn: process.env.REACT_APP_SENTRY_DSN, integrations: [new tracing_1.Integrations.BrowserTracing()], tracesSampleRate: 0.2 }, sentryCfg));
    console.log(`Initializing Sentry environment at release ${sentryCfg.release} in environment ${sentryCfg.environment}`);
}
else {
    console.warn(`REACT_APP_SENTRY_DSN not found. Sentry will not be loaded.`);
}
// react GA error tracking
window.addEventListener('error', (error) => {
    react_ga_1.default.exception({
        description: `${error.message} @ ${error.filename}:${error.lineno}:${error.colno}`,
        fatal: true,
    });
});
function Updaters() {
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(updater_2.default, {}, void 0), (0, jsx_runtime_1.jsx)(updater_5.default, {}, void 0), (0, jsx_runtime_1.jsx)(updater_1.default, {}, void 0), (0, jsx_runtime_1.jsx)(updater_4.default, {}, void 0), (0, jsx_runtime_1.jsx)(updater_3.default, {}, void 0)] }, void 0));
}
const Marginer = styled_components_1.default.div `
  margin-top: 5rem;
`;
const BodyWrapper = styled_components_1.default.div `
  display: flex;
  align-items: center;
  flex-direction: column;
  max-width: 420px;
`;
function Swap({ useDarkMode }) {
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(theme_1.FixedGlobalStyle, {}, void 0), (0, jsx_runtime_1.jsx)(use_contractkit_1.ContractKitProvider, Object.assign({ dapp: {
                    name: 'Ubeswap',
                    description: 'The interface for Ubeswap, a decentralized exchange and automated market maker protocol for Celo assets.',
                    url: 'https://app.ubeswap.org',
                    icon: 'https://info.ubeswap.org/favicon.png',
                }, network: networks_1.Mainnet, networks: [networks_1.Mainnet, networks_1.Alfajores], connectModal: {
                    reactModalProps: {
                        style: {
                            content: {
                                top: '50%',
                                left: '50%',
                                right: 'auto',
                                bottom: 'auto',
                                transform: 'translate(-50%, -50%)',
                                border: 'unset',
                                background: 'unset',
                                padding: 'unset',
                                color: 'black',
                            },
                            overlay: {
                                zIndex: 100,
                            },
                        },
                        overlayClassName: 'tw-fixed tw-bg-gray-100 dark:tw-bg-gray-700 tw-bg-opacity-75 tw-inset-0',
                    },
                } }, { children: (0, jsx_runtime_1.jsx)(react_redux_1.Provider, Object.assign({ store: state_1.default }, { children: (0, jsx_runtime_1.jsxs)(client_1.ApolloProvider, Object.assign({ client: client }, { children: [(0, jsx_runtime_1.jsx)(Updaters, {}, void 0), (0, jsx_runtime_1.jsx)(theme_1.default, { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.HashRouter, { children: (0, jsx_runtime_1.jsxs)(react_2.Suspense, Object.assign({ fallback: null }, { children: [(0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { component: GoogleAnalyticsReporter_1.default }, void 0), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { component: DarkModeQueryParamReader_1.default }, void 0), (0, jsx_runtime_1.jsx)(URLWarning_1.default, {}, void 0), (0, jsx_runtime_1.jsxs)(BodyWrapper, { children: [(0, jsx_runtime_1.jsx)(Popups_1.default, {}, void 0), (0, jsx_runtime_1.jsx)(Polling_1.default, {}, void 0), (0, jsx_runtime_1.jsx)(react_1.ErrorBoundary, Object.assign({ fallback: (0, jsx_runtime_1.jsx)("p", { children: "An unexpected error occured on this part of the page. Please reload." }, void 0) }, { children: (0, jsx_runtime_1.jsx)(SwapBody_1.default, { useDarkMode: useDarkMode !== null && useDarkMode !== void 0 ? useDarkMode : false }, void 0) }), void 0), (0, jsx_runtime_1.jsx)(Marginer, {}, void 0)] }, void 0)] }), void 0) }, void 0) }, void 0)] }), void 0) }), void 0) }), void 0)] }, void 0));
}
exports.default = Swap;
