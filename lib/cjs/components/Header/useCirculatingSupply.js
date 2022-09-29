"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCirculatingSupply = void 0;
const use_contractkit_1 = require("@celo-tools/use-contractkit");
const sdk_1 = require("@ubeswap/sdk");
const ethers_1 = require("ethers");
const react_1 = require("react");
const tokens_1 = require("../../constants/tokens");
const useContract_1 = require("../../hooks/useContract");
const hooks_1 = require("../../state/multicall/hooks");
const hooks_2 = require("../../state/stake/hooks");
const DECIMALS = ethers_1.BigNumber.from(10).pow(18);
const HARDCAP = ethers_1.BigNumber.from(100000000).mul(DECIMALS);
const RELEASED = ethers_1.BigNumber.from(25700000).mul(DECIMALS);
// Addresses that do not contribute to circulating supply
const nonCirculatingAddresses = {
    MiningReleaseEscrow: '0x9d0a92AA8832518328D14Ed5930eC6B44448165e',
    PoolManager: '0x9Ee3600543eCcc85020D6bc77EB553d1747a65D2',
};
/**
 * Fetches the circulating supply
 */
const useCirculatingSupply = () => {
    const { network } = (0, use_contractkit_1.useContractKit)();
    const chainId = network.chainId;
    const ube = chainId ? tokens_1.UBE[chainId] : undefined;
    const ubeContract = (0, useContract_1.useTokenContract)(ube === null || ube === void 0 ? void 0 : ube.address);
    const releaseUbe = (0, useContract_1.useReleaseUbeContract)();
    // compute amount that is locked up
    const balancesRaw = (0, hooks_1.useSingleContractMultipleData)(ubeContract, 'balanceOf', Object.values(nonCirculatingAddresses).map((addr) => [addr]));
    // if we are still loading, do not load
    const balances = (balancesRaw === null || balancesRaw === void 0 ? void 0 : balancesRaw.find((result) => !result.result))
        ? null
        : balancesRaw.map((b) => { var _a, _b; return (_b = (_a = b.result) === null || _a === void 0 ? void 0 : _a[0]) !== null && _b !== void 0 ? _b : ethers_1.BigNumber.from(0); });
    const lockedBalancesSum = balances === null || balances === void 0 ? void 0 : balances.reduce((sum, b) => b.add(sum), ethers_1.BigNumber.from(0));
    // add amount of tokens that could be claimed but are not being claimed
    const { noncirculatingSupply } = (0, hooks_2.useUnclaimedStakingRewards)();
    // compute amount that has been released
    const [released, setReleased] = (0, react_1.useState)(null);
    (0, react_1.useEffect)(() => {
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
        ? new sdk_1.TokenAmount(ube, sdk_1.JSBI.BigInt(HARDCAP.sub(lockedBalancesSum).sub(released).sub(noncirculatingSupply).toString()))
        : undefined;
};
exports.useCirculatingSupply = useCirculatingSupply;
