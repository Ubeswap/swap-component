/// <reference types="react" />
interface PriceInputPanelProps {
    value: string;
    placeholder?: string;
    onUserInput: (value: string) => void;
    disableCurrencySelect?: boolean;
    hideInput?: boolean;
    id: string;
}
export default function PriceInputPanel({ value, placeholder, onUserInput, disableCurrencySelect, hideInput, id, }: PriceInputPanelProps): JSX.Element;
export {};
