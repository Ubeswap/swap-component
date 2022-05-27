import { Token } from '@ubeswap/sdk';
import { MutableRefObject } from 'react';
import { FixedSizeList } from 'react-window';
export default function CurrencyList({ height, currencies, selectedCurrency, onCurrencySelect, otherCurrency, fixedListRef, showImportView, setImportToken, }: {
    height: number;
    currencies: Token[];
    selectedCurrency?: Token | null;
    onCurrencySelect: (currency: Token) => void;
    otherCurrency?: Token | null;
    fixedListRef?: MutableRefObject<FixedSizeList | undefined>;
    showETH: boolean;
    showImportView: () => void;
    setImportToken: (token: Token) => void;
}): JSX.Element;
