/// <reference types="react" />
import { TokenAmount } from '@ubeswap/sdk';
export default function FormattedTokenAmount({ currencyAmount, significantDigits, }: {
    currencyAmount: TokenAmount;
    significantDigits?: number;
}): JSX.Element;
