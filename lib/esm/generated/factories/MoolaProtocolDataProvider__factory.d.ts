import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { MoolaProtocolDataProvider, MoolaProtocolDataProviderInterface } from "../MoolaProtocolDataProvider";
export declare class MoolaProtocolDataProvider__factory {
    static readonly abi: ({
        inputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        stateMutability: string;
        type: string;
        name?: undefined;
        outputs?: undefined;
    } | {
        inputs: never[];
        name: string;
        outputs: {
            components: {
                internalType: string;
                name: string;
                type: string;
            }[];
            internalType: string;
            name: string;
            type: string;
        }[];
        stateMutability: string;
        type: string;
    } | {
        inputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        name: string;
        outputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        stateMutability: string;
        type: string;
    })[];
    static createInterface(): MoolaProtocolDataProviderInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): MoolaProtocolDataProvider;
}
