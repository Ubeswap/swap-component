"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const i18next_1 = __importDefault(require("i18next"));
const i18next_browser_languagedetector_1 = __importDefault(require("i18next-browser-languagedetector"));
const i18next_xhr_backend_1 = __importDefault(require("i18next-xhr-backend"));
const react_i18next_1 = require("react-i18next");
const de_json_1 = __importDefault(require("./assets/locales/de.json"));
const en_json_1 = __importDefault(require("./assets/locales/en.json"));
const es_AR_json_1 = __importDefault(require("./assets/locales/es-AR.json"));
const es_US_json_1 = __importDefault(require("./assets/locales/es-US.json"));
const it_IT_json_1 = __importDefault(require("./assets/locales/it-IT.json"));
const iw_json_1 = __importDefault(require("./assets/locales/iw.json"));
const ro_json_1 = __importDefault(require("./assets/locales/ro.json"));
const ru_json_1 = __importDefault(require("./assets/locales/ru.json"));
const tr_json_1 = __importDefault(require("./assets/locales/tr.json"));
const vi_json_1 = __importDefault(require("./assets/locales/vi.json"));
const zh_CN_json_1 = __importDefault(require("./assets/locales/zh-CN.json"));
const zh_TW_json_1 = __importDefault(require("./assets/locales/zh-TW.json"));
const resources = {
    en: {
        translation: en_json_1.default,
    },
    de: {
        translation: de_json_1.default,
    },
    'es-AR': {
        translation: es_AR_json_1.default,
    },
    'es-US': {
        translation: es_US_json_1.default,
    },
    'it-IT': {
        translation: it_IT_json_1.default,
    },
    iw: {
        translation: iw_json_1.default,
    },
    ro: {
        translation: ro_json_1.default,
    },
    ru: {
        translation: ru_json_1.default,
    },
    tr: {
        translation: tr_json_1.default,
    },
    vi: {
        translation: vi_json_1.default,
    },
    'zh-CN': {
        translation: zh_CN_json_1.default,
    },
    'zh-TW': {
        translation: zh_TW_json_1.default,
    },
};
i18next_1.default
    .use(i18next_xhr_backend_1.default)
    .use(i18next_browser_languagedetector_1.default)
    .use(react_i18next_1.initReactI18next)
    .init({
    resources,
    lng: 'en',
    react: {
        useSuspense: true,
    },
    fallbackLng: 'en',
    preload: ['en'],
    keySeparator: false,
    interpolation: { escapeValue: false },
});
exports.default = i18next_1.default;
