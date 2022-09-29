import { CeloContract } from '@celo/contractkit';
import { useContractKit, useProvider } from '@celo-tools/use-contractkit';
import { CELO, ChainId, cREAL, currencyEquals, cUSD } from '@ubeswap/sdk';
import { useMemo } from 'react';
import { CEUR, MCELO, MCEUR, MCREAL, MCUSD } from '../../../../constants/index';
import { LendingPool__factory } from '../../../../generated';
export const moolaLendingPools = {
    // Addresses from: https://github.com/moolamarket/moola
    [ChainId.ALFAJORES]: {
        dataProvider: '0x31ccB9dC068058672D96E92BAf96B1607855822E',
        lendingPool: '0x58ad305f1eCe49ca55ADE0D5cCC90114C3902E88',
        lendingPoolCore: '0x090D652d1Bb0FEFbEe2531e9BBbb3604bE71f5de',
        [CeloContract.GoldToken]: CELO[ChainId.ALFAJORES],
        [CeloContract.StableToken]: cUSD[ChainId.ALFAJORES],
        mcUSD: MCUSD[ChainId.ALFAJORES],
        mCREAL: MCREAL[ChainId.ALFAJORES],
        mCELO: MCELO[ChainId.ALFAJORES],
    },
    [ChainId.MAINNET]: {
        dataProvider: '0x43d067ed784D9DD2ffEda73775e2CC4c560103A1',
        lendingPool: '0x970b12522CA9b4054807a2c5B736149a5BE6f670',
        lendingPoolCore: '0xAF106F8D4756490E7069027315F4886cc94A8F73',
        [CeloContract.GoldToken]: CELO[ChainId.MAINNET],
        [CeloContract.StableToken]: cUSD[ChainId.MAINNET],
        mcUSD: MCUSD[ChainId.MAINNET],
        mCREAL: MCREAL[ChainId.MAINNET],
        mCELO: MCELO[ChainId.MAINNET],
    },
};
export const moolaDuals = [
    [MCREAL, cREAL],
    [MCUSD, cUSD],
    [MCELO, CELO],
    [MCEUR, CEUR],
].flatMap((dual) => [dual, [dual[1], dual[0]]]);
/**
 * Gets the Moola token that the token can be converted to/from.
 * @param currency
 * @returns
 */
export const getMoolaDual = (currency) => {
    var _a, _b, _c;
    const { chainId } = currency;
    if (chainId === ChainId.BAKLAVA) {
        return null;
    }
    return (_c = (_b = (_a = moolaDuals.find((dual) => currencyEquals(dual[0][chainId], currency))) === null || _a === void 0 ? void 0 : _a[1]) === null || _b === void 0 ? void 0 : _b[chainId]) !== null && _c !== void 0 ? _c : null;
};
export const useMoolaConfig = () => {
    const { network } = useContractKit();
    const chainId = network.chainId;
    // TODO(igm): this breaks on baklava
    const chainCfg = moolaLendingPools[chainId];
    if (chainCfg) {
        const { lendingPool, lendingPoolCore } = chainCfg;
        return {
            lendingPoolCore,
            lendingPool,
        };
    }
    return null;
};
export const useLendingPool = () => {
    const cfg = useMoolaConfig();
    if (!cfg) {
        throw new Error('no cfg');
    }
    const library = useProvider();
    return useMemo(() => LendingPool__factory.connect(cfg.lendingPool, library), [cfg.lendingPool, library]);
};
