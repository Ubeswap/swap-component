"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useLendingPool = exports.useMoolaConfig = exports.getMoolaDual = exports.moolaDuals = exports.moolaLendingPools = void 0;
const contractkit_1 = require("@celo/contractkit");
const use_contractkit_1 = require("@celo-tools/use-contractkit");
const sdk_1 = require("@ubeswap/sdk");
const react_1 = require("react");
const react_redux_1 = require("react-redux");
const index_1 = require("../../../../constants/index");
const generated_1 = require("../../../../generated");
exports.moolaLendingPools = {
    // Addresses from: https://github.com/moolamarket/moola
    [sdk_1.ChainId.ALFAJORES]: {
        dataProvider: '0x31ccB9dC068058672D96E92BAf96B1607855822E',
        lendingPool: '0x58ad305f1eCe49ca55ADE0D5cCC90114C3902E88',
        lendingPoolCore: '0x090D652d1Bb0FEFbEe2531e9BBbb3604bE71f5de',
        [contractkit_1.CeloContract.GoldToken]: sdk_1.CELO[sdk_1.ChainId.ALFAJORES],
        [contractkit_1.CeloContract.StableToken]: sdk_1.cUSD[sdk_1.ChainId.ALFAJORES],
        mcUSD: index_1.MCUSD[sdk_1.ChainId.ALFAJORES],
        mCREAL: index_1.MCREAL[sdk_1.ChainId.ALFAJORES],
        mCELO: index_1.MCELO[sdk_1.ChainId.ALFAJORES],
    },
    [sdk_1.ChainId.MAINNET]: {
        dataProvider: '0x43d067ed784D9DD2ffEda73775e2CC4c560103A1',
        lendingPool: '0x970b12522CA9b4054807a2c5B736149a5BE6f670',
        lendingPoolCore: '0xAF106F8D4756490E7069027315F4886cc94A8F73',
        [contractkit_1.CeloContract.GoldToken]: sdk_1.CELO[sdk_1.ChainId.MAINNET],
        [contractkit_1.CeloContract.StableToken]: sdk_1.cUSD[sdk_1.ChainId.MAINNET],
        mcUSD: index_1.MCUSD[sdk_1.ChainId.MAINNET],
        mCREAL: index_1.MCREAL[sdk_1.ChainId.MAINNET],
        mCELO: index_1.MCELO[sdk_1.ChainId.MAINNET],
    },
};
exports.moolaDuals = [
    [index_1.MCREAL, sdk_1.cREAL],
    [index_1.MCUSD, sdk_1.cUSD],
    [index_1.MCELO, sdk_1.CELO],
    [index_1.MCEUR, index_1.CEUR],
].flatMap((dual) => [dual, [dual[1], dual[0]]]);
/**
 * Gets the Moola token that the token can be converted to/from.
 * @param currency
 * @returns
 */
const getMoolaDual = (currency) => {
    var _a, _b, _c;
    const { chainId } = currency;
    if (chainId === sdk_1.ChainId.BAKLAVA) {
        return null;
    }
    return (_c = (_b = (_a = exports.moolaDuals.find((dual) => (0, sdk_1.currencyEquals)(dual[0][chainId], currency))) === null || _a === void 0 ? void 0 : _a[1]) === null || _b === void 0 ? void 0 : _b[chainId]) !== null && _c !== void 0 ? _c : null;
};
exports.getMoolaDual = getMoolaDual;
const useMoolaConfig = () => {
    const { network } = (0, use_contractkit_1.useContractKit)();
    const accountInfo = (0, react_redux_1.useSelector)((state) => state.swap.accountInfo);
    const chainId = (accountInfo ? accountInfo.chainId : network.chainId);
    // TODO(igm): this breaks on baklava
    const chainCfg = exports.moolaLendingPools[chainId];
    if (chainCfg) {
        const { lendingPool, lendingPoolCore } = chainCfg;
        return {
            lendingPoolCore,
            lendingPool,
        };
    }
    return null;
};
exports.useMoolaConfig = useMoolaConfig;
const useLendingPool = () => {
    const cfg = (0, exports.useMoolaConfig)();
    if (!cfg) {
        throw new Error('no cfg');
    }
    const accountInfo = (0, react_redux_1.useSelector)((state) => state.swap.accountInfo);
    const library = (0, use_contractkit_1.useProvider)();
    const provider = accountInfo ? accountInfo.provider : library;
    return (0, react_1.useMemo)(() => generated_1.LendingPool__factory.connect(cfg.lendingPool, provider), [cfg.lendingPool, provider]);
};
exports.useLendingPool = useLendingPool;
