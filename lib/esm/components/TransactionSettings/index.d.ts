/// <reference types="react" />
export interface SlippageTabsProps {
    rawSlippage: number;
    setRawSlippage: (rawSlippage: number) => void;
    deadline: number;
    setDeadline: (deadline: number) => void;
}
export default function SlippageTabs({ rawSlippage, setRawSlippage, deadline, setDeadline }: SlippageTabsProps): JSX.Element;
