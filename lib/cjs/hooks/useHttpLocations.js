"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const uriToHttp_1 = __importDefault(require("../utils/uriToHttp"));
function useHttpLocations(uri) {
    return (0, react_1.useMemo)(() => {
        return uri ? (0, uriToHttp_1.default)(uri) : [];
    }, [uri]);
}
exports.default = useHttpLocations;
