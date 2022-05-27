/// <reference types="react" />
import { ImageProps } from 'rebass';
export interface LogoProps extends Pick<ImageProps, 'style' | 'alt' | 'className'> {
    srcs: string[];
}
/**
 * Renders an image by sequentially trying a list of URIs, and then eventually a fallback triangle alert
 */
export default function Logo({ srcs, alt, ...rest }: LogoProps): JSX.Element;
