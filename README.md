# Ubeswap Swap Component

Ubeswap-Swap allows you to add swap module of Ubeswap to your app with ease!

## Installation

```
$ npm install --save ubeswap-swap-dev
$ yarn add ubeswap-swap-dev
```

## Usage

### Normal Usage

```jsx
import Swap from 'ubeswap-swap-dev'

function App() {
  return <Swap />
}
```

### Specify Custom Theme

```jsx
<Swap
  theme={{
    fontFamily: "'Inter', sans-serif",
    primaryColor: '#00b0ff',
    userDarkMode: false,
  }}
/>
```

### Specify Partner Id

```jsx
<Swap minimaPartnerId={'115792089237316195423570985008687907853269984665640564039457584007913129639935'} />
```

### Specify Default Swap Token

```jsx
<Swap
  defaultSwapToken={{
    address: '0x00400FcbF0816bebB94654259de7273f4A05c762',
    name: 'Poof',
    symbol: 'POOF',
    chainId: 42220,
    decimals: 18,
    logoURI: 'https://raw.githubusercontent.com/ubeswap/default-token-list/master/assets/asset_POOF.png',
  }}
/>
```

### Specify Custom Token Lists

```jsx
<Swap
  tokenLists={[
    [
      {
        address: '0x00400FcbF0816bebB94654259de7273f4A05c762',
        name: 'Poof',
        symbol: 'POOF',
        chainId: 42220,
        decimals: 18,
        logoURI: 'https://raw.githubusercontent.com/ubeswap/default-token-list/master/assets/asset_POOF.png',
      },
    ],
    [
      {
        address: '0xEadf4A7168A82D30Ba0619e64d5BCf5B30B45226',
        name: 'Poof USD',
        symbol: 'pUSD',
        chainId: 42220,
        decimals: 18,
        logoURI: 'https://raw.githubusercontent.com/ubeswap/default-token-list/master/assets/asset_pUSD.png',
      },
    ],
  ]}
/>
```

### Specify Custom Wallet Infomation

```jsx
<Swap
  accountInfo={{
    account: '0xEadf4A7168A82D30Ba0619e64d5BCf5B30B45226',
    explorerUrl: 'https://forno.celo.org',
    chainId: 42220,
    provider: provider,
  }}
/>
```

Type of the accountInfo is same as below

```jsx
interface AccountInfo {
  account: string
  explorerUrl: string
  chainId: number
  provider: Web3Provider
}
```

### Specify Custom Wallet Connect Function

```jsx
<Swap onConnectWallet={handleConnectWallet} />
```
