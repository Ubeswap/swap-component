import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useTranslation } from 'react-i18next';
import Modal from '../Modal';
const ChangeNetworkModal = () => {
    const { t } = useTranslation();
    return (_jsx(Modal, Object.assign({ isOpen: true, onDismiss: () => null, maxHeight: 24, minHeight: 24 }, { children: _jsxs("div", Object.assign({ style: { width: '100%', margin: '16px' } }, { children: [_jsx("div", { children: _jsx("span", { children: t('unsupportedNetwork') }) }), _jsx("hr", { style: { marginBottom: '28px' } }), _jsx("div", { children: _jsx("span", { children: t('unsupportedNetworkDesc') }) })] })) })));
};
export default ChangeNetworkModal;
