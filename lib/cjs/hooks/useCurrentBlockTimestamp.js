"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hooks_1 = require("../state/multicall/hooks");
const useContract_1 = require("./useContract");
// gets the current timestamp from the blockchain
function useCurrentBlockTimestamp() {
    var _a, _b;
    const multicall = (0, useContract_1.useMulticallContract)();
    return (_b = (_a = (0, hooks_1.useSingleCallResult)(multicall, 'getCurrentBlockTimestamp')) === null || _a === void 0 ? void 0 : _a.result) === null || _b === void 0 ? void 0 : _b[0];
}
exports.default = useCurrentBlockTimestamp;
