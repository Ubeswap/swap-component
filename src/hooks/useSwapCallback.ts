import { useContractKit, useProvider } from '@celo-tools/use-contractkit'
import { BigNumber } from '@ethersproject/bignumber'
import { Contract } from '@ethersproject/contracts'
import { JSBI, Percent, Router, SwapParameters, Trade } from '@ubeswap/sdk'
import { ContractTransaction } from 'ethers'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import invariant from 'tiny-invariant'

import { MoolaRouterTrade } from '../components/swap/routing/hooks/useTrade'
import { BIPS_BASE, INITIAL_ALLOWED_SLIPPAGE } from '../constants'
import { AccountInfo } from '../pages/Swap'
import { AppState } from '../state'
import { useTransactionAdder } from '../state/transactions/hooks'
import {
  calculateGasMargin,
  getMoolaRouterContract,
  getProviderOrSigner,
  getRouterContract,
  isAddress,
  shortenAddress,
} from '../utils'
import isZero from '../utils/isZero'
import useENS from './useENS'
import useTransactionDeadline from './useTransactionDeadline'

export enum SwapCallbackState {
  INVALID,
  LOADING,
  VALID,
}

interface SwapCall {
  contract: Contract
  parameters: SwapParameters
}

interface SuccessfulCall {
  call: SwapCall
  gasEstimate: BigNumber
}

interface FailedCall {
  call: SwapCall
  error: Error
}

type EstimatedSwapCall = SuccessfulCall | FailedCall

/**
 * Returns the swap calls that can be used to make the trade
 * @param trade trade to execute
 * @param allowedSlippage user allowed slippage
 * @param recipientAddressOrName
 */
function useSwapCallArguments(
  trade: Trade | undefined, // trade to execute, required
  allowedSlippage: number = INITIAL_ALLOWED_SLIPPAGE, // in bips
  recipientAddressOrName: string | null // the ENS name or address of the recipient of the trade, or null if swap should be returned to sender
): SwapCall[] {
  const { address, network } = useContractKit()
  const accountInfo = useSelector<AppState, AccountInfo | undefined>((state) => state.swap.accountInfo)
  const library = useProvider()
  const provider = accountInfo ? accountInfo.provider : library
  const chainId = accountInfo ? accountInfo.chainId : network.chainId
  const account = accountInfo ? accountInfo.account : address

  const { address: recipientAddress } = useENS(recipientAddressOrName)
  const recipient = recipientAddressOrName === null ? account : recipientAddress
  const deadline = useTransactionDeadline()

  return useMemo(() => {
    if (!trade || !recipient || !provider || !account || !chainId || !deadline) return []

    const contract =
      trade instanceof MoolaRouterTrade
        ? getMoolaRouterContract(chainId, provider, account)
        : getRouterContract(chainId, provider, account)

    const swapCallParameters = Router.swapCallParameters(trade, {
      feeOnTransfer: false,
      allowedSlippage: new Percent(JSBI.BigInt(allowedSlippage), BIPS_BASE),
      recipient,
      deadline: deadline.toNumber(),
    })
    invariant(Array.isArray(swapCallParameters.args[2]), 'arg 2 not path')
    if (trade instanceof MoolaRouterTrade) {
      swapCallParameters.args[2] = trade.path.map((p) => p.address)
    }

    const swapMethods = [swapCallParameters]

    // TODO(igm): figure out why this is failing
    // if (trade.tradeType === TradeType.EXACT_INPUT) {
    //   swapMethods.push(
    //     Router.swapCallParameters(trade, {
    //       feeOnTransfer: true,
    //       allowedSlippage: new Percent(JSBI.BigInt(allowedSlippage), BIPS_BASE),
    //       recipient,
    //       deadline: deadline.toNumber()
    //     })
    //   )
    // }

    return swapMethods.map((parameters) => ({ parameters, contract }))
  }, [account, allowedSlippage, chainId, deadline, provider, recipient, trade])
}

