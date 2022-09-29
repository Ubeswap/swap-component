var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as UbeswapDefaultList from '@ubeswap/default-token-list';
import * as UbeswapExperimentalList from '@ubeswap/default-token-list/ubeswap-experimental.token-list.json';
import { ChainId } from '@ubeswap/sdk';
import Vibrant from 'node-vibrant';
import { shade } from 'polished';
import { useLayoutEffect, useState } from 'react';
import { useTheme } from 'styled-components';
import { hex } from 'wcag-contrast';
import uriToHttp from '../utils/uriToHttp';
const images = {};
UbeswapDefaultList.tokens.concat(UbeswapExperimentalList.tokens).forEach((token) => {
    images[token.address] = token.logoURI;
});
function getColorFromToken(token) {
    return __awaiter(this, void 0, void 0, function* () {
        if (token.chainId === ChainId.ALFAJORES && token.address === '0xc7AD46e0b8a400Bb3C915120d284AafbA8fc4735') {
            return Promise.resolve('#FAAB14');
        }
        const path = images[token.address];
        if (!path) {
            return '#FAAB14';
        }
        return Vibrant.from(path)
            .getPalette()
            .then((palette) => {
            if (palette === null || palette === void 0 ? void 0 : palette.Vibrant) {
                let detectedHex = palette.Vibrant.hex;
                let AAscore = hex(detectedHex, '#FFF');
                while (AAscore < 3) {
                    detectedHex = shade(0.005, detectedHex);
                    AAscore = hex(detectedHex, '#FFF');
                }
                return detectedHex;
            }
            return null;
        })
            .catch(() => null);
    });
}
function getColorFromUriPath(uri) {
    return __awaiter(this, void 0, void 0, function* () {
        const formattedPath = uriToHttp(uri)[0];
        return Vibrant.from(formattedPath)
            .getPalette()
            .then((palette) => {
            if (palette === null || palette === void 0 ? void 0 : palette.Vibrant) {
                return palette.Vibrant.hex;
            }
            return null;
        })
            .catch(() => null);
    });
}
export function useColor(token) {
    const theme = useTheme();
    const [color, setColor] = useState(theme.primary1);
    useLayoutEffect(() => {
        let stale = false;
        if (token) {
            getColorFromToken(token).then((tokenColor) => {
                if (!stale && tokenColor !== null) {
                    setColor(tokenColor);
                }
            });
        }
        return () => {
            stale = true;
            setColor('#2172E5');
        };
    }, [token]);
    return color;
}
export function useListColor(listImageUri) {
    const [color, setColor] = useState('#2172E5');
    useLayoutEffect(() => {
        let stale = false;
        if (listImageUri) {
            getColorFromUriPath(listImageUri).then((color) => {
                if (!stale && color !== null) {
                    setColor(color);
                }
            });
        }
        return () => {
            stale = true;
            setColor('#2172E5');
        };
    }, [listImageUri]);
    return color;
}
