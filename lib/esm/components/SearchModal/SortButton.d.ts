import React from 'react';
export declare const FilterWrapper: import("styled-components").StyledComponent<React.FunctionComponent<import("rebass").BoxProps>, import("styled-components").DefaultTheme, {
    width?: string | undefined;
    align?: string | undefined;
    justify?: string | undefined;
    padding?: string | undefined;
    border?: string | undefined;
    borderRadius?: string | undefined;
} & {
    gap?: string | undefined;
    justify?: string | undefined;
}, never>;
export default function SortButton({ toggleSortOrder, ascending, }: {
    toggleSortOrder: () => void;
    ascending: boolean;
}): JSX.Element;
