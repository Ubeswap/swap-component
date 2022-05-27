import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { IERC20Wrapper, IERC20WrapperInterface } from "../IERC20Wrapper";
export declare class IERC20Wrapper__factory {
    static readonly abi: {
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
    }[];
    static createInterface(): IERC20WrapperInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): IERC20Wrapper;
}
