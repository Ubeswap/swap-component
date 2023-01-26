import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useContractKit } from '@celo-tools/use-contractkit';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { useUnsupportedTokens } from '../../hooks/Tokens';
import { CloseIcon, ExternalLink, TYPE } from '../../theme';
import { ButtonEmpty } from '../Button';
import Card, { OutlineCard } from '../Card';
import { AutoColumn } from '../Column';
import CurrencyLogo from '../CurrencyLogo';
import Modal from '../Modal';
import { AutoRow, RowBetween } from '../Row';
const DetailsFooter = styled.div `
  padding-top: calc(16px + 2rem);
  padding-bottom: 20px;
  margin-top: -2rem;
  width: 100%;
  max-width: 400px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  color: ${({ theme }) => theme.text2};
  background-color: ${({ theme }) => theme.advancedBG};
  z-index: -1;

  transform: ${({ show }) => (show ? 'translateY(0%)' : 'translateY(-100%)')};
  transition: transform 300ms ease-in-out;
  text-align: center;
`;
const AddressText = styled(TYPE.blue) `
  font-size: 12px;

  ${({ theme }) => theme.mediaWidth.upToSmall `
    font-size: 10px;
`}
`;
export default function UnsupportedCurrencyFooter({ show, currencies, }) {
    const { network } = useContractKit();
    const accountInfo = useSelector((state) => state.swap.accountInfo);
    const chainId = (accountInfo ? accountInfo.chainId : network.chainId);
    const explorerUrl = accountInfo ? accountInfo.explorerUrl : network.explorer;
    const [showDetails, setShowDetails] = useState(false);
    const tokens = currencies;
    const unsupportedTokens = useUnsupportedTokens();
    return (_jsxs(DetailsFooter, Object.assign({ show: show }, { children: [_jsx(Modal, Object.assign({ isOpen: showDetails, onDismiss: () => setShowDetails(false) }, { children: _jsx(Card, Object.assign({ padding: "2rem" }, { children: _jsxs(AutoColumn, Object.assign({ gap: "lg" }, { children: [_jsxs(RowBetween, { children: [_jsx(TYPE.mediumHeader, { children: "Unsupported Assets" }), _jsx(CloseIcon, { onClick: () => setShowDetails(false) })] }), tokens.map((token) => {
                                var _a;
                                return (token &&
                                    unsupportedTokens &&
                                    Object.keys(unsupportedTokens).includes(token.address) && (_jsx(OutlineCard, { children: _jsxs(AutoColumn, Object.assign({ gap: "10px" }, { children: [_jsxs(AutoRow, Object.assign({ gap: "5px", align: "center" }, { children: [_jsx(CurrencyLogo, { currency: token, size: '24px' }), _jsx(TYPE.body, Object.assign({ fontWeight: 500 }, { children: token.symbol }))] })), chainId && (_jsx(ExternalLink, Object.assign({ href: `${explorerUrl}/address/${token.address}` }, { children: _jsx(AddressText, { children: token.address }) })))] })) }, (_a = token.address) === null || _a === void 0 ? void 0 : _a.concat('not-supported'))));
                            }), _jsx(AutoColumn, Object.assign({ gap: "lg" }, { children: _jsx(TYPE.body, Object.assign({ fontWeight: 500 }, { children: "Some assets are not available through this interface because they may not work well with our smart contract or we are unable to allow trading for legal reasons." })) }))] })) })) })), _jsx(ButtonEmpty, Object.assign({ padding: '0', onClick: () => setShowDetails(true) }, { children: _jsx(TYPE.blue, { children: "Read more about unsupported assets" }) }))] })));
}
