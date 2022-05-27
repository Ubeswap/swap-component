var _a, _b, _c, _d, _e, _f, _g, _h;
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import '../i18n';
import '@celo-tools/use-contractkit/lib/styles.css';
import '../index.css';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { ContractKitProvider } from '@celo-tools/use-contractkit';
import { ErrorBoundary } from '@sentry/react';
import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';
import { ChainId } from '@ubeswap/sdk';
import { NETWORK_CHAIN_ID, NETWORK_CHAIN_NAME } from 'connectors/index';
import { Suspense } from 'react';
import { isMobile } from 'react-device-detect';
import ReactGA from 'react-ga';
import { Provider } from 'react-redux';
import { HashRouter, Route } from 'react-router-dom';
import styled from 'styled-components';
import GoogleAnalyticsReporter from '../components/analytics/GoogleAnalyticsReporter';
import Polling from '../components/Header/Polling';
import URLWarning from '../components/Header/URLWarning';
import Popups from '../components/Popups';
import { Alfajores, Mainnet } from '../networks';
import store from '../state';
import ApplicationUpdater from '../state/application/updater';
import ListsUpdater from '../state/lists/updater';
import MulticallUpdater from '../state/multicall/updater';
import TransactionUpdater from '../state/transactions/updater';
import UserUpdater from '../state/user/updater';
import ThemeProvider, { FixedGlobalStyle } from '../theme';
import DarkModeQueryParamReader from '../theme/DarkModeQueryParamReader';
import SwapBody from './SwapBody';
if (window.celo) {
    window.celo.autoRefreshOnNetworkChange = false;
}
const client = new ApolloClient({
    uri: 'https://api.thegraph.com/subgraphs/name/ubeswap/ubeswap',
    cache: new InMemoryCache(),
});
const GOOGLE_ANALYTICS_IDS = {
    production: {
        [ChainId.MAINNET]: 'UA-189817928-4',
        [ChainId.ALFAJORES]: 'UA-189817928-5',
        [ChainId.BAKLAVA]: 'UA-189817928-6',
    },
    staging: {
        [ChainId.MAINNET]: 'UA-189817928-2',
        [ChainId.ALFAJORES]: 'UA-189817928-3',
        [ChainId.BAKLAVA]: 'UA-189817928-7',
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
const GOOGLE_ANALYTICS_ID = analyticsEnv ? GOOGLE_ANALYTICS_IDS[analyticsEnv][NETWORK_CHAIN_ID] : null;
if (GOOGLE_ANALYTICS_ID) {
    console.log(`Initializing GA at ${GOOGLE_ANALYTICS_ID} (${analyticsEnv} ${NETWORK_CHAIN_NAME})`);
    ReactGA.initialize(GOOGLE_ANALYTICS_ID);
    ReactGA.set({
        customBrowserType: !isMobile ? 'desktop' : 'web3' in window || 'celo' in window ? 'mobileWeb3' : 'mobileRegular',
    });
}
else {
    console.log(`Could not initialize GA (${analyticsEnv} ${NETWORK_CHAIN_NAME})`);
    ReactGA.initialize('test', { testMode: true, debug: true });
}
if (process.env.REACT_APP_SENTRY_DSN) {
    const sentryCfg = {
        environment: (_c = process.env.REACT_APP_SENTRY_ENVIRONMENT) !== null && _c !== void 0 ? _c : `${(_d = process.env.REACT_APP_VERCEL_ENV) !== null && _d !== void 0 ? _d : 'unknown'}`,
        release: (_e = process.env.REACT_APP_SENTRY_RELEASE) !== null && _e !== void 0 ? _e : `${(_g = (_f = process.env.REACT_APP_VERCEL_GIT_COMMIT_REF) === null || _f === void 0 ? void 0 : _f.replace(/\//g, '--')) !== null && _g !== void 0 ? _g : 'unknown'}-${(_h = process.env.REACT_APP_VERCEL_GIT_COMMIT_SHA) !== null && _h !== void 0 ? _h : 'unknown'}`,
    };
    Sentry.init(Object.assign({ dsn: process.env.REACT_APP_SENTRY_DSN, integrations: [new Integrations.BrowserTracing()], tracesSampleRate: 0.2 }, sentryCfg));
    console.log(`Initializing Sentry environment at release ${sentryCfg.release} in environment ${sentryCfg.environment}`);
}
else {
    console.warn(`REACT_APP_SENTRY_DSN not found. Sentry will not be loaded.`);
}
// react GA error tracking
window.addEventListener('error', (error) => {
    ReactGA.exception({
        description: `${error.message} @ ${error.filename}:${error.lineno}:${error.colno}`,
        fatal: true,
    });
});
function Updaters() {
    return (_jsxs(_Fragment, { children: [_jsx(ListsUpdater, {}, void 0), _jsx(UserUpdater, {}, void 0), _jsx(ApplicationUpdater, {}, void 0), _jsx(TransactionUpdater, {}, void 0), _jsx(MulticallUpdater, {}, void 0)] }, void 0));
}
const Marginer = styled.div `
  margin-top: 5rem;
`;
const BodyWrapper = styled.div `
  display: flex;
  align-items: center;
  flex-direction: column;
  max-width: 420px;
`;
export default function Swap({ useDarkMode }) {
    return (_jsxs(_Fragment, { children: [_jsx(FixedGlobalStyle, {}, void 0), _jsx(ContractKitProvider, Object.assign({ dapp: {
                    name: 'Ubeswap',
                    description: 'The interface for Ubeswap, a decentralized exchange and automated market maker protocol for Celo assets.',
                    url: 'https://app.ubeswap.org',
                    icon: 'https://info.ubeswap.org/favicon.png',
                }, network: Mainnet, networks: [Mainnet, Alfajores], connectModal: {
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
                } }, { children: _jsx(Provider, Object.assign({ store: store }, { children: _jsxs(ApolloProvider, Object.assign({ client: client }, { children: [_jsx(Updaters, {}, void 0), _jsx(ThemeProvider, { children: _jsx(HashRouter, { children: _jsxs(Suspense, Object.assign({ fallback: null }, { children: [_jsx(Route, { component: GoogleAnalyticsReporter }, void 0), _jsx(Route, { component: DarkModeQueryParamReader }, void 0), _jsx(URLWarning, {}, void 0), _jsxs(BodyWrapper, { children: [_jsx(Popups, {}, void 0), _jsx(Polling, {}, void 0), _jsx(ErrorBoundary, Object.assign({ fallback: _jsx("p", { children: "An unexpected error occured on this part of the page. Please reload." }, void 0) }, { children: _jsx(SwapBody, { useDarkMode: useDarkMode !== null && useDarkMode !== void 0 ? useDarkMode : false }, void 0) }), void 0), _jsx(Marginer, {}, void 0)] }, void 0)] }), void 0) }, void 0) }, void 0)] }), void 0) }), void 0) }), void 0)] }, void 0));
}
