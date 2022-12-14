/// <reference types="react" />
import { ChainId } from '@celo-tools/use-contractkit';
import { Token } from '@ubeswap/sdk';
import { TokenInfo } from '@uniswap/token-lists';
interface CurrencySearchProps {
    isOpen: boolean;
    onDismiss: () => void;
    selectedCurrency?: Token | null;
    onCurrencySelect: (currency: Token) => void;
    otherSelectedCurrency?: Token | null;
    showCommonBases?: boolean;
    showManageView: () => void;
    showImportView: () => void;
    setImportToken: (token: Token) => void;
    chainId?: ChainId;
    defaultTokenLists?: TokenInfo[];
}
export declare function CurrencySearch({ selectedCurrency, onCurrencySelect, otherSelectedCurrency, showCommonBases, onDismiss, isOpen, showManageView, showImportView, setImportToken, chainId, defaultTokenLists, }: CurrencySearchProps): JSX.Element;
export {};
