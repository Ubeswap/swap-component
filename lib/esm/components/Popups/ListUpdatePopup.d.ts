/// <reference types="react" />
import { TokenList } from '@uniswap/token-lists';
export declare const ChangesList: import("styled-components").StyledComponent<"ul", import("styled-components").DefaultTheme, {}, never>;
export default function ListUpdatePopup({ popKey, listUrl, oldList, newList, auto, }: {
    popKey: string;
    listUrl: string;
    oldList: TokenList;
    newList: TokenList;
    auto: boolean;
}): JSX.Element;
