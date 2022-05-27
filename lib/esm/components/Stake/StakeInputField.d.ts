/// <reference types="react" />
import { ChainId } from '@celo-tools/use-contractkit';
import { Token, TokenAmount } from '@ubeswap/sdk';
interface StakeInputFieldProps {
    value: string;
    onUserInput: (value: string) => void;
    onMax?: () => void;
    currency?: Token | null;
    hideBalance?: boolean;
    hideInput?: boolean;
    id: string;
    chainId?: ChainId;
    stakeBalance?: TokenAmount;
    walletBalance?: TokenAmount;
}
export default function StakeInputField({ value, onUserInput, onMax, currency, hideBalance, hideInput, id, stakeBalance, walletBalance, }: StakeInputFieldProps): JSX.Element;
export {};
