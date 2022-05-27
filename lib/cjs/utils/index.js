"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isTokenOnList = exports.escapeRegExp = exports.getMoolaRouterContract = exports.getRouterContract = exports.getContract = exports.getProviderOrSigner = exports.getSigner = exports.calculateSlippageAmount = exports.basisPointsToPercent = exports.calculateGasMargin = exports.shortenAddress = exports.isAddress = void 0;
const address_1 = require("@ethersproject/address");
const bignumber_1 = require("@ethersproject/bignumber");
const constants_1 = require("@ethersproject/constants");
const contracts_1 = require("@ethersproject/contracts");
const sdk_1 = require("@ubeswap/sdk");
const constants_2 = require("../constants");
const IUniswapV2Router02_json_1 = __importDefault(require("../constants/abis/IUniswapV2Router02.json"));
const UbeswapMoolaRouter_json_1 = __importDefault(require("../constants/abis/UbeswapMoolaRouter.json"));
// returns the checksummed address if the address is valid, otherwise returns false
function isAddress(value) {
    try {
        return (0, address_1.getAddress)(value);
    }
    catch (_a) {
        return false;
    }
}
exports.isAddress = isAddress;
// shorten the checksummed version of the input address to have 0x + 4 characters at start and end
function shortenAddress(address, chars = 4) {
    const parsed = isAddress(address);
    if (!parsed) {
        throw Error(`Invalid 'address' parameter '${address}'.`);
    }
    return `${parsed.substring(0, chars + 2)}...${parsed.substring(42 - chars)}`;
}
exports.shortenAddress = shortenAddress;
// add 100%
function calculateGasMargin(value) {
    return value.mul(bignumber_1.BigNumber.from(2));
}
exports.calculateGasMargin = calculateGasMargin;
// converts a basis points value to a sdk percent
function basisPointsToPercent(num) {
    return new sdk_1.Percent(sdk_1.JSBI.BigInt(num), sdk_1.JSBI.BigInt(10000));
}
exports.basisPointsToPercent = basisPointsToPercent;
function calculateSlippageAmount(value, slippage) {
    if (slippage < 0 || slippage > 10000) {
        throw Error(`Unexpected slippage value: ${slippage}`);
    }
    return [
        sdk_1.JSBI.divide(sdk_1.JSBI.multiply(value.raw, sdk_1.JSBI.BigInt(10000 - slippage)), sdk_1.JSBI.BigInt(10000)),
        sdk_1.JSBI.divide(sdk_1.JSBI.multiply(value.raw, sdk_1.JSBI.BigInt(10000 + slippage)), sdk_1.JSBI.BigInt(10000)),
    ];
}
exports.calculateSlippageAmount = calculateSlippageAmount;
// account is not optional
function getSigner(library, account) {
    return library.getSigner(account).connectUnchecked();
}
exports.getSigner = getSigner;
// account is optional
function getProviderOrSigner(library, account) {
    return account ? getSigner(library, account) : library;
}
exports.getProviderOrSigner = getProviderOrSigner;
// account is optional
function getContract(address, ABI, library, account) {
    if (!isAddress(address) || address === constants_1.AddressZero) {
        throw Error(`Invalid 'address' parameter '${address}'.`);
    }
    return new contracts_1.Contract(address, ABI, getProviderOrSigner(library, account));
}
exports.getContract = getContract;
// account is optional
function getRouterContract(_, library, account) {
    return getContract(constants_2.ROUTER_ADDRESS, IUniswapV2Router02_json_1.default, library, account);
}
exports.getRouterContract = getRouterContract;
function getMoolaRouterContract(_, library, account) {
    return getContract(constants_2.UBESWAP_MOOLA_ROUTER_ADDRESS, UbeswapMoolaRouter_json_1.default, library, account);
}
exports.getMoolaRouterContract = getMoolaRouterContract;
function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}
exports.escapeRegExp = escapeRegExp;
function isTokenOnList(defaultTokens, currency) {
    var _a;
    return Boolean(currency instanceof sdk_1.Token && ((_a = defaultTokens[currency.chainId]) === null || _a === void 0 ? void 0 : _a[currency.address]));
}
exports.isTokenOnList = isTokenOnList;
