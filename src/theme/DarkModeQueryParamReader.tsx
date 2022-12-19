import { parse } from 'qs'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { RouteComponentProps } from 'react-router-dom'

import { AppDispatch } from '../state'
import { updateTheme } from '../state/user/actions'

export default function DarkModeQueryParamReader({ location: { search } }: RouteComponentProps): null {
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    if (!search) return
    if (search.length < 2) return

    const parsed = parse(search, {
      parseArrays: false,
      ignoreQueryPrefix: true,
    })

    const theme = parsed.theme

    if (typeof theme !== 'string') return

    if (theme.toLowerCase() === 'light') {
      dispatch(updateTheme({ theme: { userDarkMode: false } }))
    } else if (theme.toLowerCase() === 'dark') {
      dispatch(updateTheme({ theme: { userDarkMode: true } }))
    }
  }, [dispatch, search])

  return null
}
