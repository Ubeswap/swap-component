import React from 'react';
export interface PoolRewardProps {
    helperText?: React.ReactNode;
    statName: string;
    statValue?: string;
    statArrayValue?: string[];
}
export default function PoolStatRow({ helperText, statName, statValue, statArrayValue }: PoolRewardProps): JSX.Element;
