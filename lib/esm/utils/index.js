import { getAddress } from '@ethersproject/address';
import { BigNumber } from '@ethersproject/bignumber';
import { AddressZero } from '@ethersproject/constants';
import { Contract } from '@ethersproject/contracts';
import { JSBI, Percent, Token } from '@ubeswap/sdk';
import { ROUTER_ADDRESS, UBESWAP_MOOLA_ROUTER_ADDRESS } from '../constants';
import IUniswapV2Router02ABI from '../constants/abis/IUniswapV2Router02.json';
import UbeswapMoolaRouterABI from '../constants/abis/UbeswapMoolaRouter.json';
// returns the checksummed address if the address is valid, otherwise returns false
export function isAddress(value) {
    try {
        return getAddress(value);
    }
    catch (_a) {
        return false;
    }
}
// shorten the checksummed version of the input address to have 0x + 4 characters at start and end
export function shortenAddress(address, chars = 4) {
    const parsed = isAddress(address);
    if (!parsed) {
        throw Error(`Invalid 'address' parameter '${address}'.`);
    }
    return `${parsed.substring(0, chars + 2)}...${parsed.substring(42 - chars)}`;
}
// add 100%
export function calculateGasMargin(value) {
    return value.mul(BigNumber.from(2));
}
// converts a basis points value to a sdk percent
export function basisPointsToPercent(num) {
    return new Percent(JSBI.BigInt(num), JSBI.BigInt(10000));
}
export function calculateSlippageAmount(value, slippage) {
    if (slippage < 0 || slippage > 10000) {
        throw Error(`Unexpected slippage value: ${slippage}`);
    }
    return [
        JSBI.divide(JSBI.multiply(value.raw, JSBI.BigInt(10000 - slippage)), JSBI.BigInt(10000)),
        JSBI.divide(JSBI.multiply(value.raw, JSBI.BigInt(10000 + slippage)), JSBI.BigInt(10000)),
    ];
}
// account is not optional
export function getSigner(library, account) {
    return library.getSigner(account).connectUnchecked();
}
// account is optional
export function getProviderOrSigner(library, account) {
    return account ? getSigner(library, account) : library;
}
// account is optional
export function getContract(address, ABI, library, account) {
    if (!isAddress(address) || address === AddressZero) {
        throw Error(`Invalid 'address' parameter '${address}'.`);
    }
    return new Contract(address, ABI, getProviderOrSigner(library, account));
}
// account is optional
export function getRouterContract(_, library, account) {
    return getContract(ROUTER_ADDRESS, IUniswapV2Router02ABI, library, account);
}
export function getMoolaRouterContract(_, library, account) {
    return getContract(UBESWAP_MOOLA_ROUTER_ADDRESS, UbeswapMoolaRouterABI, library, account);
}
export function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}
export function isTokenOnList(defaultTokens, currency) {
    var _a;
    return Boolean(currency instanceof Token && ((_a = defaultTokens[currency.chainId]) === null || _a === void 0 ? void 0 : _a[currency.address]));
}
