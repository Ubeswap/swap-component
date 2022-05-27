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
Object.defineProperty(exports, "__esModule", { value: true });
exports.useConnectedKit = void 0;
const use_contractkit_1 = require("@celo-tools/use-contractkit");
const react_1 = require("react");
const useConnectedKit = () => {
    const { getConnectedKit } = (0, use_contractkit_1.useContractKit)();
    const [error, setError] = (0, react_1.useState)(null);
    (0, react_1.useEffect)(() => {
        void (() => __awaiter(void 0, void 0, void 0, function* () {
            try {
                yield getConnectedKit();
            }
            catch (e) {
                if (e instanceof Error)
                    setError(e);
            }
        }))();
    }, [getConnectedKit]);
    return { error };
};
exports.useConnectedKit = useConnectedKit;
