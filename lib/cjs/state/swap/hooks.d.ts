import { ChainId as UbeswapChainId, Token, TokenAmount } from '@ubeswap/sdk';
import { ParsedQs } from 'qs';
import { MinimaRouterTrade, UbeswapTrade } from '../../components/swap/routing/trade';
import { AppState } from '../index';
import { Field } from './actions';
import { SwapState } from './reducer';
export declare function useSwapState(): AppState['swap'];
export declare function useSwapActionHandlers(): {
    onCurrencySelection: (field: Field, currency: Token) => void;
    onSwitchTokens: () => void;
    onUserInput: (field: Field, typedValue: string) => void;
    onChangeRecipient: (recipient: string | null) => void;
};
export declare function tryParseAmount(value?: string, currency?: Token): TokenAmount | undefined;
export declare function useDerivedSwapInfo(): {
    currencies: {
        [field in Field]?: Token;
    };
    currencyBalances: {
        [field in Field]?: TokenAmount;
    };
    parsedAmount: TokenAmount | undefined;
    v2Trade: MinimaRouterTrade | UbeswapTrade | undefined;
    inputError?: string;
    showRamp: boolean;
};
export declare function queryParametersToSwapState(parsedQs: ParsedQs, chainId: UbeswapChainId): SwapState;
export declare function useDefaultsFromURLSearch(): {
    inputCurrencyId: string | undefined;
    outputCurrencyId: string | undefined;
} | undefined;
