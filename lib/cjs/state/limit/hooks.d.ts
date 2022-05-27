import { Fraction, Token, TokenAmount } from '@ubeswap/sdk';
import { UbeswapTrade } from 'components/swap/routing/trade';
import { AppState } from '../index';
import { Field } from './actions';
export declare function useLimitOrderState(): AppState['limit'];
export declare function useDerivedLimitOrderInfo(): {
    currencies: {
        [field in Field]?: Token;
    };
    currencyBalances: {
        [field in Field]?: TokenAmount;
    };
    parsedInputTotal: TokenAmount | undefined;
    parsedOutputTotal: TokenAmount | undefined;
    v2Trade: UbeswapTrade | undefined;
    inputError?: string;
    showRamp: boolean;
    buying: boolean;
    marketPriceDiffIndicator: Fraction | undefined;
    aboveMarketPrice: boolean | undefined;
};
export declare function useLimitOrderActionHandlers(): {
    onCurrencySelection: (field: Field, currency: Token) => void;
    onSwitchTokens: () => void;
    onUserInput: (field: Field, typedValue: string) => void;
    onChangeRecipient: (recipient: string | null) => void;
    setBuying: (buying: boolean) => void;
};
