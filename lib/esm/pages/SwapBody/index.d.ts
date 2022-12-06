/// <reference types="react" />
import { TokenInfo } from '@uniswap/token-lists';
import { BigNumberish } from 'ethers';
import { SwapTheme } from '../Swap';
interface Props {
    theme?: SwapTheme;
    defaultSwapToken?: TokenInfo;
    defaultTokenLists?: TokenInfo[];
    minimaPartnerId?: BigNumberish;
    useDarkMode?: boolean;
}
export default function SwapBody({ theme: swapTheme, defaultSwapToken, defaultTokenLists, minimaPartnerId }: Props): JSX.Element;
export {};
