import { Interface } from '@ethersproject/abi';
import ERC20_ABI from './erc20.json';
import ERC20_BYTES32_ABI from './erc20_bytes32.json';
declare const ERC20_INTERFACE: Interface;
declare const ERC20_BYTES32_INTERFACE: Interface;
export default ERC20_INTERFACE;
export { ERC20_ABI, ERC20_BYTES32_ABI, ERC20_BYTES32_INTERFACE };
