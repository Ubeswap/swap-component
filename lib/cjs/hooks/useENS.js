"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
/**
 * Given a name or address, does a lookup to resolve to an address and name
 * @param nameOrAddress ENS name or address
 */
function useENS(nameOrAddress) {
    const validated = (0, utils_1.isAddress)(nameOrAddress);
    return {
        loading: false,
        address: validated ? validated : null,
        name: null,
    };
}
exports.default = useENS;
