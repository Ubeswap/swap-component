import { BytesLike } from 'ethers';
import { Multicall } from '../generated';
export declare const multicallBatch: (multicall: Multicall, calls: {
    target: string;
    callData: BytesLike;
}[], bucketSize?: number) => Promise<string[]>;
