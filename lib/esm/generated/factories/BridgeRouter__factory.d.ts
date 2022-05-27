import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { BridgeRouter, BridgeRouterInterface } from "../BridgeRouter";
export declare class BridgeRouter__factory {
    static readonly abi: {
        inputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        name: string;
        outputs: never[];
        stateMutability: string;
        type: string;
    }[];
    static createInterface(): BridgeRouterInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): BridgeRouter;
}
