import { useContractKit, useProvider } from '@celo-tools/use-contractkit'
import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import useDebounce from '../../hooks/useDebounce'
import useIsWindowVisible from '../../hooks/useIsWindowVisible'
import { AccountInfo } from '../../pages/Swap'
import { AppState } from '../../state'
import { updateBlockNumber } from './actions'
import { useBlockNumber } from './hooks'

const BLOCK_NUMBER_MINIMUM_DIFF = 5

export default function Updater(): null {
  const accountInfo = useSelector<AppState, AccountInfo | undefined>((state) => state.swap.accountInfo)
  const library = useProvider()
  const provider = accountInfo ? accountInfo.provider : library
  const { network } = useContractKit()
  const chainId = accountInfo ? accountInfo.chainId : network.chainId
  const dispatch = useDispatch()
  const blockNumber = useBlockNumber()

  const windowVisible = useIsWindowVisible()

  const [state, setState] = useState<{ chainId: number | undefined; blockNumber: number | null }>({
    chainId,
    blockNumber: null,
  })

  const blockNumberCallback = useCallback(
    (blockNumber: number) => {
      setState((state) => {
        if (chainId === state.chainId) {
          if (typeof state.blockNumber !== 'number') return { chainId, blockNumber }
          return { chainId, blockNumber: Math.max(blockNumber, state.blockNumber) }
        }
        return state
      })
    },
    [chainId, setState]
  )

  // attach/detach listeners
  useEffect(() => {
    if (!provider || !chainId || !windowVisible) return undefined

    setState({ chainId, blockNumber: null })

    provider
      .getBlockNumber()
      .then(blockNumberCallback)
      .catch((error) => console.error(`Failed to get block number for chainId: ${chainId}`, error))

    provider.on('block', blockNumberCallback)
    return () => {
      provider.removeListener('block', blockNumberCallback)
    }
  }, [dispatch, chainId, provider, blockNumberCallback, windowVisible])

  const debouncedState = useDebounce(state, 100)

  useEffect(() => {
    if (!debouncedState.chainId || !debouncedState.blockNumber || !windowVisible) return
    if (debouncedState.blockNumber - (blockNumber || 0) < BLOCK_NUMBER_MINIMUM_DIFF) return
    dispatch(updateBlockNumber({ chainId: debouncedState.chainId, blockNumber: debouncedState.blockNumber }))
  }, [windowVisible, dispatch, debouncedState.blockNumber, debouncedState.chainId, blockNumber])

  return null
}
