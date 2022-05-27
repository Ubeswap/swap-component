"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CeloConnector = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const sdk_1 = require("@ubeswap/sdk");
const react_i18next_1 = require("react-i18next");
const theme_1 = require("theme");
const connectors_1 = require("../../connectors");
const CELO_PARAMS = {
    chainId: '0xa4ec',
    chainName: 'Celo',
    nativeCurrency: { name: 'Celo', symbol: 'CELO', decimals: 18 },
    rpcUrls: ['https://forno.celo.org'],
    blockExplorerUrls: ['https://explorer.celo.org/'],
    iconUrls: ['future'],
};
const ALFAJORES_PARAMS = {
    chainId: '0xaef3',
    chainName: 'Alfajores Testnet',
    nativeCurrency: { name: 'Alfajores Celo', symbol: 'A-CELO', decimals: 18 },
    rpcUrls: ['https://alfajores-forno.celo-testnet.org'],
    blockExplorerUrls: ['https://alfajores-blockscout.celo-testnet.org/'],
    iconUrls: ['future'],
};
const BAKLAVA_PARAMS = {
    chainId: '0xf370',
    chainName: 'Baklava Testnet',
    nativeCurrency: { name: 'Baklava Celo', symbol: 'B-CELO', decimals: 18 },
    rpcUrls: ['https://baklava-forno.celo-testnet.org'],
    blockExplorerUrls: ['https://baklava-blockscout.celo-testnet.org/'],
    iconUrls: ['future'],
};
const params = {
    [sdk_1.ChainId.MAINNET]: CELO_PARAMS,
    [sdk_1.ChainId.ALFAJORES]: ALFAJORES_PARAMS,
    [sdk_1.ChainId.BAKLAVA]: BAKLAVA_PARAMS,
};
const CeloConnector = () => {
    const { t } = (0, react_i18next_1.useTranslation)();
    const chainParams = params[connectors_1.NETWORK_CHAIN_ID];
    return ((0, jsx_runtime_1.jsxs)(theme_1.Button, Object.assign({ onClick: () => __awaiter(void 0, void 0, void 0, function* () {
            var _a;
            yield ((_a = window.ethereum) === null || _a === void 0 ? void 0 : _a.request({
                method: 'wallet_addEthereumChain',
                params: [chainParams],
            }));
        }) }, { children: [t('SwitchToThe'), " ", chainParams.chainName, " ", t('Network')] }), void 0));
};
exports.CeloConnector = CeloConnector;
