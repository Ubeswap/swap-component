import { JSBI, Percent, Token } from '@ubeswap/sdk';
export { UBE } from './tokens';
export declare const ROUTER_ADDRESS = "0xE3D8bd6Aed4F159bc8000a9cD47CffDb95F96121";
export declare const UBESWAP_MOOLA_ROUTER_ADDRESS = "0x7d28570135a2b1930f331c507f65039d4937f66c";
export declare const MINIMA_ROUTER_ADDRESS = "0xa730B463395f5ca07EcE5cefeccF7f45e1E2C9Bf";
export declare const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
declare type ChainTokenList = {
    readonly [chainId: number]: Token[];
};
export declare const AVERAGE_BLOCK_TIME_IN_SECS = 13;
export declare const PROPOSAL_LENGTH_IN_BLOCKS = 40320;
export declare const PROPOSAL_LENGTH_IN_SECS: number;
export declare const LIMIT_ORDER_ADDRESS: {
    42220: string;
    44787: string;
    62320: string;
};
export declare const ORDER_BOOK_ADDRESS: {
    42220: string;
    44787: string;
    62320: string;
};
export declare const ORDER_BOOK_REWARD_DISTRIBUTOR_ADDRESS: {
    42220: string;
    44787: string;
    62320: string;
};
export declare const MULTICALL_ADDRESS: {
    42220: string;
    44787: string;
    62320: string;
};
export declare const POOF: {
    42220: Token;
    44787: Token;
};
export declare const MCREAL: {
    42220: Token;
    44787: Token;
};
export declare const MCUSD: {
    42220: Token;
    44787: Token;
    62320: null;
};
export declare const MCELO: {
    42220: Token;
    44787: Token;
};
export declare const MCEUR: {
    42220: Token;
    44787: Token;
};
export declare const CEUR: {
    44787: Token;
    42220: Token;
};
export declare const BASES_TO_CHECK_TRADES_AGAINST: ChainTokenList;
export declare const SUGGESTED_BASES: ChainTokenList;
export declare const BASES_TO_TRACK_LIQUIDITY_FOR: ChainTokenList;
export declare const PINNED_PAIRS: {
    [chainId: number]: [Token, Token][];
};
export declare const NetworkContextName = "NETWORK";
export declare const INITIAL_ALLOWED_SLIPPAGE = 50;
export declare const DEFAULT_DEADLINE_FROM_NOW: number;
export declare const BIG_INT_SECONDS_IN_WEEK: JSBI;
export declare const INT_SECONDS_IN_WEEK: number;
export declare const BIG_INT_SECONDS_IN_YEAR: JSBI;
export declare const BIG_INT_ZERO: JSBI;
export declare const ONE_BIPS: Percent;
export declare const BIPS_BASE: JSBI;
export declare const ALLOWED_PRICE_IMPACT_LOW: Percent;
export declare const ALLOWED_PRICE_IMPACT_MEDIUM: Percent;
export declare const ALLOWED_PRICE_IMPACT_HIGH: Percent;
export declare const PRICE_IMPACT_WITHOUT_FEE_CONFIRM_MIN: Percent;
export declare const BLOCKED_PRICE_IMPACT_NON_EXPERT: Percent;
export declare const MIN_ETH: JSBI;
export declare const BETTER_TRADE_LESS_HOPS_THRESHOLD: Percent;
export declare const ZERO_PERCENT: Percent;
export declare const ONE_HUNDRED_PERCENT: Percent;
export declare const IMPORTED_FARMS = "imported_farms";
export declare const MINIMA_API_URL = "https://router.nodefinance.org/routes";
export declare const FETCH_MINIMA_ROUTER_TIMER = 5000;
