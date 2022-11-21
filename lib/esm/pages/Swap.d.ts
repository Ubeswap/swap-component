/// <reference types="react" />
import '../i18n';
import '@celo-tools/use-contractkit/lib/styles.css';
import { TokenInfo } from '@uniswap/token-lists';
import { BigNumberish } from 'ethers';
interface Props {
    defaultSwapToken?: TokenInfo;
    tokenLists?: TokenInfo[][];
    minimaPartnerId?: BigNumberish;
    useDarkMode?: boolean;
}
export default function Swap({ defaultSwapToken, tokenLists, minimaPartnerId, useDarkMode }: Props): JSX.Element;
export {};
