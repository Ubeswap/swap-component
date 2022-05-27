import React from 'react';
import { PopoverProps } from '../Popover';
interface TooltipProps extends Omit<PopoverProps, 'content'> {
    text: React.ReactNode;
}
export default function Tooltip({ text, ...rest }: TooltipProps): JSX.Element;
export declare function MouseoverTooltip({ children, ...rest }: Omit<TooltipProps, 'show'>): JSX.Element;
export {};
