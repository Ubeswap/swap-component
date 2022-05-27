/// <reference types="react" />
import { Token } from '@ubeswap/sdk';
interface Props {
    onTokenSelect: (token: Token | null) => void;
    token?: Token | null;
}
export default function TokenSelect(props: Props): JSX.Element;
export {};
