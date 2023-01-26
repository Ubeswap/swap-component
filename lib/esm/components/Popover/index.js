import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import Portal from '@reach/portal';
import { transparentize } from 'polished';
import { useCallback, useState } from 'react';
import { usePopper } from 'react-popper';
import styled from 'styled-components';
import useInterval from '../../hooks/useInterval';
const PopoverContainer = styled.div `
  z-index: 9999;

  visibility: ${(props) => (props.show ? 'visible' : 'hidden')};
  opacity: ${(props) => (props.show ? 1 : 0)};
  transition: visibility 150ms linear, opacity 150ms linear;

  background: ${({ theme }) => theme.bg2};
  border: 1px solid ${({ theme }) => theme.bg3};
  box-shadow: 0 4px 8px 0 ${({ theme }) => transparentize(0.9, theme.shadow1)};
  color: ${({ theme }) => theme.text2};
  border-radius: 8px;
`;
const ReferenceElement = styled.div `
  display: inline-block;
`;
const Arrow = styled.div `
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
export default function Popover({ content, show, children, placement = 'auto' }) {
    var _a, _b;
    const [referenceElement, setReferenceElement] = useState(null);
    const [popperElement, setPopperElement] = useState(null);
    const [arrowElement, setArrowElement] = useState(null);
    const { styles, update, attributes } = usePopper(referenceElement, popperElement, {
        placement,
        strategy: 'fixed',
        modifiers: [
            { name: 'offset', options: { offset: [8, 8] } },
            { name: 'arrow', options: { element: arrowElement } },
        ],
    });
    const updateCallback = useCallback(() => {
        update && update();
    }, [update]);
    useInterval(updateCallback, show ? 100 : null);
    return (_jsxs(_Fragment, { children: [_jsx(ReferenceElement, Object.assign({ ref: setReferenceElement }, { children: children })), _jsx(Portal, { children: _jsxs(PopoverContainer, Object.assign({ show: show, ref: setPopperElement, style: styles.popper }, attributes.popper, { children: [content, _jsx(Arrow, Object.assign({ className: `arrow-${(_b = (_a = attributes.popper) === null || _a === void 0 ? void 0 : _a['data-popper-placement']) !== null && _b !== void 0 ? _b : ''}`, ref: setArrowElement, style: styles.arrow }, attributes.arrow))] })) })] }));
}
