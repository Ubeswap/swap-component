import { useProvider } from '@celo-tools/use-contractkit'
import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useAllInactiveTokens } from '../../hooks/Tokens'
import { useFetchListCallback } from '../../hooks/useFetchListCallback'
import useInterval from '../../hooks/useInterval'
import useIsWindowVisible from '../../hooks/useIsWindowVisible'
import { AccountInfo } from '../../pages/Swap'
import { AppState } from '../../state'
import { useAllLists } from '../../state/lists/hooks'
import { AppDispatch } from '../index'
import { acceptListUpdate } from './actions'
// import { useActiveListUrls } from './hooks'

export default function Updater(): null {
  const accountInfo = useSelector<AppState, AccountInfo | undefined>((state) => state.swap.accountInfo)
  const library = useProvider()
  const provider = accountInfo ? accountInfo.provider : library
  const dispatch = useDispatch<AppDispatch>()
  const isWindowVisible = useIsWindowVisible()

  // get all loaded lists, and the active urls
  const lists = useAllLists()
  // const activeListUrls = useActiveListUrls()

  // initiate loading
  useAllInactiveTokens()

  const fetchList = useFetchListCallback()
  const fetchAllListsCallback = useCallback(() => {
    if (!isWindowVisible) return
    Object.keys(lists).forEach((url) =>
      fetchList(url).catch((error) => console.debug('interval list fetching error', error))
    )
  }, [fetchList, isWindowVisible, lists])

  // fetch all lists every 10 minutes, but only after we initialize library
  useInterval(fetchAllListsCallback, provider ? 1000 * 60 * 10 : null)

  // whenever a list is not loaded and not loading, try again to load it
  useEffect(() => {
    Object.keys(lists).forEach((listUrl) => {
      const list = lists[listUrl]
      if (!list.current && !list.loadingRequestId && !list.error) {
        fetchList(listUrl).catch((error) => console.debug('list added fetching error', error))
      }
    })
  }, [dispatch, fetchList, provider, lists])

  // automatically update lists if versions are minor/patch
  useEffect(() => {
    Object.keys(lists).forEach((listUrl) => {
      const list = lists[listUrl]
      if (list.pendingUpdate) {
        dispatch(acceptListUpdate(listUrl))
      }
      // TODO (bl): Figure out why this keeps breaking
      // if (list.current && list.pendingUpdate) {
      //   const bump = getVersionUpgrade(list.current.version, list.pendingUpdate.version)
      //   switch (bump) {
      //     case VersionUpgrade.NONE:
      //       throw new Error('unexpected no version bump')
      //     case VersionUpgrade.PATCH:
      //     case VersionUpgrade.MINOR: {
      //       const min = minVersionBump(list.current.tokens, list.pendingUpdate.tokens)
      //       // automatically update minor/patch as long as bump matches the min update
      //       if (bump >= min) {
      //         dispatch(acceptListUpdate(listUrl))
      //       } else {
      //         console.error(
      //           `List at url ${listUrl} could not automatically update because the version bump was only PATCH/MINOR while the update had breaking changes and should have been MAJOR`
      //         )
      //       }
      //       break
      //     }
      //     // update any active or inactive lists
      //     case VersionUpgrade.MAJOR:
      //       dispatch(acceptListUpdate(listUrl))
      //   }
      // }
    })
  }, [dispatch, lists])

  return null
}
