var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { useContractKit } from '@celo-tools/use-contractkit';
import { JSBI, TokenAmount } from '@ubeswap/sdk';
import { BigNumber } from 'ethers';
import { useEffect, useState } from 'react';
import { UBE } from '../../constants/tokens';
import { useReleaseUbeContract, useTokenContract } from '../../hooks/useContract';
import { useSingleContractMultipleData } from '../../state/multicall/hooks';
import { useUnclaimedStakingRewards } from '../../state/stake/hooks';
const DECIMALS = BigNumber.from(10).pow(18);
const HARDCAP = BigNumber.from(100000000).mul(DECIMALS);
const RELEASED = BigNumber.from(25700000).mul(DECIMALS);
// Addresses that do not contribute to circulating supply
const nonCirculatingAddresses = {
    MiningReleaseEscrow: '0x9d0a92AA8832518328D14Ed5930eC6B44448165e',
    PoolManager: '0x9Ee3600543eCcc85020D6bc77EB553d1747a65D2',
};
/**
 * Fetches the circulating supply
 */
export const useCirculatingSupply = () => {
    const { network } = useContractKit();
    const chainId = network.chainId;
    const ube = chainId ? UBE[chainId] : undefined;
    const ubeContract = useTokenContract(ube === null || ube === void 0 ? void 0 : ube.address);
    const releaseUbe = useReleaseUbeContract();
    // compute amount that is locked up
    const balancesRaw = useSingleContractMultipleData(ubeContract, 'balanceOf', Object.values(nonCirculatingAddresses).map((addr) => [addr]));
    // if we are still loading, do not load
    const balances = (balancesRaw === null || balancesRaw === void 0 ? void 0 : balancesRaw.find((result) => !result.result))
        ? null
        : balancesRaw.map((b) => { var _a, _b; return (_b = (_a = b.result) === null || _a === void 0 ? void 0 : _a[0]) !== null && _b !== void 0 ? _b : BigNumber.from(0); });
    const lockedBalancesSum = balances === null || balances === void 0 ? void 0 : balances.reduce((sum, b) => b.add(sum), BigNumber.from(0));
    // add amount of tokens that could be claimed but are not being claimed
    const { noncirculatingSupply } = useUnclaimedStakingRewards();
    // compute amount that has been released
    const [released, setReleased] = useState(null);
    useEffect(() => {
        void (() => __awaiter(void 0, void 0, void 0, function* () {
            if (releaseUbe) {
                setReleased(RELEASED.sub(yield releaseUbe.releasableSupplyOfPrincipal(RELEASED)));
            }
        }))();
    }, [releaseUbe]);
    if (!lockedBalancesSum || !released || !noncirculatingSupply) {
        return undefined;
    }
    return ube
        ? new TokenAmount(ube, JSBI.BigInt(HARDCAP.sub(lockedBalancesSum).sub(released).sub(noncirculatingSupply).toString()))
        : undefined;
};
