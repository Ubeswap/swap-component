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
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import '@reach/dialog/styles.css';
import { DialogContent, DialogOverlay } from '@reach/dialog';
import { transparentize } from 'polished';
import { isMobile } from 'react-device-detect';
import { animated, useSpring, useTransition } from 'react-spring';
import { useGesture } from 'react-use-gesture';
import styled, { css } from 'styled-components';
const AnimatedDialogOverlay = animated(DialogOverlay);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const StyledDialogOverlay = styled(AnimatedDialogOverlay) `
  &[data-reach-dialog-overlay] {
    z-index: 2;
    background-color: transparent;
    overflow: hidden;

    display: flex;
    align-items: center;
    justify-content: center;

    background-color: ${({ theme }) => theme.modalBG};
  }
`;
const AnimatedDialogContent = animated(DialogContent);
// destructure to not pass custom props to Dialog DOM element
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const StyledDialogContent = styled((_a) => {
    var { minHeight, maxHeight, mobile, isOpen } = _a, rest = __rest(_a, ["minHeight", "maxHeight", "mobile", "isOpen"]);
    return (_jsx(AnimatedDialogContent, Object.assign({}, rest), void 0));
}).attrs({
    'aria-label': 'dialog',
}) `
  overflow-y: ${({ mobile }) => (mobile ? 'scroll' : 'hidden')};

  &[data-reach-dialog-content] {
    margin: 0 0 2rem 0;
    background-color: ${({ theme }) => theme.bg1};
    box-shadow: 0 4px 8px 0 ${({ theme }) => transparentize(0.95, theme.shadow1)};
    padding: 0px;
    width: 50vw;
    overflow-y: ${({ mobile }) => (mobile ? 'scroll' : 'hidden')};
    overflow-x: hidden;

    align-self: ${({ mobile }) => (mobile ? 'flex-end' : 'center')};

    max-width: 420px;
    ${({ maxHeight }) => maxHeight &&
    css `
        max-height: ${maxHeight}vh;
      `}
    ${({ minHeight }) => minHeight &&
    css `
        min-height: ${minHeight}vh;
      `}
    display: flex;
    border-radius: 20px;
    ${({ theme }) => theme.mediaWidth.upToMedium `
      width: 65vw;
      margin: 0;
    `}
    ${({ theme, mobile }) => theme.mediaWidth.upToSmall `
      width:  85vw;
      ${mobile &&
    css `
          width: 100vw;
          border-radius: 20px;
          border-bottom-left-radius: 0;
          border-bottom-right-radius: 0;
        `}
    `}
  }
`;
export default function Modal({ isOpen, onDismiss, minHeight = false, maxHeight = 90, initialFocusRef, children, }) {
    const fadeTransition = useTransition(isOpen, null, {
        config: { duration: 200 },
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
    });
    const [{ y }, set] = useSpring(() => ({ y: 0, config: { mass: 1, tension: 210, friction: 20 } }));
    const bind = useGesture({
        onDrag: (state) => {
            set({
                y: state.down ? state.movement[1] : 0,
            });
            if (state.movement[1] > 300 || (state.velocity > 3 && state.direction[1] > 0)) {
                onDismiss();
            }
        },
    });
    return (_jsx(_Fragment, { children: fadeTransition.map(({ item, key, props }) => item && (_jsx(StyledDialogOverlay, Object.assign({ style: props, onDismiss: onDismiss, initialFocusRef: initialFocusRef }, { children: _jsxs(StyledDialogContent, Object.assign({}, (isMobile
                ? Object.assign(Object.assign({}, bind()), { style: {
                        transform: y.interpolate((n) => `translateY(${n > 0 ? n : 0}px)`),
                    } }) : {}), { "aria-label": "dialog content", minHeight: minHeight, maxHeight: maxHeight, mobile: isMobile }, { children: [!initialFocusRef && isMobile ? _jsx("div", { tabIndex: 1 }, void 0) : null, children] }), void 0) }), key))) }, void 0));
}
