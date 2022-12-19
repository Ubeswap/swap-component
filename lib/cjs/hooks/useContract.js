"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useLimitOrderProtocolContract = exports.useOrderBookRewardDistributorContract = exports.useOrderBookContract = exports.useMultiStakingContract = exports.useReleaseUbeContract = exports.usePoolManagerContract = exports.useVotableStakingContract = exports.useStakingContracts = exports.useStakingContract = exports.useMulticallContract = exports.usePairContract = exports.useBytes32TokenContract = exports.useENSResolverContract = exports.useENSRegistrarContract = exports.useTokenContract = void 0;
const use_contractkit_1 = require("@celo-tools/use-contractkit");
const IUniswapV2Pair_json_1 = __importDefault(require("@ubeswap/core/build/abi/IUniswapV2Pair.json"));
const react_1 = require("react");
const react_redux_1 = require("react-redux");
const ens_public_resolver_json_1 = __importDefault(require("../constants/abis/ens-public-resolver.json"));
const erc20_1 = __importStar(require("../constants/abis/erc20"));
const LimitOrderProtocol_json_1 = __importDefault(require("../constants/abis/limit/LimitOrderProtocol.json"));
const OrderBook_json_1 = __importDefault(require("../constants/abis/limit/OrderBook.json"));
const OrderBookRewardDistributor_json_1 = __importDefault(require("../constants/abis/limit/OrderBookRewardDistributor.json"));
const MoolaStakingRewards_json_1 = __importDefault(require("../constants/abis/moola/MoolaStakingRewards.json"));
const pool_manager_json_1 = __importDefault(require("../constants/abis/pool-manager.json"));
const ReleaseUbe_json_1 = __importDefault(require("../constants/abis/ReleaseUbe.json"));
const StakingRewards_json_1 = __importDefault(require("../constants/abis/StakingRewards.json"));
const VotableStakingRewards_json_1 = __importDefault(require("../constants/abis/VotableStakingRewards.json"));
const multicall_1 = require("../constants/multicall");
const utils_1 = require("../utils");
// returns null on errors
function useContract(address, ABI, withSignerIfPossible = true) {
    const { address: accountAddress } = (0, use_contractkit_1.useContractKit)();
    const accountInfo = (0, react_redux_1.useSelector)((state) => state.swap.accountInfo);
    const library = (0, use_contractkit_1.useProvider)();
    const provider = accountInfo ? accountInfo.provider : library;
    const account = accountInfo ? accountInfo.account : accountAddress;
    return (0, react_1.useMemo)(() => {
        if (!address || !ABI || !provider)
            return null;
        try {
            return (0, utils_1.getContract)(address, ABI, provider, withSignerIfPossible && account ? account : undefined);
        }
        catch (error) {
            console.error('Failed to get contract', error);
            return null;
        }
    }, [address, ABI, provider, withSignerIfPossible, account]);
}
function useContracts(addresses, ABI, withSignerIfPossible = true) {
    const { address } = (0, use_contractkit_1.useContractKit)();
    const accountInfo = (0, react_redux_1.useSelector)((state) => state.swap.accountInfo);
    const library = (0, use_contractkit_1.useProvider)();
    const provider = accountInfo ? accountInfo.provider : library;
    const account = accountInfo ? accountInfo.account : address;
    return (0, react_1.useMemo)(() => {
        if (!addresses || !ABI || !provider)
            return null;
        return addresses.map((address) => {
            if (!address)
                return null;
            return (0, utils_1.getContract)(address, ABI, provider, withSignerIfPossible && account ? account : undefined);
        });
    }, [addresses, ABI, provider, withSignerIfPossible, account]);
}
function useTokenContract(tokenAddress, withSignerIfPossible) {
    return useContract(tokenAddress, erc20_1.default, withSignerIfPossible);
}
exports.useTokenContract = useTokenContract;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function useENSRegistrarContract(withSignerIfPossible) {
    // TODO(igm): find CELO equivalent of ENS
    return null;
}
exports.useENSRegistrarContract = useENSRegistrarContract;
function useENSResolverContract(address, withSignerIfPossible) {
    return useContract(address, ens_public_resolver_json_1.default, withSignerIfPossible);
}
exports.useENSResolverContract = useENSResolverContract;
function useBytes32TokenContract(tokenAddress, withSignerIfPossible) {
    return useContract(tokenAddress, erc20_1.ERC20_BYTES32_ABI, withSignerIfPossible);
}
exports.useBytes32TokenContract = useBytes32TokenContract;
function usePairContract(pairAddress, withSignerIfPossible) {
    return useContract(pairAddress, IUniswapV2Pair_json_1.default, withSignerIfPossible);
}
exports.usePairContract = usePairContract;
function useMulticallContract() {
    const { network } = (0, use_contractkit_1.useContractKit)();
    const accountInfo = (0, react_redux_1.useSelector)((state) => state.swap.accountInfo);
    const chainId = (accountInfo ? accountInfo.chainId : network.chainId);
    return useContract(chainId ? multicall_1.MULTICALL_NETWORKS[chainId] : undefined, multicall_1.MULTICALL_ABI, false);
}
exports.useMulticallContract = useMulticallContract;
function useStakingContract(stakingAddress, withSignerIfPossible) {
    return useContract(stakingAddress, StakingRewards_json_1.default, withSignerIfPossible);
}
exports.useStakingContract = useStakingContract;
function useStakingContracts(stakingInfos, withSignerIfPossible) {
    const rewardAddresses = stakingInfos === null || stakingInfos === void 0 ? void 0 : stakingInfos.map((stakingInfo) => stakingInfo.stakingRewardAddress);
    return useContracts(rewardAddresses, StakingRewards_json_1.default, withSignerIfPossible);
}
exports.useStakingContracts = useStakingContracts;
function useVotableStakingContract(stakingAddress, withSignerIfPossible) {
    return useContract(stakingAddress, VotableStakingRewards_json_1.default, withSignerIfPossible);
}
exports.useVotableStakingContract = useVotableStakingContract;
function usePoolManagerContract(poolManagerAddress, withSignerIfPossible) {
    return useContract(poolManagerAddress, pool_manager_json_1.default, withSignerIfPossible);
}
exports.usePoolManagerContract = usePoolManagerContract;
function useReleaseUbeContract(withSignerIfPossible) {
    return useContract('0x5Ed248077bD07eE9B530f7C40BE0c1dAE4c131C0', ReleaseUbe_json_1.default, withSignerIfPossible);
}
exports.useReleaseUbeContract = useReleaseUbeContract;
function useMultiStakingContract(stakingAddress, withSignerIfPossible) {
    return useContract(stakingAddress, MoolaStakingRewards_json_1.default, withSignerIfPossible);
}
exports.useMultiStakingContract = useMultiStakingContract;
function useOrderBookContract(address, withSignerIfPossible) {
    return useContract(address, OrderBook_json_1.default, withSignerIfPossible);
}
exports.useOrderBookContract = useOrderBookContract;
function useOrderBookRewardDistributorContract(address, withSignerIfPossible) {
    return useContract(address, OrderBookRewardDistributor_json_1.default, withSignerIfPossible);
}
exports.useOrderBookRewardDistributorContract = useOrderBookRewardDistributorContract;
function useLimitOrderProtocolContract(address, withSignerIfPossible) {
    return useContract(address, LimitOrderProtocol_json_1.default, withSignerIfPossible);
}
exports.useLimitOrderProtocolContract = useLimitOrderProtocolContract;
