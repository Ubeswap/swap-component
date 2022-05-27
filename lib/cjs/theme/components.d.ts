import React, { HTMLProps } from 'react';
import { Link } from 'react-router-dom';
export declare const ButtonText: import("styled-components").StyledComponent<"button", import("styled-components").DefaultTheme, {}, never>;
export declare const Button: import("styled-components").StyledComponent<"button", import("styled-components").DefaultTheme, {
    backgroundColor: string;
}, "backgroundColor">;
export declare const CloseIcon: import("styled-components").StyledComponent<import("react-feather").Icon, import("styled-components").DefaultTheme, {
    onClick: () => void;
}, never>;
export declare const IconWrapper: import("styled-components").StyledComponent<"div", import("styled-components").DefaultTheme, {
    stroke?: string | undefined;
    size?: string | undefined;
    marginRight?: string | undefined;
    marginLeft?: string | undefined;
}, never>;
export declare const LinkStyledButton: import("styled-components").StyledComponent<"button", import("styled-components").DefaultTheme, {
    disabled?: boolean | undefined;
}, never>;
export declare const StyledInternalLink: import("styled-components").StyledComponent<typeof Link, import("styled-components").DefaultTheme, {}, never>;
export declare const StyledLink: import("styled-components").StyledComponent<"a", import("styled-components").DefaultTheme, {}, never>;
export declare const LinkIcon: import("styled-components").StyledComponent<import("react-feather").Icon, import("styled-components").DefaultTheme, {}, never>;
export declare const TrashIcon: import("styled-components").StyledComponent<import("react-feather").Icon, import("styled-components").DefaultTheme, {}, never>;
export declare const UbeTokenAnimated: import("styled-components").StyledComponent<"img", import("styled-components").DefaultTheme, {}, never>;
/**
 * Outbound link that handles firing google analytics events
 */
export declare function ExternalLink({ target, href, rel, ...rest }: Omit<HTMLProps<HTMLAnchorElement>, 'as' | 'ref' | 'onClick'> & {
    href: string;
}): JSX.Element;
export declare function ExternalLinkIcon({ target, href, rel, ...rest }: Omit<HTMLProps<HTMLAnchorElement>, 'as' | 'ref' | 'onClick'> & {
    href: string;
}): JSX.Element;
export declare const Spinner: import("styled-components").StyledComponent<"img", import("styled-components").DefaultTheme, {}, never>;
export declare function BackArrow({ to }: {
    to: string;
}): JSX.Element;
export declare const CustomLightSpinner: import("styled-components").StyledComponent<"img", import("styled-components").DefaultTheme, {
    size: string;
}, never>;
export declare const HideSmall: import("styled-components").StyledComponent<"span", import("styled-components").DefaultTheme, {}, never>;
export declare const HideExtraSmall: import("styled-components").StyledComponent<"span", import("styled-components").DefaultTheme, {}, never>;
export declare const ExtraSmallOnly: import("styled-components").StyledComponent<"span", import("styled-components").DefaultTheme, {}, never>;
export declare const ClickableText: import("styled-components").StyledComponent<React.FunctionComponent<import("rebass").TextProps>, import("styled-components").DefaultTheme, {}, never>;
