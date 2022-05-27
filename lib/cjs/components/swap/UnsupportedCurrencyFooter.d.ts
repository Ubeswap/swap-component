/// <reference types="react" />
import { Token } from '@ubeswap/sdk';
export default function UnsupportedCurrencyFooter({ show, currencies, }: {
    show: boolean;
    currencies: (Token | undefined)[];
}): JSX.Element;
