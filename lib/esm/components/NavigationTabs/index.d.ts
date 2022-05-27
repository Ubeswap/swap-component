/// <reference types="react" />
export declare function SwapPoolTabs({ active }: {
    active: 'swap' | 'pool' | 'send';
}): JSX.Element;
export declare function FindPoolTabs(): JSX.Element;
export declare function AddRemoveTabs({ adding, creating }: {
    adding: boolean;
    creating: boolean;
}): JSX.Element;
