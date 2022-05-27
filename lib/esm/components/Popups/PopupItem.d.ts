/// <reference types="react" />
import { PopupContent } from '../../state/application/actions';
export declare const StyledClose: import("styled-components").StyledComponent<import("react-feather").Icon, import("styled-components").DefaultTheme, {}, never>;
export declare const Popup: import("styled-components").StyledComponent<"div", import("styled-components").DefaultTheme, {}, never>;
export default function PopupItem({ removeAfterMs, content, popKey, }: {
    removeAfterMs: number | null;
    content: PopupContent;
    popKey: string;
}): JSX.Element;
