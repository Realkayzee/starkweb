import type { BigNumberish, Uint256 } from '../../strk-types/lib.js'
import { CairoFelt } from '../cairoDataTypes/felt.js'
import { CairoUint256 } from '../cairoDataTypes/uint256.js'

export function felt(it: BigNumberish): string {
  return CairoFelt(it)
}

export const uint256 = (it: BigNumberish): Uint256 => {
  return new CairoUint256(it).toUint256DecimalString()
}
