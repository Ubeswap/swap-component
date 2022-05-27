import { Interface } from '@ethersproject/abi';
import { BigNumber } from '@ethersproject/bignumber';
import { Contract } from '@ethersproject/contracts';
import { ListenerOptions } from './actions';
export interface Result extends ReadonlyArray<any> {
    readonly [key: string]: any;
}
declare type MethodArg = string | number | BigNumber;
declare type OptionalMethodInputs = Array<MethodArg | MethodArg[] | undefined> | undefined;
export declare const NEVER_RELOAD: ListenerOptions;
interface CallState {
    readonly valid: boolean;
    readonly result: Result | undefined;
    readonly loading: boolean;
    readonly syncing: boolean;
    readonly error: boolean;
}
export declare function useSingleContractMultipleData<T extends Contract = Contract>(contract: T | null | undefined, methodName: keyof T['estimateGas'] & string, callInputs: OptionalMethodInputs[], options?: ListenerOptions): readonly CallState[];
export declare function useMultipleContractSingleData(addresses: readonly (string | undefined)[], contractInterface: Interface, methodName: string, callInputs?: OptionalMethodInputs, options?: ListenerOptions): CallState[];
export declare function useSingleCallResult(contract: Contract | null | undefined, methodName: string, inputs?: OptionalMethodInputs, options?: ListenerOptions): CallState;
export {};
