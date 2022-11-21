/// <reference types="react" />
import { ChainId } from '@celo-tools/use-contractkit';
import { Token } from '@ubeswap/sdk';
import { TokenInfo } from '@uniswap/token-lists';
interface CurrencySearchModalProps {
    isOpen: boolean;
    onDismiss: () => void;
    selectedCurrency?: Token | null;
    onCurrencySelect: (currency: Token) => void;
    otherSelectedCurrency?: Token | null;
    showCommonBases?: boolean;
    chainId?: ChainId;
    defaultTokenLists?: TokenInfo[];
}
export declare enum CurrencyModalView {
    search = 0,
    manage = 1,
    importToken = 2,
    importList = 3
}
export default function CurrencySearchModal({ isOpen, onDismiss, onCurrencySelect, selectedCurrency, otherSelectedCurrency, showCommonBases, chainId, defaultTokenLists, }: CurrencySearchModalProps): JSX.Element;
export {};
