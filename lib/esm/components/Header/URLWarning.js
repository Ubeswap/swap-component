import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useContractKit } from '@celo-tools/use-contractkit';
import { ChainId } from '@ubeswap/sdk';
import { isMobile } from 'react-device-detect';
import { AlertTriangle, X } from 'react-feather';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { useURLWarningToggle, useURLWarningVisible } from '../../state/user/hooks';
const PhishAlert = styled.div `
  width: 100%;
  padding: 6px 6px;
  background-color: ${({ theme }) => theme.blue1};
  color: white;
  font-size: 11px;
  justify-content: space-between;
  align-items: center;
  display: ${({ isActive }) => (isActive ? 'flex' : 'none')};
`;
export const StyledClose = styled(X) `
  :hover {
    cursor: pointer;
  }
`;
const defaultAppUrl = 'app.ubeswap.org';
const appURL = {
    [ChainId.MAINNET]: 'app.ubeswap.org',
    [ChainId.ALFAJORES]: 'app-alfajores.ubeswap.org',
    [ChainId.BAKLAVA]: 'app-baklava.ubeswap.org',
};
export default function URLWarning() {
    const toggleURLWarning = useURLWarningToggle();
    const showURLWarning = useURLWarningVisible();
    const { network } = useContractKit();
    const accountInfo = useSelector((state) => state.swap.accountInfo);
    const chainId = accountInfo ? accountInfo.chainId : network.chainId;
    return isMobile ? (_jsxs(PhishAlert, Object.assign({ isActive: showURLWarning }, { children: [_jsxs("div", Object.assign({ style: { display: 'flex' } }, { children: [_jsx(AlertTriangle, { style: { marginRight: 6 }, size: 12 }), " Make sure the URL is", _jsx("code", Object.assign({ style: { padding: '0 4px', display: 'inline', fontWeight: 'bold' } }, { children: appURL[chainId] || defaultAppUrl }))] })), _jsx(StyledClose, { size: 12, onClick: toggleURLWarning })] }))) : window.location.hostname === 'app.ubeswap.org' ? (_jsxs(PhishAlert, Object.assign({ isActive: showURLWarning }, { children: [_jsxs("div", Object.assign({ style: { display: 'flex' } }, { children: [_jsx(AlertTriangle, { style: { marginRight: 6 }, size: 12 }), " Always make sure the URL is", _jsx("code", Object.assign({ style: { padding: '0 4px', display: 'inline', fontWeight: 'bold' } }, { children: appURL[chainId] || defaultAppUrl })), ' ', "- bookmark it to be safe."] })), _jsx(StyledClose, { size: 12, onClick: toggleURLWarning })] }))) : null;
}
