/// <reference types="react" />
interface AccountDetailsProps {
    toggleWalletModal: () => void;
    pendingTransactions: string[];
    confirmedTransactions: string[];
    ENSName?: string;
}
export default function AccountDetails({ toggleWalletModal, pendingTransactions, confirmedTransactions, ENSName, }: AccountDetailsProps): JSX.Element;
export {};
