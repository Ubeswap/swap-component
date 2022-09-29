"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const use_contractkit_1 = require("@celo-tools/use-contractkit");
const jazzicon_1 = __importDefault(require("jazzicon"));
const react_1 = require("react");
const styled_components_1 = __importDefault(require("styled-components"));
const StyledIdenticonContainer = styled_components_1.default.div `
  height: 1rem;
  width: 1rem;
  border-radius: 1.125rem;
  background-color: ${({ theme }) => theme.bg4};
`;
function Identicon() {
    const ref = (0, react_1.useRef)();
    const { address: account } = (0, use_contractkit_1.useContractKit)();
    (0, react_1.useEffect)(() => {
        if (account && ref.current) {
            ref.current.innerHTML = '';
            ref.current.appendChild((0, jazzicon_1.default)(16, parseInt(account.slice(2, 10), 16)));
        }
    }, [account]);
    // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/30451
    return (0, jsx_runtime_1.jsx)(StyledIdenticonContainer, { ref: ref });
}
exports.default = Identicon;
