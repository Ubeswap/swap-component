"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.chains = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const use_contractkit_1 = require("@celo-tools/use-contractkit");
const CurrencyLogo_1 = __importDefault(require("components/CurrencyLogo"));
const react_1 = require("react");
const hooks_1 = require("state/lists/hooks");
const styled_components_1 = __importDefault(require("styled-components"));
const networks_1 = require("../../networks");
const Modal_1 = __importDefault(require("../Modal"));
const ChainSelect = styled_components_1.default.div({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '12px 64px',
    border: '1px solid rgba(255, 255, 255, 0.4)',
    cursor: 'pointer',
    borderRadius: '20px',
    ':hover': {
        opacity: 0.7,
    },
    width: '100%',
    marginBottom: '16px',
});
exports.chains = [
    {
        network: use_contractkit_1.EthereumMainnet,
        token: new hooks_1.WrappedTokenInfo({
            name: 'Wrapped Ether',
            address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
            symbol: 'WETH',
            decimals: 18,
            chainId: 1,
            logoURI: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png',
        }, []),
        name: 'ethereum',
        prettyName: 'Ethereum',
        domain: 6648936,
        bridgeRouter: '0x6a39909e805A3eaDd2b61fFf61147796ca6aBB47',
    },
    {
        network: networks_1.Mainnet,
        token: new hooks_1.WrappedTokenInfo({
            address: '0x471EcE3750Da237f93B8E339c536989b8978a438',
            name: 'Celo',
            symbol: 'CELO',
            chainId: 42220,
            decimals: 18,
            logoURI: 'https://raw.githubusercontent.com/ubeswap/default-token-list/master/assets/asset_CELO.png',
        }, []),
        name: 'celo',
        prettyName: 'Celo',
        domain: 1667591279,
        bridgeRouter: '0xf244eA81F715F343040569398A4E7978De656bf6',
    },
    ...(process.env.NODE_ENV !== 'production'
        ? [
            {
                network: use_contractkit_1.Kovan,
                token: new hooks_1.WrappedTokenInfo({
                    name: 'Wrapped Ether',
                    address: '0xd0a1e359811322d97991e03f863a0c30c2cf029c',
                    symbol: 'WETH',
                    decimals: 18,
                    chainId: 42,
                    logoURI: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png',
                }, []),
                name: 'kovan',
                prettyName: 'Kovan',
                domain: 3000,
                bridgeRouter: '0x383Eb849c707fE38f3DfBF45679C0c6f21Ba82fF',
            },
        ]
        : []),
    ...(process.env.NODE_ENV !== 'production'
        ? [
            {
                network: networks_1.Alfajores,
                token: new hooks_1.WrappedTokenInfo({
                    address: '0xF194afDf50B03e69Bd7D057c1Aa9e10c9954E4C9',
                    name: 'Celo',
                    symbol: 'CELO',
                    chainId: 44787,
                    decimals: 18,
                    logoURI: 'https://raw.githubusercontent.com/ubeswap/default-token-list/master/assets/asset_CELO.png',
                }, []),
                name: 'alfajores',
                prettyName: 'Alfajores',
                domain: 1000,
                bridgeRouter: '0xdaa6e362f9BE0CDaCe107b298639034b8dEC617a',
            },
        ]
        : []),
];
function ChainSearchModal({ isOpen, onDismiss, onChainSelect }) {
    const handleChainSelect = (0, react_1.useCallback)((chain) => {
        onChainSelect(chain);
        onDismiss();
    }, [onDismiss, onChainSelect]);
    return ((0, jsx_runtime_1.jsx)(Modal_1.default, Object.assign({ isOpen: isOpen, onDismiss: onDismiss, maxHeight: 60, minHeight: 60 }, { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ style: { padding: '48px', width: '100%' } }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ style: { marginBottom: '16px' } }, { children: (0, jsx_runtime_1.jsx)("span", { children: "Select chain" }, void 0) }), void 0), (0, jsx_runtime_1.jsx)("div", Object.assign({ style: { display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' } }, { children: exports.chains.map((chain, idx) => ((0, jsx_runtime_1.jsxs)(ChainSelect, Object.assign({ onClick: () => handleChainSelect(chain) }, { children: [(0, jsx_runtime_1.jsx)(CurrencyLogo_1.default, { currency: chain.token, style: { marginRight: '8px' } }, void 0), (0, jsx_runtime_1.jsx)("span", { children: chain.prettyName }, void 0)] }), idx))) }), void 0)] }), void 0) }), void 0));
}
exports.default = ChainSearchModal;
