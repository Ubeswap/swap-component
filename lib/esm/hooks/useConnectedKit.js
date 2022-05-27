var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { useContractKit } from '@celo-tools/use-contractkit';
import { useEffect, useState } from 'react';
export const useConnectedKit = () => {
    const { getConnectedKit } = useContractKit();
    const [error, setError] = useState(null);
    useEffect(() => {
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
