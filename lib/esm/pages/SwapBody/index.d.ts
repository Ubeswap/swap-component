/// <reference types="react" />
import { TokenInfo } from '@uniswap/token-lists';
import { BigNumberish } from 'ethers';
import { AccountInfo, SwapTheme } from '../Swap';
interface Props {
    accountInfo?: AccountInfo;
    theme?: SwapTheme;
    defaultSwapToken?: TokenInfo;
    defaultTokenLists?: TokenInfo[];
    minimaPartnerId?: BigNumberish;
    onConnectWallet?: () => void;
}
export default function SwapBody({ accountInfo, theme: swapTheme, defaultSwapToken, defaultTokenLists, minimaPartnerId, onConnectWallet, }: Props): JSX.Element;
export {};
