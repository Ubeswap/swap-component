"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const use_contractkit_1 = require("@celo-tools/use-contractkit");
const ensjs_1 = __importDefault(require("@ensdomains/ensjs"));
const react_1 = require("react");
/**
 * Fetches the account summary of a Celo account.
 */
function useAccountSummary(address) {
    const [summary, setSummary] = (0, react_1.useState)(null);
    const [nom, setNom] = (0, react_1.useState)(null);
    const { kit } = (0, use_contractkit_1.useContractKit)();
    const provider = (0, use_contractkit_1.useProvider)();
    (0, react_1.useEffect)(() => {
        ;
        (() => __awaiter(this, void 0, void 0, function* () {
            if (!address) {
                return;
            }
            try {
                const accounts = yield kit.contracts.getAccounts();
                const account = yield accounts.signerToAccount(address);
                setSummary(yield accounts.getAccountSummary(account));
            }
            catch (e) {
                console.error('Could not fetch account summary', e);
            }
            const nom = new ensjs_1.default({ provider, ensAddress: '0x3DE51c3960400A0F752d3492652Ae4A0b2A36FB3' });
            try {
                const { name } = yield nom.getName(address);
                if (name)
                    setNom(`${name}.nom`);
            }
            catch (e) {
                console.error('Could not fetch nom data', e);
            }
        }))();
    }, [address, kit, provider]);
    return { summary, nom, loading: summary === null };
}
exports.default = useAccountSummary;
