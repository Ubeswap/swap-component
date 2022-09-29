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
import { darken } from 'polished';
import { useCallback } from 'react';
import { ArrowLeft, ExternalLink as LinkIconFeather, Trash, X } from 'react-feather';
import ReactGA from 'react-ga';
import { Link } from 'react-router-dom';
import { Text } from 'rebass';
import styled, { keyframes } from 'styled-components';
export const ButtonText = styled.button `
  outline: none;
  border: none;
  font-size: inherit;
  padding: 0;
  margin: 0;
  background: none;
  cursor: pointer;

  :hover {
    opacity: 0.7;
  }

  :focus {
    text-decoration: underline;
  }
`;
export const Button = styled.button.attrs(({ warning, theme }) => ({
    backgroundColor: warning ? theme.red1 : theme.primary1,
})) `
  padding: 1rem 2rem 1rem 2rem;
  border-radius: 3rem;
  cursor: pointer;
  user-select: none;
  font-size: 1rem;
  border: none;
  outline: none;
  background-color: ${({ backgroundColor }) => backgroundColor};
  color: ${({ theme }) => theme.white};
  width: 100%;

  :hover,
  :focus {
    background-color: ${({ backgroundColor }) => darken(0.05, backgroundColor)};
  }

  :active {
    background-color: ${({ backgroundColor }) => darken(0.1, backgroundColor)};
  }

  :disabled {
    background-color: ${({ theme }) => theme.bg1};
    color: ${({ theme }) => theme.text4};
    cursor: auto;
  }
`;
export const CloseIcon = styled(X) `
  cursor: pointer;
`;
// for wrapper react feather icons
export const IconWrapper = styled.div `
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ size }) => size !== null && size !== void 0 ? size : '20px'};
  height: ${({ size }) => size !== null && size !== void 0 ? size : '20px'};
  margin-right: ${({ marginRight }) => marginRight !== null && marginRight !== void 0 ? marginRight : 0};
  margin-left: ${({ marginLeft }) => marginLeft !== null && marginLeft !== void 0 ? marginLeft : 0};
  & > * {
    stroke: ${({ theme, stroke }) => stroke !== null && stroke !== void 0 ? stroke : theme.blue1};
  }
`;
// A button that triggers some onClick result, but looks like a link.
export const LinkStyledButton = styled.button `
  border: none;
  text-decoration: none;
  background: none;

  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
  color: ${({ theme, disabled }) => (disabled ? theme.text2 : theme.primary1)};
  font-weight: 500;

  :hover {
    text-decoration: ${({ disabled }) => (disabled ? null : 'underline')};
  }

  :focus {
    outline: none;
    text-decoration: ${({ disabled }) => (disabled ? null : 'underline')};
  }

  :active {
    text-decoration: none;
  }
`;
// An internal link from the react-router-dom library that is correctly styled
export const StyledInternalLink = styled(Link) `
  text-decoration: none;
  cursor: pointer;
  color: ${({ theme }) => theme.primary1};
  font-weight: 500;

  :hover {
    text-decoration: underline;
  }

  :focus {
    outline: none;
    text-decoration: underline;
  }

  :active {
    text-decoration: none;
  }
`;
export const StyledLink = styled.a `
  text-decoration: none;
  cursor: pointer;
  color: ${({ theme }) => theme.primary1};
  font-weight: 500;

  :hover {
    text-decoration: underline;
  }

  :focus {
    outline: none;
    text-decoration: underline;
  }

  :active {
    text-decoration: none;
  }
`;
const LinkIconWrapper = styled.a `
  text-decoration: none;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  display: flex;

  :hover {
    text-decoration: none;
    opacity: 0.7;
  }

  :focus {
    outline: none;
    text-decoration: none;
  }

  :active {
    text-decoration: none;
  }
`;
export const LinkIcon = styled(LinkIconFeather) `
  height: 16px;
  width: 18px;
  margin-left: 10px;
  stroke: ${({ theme }) => theme.blue1};
`;
export const TrashIcon = styled(Trash) `
  height: 16px;
  width: 18px;
  margin-left: 10px;
  stroke: ${({ theme }) => theme.text3};

  cursor: pointer;
  align-items: center;
  justify-content: center;
  display: flex;

  :hover {
    opacity: 0.7;
  }
`;
const rotateImg = keyframes `
  0% {
    transform: perspective(1000px) rotateY(0deg);
  }

  100% {
    transform: perspective(1000px) rotateY(360deg);
  }
`;
export const UbeTokenAnimated = styled.img `
  animation: ${rotateImg} 5s cubic-bezier(0.83, 0, 0.17, 1) infinite;
  padding: 2rem 0 0 0;
  filter: drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.15));
`;
/**
 * Outbound link that handles firing google analytics events
 */
export function ExternalLink(_a) {
    var { target = '_blank', href, rel = 'noopener noreferrer' } = _a, rest = __rest(_a, ["target", "href", "rel"]);
    const handleClick = useCallback((event) => {
        // don't prevent default, don't redirect if it's a new tab
        if (target === '_blank' || event.ctrlKey || event.metaKey) {
            ReactGA.outboundLink({ label: href }, () => {
                console.debug('Fired outbound link event', href);
            });
        }
        else {
            event.preventDefault();
            // send a ReactGA event and then trigger a location change
            ReactGA.outboundLink({ label: href }, () => {
                window.location.href = href;
            });
        }
    }, [href, target]);
    return _jsx(StyledLink, Object.assign({ target: target, rel: rel, href: href, onClick: handleClick }, rest));
}
export function ExternalLinkIcon(_a) {
    var { target = '_blank', href, rel = 'noopener noreferrer' } = _a, rest = __rest(_a, ["target", "href", "rel"]);
    const handleClick = useCallback((event) => {
        // don't prevent default, don't redirect if it's a new tab
        if (target === '_blank' || event.ctrlKey || event.metaKey) {
            ReactGA.outboundLink({ label: href }, () => {
                console.debug('Fired outbound link event', href);
            });
        }
        else {
            event.preventDefault();
            // send a ReactGA event and then trigger a location change
            ReactGA.outboundLink({ label: href }, () => {
                window.location.href = href;
            });
        }
    }, [href, target]);
    return (_jsx(LinkIconWrapper, Object.assign({ target: target, rel: rel, href: href, onClick: handleClick }, rest, { children: _jsx(LinkIcon, {}) })));
}
const rotate = keyframes `
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;
export const Spinner = styled.img `
  animation: 2s ${rotate} linear infinite;
  width: 16px;
  height: 16px;
`;
const BackArrowLink = styled(StyledInternalLink) `
  color: ${({ theme }) => theme.text1};
`;
export function BackArrow({ to }) {
    return (_jsx(BackArrowLink, Object.assign({ to: to }, { children: _jsx(ArrowLeft, {}) })));
}
export const CustomLightSpinner = styled(Spinner) `
  height: ${({ size }) => size};
  width: ${({ size }) => size};
`;
export const HideSmall = styled.span `
  ${({ theme }) => theme.mediaWidth.upToSmall `
    display: none;
  `};
`;
export const HideExtraSmall = styled.span `
  ${({ theme }) => theme.mediaWidth.upToExtraSmall `
    display: none;
  `};
`;
export const ExtraSmallOnly = styled.span `
  display: none;
  ${({ theme }) => theme.mediaWidth.upToExtraSmall `
    display: block;
  `};
`;
export const ClickableText = styled(Text) `
  :hover {
    cursor: pointer;
  }
  color: ${({ theme }) => theme.primary1};
`;
