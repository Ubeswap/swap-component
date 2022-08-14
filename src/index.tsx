import './i18n'
import '@celo-tools/use-contractkit/lib/styles.css'

import React from 'react'
import ReactDOM from 'react-dom'

import Swap from './pages/Swap'

ReactDOM.render(
  <React.StrictMode>
    <Swap />
  </React.StrictMode>,
  document.getElementById('root')
)

export default Swap
