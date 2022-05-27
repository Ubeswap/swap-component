import { Field } from './actions';
export interface MintState {
    readonly independentField: Field;
    readonly typedValue: string;
    readonly otherTypedValue: string;
}
declare const _default: import("redux").Reducer<MintState, import("redux").AnyAction>;
export default _default;
