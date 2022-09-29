var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsxs as _jsxs } from "react/jsx-runtime";
import { ChainId } from '@ubeswap/sdk';
import { useTranslation } from 'react-i18next';
import { NETWORK_CHAIN_ID } from '../../connectors';
import { Button } from '../../theme';
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
    [ChainId.MAINNET]: CELO_PARAMS,
    [ChainId.ALFAJORES]: ALFAJORES_PARAMS,
    [ChainId.BAKLAVA]: BAKLAVA_PARAMS,
};
export const CeloConnector = () => {
    const { t } = useTranslation();
    const chainParams = params[NETWORK_CHAIN_ID];
    return (_jsxs(Button, Object.assign({ onClick: () => __awaiter(void 0, void 0, void 0, function* () {
            var _a;
            yield ((_a = window.ethereum) === null || _a === void 0 ? void 0 : _a.request({
                method: 'wallet_addEthereumChain',
                params: [chainParams],
            }));
        }) }, { children: [t('SwitchToThe'), " ", chainParams.chainName, " ", t('Network')] })));
};
