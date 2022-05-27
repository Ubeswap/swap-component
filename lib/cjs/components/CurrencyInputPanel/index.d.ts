/// <reference types="react" />
import { ChainId } from '@celo-tools/use-contractkit';
import { Pair, Token, TokenAmount } from '@ubeswap/sdk';
interface CurrencyInputPanelProps {
    value: string;
    onUserInput: (value: string) => void;
    onMax?: () => void;
    onHalf?: () => void;
    showMaxButton?: boolean;
    showHalfButton?: boolean;
    label?: string;
    onCurrencySelect?: (currency: Token) => void;
    currency?: Token | null;
    disableCurrencySelect?: boolean;
    hideBalance?: boolean;
    pair?: Pair | null;
    hideInput?: boolean;
    otherCurrency?: Token | null;
    id: string;
    showCommonBases?: boolean;
    customBalanceText?: string;
    chainId?: ChainId;
    balanceOverride?: TokenAmount;
}
export default function CurrencyInputPanel({ value, onUserInput, onMax, onHalf, showMaxButton, showHalfButton, label, onCurrencySelect, currency, disableCurrencySelect, hideBalance, pair, // used for double token logo
hideInput, otherCurrency, id, showCommonBases, customBalanceText, chainId, balanceOverride, }: CurrencyInputPanelProps): JSX.Element;
export {};
