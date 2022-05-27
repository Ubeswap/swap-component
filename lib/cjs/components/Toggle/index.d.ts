/// <reference types="react" />
export interface ToggleProps {
    id?: string;
    isActive: boolean;
    toggle: () => void;
}
export default function Toggle({ id, isActive, toggle }: ToggleProps): JSX.Element;
