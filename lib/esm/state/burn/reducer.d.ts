import { Field } from './actions';
export interface BurnState {
    readonly independentField: Field;
    readonly typedValue: string;
}
declare const _default: import("redux").Reducer<BurnState, import("redux").AnyAction>;
export default _default;
