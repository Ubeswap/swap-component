import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import '../i18n';
import '@celo-tools/use-contractkit/lib/styles.css';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { ContractKitProvider } from '@celo-tools/use-contractkit';
import { ErrorBoundary } from '@sentry/react';
import { Suspense, useEffect, useState } from 'react';
import ReactGA from 'react-ga';
import { Provider } from 'react-redux';
import { HashRouter, Route } from 'react-router-dom';
import styled from 'styled-components';
import GoogleAnalyticsReporter from '../components/analytics/GoogleAnalyticsReporter';
import Polling from '../components/Header/Polling';
import Popups from '../components/Popups';
import { Alfajores, Mainnet } from '../networks';
import store from '../state';
import ApplicationUpdater from '../state/application/updater';
import ListsUpdater from '../state/lists/updater';
import MulticallUpdater from '../state/multicall/updater';
import TransactionUpdater from '../state/transactions/updater';
import UserUpdater from '../state/user/updater';
import ThemeProvider, { ThemedGlobalStyle } from '../theme';
import DarkModeQueryParamReader from '../theme/DarkModeQueryParamReader';
import SwapBody from './SwapBody';
if (window.celo) {
    window.celo.autoRefreshOnNetworkChange = false;
}
const client = new ApolloClient({
    uri: 'https://api.thegraph.com/subgraphs/name/ubeswap/ubeswap',
    cache: new InMemoryCache(),
});
// const GOOGLE_ANALYTICS_IDS = {
//   production: {
//     [ChainId.MAINNET]: 'UA-189817928-4',
//     [ChainId.ALFAJORES]: 'UA-189817928-5',
//     [ChainId.BAKLAVA]: 'UA-189817928-6',
//   },
//   staging: {
//     [ChainId.MAINNET]: 'UA-189817928-2',
//     [ChainId.ALFAJORES]: 'UA-189817928-3',
//     [ChainId.BAKLAVA]: 'UA-189817928-7',
//   },
// }
// const environment = window.location.hostname.includes('app-staging')
//   ? 'staging'
//   : window.location.hostname.includes('ubeswap.org')
//   ? 'production'
//   : process.env.REACT_APP_SENTRY_ENVIRONMENT ?? process.env.REACT_APP_VERCEL_ENV ?? null
// // google analytics
// const analyticsEnv: 'staging' | 'production' | null = environment
//   ? environment in GOOGLE_ANALYTICS_IDS
//     ? (environment as keyof typeof GOOGLE_ANALYTICS_IDS)
//     : 'staging'
//   : null
// const GOOGLE_ANALYTICS_ID = analyticsEnv ? GOOGLE_ANALYTICS_IDS[analyticsEnv][NETWORK_CHAIN_ID] : null
// if (GOOGLE_ANALYTICS_ID) {
//   console.log(`Initializing GA at ${GOOGLE_ANALYTICS_ID} (${analyticsEnv} ${NETWORK_CHAIN_NAME})`)
//   ReactGA.initialize(GOOGLE_ANALYTICS_ID)
//   ReactGA.set({
//     customBrowserType: !isMobile ? 'desktop' : 'web3' in window || 'celo' in window ? 'mobileWeb3' : 'mobileRegular',
//   })
// } else {
//   console.log(`Could not initialize GA (${analyticsEnv} ${NETWORK_CHAIN_NAME})`)
//   ReactGA.initialize('test', { testMode: true, debug: true })
// }
// if (process.env.REACT_APP_SENTRY_DSN) {
//   const sentryCfg = {
//     environment: process.env.REACT_APP_SENTRY_ENVIRONMENT ?? `${process.env.REACT_APP_VERCEL_ENV ?? 'unknown'}`,
//     release:
//       process.env.REACT_APP_SENTRY_RELEASE ??
//       `${process.env.REACT_APP_VERCEL_GIT_COMMIT_REF?.replace(/\//g, '--') ?? 'unknown'}-${
//         process.env.REACT_APP_VERCEL_GIT_COMMIT_SHA ?? 'unknown'
//       }`,
//   }
//   Sentry.init({
//     dsn: process.env.REACT_APP_SENTRY_DSN,
//     integrations: [new Integrations.BrowserTracing()],
//     tracesSampleRate: 0.2,
//     ...sentryCfg,
//   })
//   console.log(`Initializing Sentry environment at release ${sentryCfg.release} in environment ${sentryCfg.environment}`)
// } else {
//   console.warn(`REACT_APP_SENTRY_DSN not found. Sentry will not be loaded.`)
// }
// react GA error tracking
window.addEventListener('error', (error) => {
    ReactGA.exception({
        description: `${error.message} @ ${error.filename}:${error.lineno}:${error.colno}`,
        fatal: true,
    });
});
function Updaters() {
    return (_jsxs(_Fragment, { children: [_jsx(ListsUpdater, {}), _jsx(UserUpdater, {}), _jsx(ApplicationUpdater, {}), _jsx(TransactionUpdater, {}), _jsx(MulticallUpdater, {})] }));
}
const Marginer = styled.div `
  margin-top: 5rem;
`;
const BodyWrapper = styled.div `
  display: flex;
  align-items: center;
  flex-direction: column;
  max-width: 420px;
  width: 100%;
  color: ${({ color }) => (color ? color : 'unset')};
  font-family: ${({ fontFamily }) => (fontFamily ? fontFamily : 'unset')};
`;
export default function Swap({ accountInfo, theme, defaultSwapToken, tokenLists, minimaPartnerId, onConnectWallet, }) {
    const [defaultTokenLists, setDefaultTokenLists] = useState([]);
    useEffect(() => {
        const allTokens = tokenLists === null || tokenLists === void 0 ? void 0 : tokenLists.reduce((prevList, curList) => [...prevList, ...curList], []);
        const uniqueTokens = allTokens === null || allTokens === void 0 ? void 0 : allTokens.filter((token, i) => {
            const duplicatedToken = allTokens.find((_token) => token.chainId === _token.chainId && token.address === _token.address);
            const indexOfDuplicatedToken = duplicatedToken ? allTokens.indexOf(duplicatedToken) : -1;
            return i == indexOfDuplicatedToken;
        });
        setDefaultTokenLists(uniqueTokens);
    }, [tokenLists]);
    return (_jsx(_Fragment, { children: _jsx(ContractKitProvider, Object.assign({ dapp: {
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
            } }, { children: _jsx(Provider, Object.assign({ store: store }, { children: _jsxs(ApolloProvider, Object.assign({ client: client }, { children: [_jsx(Updaters, {}), _jsxs(ThemeProvider, { children: [_jsx(ThemedGlobalStyle, {}), _jsx(HashRouter, { children: _jsxs(Suspense, Object.assign({ fallback: null }, { children: [_jsx(Route, { component: GoogleAnalyticsReporter }), _jsx(Route, { component: DarkModeQueryParamReader }), _jsxs(BodyWrapper, Object.assign({ fontFamily: theme === null || theme === void 0 ? void 0 : theme.fontFamily }, { children: [_jsx(Popups, {}), _jsx(Polling, {}), _jsx(ErrorBoundary, Object.assign({ fallback: _jsx("p", { children: "An unexpected error occured on this part of the page. Please reload." }) }, { children: _jsx(SwapBody, { accountInfo: accountInfo, theme: theme, defaultSwapToken: defaultSwapToken, defaultTokenLists: defaultTokenLists, minimaPartnerId: minimaPartnerId, onConnectWallet: onConnectWallet }) })), _jsx(Marginer, {})] }))] })) })] })] })) })) })) }));
}
