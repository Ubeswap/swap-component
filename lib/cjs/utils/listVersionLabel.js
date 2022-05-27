"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function listVersionLabel(version) {
    return `v${version.major}.${version.minor}.${version.patch}`;
}
exports.default = listVersionLabel;
