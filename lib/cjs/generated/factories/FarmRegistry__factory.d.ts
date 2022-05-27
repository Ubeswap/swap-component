import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { FarmRegistry, FarmRegistryInterface } from "../FarmRegistry";
export declare class FarmRegistry__factory {
    static readonly abi: ({
        inputs: never[];
        stateMutability: string;
        type: string;
        anonymous?: undefined;
        name?: undefined;
        outputs?: undefined;
        constant?: undefined;
    } | {
        anonymous: boolean;
        inputs: {
            indexed: boolean;
            internalType: string;
            name: string;
            type: string;
        }[];
        name: string;
        type: string;
        stateMutability?: undefined;
        outputs?: undefined;
        constant?: undefined;
    } | {
        inputs: never[];
        name: string;
        outputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        stateMutability: string;
        type: string;
        constant: boolean;
        anonymous?: undefined;
    } | {
        inputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        name: string;
        outputs: never[];
        stateMutability: string;
        type: string;
        anonymous?: undefined;
        constant?: undefined;
    })[];
    static createInterface(): FarmRegistryInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): FarmRegistry;
}
