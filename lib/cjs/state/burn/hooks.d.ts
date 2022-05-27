import { Pair, Percent, Token, TokenAmount } from '@ubeswap/sdk';
import { AppState } from '../index';
import { Field } from './actions';
export declare function useBurnState(): AppState['burn'];
export declare function useDerivedBurnInfo(currencyA: Token | undefined, currencyB: Token | undefined): {
    pair?: Pair | null;
    parsedAmounts: {
        [Field.LIQUIDITY_PERCENT]: Percent;
        [Field.LIQUIDITY]?: TokenAmount;
        [Field.CURRENCY_A]?: TokenAmount;
        [Field.CURRENCY_B]?: TokenAmount;
    };
    error?: string;
};
export declare function useBurnActionHandlers(): {
    onUserInput: (field: Field, typedValue: string) => void;
};
