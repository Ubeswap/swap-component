/// <reference types="react" />
import '../i18n';
import '@celo-tools/use-contractkit/lib/styles.css';
import { TokenInfo } from '@uniswap/token-lists';
import { BigNumberish } from 'ethers';
export interface SwapTheme {
    fontFamily?: string;
    primaryColor?: string;
    userDarkMode?: boolean;
}
interface Props {
    theme?: SwapTheme;
    defaultSwapToken?: TokenInfo;
    tokenLists?: TokenInfo[][];
    minimaPartnerId?: BigNumberish;
}
export default function Swap({ theme, defaultSwapToken, tokenLists, minimaPartnerId }: Props): JSX.Element;
export {};
