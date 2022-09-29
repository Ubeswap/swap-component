import { Field } from './actions';
export interface BurnState {
    readonly independentField: Field;
    readonly typedValue: string;
}
declare const _default: import("@reduxjs/toolkit/dist/createReducer").ReducerWithInitialState<BurnState>;
export default _default;
