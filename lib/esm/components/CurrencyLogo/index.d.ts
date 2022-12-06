import { Token } from '@ubeswap/sdk';
import React from 'react';
export default function CurrencyLogo({ currency, size, style, defaultTokenLogoURI, }: {
    currency?: Token;
    size?: string;
    style?: React.CSSProperties;
    defaultTokenLogoURI?: string;
}): JSX.Element;
