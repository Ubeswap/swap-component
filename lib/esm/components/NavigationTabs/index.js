import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { darken } from 'polished';
import { ArrowLeft } from 'react-feather';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Link as HistoryLink, NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { resetMintState } from '../../state/mint/actions';
import { RowBetween } from '../Row';
// import QuestionHelper from '../QuestionHelper'
import Settings from '../Settings';
const Tabs = styled.div `
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: center;
  border-radius: 3rem;
  justify-content: space-evenly;
`;
const activeClassName = 'ACTIVE';
const StyledNavLink = styled(NavLink).attrs({
    activeClassName,
}) `
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: center;
  justify-content: center;
  height: 3rem;
  border-radius: 3rem;
  outline: none;
  cursor: pointer;
  text-decoration: none;
  color: ${({ theme }) => theme.text3};
  font-size: 20px;

  &.${activeClassName} {
    border-radius: 12px;
    font-weight: 500;
    color: ${({ theme }) => theme.text1};
  }

  :hover,
  :focus {
    color: ${({ theme }) => darken(0.1, theme.text1)};
  }
`;
const ActiveText = styled.div `
  font-weight: 500;
  font-size: 20px;
`;
const StyledArrowLeft = styled(ArrowLeft) `
  color: ${({ theme }) => theme.text1};
`;
export function SwapPoolTabs({ active }) {
    const { t } = useTranslation();
    return (_jsxs(Tabs, Object.assign({ style: { marginBottom: '20px', display: 'none' } }, { children: [_jsx(StyledNavLink, Object.assign({ id: `swap-nav-link`, to: '/swap', isActive: () => active === 'swap' }, { children: t('swap') })), _jsx(StyledNavLink, Object.assign({ id: `pool-nav-link`, to: '/pool', isActive: () => active === 'pool' }, { children: t('pool') }))] })));
}
export function FindPoolTabs() {
    const { t } = useTranslation();
    return (_jsx(Tabs, { children: _jsxs(RowBetween, Object.assign({ style: { padding: '1rem 1rem 0 1rem' } }, { children: [_jsx(HistoryLink, Object.assign({ to: "/pool" }, { children: _jsx(StyledArrowLeft, {}) })), _jsx(ActiveText, { children: t('ImportPool') }), _jsx(Settings, {})] })) }));
}
export function AddRemoveTabs({ adding, creating }) {
    // reset states on back
    const dispatch = useDispatch();
    const { t } = useTranslation();
    return (_jsx(Tabs, { children: _jsxs(RowBetween, Object.assign({ style: { padding: '1rem 1rem 0 1rem' } }, { children: [_jsx(HistoryLink, Object.assign({ to: "/pool", onClick: () => {
                        adding && dispatch(resetMintState());
                    } }, { children: _jsx(StyledArrowLeft, {}) })), _jsx(ActiveText, { children: creating ? `${t('createPair')}` : adding ? `${t('addLiquidity')}` : `${t('removeLiquidity')}` }), _jsx(Settings, {})] })) }));
}
