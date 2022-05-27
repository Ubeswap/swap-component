/// <reference types="react" />
import { ChainId, Token } from '@ubeswap/sdk';
export default function CommonBases({ chainId, onSelect, selectedCurrency, }: {
    chainId?: ChainId;
    selectedCurrency?: Token | null;
    onSelect: (currency: Token) => void;
}): JSX.Element;
