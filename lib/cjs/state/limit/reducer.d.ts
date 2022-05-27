import { Field } from './actions';
export interface LimitState {
    readonly priceTypedValue: string;
    readonly tokenTypedValue: string;
    readonly [Field.TOKEN]: {
        readonly currencyId: string | undefined;
    };
    readonly [Field.PRICE]: {
        readonly currencyId: string | undefined;
    };
    readonly recipient: string | null;
    readonly buying: boolean;
}
declare const _default: import("redux").Reducer<LimitState, import("redux").AnyAction>;
export default _default;
