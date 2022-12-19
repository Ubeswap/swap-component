/// <reference types="react" />
import '../i18n';
import '@celo-tools/use-contractkit/lib/styles.css';
import { Web3Provider } from '@ethersproject/providers';
import { TokenInfo } from '@uniswap/token-lists';
import { BigNumberish } from 'ethers';
export interface SwapTheme {
    fontFamily?: string;
    primaryColor?: string;
    userDarkMode?: boolean;
}
export interface AccountInfo {
    account: string;
    explorerUrl: string;
    chainId: number;
    provider: Web3Provider;
}
interface Props {
    accountInfo?: AccountInfo;
    theme?: SwapTheme;
    defaultSwapToken?: TokenInfo;
    tokenLists?: TokenInfo[][];
    minimaPartnerId?: BigNumberish;
    onConnectWallet?: () => void;
}
export default function Swap({ accountInfo, theme, defaultSwapToken, tokenLists, minimaPartnerId, onConnectWallet, }: Props): JSX.Element;
export {};
