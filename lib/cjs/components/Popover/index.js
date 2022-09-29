"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const portal_1 = __importDefault(require("@reach/portal"));
const polished_1 = require("polished");
const react_1 = require("react");
const react_popper_1 = require("react-popper");
const styled_components_1 = __importDefault(require("styled-components"));
const useInterval_1 = __importDefault(require("../../hooks/useInterval"));
const PopoverContainer = styled_components_1.default.div `
  z-index: 9999;

  visibility: ${(props) => (props.show ? 'visible' : 'hidden')};
  opacity: ${(props) => (props.show ? 1 : 0)};
  transition: visibility 150ms linear, opacity 150ms linear;

  background: ${({ theme }) => theme.bg2};
  border: 1px solid ${({ theme }) => theme.bg3};
  box-shadow: 0 4px 8px 0 ${({ theme }) => (0, polished_1.transparentize)(0.9, theme.shadow1)};
  color: ${({ theme }) => theme.text2};
  border-radius: 8px;
`;
const ReferenceElement = styled_components_1.default.div `
  display: inline-block;
`;
const Arrow = styled_components_1.default.div `
  width: 8px;
  height: 8px;
  z-index: 9998;

  ::before {
    position: absolute;
    width: 8px;
    height: 8px;
    z-index: 9998;

    content: '';
    border: 1px solid ${({ theme }) => theme.bg3};
    transform: rotate(45deg);
    background: ${({ theme }) => theme.bg2};
  }

  &.arrow-top {
    bottom: -5px;
    ::before {
      border-top: none;
      border-left: none;
    }
  }

  &.arrow-bottom {
    top: -5px;
    ::before {
      border-bottom: none;
      border-right: none;
    }
  }

  &.arrow-left {
    right: -5px;

    ::before {
      border-bottom: none;
      border-left: none;
    }
  }

  &.arrow-right {
    left: -5px;
    ::before {
      border-right: none;
      border-top: none;
    }
  }
`;
function Popover({ content, show, children, placement = 'auto' }) {
    var _a, _b;
    const [referenceElement, setReferenceElement] = (0, react_1.useState)(null);
    const [popperElement, setPopperElement] = (0, react_1.useState)(null);
    const [arrowElement, setArrowElement] = (0, react_1.useState)(null);
    const { styles, update, attributes } = (0, react_popper_1.usePopper)(referenceElement, popperElement, {
        placement,
        strategy: 'fixed',
        modifiers: [
            { name: 'offset', options: { offset: [8, 8] } },
            { name: 'arrow', options: { element: arrowElement } },
        ],
    });
    const updateCallback = (0, react_1.useCallback)(() => {
        update && update();
    }, [update]);
    (0, useInterval_1.default)(updateCallback, show ? 100 : null);
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(ReferenceElement, Object.assign({ ref: setReferenceElement }, { children: children })), (0, jsx_runtime_1.jsx)(portal_1.default, { children: (0, jsx_runtime_1.jsxs)(PopoverContainer, Object.assign({ show: show, ref: setPopperElement, style: styles.popper }, attributes.popper, { children: [content, (0, jsx_runtime_1.jsx)(Arrow, Object.assign({ className: `arrow-${(_b = (_a = attributes.popper) === null || _a === void 0 ? void 0 : _a['data-popper-placement']) !== null && _b !== void 0 ? _b : ''}`, ref: setArrowElement, style: styles.arrow }, attributes.arrow))] })) })] }));
}
exports.default = Popover;
