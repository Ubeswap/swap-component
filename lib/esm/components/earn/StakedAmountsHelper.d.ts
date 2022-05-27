/// <reference types="react" />
import { TokenAmount } from '@ubeswap/sdk';
interface Props {
    userAmountTokenA: TokenAmount | undefined;
    userAmountTokenB: TokenAmount | undefined;
}
export default function StakedAmountsHelper({ userAmountTokenA, userAmountTokenB }: Props): JSX.Element;
export declare function SingleStakedAmountsHelper({ userAmountToken }: {
    userAmountToken: TokenAmount | undefined;
}): JSX.Element;
export {};
