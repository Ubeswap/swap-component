/// <reference types="react" />
interface RemoveFarmModalProps {
    isOpen: boolean;
    onConfirm: () => void;
    onClose: () => void;
}
export default function RemoveFarmModal({ isOpen, onClose, onConfirm }: RemoveFarmModalProps): JSX.Element;
export {};
