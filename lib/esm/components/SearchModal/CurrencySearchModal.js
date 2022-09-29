import { jsx as _jsx } from "react/jsx-runtime";
import { useCallback, useEffect, useState } from 'react';
import useLast from '../../hooks/useLast';
import usePrevious from '../../hooks/usePrevious';
import Modal from '../Modal';
import { CurrencySearch } from './CurrencySearch';
import { ImportList } from './ImportList';
import { ImportToken } from './ImportToken';
import Manage from './Manage';
export var CurrencyModalView;
(function (CurrencyModalView) {
    CurrencyModalView[CurrencyModalView["search"] = 0] = "search";
    CurrencyModalView[CurrencyModalView["manage"] = 1] = "manage";
    CurrencyModalView[CurrencyModalView["importToken"] = 2] = "importToken";
    CurrencyModalView[CurrencyModalView["importList"] = 3] = "importList";
})(CurrencyModalView || (CurrencyModalView = {}));
export default function CurrencySearchModal({ isOpen, onDismiss, onCurrencySelect, selectedCurrency, otherSelectedCurrency, showCommonBases = false, chainId, }) {
    const [modalView, setModalView] = useState(CurrencyModalView.manage);
    const lastOpen = useLast(isOpen);
    useEffect(() => {
        if (isOpen && !lastOpen) {
            setModalView(CurrencyModalView.search);
        }
    }, [isOpen, lastOpen]);
    const handleCurrencySelect = useCallback((currency) => {
        onCurrencySelect(currency);
        onDismiss();
    }, [onDismiss, onCurrencySelect]);
    // for token import view
    const prevView = usePrevious(modalView);
    // used for import token flow
    const [importToken, setImportToken] = useState();
    // used for import list
    const [importList, setImportList] = useState();
    const [listURL, setListUrl] = useState();
    // change min height if not searching
    const minHeight = modalView === CurrencyModalView.importToken || modalView === CurrencyModalView.importList ? 40 : 80;
    return (_jsx(Modal, Object.assign({ isOpen: isOpen, onDismiss: onDismiss, maxHeight: 80, minHeight: minHeight }, { children: modalView === CurrencyModalView.search ? (_jsx(CurrencySearch, { isOpen: isOpen, onDismiss: onDismiss, onCurrencySelect: handleCurrencySelect, selectedCurrency: selectedCurrency, otherSelectedCurrency: otherSelectedCurrency, showCommonBases: showCommonBases, showImportView: () => setModalView(CurrencyModalView.importToken), setImportToken: setImportToken, showManageView: () => setModalView(CurrencyModalView.manage), chainId: chainId })) : modalView === CurrencyModalView.importToken && importToken ? (_jsx(ImportToken, { tokens: [importToken], onDismiss: onDismiss, onBack: () => setModalView(prevView && prevView !== CurrencyModalView.importToken ? prevView : CurrencyModalView.search), handleCurrencySelect: handleCurrencySelect })) : modalView === CurrencyModalView.importList && importList && listURL ? (_jsx(ImportList, { list: importList, listURL: listURL, onDismiss: onDismiss, setModalView: setModalView })) : modalView === CurrencyModalView.manage ? (_jsx(Manage, { onDismiss: onDismiss, setModalView: setModalView, setImportToken: setImportToken, setImportList: setImportList, setListUrl: setListUrl })) : ('') })));
}
