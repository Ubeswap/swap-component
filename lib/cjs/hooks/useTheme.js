"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const styled_components_1 = require("styled-components");
function useTheme() {
    return (0, react_1.useContext)(styled_components_1.ThemeContext);
}
exports.default = useTheme;
