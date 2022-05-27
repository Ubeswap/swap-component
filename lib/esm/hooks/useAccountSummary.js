var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { useContractKit, useProvider } from '@celo-tools/use-contractkit';
import ENS from '@ensdomains/ensjs';
import { useEffect, useState } from 'react';
/**
 * Fetches the account summary of a Celo account.
 */
export default function useAccountSummary(address) {
    const [summary, setSummary] = useState(null);
    const [nom, setNom] = useState(null);
    const { kit } = useContractKit();
    const provider = useProvider();
    useEffect(() => {
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
            const nom = new ENS({ provider, ensAddress: '0x3DE51c3960400A0F752d3492652Ae4A0b2A36FB3' });
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
