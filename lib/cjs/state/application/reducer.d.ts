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
declare const _default: import("@reduxjs/toolkit/dist/createReducer").ReducerWithInitialState<ApplicationState>;
export default _default;
