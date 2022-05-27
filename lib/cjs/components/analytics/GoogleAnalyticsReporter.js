"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_ga_1 = __importDefault(require("react-ga"));
// fires a GA pageview every time the route changes
function GoogleAnalyticsReporter({ location: { pathname, search } }) {
    (0, react_1.useEffect)(() => {
        react_ga_1.default.pageview(`${pathname}${search}`);
    }, [pathname, search]);
    return null;
}
exports.default = GoogleAnalyticsReporter;