// returns a function that will execute a swap, if the parameters are all valid
// and the user has approved the slippage adjusted input amount for the trade
export function useSwapCallback(
  trade: Trade | undefined, // trade to execute, required
  allowedSlippage: number = INITIAL_ALLOWED_SLIPPAGE, // in bips
  recipientAddressOrName: string | null // the ENS name or address of the recipient of the trade, or null if swap should be returned to sender
): { state: SwapCallbackState; callback: null | (() => Promise<string>); error: string | null } {
  const { network, address } = useContractKit()
  const accountInfo = useSelector<AppState, AccountInfo | undefined>((state) => state.swap.accountInfo)
  const chainId = accountInfo ? accountInfo.chainId : network.chainId
  const account = accountInfo ? accountInfo.account : address
  const library = useProvider()
  const provider = accountInfo ? accountInfo.provider : library

  const swapCalls = useSwapCallArguments(trade, allowedSlippage, recipientAddressOrName)

  const addTransaction = useTransactionAdder()

  const { address: recipientAddress } = useENS(recipientAddressOrName)
  const recipient = recipientAddressOrName === null ? account : recipientAddress

  const providerOrSigner = getProviderOrSigner(provider, account || undefined)

  return useMemo(() => {
    if (!trade || !provider || !account || !chainId) {
      return { state: SwapCallbackState.INVALID, callback: null, error: 'Missing dependencies' }
    }
    if (!recipient) {
      if (recipientAddressOrName !== null) {
        return { state: SwapCallbackState.INVALID, callback: null, error: 'Invalid recipient' }
      } else {
        return { state: SwapCallbackState.LOADING, callback: null, error: null }
      }
    }

    return {
      state: SwapCallbackState.VALID,
      callback: async function onSwap(): Promise<string> {
        const estimatedCalls: EstimatedSwapCall[] = await Promise.all(
          swapCalls.map((call) => {
            const {
              parameters: { methodName, args, value },
              contract,
            } = call
            const options = !value || isZero(value) ? {} : { value }

            return contract.estimateGas[methodName](...args, options)
              .then((gasEstimate) => {
                return {
                  call,
                  gasEstimate,
                }
              })
              .catch((gasError) => {
                console.debug('Gas estimate failed, trying eth_call to extract error', call)

                return contract.callStatic[methodName](...args, options)
                  .then((result) => {
                    console.debug('Unexpected successful call after failed estimate gas', call, gasError, result)
                    return { call, error: new Error('Unexpected issue with estimating the gas. Please try again.') }
                  })
                  .catch((callError) => {
                    console.debug('Call threw error', call, callError)
                    let errorMessage: string
                    switch (callError.reason) {
                      case 'UniswapV2Router: INSUFFICIENT_OUTPUT_AMOUNT':
                      case 'UniswapV2Router: EXCESSIVE_INPUT_AMOUNT':
                        errorMessage =
                          'This transaction will not succeed either due to price movement or fee on transfer. Try increasing your slippage tolerance.'
                        break
                      default:
                        errorMessage = `The transaction cannot succeed due to error: ${callError.reason}. This is probably an issue with one of the tokens you are swapping.`
                    }
                    return { call, error: new Error(errorMessage) }
                  })
              })
          })
        )

        // a successful estimation is a bignumber gas estimate and the next call is also a bignumber gas estimate
        const successfulEstimation = estimatedCalls.find(
          (el, ix, list): el is SuccessfulCall =>
            'gasEstimate' in el && (ix === list.length - 1 || 'gasEstimate' in list[ix + 1])
        )

        if (!successfulEstimation) {
          const errorCalls = estimatedCalls.filter((call): call is FailedCall => 'error' in call)
          if (errorCalls.length > 0) throw errorCalls[errorCalls.length - 1].error
          throw new Error('Unexpected error. Please contact support: none of the calls threw an error')
        }

        const {
          call: {
            contract: disconnectedContract,
            parameters: { methodName, args, value },
          },
          gasEstimate,
        } = successfulEstimation

        const contract = disconnectedContract.connect(providerOrSigner)
        return contract[methodName](...args, {
          gasLimit: calculateGasMargin(gasEstimate),
        })
          .then((response: ContractTransaction) => {
            const inputSymbol =
              trade instanceof MoolaRouterTrade ? trade.path[0].symbol : trade.inputAmount.currency.symbol
            const outputSymbol =
              trade instanceof MoolaRouterTrade
                ? trade.path[trade.path.length - 1].symbol
                : trade.outputAmount.currency.symbol
            const inputAmount = trade.inputAmount.toSignificant(3)
            const outputAmount = trade.outputAmount.toSignificant(3)

            const base = `Swap ${inputAmount} ${inputSymbol} for ${outputAmount} ${outputSymbol}`
            const withRecipient =
              recipient === account
                ? base
                : `${base} to ${
                    recipientAddressOrName && isAddress(recipientAddressOrName)
                      ? shortenAddress(recipientAddressOrName)
                      : recipientAddressOrName
                  }`

            addTransaction(response, {
              summary: withRecipient,
            })

            return response.hash
          })
          .catch((error: any) => {
            // if the user rejected the tx, pass this along
            if (error?.code === 4001) {
              throw new Error('Transaction rejected.')
            } else {
              // otherwise, the error was unexpected and we need to convey that
              console.error(`Swap failed`, error, methodName, args, value)
              throw new Error(`Swap failed: ${error.message}`)
            }
          })
      },
      error: null,
    }
  }, [
    trade,
    providerOrSigner,
    account,
    chainId,
    recipient,
    recipientAddressOrName,
    swapCalls,
    addTransaction,
    provider,
  ])
}
