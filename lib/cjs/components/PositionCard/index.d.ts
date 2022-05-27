import { Pair, TokenAmount } from '@ubeswap/sdk';
import React from 'react';
export declare const FixedHeightRow: import("styled-components").StyledComponent<React.FunctionComponent<import("rebass").BoxProps>, import("styled-components").DefaultTheme, {
    width?: string | undefined;
    align?: string | undefined;
    justify?: string | undefined;
    padding?: string | undefined;
    border?: string | undefined;
    borderRadius?: string | undefined;
}, never>;
export declare const HoverCard: import("styled-components").StyledComponent<React.FunctionComponent<import("rebass").BoxProps>, import("styled-components").DefaultTheme, {
    width?: string | undefined;
    padding?: string | undefined;
    border?: string | undefined;
    borderRadius?: string | undefined;
}, never>;
interface PositionCardProps {
    pair: Pair;
    border?: string;
    stakedBalance?: TokenAmount;
}
export declare function MinimalPositionCard({ pair, border }: PositionCardProps): JSX.Element;
export default function FullPositionCard({ pair, border, stakedBalance }: PositionCardProps): JSX.Element;
export {};
