import React from 'react';
import { TextProps } from 'rebass';
import { DefaultTheme } from 'styled-components';
import { Colors } from './styled';
export * from './components';
export declare function colors(darkMode: boolean): Colors;
export declare function theme(darkMode: boolean): DefaultTheme;
export default function ThemeProvider({ children }: {
    children: React.ReactNode;
}): JSX.Element;
export declare const TYPE: {
    main(props: TextProps): JSX.Element;
    link(props: TextProps): JSX.Element;
    black(props: TextProps): JSX.Element;
    white(props: TextProps): JSX.Element;
    body(props: TextProps): JSX.Element;
    largeHeader(props: TextProps): JSX.Element;
    mediumHeader(props: TextProps): JSX.Element;
    subHeader(props: TextProps): JSX.Element;
    small(props: TextProps): JSX.Element;
    blue(props: TextProps): JSX.Element;
    yellow(props: TextProps): JSX.Element;
    darkGray(props: TextProps): JSX.Element;
    gray(props: TextProps): JSX.Element;
    italic(props: TextProps): JSX.Element;
    error({ error, ...props }: {
        error: boolean;
    } & TextProps): JSX.Element;
};
export declare const FixedGlobalStyle: import("styled-components").GlobalStyleComponent<{}, DefaultTheme>;
export declare const ThemedGlobalStyle: import("styled-components").GlobalStyleComponent<{}, DefaultTheme>;
