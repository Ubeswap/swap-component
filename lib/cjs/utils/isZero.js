"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Returns true if the string value is zero in hex
 * @param hexNumberString
 */
function isZero(hexNumberString) {
    return /^0x0*$/.test(hexNumberString);
}
exports.default = isZero;
