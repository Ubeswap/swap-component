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
import { jsx as _jsx } from "react/jsx-runtime";
import { useMemo } from 'react';
import { Text } from 'rebass';
import styled, { createGlobalStyle, css, ThemeProvider as StyledComponentsThemeProvider, } from 'styled-components';
import { useSwapTheme } from '../state/user/hooks';
export * from './components';
const MEDIA_WIDTHS = {
    upToExtraSmall: 500,
    upToSmall: 720,
    upToMedium: 960,
    upToLarge: 1280,
};
const mediaWidthTemplates = Object.keys(MEDIA_WIDTHS).reduce((accumulator, size) => {
    ;
    accumulator[size] = (a, b, c) => css `
      @media (max-width: ${MEDIA_WIDTHS[size]}px) {
        ${css(a, b, c)}
      }
    `;
    return accumulator;
}, {});
const white = '#FFFFFF';
const black = '#000000';
export function colors(darkMode, primaryColor) {
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
        primary1: primaryColor ? primaryColor : darkMode ? '#8878C3' : '#8878C3',
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
export function theme(swapTheme) {
    const { userDarkMode: darkMode, fontFamily, primaryColor } = swapTheme !== null && swapTheme !== void 0 ? swapTheme : {};
    return Object.assign(Object.assign({}, colors(darkMode !== null && darkMode !== void 0 ? darkMode : false, primaryColor)), { grids: {
            sm: 8,
            md: 12,
            lg: 24,
        }, 
        //shadows
        shadow1: darkMode ? '#000' : '#2F80ED', 
        // media queries
        mediaWidth: mediaWidthTemplates, 
        // css snippets
        flexColumnNoWrap: css `
      display: flex;
      flex-flow: column nowrap;
    `, flexRowNoWrap: css `
      display: flex;
      flex-flow: row nowrap;
    ` });
}
export default function ThemeProvider({ children }) {
    const swapTheme = useSwapTheme();
    const themeObject = useMemo(() => theme(swapTheme), [swapTheme]);
    return _jsx(StyledComponentsThemeProvider, Object.assign({ theme: themeObject }, { children: children }));
}
const TextWrapper = styled(Text) `
  color: ${({ color, theme }) => theme[color]};
`;
export const TYPE = {
    main(props) {
        return _jsx(TextWrapper, Object.assign({ fontWeight: 500, color: 'text2' }, props));
    },
    link(props) {
        return _jsx(TextWrapper, Object.assign({ fontWeight: 500, color: 'primary1' }, props));
    },
    black(props) {
        return _jsx(TextWrapper, Object.assign({ fontWeight: 500, color: 'text1' }, props));
    },
    white(props) {
        return _jsx(TextWrapper, Object.assign({ fontWeight: 500, color: 'white' }, props));
    },
    body(props) {
        return _jsx(TextWrapper, Object.assign({ fontWeight: 400, fontSize: 16, color: 'text1' }, props));
    },
    largeHeader(props) {
        return _jsx(TextWrapper, Object.assign({ fontWeight: 600, fontSize: 24 }, props));
    },
    mediumHeader(props) {
        return _jsx(TextWrapper, Object.assign({ fontWeight: 500, fontSize: 20 }, props));
    },
    subHeader(props) {
        return _jsx(TextWrapper, Object.assign({ fontWeight: 400, fontSize: 14 }, props));
    },
    small(props) {
        return _jsx(TextWrapper, Object.assign({ fontWeight: 500, fontSize: 11 }, props));
    },
    blue(props) {
        return _jsx(TextWrapper, Object.assign({ fontWeight: 500, color: 'blue1' }, props));
    },
    yellow(props) {
        return _jsx(TextWrapper, Object.assign({ fontWeight: 500, color: 'yellow1' }, props));
    },
    darkGray(props) {
        return _jsx(TextWrapper, Object.assign({ fontWeight: 500, color: 'text3' }, props));
    },
    gray(props) {
        return _jsx(TextWrapper, Object.assign({ fontWeight: 500, color: 'bg3' }, props));
    },
    italic(props) {
        return _jsx(TextWrapper, Object.assign({ fontWeight: 500, fontSize: 12, fontStyle: 'italic', color: 'text2' }, props));
    },
    error(_a) {
        var { error } = _a, props = __rest(_a, ["error"]);
        return _jsx(TextWrapper, Object.assign({ fontWeight: 500, color: error ? 'red1' : 'text2' }, props));
    },
};
export const FixedGlobalStyle = createGlobalStyle `
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
// export const ThemedGlobalStyle = createGlobalStyle`
// html {
//   color: ${({ theme }) => theme.text1};
// }
// body {
//   min-height: 100vh;
//   background-position: 0 -30vh;
//   background-repeat: no-repeat;
//   background-image: ${({ theme }) =>
//     `radial-gradient(50% 50% at 50% 50%, ${transparentize(0.9, theme.primary1)} 0%, ${transparentize(
//       1,
//       theme.bg1
//     )} 100%)`};
// }
// `
export const ThemedGlobalStyle = createGlobalStyle `

`;
