import { AccountInfo } from '../../pages/Swap';
import { Field } from './actions';
export interface SwapState {
    readonly independentField: Field;
    readonly typedValue: string;
    readonly [Field.INPUT]: {
        readonly currencyId: string | undefined;
    };
    readonly [Field.OUTPUT]: {
        readonly currencyId: string | undefined;
    };
    readonly recipient: string | null;
    readonly accountInfo?: AccountInfo;
}
declare const _default: import("@reduxjs/toolkit/dist/createReducer").ReducerWithInitialState<SwapState>;
export default _default;
