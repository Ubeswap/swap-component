/// <reference types="react" />
import { Network } from '@celo-tools/use-contractkit';
import { WrappedTokenInfo } from 'state/lists/hooks';
export declare type Chain = {
    network: Network;
    token: WrappedTokenInfo;
    name: string;
    prettyName: string;
    domain: number;
    bridgeRouter: string;
};
export declare const chains: Chain[];
interface ChainSearchModalProps {
    isOpen: boolean;
    onDismiss: () => void;
    onChainSelect: (chain: Chain) => void;
    selectedChain?: Chain | null;
}
export default function ChainSearchModal({ isOpen, onDismiss, onChainSelect }: ChainSearchModalProps): JSX.Element;
export {};
