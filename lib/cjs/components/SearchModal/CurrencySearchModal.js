"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrencyModalView = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const useLast_1 = __importDefault(require("../../hooks/useLast"));
const usePrevious_1 = __importDefault(require("../../hooks/usePrevious"));
const Modal_1 = __importDefault(require("../Modal"));
const CurrencySearch_1 = require("./CurrencySearch");
const ImportList_1 = require("./ImportList");
const ImportToken_1 = require("./ImportToken");
const Manage_1 = __importDefault(require("./Manage"));
var CurrencyModalView;
(function (CurrencyModalView) {
    CurrencyModalView[CurrencyModalView["search"] = 0] = "search";
    CurrencyModalView[CurrencyModalView["manage"] = 1] = "manage";
    CurrencyModalView[CurrencyModalView["importToken"] = 2] = "importToken";
    CurrencyModalView[CurrencyModalView["importList"] = 3] = "importList";
})(CurrencyModalView = exports.CurrencyModalView || (exports.CurrencyModalView = {}));
function CurrencySearchModal({ isOpen, onDismiss, onCurrencySelect, selectedCurrency, otherSelectedCurrency, showCommonBases = false, chainId, defaultTokenLists, }) {
    const [modalView, setModalView] = (0, react_1.useState)(CurrencyModalView.manage);
    const lastOpen = (0, useLast_1.default)(isOpen);
    (0, react_1.useEffect)(() => {
        if (isOpen && !lastOpen) {
            setModalView(CurrencyModalView.search);
        }
    }, [isOpen, lastOpen]);
    const handleCurrencySelect = (0, react_1.useCallback)((currency) => {
        onCurrencySelect(currency);
        onDismiss();
    }, [onDismiss, onCurrencySelect]);
    // for token import view
    const prevView = (0, usePrevious_1.default)(modalView);
    // used for import token flow
    const [importToken, setImportToken] = (0, react_1.useState)();
    // used for import list
    const [importList, setImportList] = (0, react_1.useState)();
    const [listURL, setListUrl] = (0, react_1.useState)();
    // change min height if not searching
    const minHeight = modalView === CurrencyModalView.importToken || modalView === CurrencyModalView.importList ? 40 : 80;
    return ((0, jsx_runtime_1.jsx)(Modal_1.default, Object.assign({ isOpen: isOpen, onDismiss: onDismiss, maxHeight: 80, minHeight: minHeight }, { children: modalView === CurrencyModalView.search ? ((0, jsx_runtime_1.jsx)(CurrencySearch_1.CurrencySearch, { isOpen: isOpen, onDismiss: onDismiss, onCurrencySelect: handleCurrencySelect, selectedCurrency: selectedCurrency, otherSelectedCurrency: otherSelectedCurrency, showCommonBases: showCommonBases, showImportView: () => setModalView(CurrencyModalView.importToken), setImportToken: setImportToken, showManageView: () => setModalView(CurrencyModalView.manage), chainId: chainId, defaultTokenLists: defaultTokenLists })) : modalView === CurrencyModalView.importToken && importToken ? ((0, jsx_runtime_1.jsx)(ImportToken_1.ImportToken, { tokens: [importToken], onDismiss: onDismiss, onBack: () => setModalView(prevView && prevView !== CurrencyModalView.importToken ? prevView : CurrencyModalView.search), handleCurrencySelect: handleCurrencySelect })) : modalView === CurrencyModalView.importList && importList && listURL ? ((0, jsx_runtime_1.jsx)(ImportList_1.ImportList, { list: importList, listURL: listURL, onDismiss: onDismiss, setModalView: setModalView })) : modalView === CurrencyModalView.manage ? ((0, jsx_runtime_1.jsx)(Manage_1.default, { onDismiss: onDismiss, setModalView: setModalView, setImportToken: setImportToken, setImportList: setImportList, setListUrl: setListUrl })) : ('') })));
}
exports.default = CurrencySearchModal;
