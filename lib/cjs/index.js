"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
require("./i18n");
require("@celo-tools/use-contractkit/lib/styles.css");
const react_1 = __importDefault(require("react"));
const react_dom_1 = __importDefault(require("react-dom"));
const Swap_1 = __importDefault(require("./pages/Swap"));
react_dom_1.default.render((0, jsx_runtime_1.jsx)(react_1.default.StrictMode, { children: (0, jsx_runtime_1.jsx)(Swap_1.default
    // defaultSwapToken={{
    //   address: '0x00400FcbF0816bebB94654259de7273f4A05c762',
    //   name: 'Poof',
    //   symbol: 'POOF',
    //   chainId: 42220,
    //   decimals: 18,
    //   logoURI: 'https://raw.githubusercontent.com/ubeswap/default-token-list/master/assets/asset_POOF.png',
    // }}
    // minimaPartnerId={'115792089237316195423570985008687907853269984665640564039457584007913129639935'}
    // tokenLists={[
    //   [
    //     {
    //       address: '0x00400FcbF0816bebB94654259de7273f4A05c762',
    //       name: 'Poof',
    //       symbol: 'POOF',
    //       chainId: 42220,
    //       decimals: 18,
    //       logoURI: 'https://raw.githubusercontent.com/ubeswap/default-token-list/master/assets/asset_POOF.png',
    //     },
    //   ],
    //   [
    //     {
    //       address: '0xEadf4A7168A82D30Ba0619e64d5BCf5B30B45226',
    //       name: 'Poof USD',
    //       symbol: 'pUSD',
    //       chainId: 42220,
    //       decimals: 18,
    //       logoURI: 'https://raw.githubusercontent.com/ubeswap/default-token-list/master/assets/asset_pUSD.png',
    //     },
    //     {
    //       address: '0xEe9801669C6138E84bD50dEB500827b776777d28',
    //       name: 'O3 Swap Token',
    //       symbol: 'O3',
    //       decimals: 18,
    //       chainId: 42220,
    //       logoURI: 'https://raw.githubusercontent.com/ubeswap/default-token-list/master/assets/asset_O3.png',
    //     },
    //   ],
    //   [
    //     {
    //       address: '0xEe9801669C6138E84bD50dEB500827b776777d28',
    //       name: 'O3 Swap Token',
    //       symbol: 'O3',
    //       decimals: 18,
    //       chainId: 42220,
    //       logoURI: 'https://raw.githubusercontent.com/ubeswap/default-token-list/master/assets/asset_O3.png',
    //     },
    //     {
    //       address: '0xef4229c8c3250C675F21BCefa42f58EfbfF6002a',
    //       name: 'Optics v2 USDC',
    //       symbol: 'USDC',
    //       decimals: 6,
    //       chainId: 42220,
    //       logoURI: 'https://raw.githubusercontent.com/ubeswap/default-token-list/master/assets/asset_USDC.png',
    //     },
    //   ],
    // ]}
    // useDarkMode
    , {}) }), document.getElementById('root'));
exports.default = Swap_1.default;
