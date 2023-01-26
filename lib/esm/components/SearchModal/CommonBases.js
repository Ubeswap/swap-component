import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Token } from '@ubeswap/sdk';
import { useTranslation } from 'react-i18next';
import { Text } from 'rebass';
import styled from 'styled-components';
import { SUGGESTED_BASES } from '../../constants';
import { useAllTokens } from '../../hooks/Tokens';
import { AutoColumn } from '../Column';
import CurrencyLogo from '../CurrencyLogo';
import QuestionHelper from '../QuestionHelper';
import { AutoRow } from '../Row';
const BaseWrapper = styled.div `
  border: 1px solid ${({ theme, disable }) => (disable ? 'transparent' : theme.bg3)};
  border-radius: 10px;
  display: flex;
  padding: 6px;

  align-items: center;
  :hover {
    cursor: ${({ disable }) => !disable && 'pointer'};
    background-color: ${({ theme, disable }) => !disable && theme.bg2};
  }

  background-color: ${({ theme, disable }) => disable && theme.bg3};
  opacity: ${({ disable }) => disable && '0.4'};
`;
export default function CommonBases({ chainId, onSelect, selectedCurrency, }) {
    const allTokens = useAllTokens();
    const { t } = useTranslation();
    return (_jsxs(AutoColumn, Object.assign({ gap: "md" }, { children: [_jsxs(AutoRow, { children: [_jsx(Text, Object.assign({ fontWeight: 500, fontSize: 14 }, { children: t('CommonBases') })), _jsx(QuestionHelper, { text: t('TheseTokensAreCommonlyPairedWithOtherTokens') })] }), _jsx(AutoRow, Object.assign({ gap: "4px" }, { children: (chainId ? SUGGESTED_BASES[chainId] : []).map((token) => {
                    var _a;
                    const selected = selectedCurrency instanceof Token && selectedCurrency.address === token.address;
                    return (_jsxs(BaseWrapper, Object.assign({ onClick: () => !selected && onSelect(token), disable: selected }, { children: [_jsx(CurrencyLogo, { currency: (_a = allTokens[token.address]) !== null && _a !== void 0 ? _a : token, style: { marginRight: 8 } }), _jsx(Text, Object.assign({ fontWeight: 500, fontSize: 16 }, { children: token.symbol }))] }), token.address));
                }) }))] })));
}
