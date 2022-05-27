import { Pair, Percent, Price, Token, TokenAmount } from '@ubeswap/sdk';
import { PairState } from '../../data/Reserves';
import { AppState } from '../index';
import { Field } from './actions';
export declare function useMintState(): AppState['mint'];
export declare function useMintActionHandlers(noLiquidity: boolean | undefined): {
    onFieldAInput: (typedValue: string) => void;
    onFieldBInput: (typedValue: string) => void;
};
export declare function useDerivedMintInfo(currencyA: Token | undefined, currencyB: Token | undefined): {
    dependentField: Field;
    currencies: {
        [field in Field]?: Token;
    };
    pair?: Pair | null;
    pairState: PairState;
    currencyBalances: {
        [field in Field]?: TokenAmount;
    };
    parsedAmounts: {
        [field in Field]?: TokenAmount;
    };
    price?: Price;
    noLiquidity?: boolean;
    liquidityMinted?: TokenAmount;
    poolTokenPercentage?: Percent;
    error?: string;
    showRampA: boolean;
    showRampB: boolean;
};
