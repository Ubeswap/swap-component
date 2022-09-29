"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const styled_components_1 = __importDefault(require("styled-components"));
const theme_1 = require("../../theme");
const InfoCard = styled_components_1.default.button `
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
const OptionCard = (0, styled_components_1.default)(InfoCard) `
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 2rem;
  padding: 1rem;
`;
const OptionCardLeft = styled_components_1.default.div `
  ${({ theme }) => theme.flexColumnNoWrap};
  justify-content: center;
  height: 100%;
`;
const OptionCardClickable = (0, styled_components_1.default)(OptionCard) `
  margin-top: 0;
  &:hover {
    cursor: ${({ clickable }) => (clickable ? 'pointer' : '')};
    border: ${({ clickable, theme }) => (clickable ? `1px solid ${theme.primary1}` : ``)};
  }
  opacity: ${({ disabled }) => (disabled ? '0.5' : '1')};
`;
const GreenCircle = styled_components_1.default.div `
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
const CircleWrapper = styled_components_1.default.div `
  color: ${({ theme }) => theme.green1};
  display: flex;
  justify-content: center;
  align-items: center;
`;
const HeaderText = styled_components_1.default.div `
  ${({ theme }) => theme.flexRowNoWrap};
  color: ${(props) => (props.color === 'blue' ? ({ theme }) => theme.primary1 : ({ theme }) => theme.text1)};
  font-size: 1rem;
  font-weight: 500;
`;
const SubHeader = styled_components_1.default.div `
  color: ${({ theme }) => theme.text1};
  margin-top: 10px;
  font-size: 12px;
`;
const IconWrapper = styled_components_1.default.div `
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
function Option({ link = null, clickable = true, size, onClick = null, color, header, subheader = null, icon, active = false, id, }) {
    const content = ((0, jsx_runtime_1.jsxs)(OptionCardClickable, Object.assign({ id: id, onClick: onClick, clickable: clickable && !active, active: active }, { children: [(0, jsx_runtime_1.jsxs)(OptionCardLeft, { children: [(0, jsx_runtime_1.jsxs)(HeaderText, Object.assign({ color: color }, { children: [active ? ((0, jsx_runtime_1.jsx)(CircleWrapper, { children: (0, jsx_runtime_1.jsx)(GreenCircle, { children: (0, jsx_runtime_1.jsx)("div", {}) }) })) : (''), header] })), subheader && (0, jsx_runtime_1.jsx)(SubHeader, { children: subheader })] }), (0, jsx_runtime_1.jsx)(IconWrapper, Object.assign({ size: size }, { children: (0, jsx_runtime_1.jsx)("img", { src: icon, alt: 'Icon', width: `${size || 24}px`, height: `${size || 24}px` }) }))] })));
    if (link) {
        return (0, jsx_runtime_1.jsx)(theme_1.ExternalLink, Object.assign({ href: link }, { children: content }));
    }
    return content;
}
exports.default = Option;
