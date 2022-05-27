/// <reference types="react" />
import { Token } from '@ubeswap/sdk';
interface ImportProps {
    tokens: Token[];
    onBack?: () => void;
    onDismiss?: () => void;
    handleCurrencySelect?: (currency: Token) => void;
}
export declare function ImportToken({ tokens, onBack, onDismiss, handleCurrencySelect }: ImportProps): JSX.Element;
export {};
