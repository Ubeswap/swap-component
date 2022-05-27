import { AccountsWrapper } from '@celo/contractkit/lib/wrappers/Accounts';
declare type AsyncReturnType<T extends (...args: any) => any> = T extends (...args: any) => Promise<infer U> ? U : T extends (...args: any) => infer U ? U : any;
declare type AccountSummary = AsyncReturnType<AccountsWrapper['getAccountSummary']>;
/**
 * Fetches the account summary of a Celo account.
 */
export default function useAccountSummary(address?: string | null): {
    summary: AccountSummary | null;
    nom: string | null;
    loading: boolean;
};
export {};
