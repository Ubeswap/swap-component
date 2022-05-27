/// <reference types="react" />
import { Token } from '@ubeswap/sdk';
interface DoubleCurrencyLogoProps {
    margin?: boolean;
    size?: number;
    currency0?: Token;
    currency1?: Token;
}
export default function DoubleCurrencyLogo({ currency0, currency1, size, margin, }: DoubleCurrencyLogoProps): JSX.Element;
export {};
