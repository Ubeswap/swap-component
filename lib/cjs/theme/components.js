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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClickableText = exports.ExtraSmallOnly = exports.HideExtraSmall = exports.HideSmall = exports.CustomLightSpinner = exports.BackArrow = exports.Spinner = exports.ExternalLinkIcon = exports.ExternalLink = exports.UbeTokenAnimated = exports.TrashIcon = exports.LinkIcon = exports.StyledLink = exports.StyledInternalLink = exports.LinkStyledButton = exports.IconWrapper = exports.CloseIcon = exports.Button = exports.ButtonText = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const polished_1 = require("polished");
const react_1 = require("react");
const react_feather_1 = require("react-feather");
const react_ga_1 = __importDefault(require("react-ga"));
const react_router_dom_1 = require("react-router-dom");
const rebass_1 = require("rebass");
const styled_components_1 = __importStar(require("styled-components"));
exports.ButtonText = styled_components_1.default.button `
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
exports.Button = styled_components_1.default.button.attrs(({ warning, theme }) => ({
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
    background-color: ${({ backgroundColor }) => (0, polished_1.darken)(0.05, backgroundColor)};
  }

  :active {
    background-color: ${({ backgroundColor }) => (0, polished_1.darken)(0.1, backgroundColor)};
  }

  :disabled {
    background-color: ${({ theme }) => theme.bg1};
    color: ${({ theme }) => theme.text4};
    cursor: auto;
  }
`;
exports.CloseIcon = (0, styled_components_1.default)(react_feather_1.X) `
  cursor: pointer;
`;
// for wrapper react feather icons
exports.IconWrapper = styled_components_1.default.div `
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
exports.LinkStyledButton = styled_components_1.default.button `
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
exports.StyledInternalLink = (0, styled_components_1.default)(react_router_dom_1.Link) `
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
exports.StyledLink = styled_components_1.default.a `
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
const LinkIconWrapper = styled_components_1.default.a `
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
exports.LinkIcon = (0, styled_components_1.default)(react_feather_1.ExternalLink) `
  height: 16px;
  width: 18px;
  margin-left: 10px;
  stroke: ${({ theme }) => theme.blue1};
`;
exports.TrashIcon = (0, styled_components_1.default)(react_feather_1.Trash) `
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
const rotateImg = (0, styled_components_1.keyframes) `
  0% {
    transform: perspective(1000px) rotateY(0deg);
  }

  100% {
    transform: perspective(1000px) rotateY(360deg);
  }
`;
exports.UbeTokenAnimated = styled_components_1.default.img `
  animation: ${rotateImg} 5s cubic-bezier(0.83, 0, 0.17, 1) infinite;
  padding: 2rem 0 0 0;
  filter: drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.15));
`;
/**
 * Outbound link that handles firing google analytics events
 */
function ExternalLink(_a) {
    var { target = '_blank', href, rel = 'noopener noreferrer' } = _a, rest = __rest(_a, ["target", "href", "rel"]);
    const handleClick = (0, react_1.useCallback)((event) => {
        // don't prevent default, don't redirect if it's a new tab
        if (target === '_blank' || event.ctrlKey || event.metaKey) {
            react_ga_1.default.outboundLink({ label: href }, () => {
                console.debug('Fired outbound link event', href);
            });
        }
        else {
            event.preventDefault();
            // send a ReactGA event and then trigger a location change
            react_ga_1.default.outboundLink({ label: href }, () => {
                window.location.href = href;
            });
        }
    }, [href, target]);
    return (0, jsx_runtime_1.jsx)(exports.StyledLink, Object.assign({ target: target, rel: rel, href: href, onClick: handleClick }, rest));
}
exports.ExternalLink = ExternalLink;
function ExternalLinkIcon(_a) {
    var { target = '_blank', href, rel = 'noopener noreferrer' } = _a, rest = __rest(_a, ["target", "href", "rel"]);
    const handleClick = (0, react_1.useCallback)((event) => {
        // don't prevent default, don't redirect if it's a new tab
        if (target === '_blank' || event.ctrlKey || event.metaKey) {
            react_ga_1.default.outboundLink({ label: href }, () => {
                console.debug('Fired outbound link event', href);
            });
        }
        else {
            event.preventDefault();
            // send a ReactGA event and then trigger a location change
            react_ga_1.default.outboundLink({ label: href }, () => {
                window.location.href = href;
            });
        }
    }, [href, target]);
    return ((0, jsx_runtime_1.jsx)(LinkIconWrapper, Object.assign({ target: target, rel: rel, href: href, onClick: handleClick }, rest, { children: (0, jsx_runtime_1.jsx)(exports.LinkIcon, {}) })));
}
exports.ExternalLinkIcon = ExternalLinkIcon;
const rotate = (0, styled_components_1.keyframes) `
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;
exports.Spinner = styled_components_1.default.img `
  animation: 2s ${rotate} linear infinite;
  width: 16px;
  height: 16px;
`;
const BackArrowLink = (0, styled_components_1.default)(exports.StyledInternalLink) `
  color: ${({ theme }) => theme.text1};
`;
function BackArrow({ to }) {
    return ((0, jsx_runtime_1.jsx)(BackArrowLink, Object.assign({ to: to }, { children: (0, jsx_runtime_1.jsx)(react_feather_1.ArrowLeft, {}) })));
}
exports.BackArrow = BackArrow;
exports.CustomLightSpinner = (0, styled_components_1.default)(exports.Spinner) `
  height: ${({ size }) => size};
  width: ${({ size }) => size};
`;
exports.HideSmall = styled_components_1.default.span `
  ${({ theme }) => theme.mediaWidth.upToSmall `
    display: none;
  `};
`;
exports.HideExtraSmall = styled_components_1.default.span `
  ${({ theme }) => theme.mediaWidth.upToExtraSmall `
    display: none;
  `};
`;
exports.ExtraSmallOnly = styled_components_1.default.span `
  display: none;
  ${({ theme }) => theme.mediaWidth.upToExtraSmall `
    display: block;
  `};
`;
exports.ClickableText = (0, styled_components_1.default)(rebass_1.Text) `
  :hover {
    cursor: pointer;
  }
  color: ${({ theme }) => theme.primary1};
`;
