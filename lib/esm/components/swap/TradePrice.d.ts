/// <reference types="react" />
import { Price } from '@ubeswap/sdk';
interface TradePriceProps {
    price?: Price;
    showInverted: boolean;
    setShowInverted: (showInverted: boolean) => void;
}
export default function TradePrice({ price, showInverted, setShowInverted }: TradePriceProps): JSX.Element;
export {};
