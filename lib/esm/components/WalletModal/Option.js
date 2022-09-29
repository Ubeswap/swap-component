import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styled from 'styled-components';
import { ExternalLink } from '../../theme';
const InfoCard = styled.button `
  background-color: ${({ theme, active }) => (active ? theme.bg3 : theme.bg2)};
  padding: 1rem;
  outline: none;
  border: 1px solid;
  border-radius: 12px;
  width: 100% !important;
  &:focus {
    box-shadow: 0 0 0 1px ${({ theme }) => theme.primary1};
  }
  border-color: ${({ theme, active }) => (active ? 'transparent' : theme.bg3)};
`;
const OptionCard = styled(InfoCard) `
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 2rem;
  padding: 1rem;
`;
const OptionCardLeft = styled.div `
  ${({ theme }) => theme.flexColumnNoWrap};
  justify-content: center;
  height: 100%;
`;
const OptionCardClickable = styled(OptionCard) `
  margin-top: 0;
  &:hover {
    cursor: ${({ clickable }) => (clickable ? 'pointer' : '')};
    border: ${({ clickable, theme }) => (clickable ? `1px solid ${theme.primary1}` : ``)};
  }
  opacity: ${({ disabled }) => (disabled ? '0.5' : '1')};
`;
const GreenCircle = styled.div `
  ${({ theme }) => theme.flexRowNoWrap}
  justify-content: center;
  align-items: center;

  &:first-child {
    height: 8px;
    width: 8px;
    margin-right: 8px;
    background-color: ${({ theme }) => theme.green1};
    border-radius: 50%;
  }
`;
const CircleWrapper = styled.div `
  color: ${({ theme }) => theme.green1};
  display: flex;
  justify-content: center;
  align-items: center;
`;
const HeaderText = styled.div `
  ${({ theme }) => theme.flexRowNoWrap};
  color: ${(props) => (props.color === 'blue' ? ({ theme }) => theme.primary1 : ({ theme }) => theme.text1)};
  font-size: 1rem;
  font-weight: 500;
`;
const SubHeader = styled.div `
  color: ${({ theme }) => theme.text1};
  margin-top: 10px;
  font-size: 12px;
`;
const IconWrapper = styled.div `
  ${({ theme }) => theme.flexColumnNoWrap};
  align-items: center;
  justify-content: center;
  & > img,
  span {
    height: ${({ size }) => (size ? size + 'px' : '24px')};
    width: ${({ size }) => (size ? size + 'px' : '24px')};
  }
  ${({ theme }) => theme.mediaWidth.upToMedium `
    align-items: flex-end;
  `};
`;
export default function Option({ link = null, clickable = true, size, onClick = null, color, header, subheader = null, icon, active = false, id, }) {
    const content = (_jsxs(OptionCardClickable, Object.assign({ id: id, onClick: onClick, clickable: clickable && !active, active: active }, { children: [_jsxs(OptionCardLeft, { children: [_jsxs(HeaderText, Object.assign({ color: color }, { children: [active ? (_jsx(CircleWrapper, { children: _jsx(GreenCircle, { children: _jsx("div", {}) }) })) : (''), header] })), subheader && _jsx(SubHeader, { children: subheader })] }), _jsx(IconWrapper, Object.assign({ size: size }, { children: _jsx("img", { src: icon, alt: 'Icon', width: `${size || 24}px`, height: `${size || 24}px` }) }))] })));
    if (link) {
        return _jsx(ExternalLink, Object.assign({ href: link }, { children: content }));
    }
    return content;
}
