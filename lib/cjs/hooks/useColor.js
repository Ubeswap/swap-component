"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useListColor = exports.useColor = void 0;
const default_token_list_1 = __importDefault(require("@ubeswap/default-token-list"));
const ubeswap_experimental_token_list_json_1 = __importDefault(require("@ubeswap/default-token-list/ubeswap-experimental.token-list.json"));
const sdk_1 = require("@ubeswap/sdk");
const node_vibrant_1 = __importDefault(require("node-vibrant"));
const polished_1 = require("polished");
const react_1 = require("react");
const styled_components_1 = require("styled-components");
const wcag_contrast_1 = require("wcag-contrast");
const uriToHttp_1 = __importDefault(require("../utils/uriToHttp"));
const images = {};
default_token_list_1.default.tokens.concat(ubeswap_experimental_token_list_json_1.default.tokens).forEach((token) => {
    images[token.address] = token.logoURI;
});
function getColorFromToken(token) {
    return __awaiter(this, void 0, void 0, function* () {
        if (token.chainId === sdk_1.ChainId.ALFAJORES && token.address === '0xc7AD46e0b8a400Bb3C915120d284AafbA8fc4735') {
            return Promise.resolve('#FAAB14');
        }
        const path = images[token.address];
        if (!path) {
            return '#FAAB14';
        }
        return node_vibrant_1.default.from(path)
            .getPalette()
            .then((palette) => {
            if (palette === null || palette === void 0 ? void 0 : palette.Vibrant) {
                let detectedHex = palette.Vibrant.hex;
                let AAscore = (0, wcag_contrast_1.hex)(detectedHex, '#FFF');
                while (AAscore < 3) {
                    detectedHex = (0, polished_1.shade)(0.005, detectedHex);
                    AAscore = (0, wcag_contrast_1.hex)(detectedHex, '#FFF');
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
        const formattedPath = (0, uriToHttp_1.default)(uri)[0];
        return node_vibrant_1.default.from(formattedPath)
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
function useColor(token) {
    const theme = (0, styled_components_1.useTheme)();
    const [color, setColor] = (0, react_1.useState)(theme.primary1);
    (0, react_1.useLayoutEffect)(() => {
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
exports.useColor = useColor;
function useListColor(listImageUri) {
    const [color, setColor] = (0, react_1.useState)('#2172E5');
    (0, react_1.useLayoutEffect)(() => {
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
exports.useListColor = useListColor;
