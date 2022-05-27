"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseENSAddress = void 0;
const ENS_NAME_REGEX = /^(([a-zA-Z0-9]+(-[a-zA-Z0-9]+)*\.)+)eth(\/.*)?$/;
function parseENSAddress(ensAddress) {
    const match = ensAddress.match(ENS_NAME_REGEX);
    if (!match)
        return undefined;
    return { ensName: `${match[1].toLowerCase()}eth`, ensPath: match[4] };
}
exports.parseENSAddress = parseENSAddress;
