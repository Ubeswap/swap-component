"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IMPORTED_FARMS = exports.ONE_HUNDRED_PERCENT = exports.ZERO_PERCENT = exports.BETTER_TRADE_LESS_HOPS_THRESHOLD = exports.MIN_ETH = exports.BLOCKED_PRICE_IMPACT_NON_EXPERT = exports.PRICE_IMPACT_WITHOUT_FEE_CONFIRM_MIN = exports.ALLOWED_PRICE_IMPACT_HIGH = exports.ALLOWED_PRICE_IMPACT_MEDIUM = exports.ALLOWED_PRICE_IMPACT_LOW = exports.BIPS_BASE = exports.ONE_BIPS = exports.BIG_INT_ZERO = exports.BIG_INT_SECONDS_IN_YEAR = exports.INT_SECONDS_IN_WEEK = exports.BIG_INT_SECONDS_IN_WEEK = exports.DEFAULT_DEADLINE_FROM_NOW = exports.INITIAL_ALLOWED_SLIPPAGE = exports.NetworkContextName = exports.PINNED_PAIRS = exports.BASES_TO_TRACK_LIQUIDITY_FOR = exports.SUGGESTED_BASES = exports.BASES_TO_CHECK_TRADES_AGAINST = exports.CEUR = exports.MCEUR = exports.MCELO = exports.MCUSD = exports.MCREAL = exports.POOF = exports.MULTICALL_ADDRESS = exports.ORDER_BOOK_REWARD_DISTRIBUTOR_ADDRESS = exports.ORDER_BOOK_ADDRESS = exports.LIMIT_ORDER_ADDRESS = exports.PROPOSAL_LENGTH_IN_SECS = exports.PROPOSAL_LENGTH_IN_BLOCKS = exports.AVERAGE_BLOCK_TIME_IN_SECS = exports.ZERO_ADDRESS = exports.UBESWAP_MOOLA_ROUTER_ADDRESS = exports.ROUTER_ADDRESS = exports.UBE = void 0;
const sdk_1 = require("@ubeswap/sdk");
const tokens_1 = require("./tokens");
var tokens_2 = require("./tokens");
Object.defineProperty(exports, "UBE", { enumerable: true, get: function () { return tokens_2.UBE; } });
exports.ROUTER_ADDRESS = '0xE3D8bd6Aed4F159bc8000a9cD47CffDb95F96121';
exports.UBESWAP_MOOLA_ROUTER_ADDRESS = '0x7d28570135a2b1930f331c507f65039d4937f66c';
exports.ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';
// Block time here is slightly higher (~1s) than average in order to avoid ongoing proposals past the displayed time
exports.AVERAGE_BLOCK_TIME_IN_SECS = 13;
exports.PROPOSAL_LENGTH_IN_BLOCKS = 40320;
exports.PROPOSAL_LENGTH_IN_SECS = exports.AVERAGE_BLOCK_TIME_IN_SECS * exports.PROPOSAL_LENGTH_IN_BLOCKS;
exports.LIMIT_ORDER_ADDRESS = {
    [sdk_1.ChainId.MAINNET]: '0x83013dCE53676F523dB8175832f2f3AD5B1fBb1f',
    [sdk_1.ChainId.ALFAJORES]: '0xb5911e904EEf100803D5d4bDb22ff1177324e7F3',
    [sdk_1.ChainId.BAKLAVA]: '',
};
exports.ORDER_BOOK_ADDRESS = {
    [sdk_1.ChainId.MAINNET]: '0x55e0E091a5a6f178B1b225E7369E8C91d4F64992',
    [sdk_1.ChainId.ALFAJORES]: '0x12553790998fa8d3CCCC2906192267576130DD3f',
    [sdk_1.ChainId.BAKLAVA]: '',
};
exports.ORDER_BOOK_REWARD_DISTRIBUTOR_ADDRESS = {
    [sdk_1.ChainId.MAINNET]: '0x3c57D786BdC33D30de25fE3f8b3fD3Fd3ff503e3',
    [sdk_1.ChainId.ALFAJORES]: '0x39F2854fC1786Bb0d0883FAf0F2a1c2fb458bCA8',
    [sdk_1.ChainId.BAKLAVA]: '',
};
exports.MULTICALL_ADDRESS = {
    [sdk_1.ChainId.MAINNET]: '0x75f59534dd892c1f8a7b172d639fa854d529ada3',
    [sdk_1.ChainId.ALFAJORES]: '0x387ce7960b5DA5381De08Ea4967b13a7c8cAB3f6',
    [sdk_1.ChainId.BAKLAVA]: '',
};
exports.POOF = {
    [sdk_1.ChainId.MAINNET]: new sdk_1.Token(sdk_1.ChainId.MAINNET, '0x00400FcbF0816bebB94654259de7273f4A05c762', 18, 'POOF', 'POOF'),
    [sdk_1.ChainId.ALFAJORES]: new sdk_1.Token(sdk_1.ChainId.ALFAJORES, '0x00400FcbF0816bebB94654259de7273f4A05c762', 18, 'POOF', 'POOF'),
};
exports.MCREAL = {
    [sdk_1.ChainId.MAINNET]: new sdk_1.Token(sdk_1.ChainId.MAINNET, '0x9802d866fdE4563d088a6619F7CeF82C0B991A55', 18, 'mCREAL', 'Moola cREAL'),
    [sdk_1.ChainId.ALFAJORES]: new sdk_1.Token(sdk_1.ChainId.ALFAJORES, '0x3D0EDA535ca4b15c739D46761d24E42e37664Ad7', 18, 'mCREAL', 'Moola cREAL'),
};
exports.MCUSD = {
    [sdk_1.ChainId.MAINNET]: new sdk_1.Token(sdk_1.ChainId.MAINNET, '0x918146359264C492BD6934071c6Bd31C854EDBc3', 18, 'mCUSD', 'Moola cUSD'),
    [sdk_1.ChainId.ALFAJORES]: new sdk_1.Token(sdk_1.ChainId.ALFAJORES, '0x71DB38719f9113A36e14F409bAD4F07B58b4730b', 18, 'mCUSD', 'Moola cUSD'),
    [sdk_1.ChainId.BAKLAVA]: null,
};
exports.MCELO = {
    [sdk_1.ChainId.MAINNET]: new sdk_1.Token(sdk_1.ChainId.MAINNET, '0x7D00cd74FF385c955EA3d79e47BF06bD7386387D', 18, 'mCELO', 'Moola CELO'),
    [sdk_1.ChainId.ALFAJORES]: new sdk_1.Token(sdk_1.ChainId.ALFAJORES, '0x86f61EB83e10e914fc6F321F5dD3c2dD4860a003', 18, 'mCELO', 'Moola CELO'),
};
exports.MCEUR = {
    [sdk_1.ChainId.MAINNET]: new sdk_1.Token(sdk_1.ChainId.MAINNET, '0xE273Ad7ee11dCfAA87383aD5977EE1504aC07568', 18, 'mCEUR', 'Moola Celo Euro'),
    [sdk_1.ChainId.ALFAJORES]: new sdk_1.Token(sdk_1.ChainId.ALFAJORES, '0x32974C7335e649932b5766c5aE15595aFC269160', 18, 'mCEUR', 'Moola Celo Euro'),
};
exports.CEUR = {
    [sdk_1.ChainId.ALFAJORES]: new sdk_1.Token(sdk_1.ChainId.ALFAJORES, '0x10c892A6EC43a53E45D0B916B4b7D383B1b78C0F', 18, 'cEUR', 'Celo Euro'),
    [sdk_1.ChainId.MAINNET]: new sdk_1.Token(sdk_1.ChainId.MAINNET, '0xD8763CBa276a3738E6DE85b4b3bF5FDed6D6cA73', 18, 'cEUR', 'Celo Euro'),
};
// used to construct intermediary pairs for trading
exports.BASES_TO_CHECK_TRADES_AGAINST = {
    [sdk_1.ChainId.MAINNET]: [sdk_1.cUSD, sdk_1.CELO, exports.CEUR, tokens_1.UBE, exports.MCUSD, exports.MCEUR, exports.MCELO, exports.POOF].map((el) => el[sdk_1.ChainId.MAINNET]),
    [sdk_1.ChainId.ALFAJORES]: [sdk_1.cUSD, sdk_1.CELO, exports.CEUR].map((el) => el[sdk_1.ChainId.ALFAJORES]),
    [sdk_1.ChainId.BAKLAVA]: [sdk_1.cUSD, sdk_1.CELO].map((el) => el[sdk_1.ChainId.BAKLAVA]),
};
// used for display in the default list when adding liquidity
exports.SUGGESTED_BASES = Object.assign(Object.assign({}, exports.BASES_TO_CHECK_TRADES_AGAINST), { [sdk_1.ChainId.MAINNET]: [exports.MCUSD, exports.MCEUR, sdk_1.CELO].map((el) => el[sdk_1.ChainId.MAINNET]), [sdk_1.ChainId.ALFAJORES]: [exports.MCUSD, exports.MCEUR, sdk_1.CELO].map((el) => el[sdk_1.ChainId.ALFAJORES]) });
// used to construct the list of all pairs we consider by default in the frontend
exports.BASES_TO_TRACK_LIQUIDITY_FOR = exports.BASES_TO_CHECK_TRADES_AGAINST;
exports.PINNED_PAIRS = {
    [sdk_1.ChainId.MAINNET]: [
        [sdk_1.cUSD, sdk_1.CELO],
        [exports.MCUSD, sdk_1.CELO],
        [exports.MCEUR, sdk_1.CELO],
        [exports.MCUSD, tokens_1.UBE],
        [exports.MCEUR, tokens_1.UBE],
    ].map((el) => el.map((t) => t[sdk_1.ChainId.MAINNET])),
    [sdk_1.ChainId.ALFAJORES]: [
        [sdk_1.cUSD, sdk_1.CELO],
        [exports.MCUSD, sdk_1.CELO],
    ].map((el) => el.map((t) => t[sdk_1.ChainId.ALFAJORES])),
    [sdk_1.ChainId.BAKLAVA]: [[sdk_1.cUSD[sdk_1.ChainId.BAKLAVA], sdk_1.CELO[sdk_1.ChainId.BAKLAVA]]],
};
exports.NetworkContextName = 'NETWORK';
// default allowed slippage, in bips
exports.INITIAL_ALLOWED_SLIPPAGE = 50;
// 20 minutes, denominated in seconds
exports.DEFAULT_DEADLINE_FROM_NOW = 60 * 20;
// used for rewards deadlines
exports.BIG_INT_SECONDS_IN_WEEK = sdk_1.JSBI.BigInt(60 * 60 * 24 * 7);
exports.INT_SECONDS_IN_WEEK = 60 * 60 * 24 * 7;
exports.BIG_INT_SECONDS_IN_YEAR = sdk_1.JSBI.BigInt(60 * 60 * 24 * 365);
exports.BIG_INT_ZERO = sdk_1.JSBI.BigInt(0);
// one basis point
exports.ONE_BIPS = new sdk_1.Percent(sdk_1.JSBI.BigInt(1), sdk_1.JSBI.BigInt(10000));
exports.BIPS_BASE = sdk_1.JSBI.BigInt(10000);
// used for warning states
exports.ALLOWED_PRICE_IMPACT_LOW = new sdk_1.Percent(sdk_1.JSBI.BigInt(100), exports.BIPS_BASE); // 1%
exports.ALLOWED_PRICE_IMPACT_MEDIUM = new sdk_1.Percent(sdk_1.JSBI.BigInt(300), exports.BIPS_BASE); // 3%
exports.ALLOWED_PRICE_IMPACT_HIGH = new sdk_1.Percent(sdk_1.JSBI.BigInt(500), exports.BIPS_BASE); // 5%
// if the price slippage exceeds this number, force the user to type 'confirm' to execute
exports.PRICE_IMPACT_WITHOUT_FEE_CONFIRM_MIN = new sdk_1.Percent(sdk_1.JSBI.BigInt(1000), exports.BIPS_BASE); // 10%
// for non expert mode disable swaps above this
exports.BLOCKED_PRICE_IMPACT_NON_EXPERT = new sdk_1.Percent(sdk_1.JSBI.BigInt(1500), exports.BIPS_BASE); // 15%
// used to ensure the user doesn't send so much ETH so they end up with <.01
exports.MIN_ETH = sdk_1.JSBI.exponentiate(sdk_1.JSBI.BigInt(10), sdk_1.JSBI.BigInt(16)); // .01 ETH
exports.BETTER_TRADE_LESS_HOPS_THRESHOLD = new sdk_1.Percent(sdk_1.JSBI.BigInt(50), sdk_1.JSBI.BigInt(10000));
exports.ZERO_PERCENT = new sdk_1.Percent('0');
exports.ONE_HUNDRED_PERCENT = new sdk_1.Percent('1');
exports.IMPORTED_FARMS = 'imported_farms';
