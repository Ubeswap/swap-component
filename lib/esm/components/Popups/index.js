import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import styled from 'styled-components';
import { useActivePopups } from '../../state/application/hooks';
import { useURLWarningVisible } from '../../state/user/hooks';
import { AutoColumn } from '../Column';
import PopupItem from './PopupItem';
const MobilePopupWrapper = styled.div `
  position: relative;
  max-width: 100%;
  height: ${({ height }) => height};
  margin: ${({ height }) => (height ? '0 auto;' : 0)};
  margin-bottom: ${({ height }) => (height ? '20px' : 0)}};

  display: none;
  ${({ theme }) => theme.mediaWidth.upToSmall `
    display: block;
  `};
`;
const MobilePopupInner = styled.div `
  height: 99%;
  overflow-x: auto;
  overflow-y: hidden;
  display: flex;
  flex-direction: row;
  -webkit-overflow-scrolling: touch;
  ::-webkit-scrollbar {
    display: none;
  }
`;
const FixedPopupColumn = styled(AutoColumn) `
  position: fixed;
  top: ${({ extraPadding }) => (extraPadding ? '108px' : '88px')};
  right: 1rem;
  max-width: 355px !important;
  width: 100%;
  z-index: 3;

  ${({ theme }) => theme.mediaWidth.upToSmall `
    display: none;
  `};
`;
export default function Popups() {
    // get all popups
    const activePopups = useActivePopups();
    const urlWarningActive = useURLWarningVisible();
    return (_jsxs(_Fragment, { children: [_jsx(FixedPopupColumn, Object.assign({ gap: "20px", extraPadding: urlWarningActive }, { children: activePopups.map((item) => (_jsx(PopupItem, { content: item.content, popKey: item.key, removeAfterMs: item.removeAfterMs }, item.key))) })), _jsx(MobilePopupWrapper, Object.assign({ height: (activePopups === null || activePopups === void 0 ? void 0 : activePopups.length) > 0 ? 'fit-content' : 0 }, { children: _jsx(MobilePopupInner, { children: activePopups // reverse so new items up front
                        .slice(0)
                        .reverse()
                        .map((item) => (_jsx(PopupItem, { content: item.content, popKey: item.key, removeAfterMs: item.removeAfterMs }, item.key))) }) }))] }));
}
