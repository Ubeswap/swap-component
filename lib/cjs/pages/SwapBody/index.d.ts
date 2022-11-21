/// <reference types="react" />
import { TokenInfo } from '@uniswap/token-lists';
import { BigNumberish } from 'ethers';
interface Props {
    defaultSwapToken?: TokenInfo;
    defaultTokenLists?: TokenInfo[];
    minimaPartnerId?: BigNumberish;
    useDarkMode?: boolean;
}
export default function SwapBody({ defaultSwapToken, defaultTokenLists, minimaPartnerId, useDarkMode }: Props): JSX.Element;
export {};
