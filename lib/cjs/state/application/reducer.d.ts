import { ApplicationModal, PopupContent } from './actions';
declare type PopupList = Array<{
    key: string;
    show: boolean;
    content: PopupContent;
    removeAfterMs: number | null;
}>;
export interface ApplicationState {
    readonly blockNumber: {
        readonly [chainId: number]: number;
    };
    readonly popupList: PopupList;
    readonly openModal: ApplicationModal | null;
}
declare const _default: import("redux").Reducer<ApplicationState, import("redux").AnyAction>;
export default _default;
