import { Field } from './actions';
export interface MintState {
    readonly independentField: Field;
    readonly typedValue: string;
    readonly otherTypedValue: string;
}
declare const _default: import("@reduxjs/toolkit/dist/createReducer").ReducerWithInitialState<MintState>;
export default _default;
