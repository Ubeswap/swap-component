import { jsx as _jsx } from "react/jsx-runtime";
import styled from 'styled-components';
import useHttpLocations from '../../hooks/useHttpLocations';
import Logo from '../Logo';
const StyledListLogo = styled(Logo) `
  width: ${({ size }) => size};
  height: ${({ size }) => size};
`;
export default function ListLogo({ logoURI, style, size = '24px', alt, }) {
    const srcs = useHttpLocations(logoURI);
    return _jsx(StyledListLogo, { alt: alt, size: size, srcs: srcs, style: style });
}
