import { useContractKit, useProvider } from '@celo-tools/use-contractkit';
import IUniswapV2PairABI from '@ubeswap/core/build/abi/IUniswapV2Pair.json';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import ENS_PUBLIC_RESOLVER_ABI from '../constants/abis/ens-public-resolver.json';
import ERC20_ABI, { ERC20_BYTES32_ABI } from '../constants/abis/erc20';
import LIMIT_ORDER_PROTOCOL_ABI from '../constants/abis/limit/LimitOrderProtocol.json';
import ORDER_BOOK_ABI from '../constants/abis/limit/OrderBook.json';
import ORDER_BOOK_REWARD_DISTRUBUTOR_ABI from '../constants/abis/limit/OrderBookRewardDistributor.json';
import DUAL_REWARDS_ABI from '../constants/abis/moola/MoolaStakingRewards.json';
import POOL_MANAGER_ABI from '../constants/abis/pool-manager.json';
import RELEASE_UBE_ABI from '../constants/abis/ReleaseUbe.json';
import STAKING_REWARDS_ABI from '../constants/abis/StakingRewards.json';
import VOTABLE_STAKING_REWARDS_ABI from '../constants/abis/VotableStakingRewards.json';
import { MULTICALL_ABI, MULTICALL_NETWORKS } from '../constants/multicall';
import { getContract } from '../utils';
// returns null on errors
function useContract(address, ABI, withSignerIfPossible = true) {
    const { address: accountAddress } = useContractKit();
    const accountInfo = useSelector((state) => state.swap.accountInfo);
    const library = useProvider();
    const provider = accountInfo ? accountInfo.provider : library;
    const account = accountInfo ? accountInfo.account : accountAddress;
    return useMemo(() => {
        if (!address || !ABI || !provider)
            return null;
        try {
            return getContract(address, ABI, provider, withSignerIfPossible && account ? account : undefined);
        }
        catch (error) {
            console.error('Failed to get contract', error);
            return null;
        }
    }, [address, ABI, provider, withSignerIfPossible, account]);
}
function useContracts(addresses, ABI, withSignerIfPossible = true) {
    const { address } = useContractKit();
    const accountInfo = useSelector((state) => state.swap.accountInfo);
    const library = useProvider();
    const provider = accountInfo ? accountInfo.provider : library;
    const account = accountInfo ? accountInfo.account : address;
    return useMemo(() => {
        if (!addresses || !ABI || !provider)
            return null;
        return addresses.map((address) => {
            if (!address)
                return null;
            return getContract(address, ABI, provider, withSignerIfPossible && account ? account : undefined);
        });
    }, [addresses, ABI, provider, withSignerIfPossible, account]);
}
export function useTokenContract(tokenAddress, withSignerIfPossible) {
    return useContract(tokenAddress, ERC20_ABI, withSignerIfPossible);
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function useENSRegistrarContract(withSignerIfPossible) {
    // TODO(igm): find CELO equivalent of ENS
    return null;
}
export function useENSResolverContract(address, withSignerIfPossible) {
    return useContract(address, ENS_PUBLIC_RESOLVER_ABI, withSignerIfPossible);
}
export function useBytes32TokenContract(tokenAddress, withSignerIfPossible) {
    return useContract(tokenAddress, ERC20_BYTES32_ABI, withSignerIfPossible);
}
export function usePairContract(pairAddress, withSignerIfPossible) {
    return useContract(pairAddress, IUniswapV2PairABI, withSignerIfPossible);
}
export function useMulticallContract() {
    const { network } = useContractKit();
    const accountInfo = useSelector((state) => state.swap.accountInfo);
    const chainId = (accountInfo ? accountInfo.chainId : network.chainId);
    return useContract(chainId ? MULTICALL_NETWORKS[chainId] : undefined, MULTICALL_ABI, false);
}
export function useStakingContract(stakingAddress, withSignerIfPossible) {
    return useContract(stakingAddress, STAKING_REWARDS_ABI, withSignerIfPossible);
}
export function useStakingContracts(stakingInfos, withSignerIfPossible) {
    const rewardAddresses = stakingInfos === null || stakingInfos === void 0 ? void 0 : stakingInfos.map((stakingInfo) => stakingInfo.stakingRewardAddress);
    return useContracts(rewardAddresses, STAKING_REWARDS_ABI, withSignerIfPossible);
}
export function useVotableStakingContract(stakingAddress, withSignerIfPossible) {
    return useContract(stakingAddress, VOTABLE_STAKING_REWARDS_ABI, withSignerIfPossible);
}
export function usePoolManagerContract(poolManagerAddress, withSignerIfPossible) {
    return useContract(poolManagerAddress, POOL_MANAGER_ABI, withSignerIfPossible);
}
export function useReleaseUbeContract(withSignerIfPossible) {
    return useContract('0x5Ed248077bD07eE9B530f7C40BE0c1dAE4c131C0', RELEASE_UBE_ABI, withSignerIfPossible);
}
export function useMultiStakingContract(stakingAddress, withSignerIfPossible) {
    return useContract(stakingAddress, DUAL_REWARDS_ABI, withSignerIfPossible);
}
export function useOrderBookContract(address, withSignerIfPossible) {
    return useContract(address, ORDER_BOOK_ABI, withSignerIfPossible);
}
export function useOrderBookRewardDistributorContract(address, withSignerIfPossible) {
    return useContract(address, ORDER_BOOK_REWARD_DISTRUBUTOR_ABI, withSignerIfPossible);
}
export function useLimitOrderProtocolContract(address, withSignerIfPossible) {
    return useContract(address, LIMIT_ORDER_PROTOCOL_ABI, withSignerIfPossible);
}
