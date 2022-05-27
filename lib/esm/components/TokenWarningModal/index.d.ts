/// <reference types="react" />
import { Token } from '@ubeswap/sdk';
export default function TokenWarningModal({ isOpen, tokens, onConfirm, }: {
    isOpen: boolean;
    tokens: Token[];
    onConfirm: () => void;
}): JSX.Element;
