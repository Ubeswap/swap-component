"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThemedGlobalStyle = exports.FixedGlobalStyle = exports.TYPE = exports.theme = exports.colors = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const polished_1 = require("polished");
const react_1 = require("react");
const rebass_1 = require("rebass");
const styled_components_1 = __importStar(require("styled-components"));
const hooks_1 = require("../state/user/hooks");
__exportStar(require("./components"), exports);
const MEDIA_WIDTHS = {
    upToExtraSmall: 500,
    upToSmall: 720,
    upToMedium: 960,
    upToLarge: 1280,
};
const mediaWidthTemplates = Object.keys(MEDIA_WIDTHS).reduce((accumulator, size) => {
    ;
    accumulator[size] = (a, b, c) => (0, styled_components_1.css) `
      @media (max-width: ${MEDIA_WIDTHS[size]}px) {
        ${(0, styled_components_1.css)(a, b, c)}
      }
    `;
    return accumulator;
}, {});
const white = '#FFFFFF';
const black = '#000000';
function colors(darkMode) {
    return {
        // base
        white,
        black,
        // text
        text1: darkMode ? '#FFFFFF' : '#000000',
        text2: darkMode ? '#C3C5CB' : '#565A69',
        text3: darkMode ? '#6C7284' : '#888D9B',
        text4: darkMode ? '#565A69' : '#C3C5CB',
        text5: darkMode ? '#2C2F36' : '#EDEEF2',
        // backgrounds / greys
        bg1: darkMode ? '#212429' : '#FFFFFF',
        bg2: darkMode ? '#2C2F36' : '#F7F8FA',
        bg3: darkMode ? '#40444F' : '#EDEEF2',
        bg4: darkMode ? '#565A69' : '#CED0D9',
        bg5: darkMode ? '#6C7284' : '#888D9B',
        //specialty colors
        modalBG: darkMode ? 'rgba(0,0,0,.425)' : 'rgba(0,0,0,0.3)',
        advancedBG: darkMode ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.6)',
        //primary colors
        primary1: darkMode ? '#8878C3' : '#8878C3',
        primary2: darkMode ? '#E3DFF3' : '#FF8CC3',
        primary3: darkMode ? '#BFB7DE' : '#FF99C9',
        primary4: darkMode ? '#6D619A' : '#F6DDE8',
        primary5: darkMode ? '#6D619A70' : '#E3DFF3',
        // color text
        primaryText1: darkMode ? '#E3DFF3' : '#8878C3',
        // secondary colors
        secondary1: darkMode ? '#00ffbd' : '#ff007a',
        secondary2: darkMode ? '#001715' : '#F6DDE8',
        secondary3: darkMode ? '#001617' : '#FDEAF1',
        // other
        red1: '#FD4040',
        red2: '#F82D3A',
        red3: '#D60000',
        green1: '#27AE60',
        yellow1: '#FFE270',
        yellow2: '#F3841E',
        blue1: '#35D07F',
        // dont wanna forget these blue yet
        // blue4: darkMode ? '#153d6f70' : '#C4D9F8',
        // blue5: darkMode ? '#153d6f70' : '#EBF4FF',
    };
}
exports.colors = colors;
function theme(darkMode) {
    return Object.assign(Object.assign({}, colors(darkMode)), { grids: {
            sm: 8,
            md: 12,
            lg: 24,
        }, 
        //shadows
        shadow1: darkMode ? '#000' : '#2F80ED', 
        // media queries
        mediaWidth: mediaWidthTemplates, 
        // css snippets
        flexColumnNoWrap: (0, styled_components_1.css) `
      display: flex;
      flex-flow: column nowrap;
    `, flexRowNoWrap: (0, styled_components_1.css) `
      display: flex;
      flex-flow: row nowrap;
    ` });
}
exports.theme = theme;
function ThemeProvider({ children }) {
    const darkMode = (0, hooks_1.useIsDarkMode)();
    const themeObject = (0, react_1.useMemo)(() => theme(darkMode), [darkMode]);
    return (0, jsx_runtime_1.jsx)(styled_components_1.ThemeProvider, Object.assign({ theme: themeObject }, { children: children }));
}
exports.default = ThemeProvider;
const TextWrapper = (0, styled_components_1.default)(rebass_1.Text) `
  color: ${({ color, theme }) => theme[color]};
`;
exports.TYPE = {
    main(props) {
        return (0, jsx_runtime_1.jsx)(TextWrapper, Object.assign({ fontWeight: 500, color: 'text2' }, props));
    },
    link(props) {
        return (0, jsx_runtime_1.jsx)(TextWrapper, Object.assign({ fontWeight: 500, color: 'primary1' }, props));
    },
    black(props) {
        return (0, jsx_runtime_1.jsx)(TextWrapper, Object.assign({ fontWeight: 500, color: 'text1' }, props));
    },
    white(props) {
        return (0, jsx_runtime_1.jsx)(TextWrapper, Object.assign({ fontWeight: 500, color: 'white' }, props));
    },
    body(props) {
        return (0, jsx_runtime_1.jsx)(TextWrapper, Object.assign({ fontWeight: 400, fontSize: 16, color: 'text1' }, props));
    },
    largeHeader(props) {
        return (0, jsx_runtime_1.jsx)(TextWrapper, Object.assign({ fontWeight: 600, fontSize: 24 }, props));
    },
    mediumHeader(props) {
        return (0, jsx_runtime_1.jsx)(TextWrapper, Object.assign({ fontWeight: 500, fontSize: 20 }, props));
    },
    subHeader(props) {
        return (0, jsx_runtime_1.jsx)(TextWrapper, Object.assign({ fontWeight: 400, fontSize: 14 }, props));
    },
    small(props) {
        return (0, jsx_runtime_1.jsx)(TextWrapper, Object.assign({ fontWeight: 500, fontSize: 11 }, props));
    },
    blue(props) {
        return (0, jsx_runtime_1.jsx)(TextWrapper, Object.assign({ fontWeight: 500, color: 'blue1' }, props));
    },
    yellow(props) {
        return (0, jsx_runtime_1.jsx)(TextWrapper, Object.assign({ fontWeight: 500, color: 'yellow1' }, props));
    },
    darkGray(props) {
        return (0, jsx_runtime_1.jsx)(TextWrapper, Object.assign({ fontWeight: 500, color: 'text3' }, props));
    },
    gray(props) {
        return (0, jsx_runtime_1.jsx)(TextWrapper, Object.assign({ fontWeight: 500, color: 'bg3' }, props));
    },
    italic(props) {
        return (0, jsx_runtime_1.jsx)(TextWrapper, Object.assign({ fontWeight: 500, fontSize: 12, fontStyle: 'italic', color: 'text2' }, props));
    },
    error(_a) {
        var { error } = _a, props = __rest(_a, ["error"]);
        return (0, jsx_runtime_1.jsx)(TextWrapper, Object.assign({ fontWeight: 500, color: error ? 'red1' : 'text2' }, props));
    },
};
exports.FixedGlobalStyle = (0, styled_components_1.createGlobalStyle) `
html, input, textarea, button {
  font-family: 'Inter', sans-serif;
  font-display: fallback;
}

html,
body {
  margin: 0;
  padding: 0;
}

 a {
   color: ${colors(false).blue1}; 
 }

* {
  box-sizing: border-box;
}

button {
  user-select: none;
}

html {
  font-size: 16px;
  font-variant: none;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  font-feature-settings: 'ss01' on, 'ss02' on, 'cv01' on, 'cv03' on;
}
`;
exports.ThemedGlobalStyle = (0, styled_components_1.createGlobalStyle) `
html {
  color: ${({ theme }) => theme.text1};
  background-color: ${({ theme }) => theme.bg2};
}

body {
  min-height: 100vh;
  background-position: 0 -30vh;
  background-repeat: no-repeat;
  background-image: ${({ theme }) => `radial-gradient(50% 50% at 50% 50%, ${(0, polished_1.transparentize)(0.9, theme.primary1)} 0%, ${(0, polished_1.transparentize)(1, theme.bg1)} 100%)`};
}
`;
