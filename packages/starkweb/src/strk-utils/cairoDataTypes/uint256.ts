import type { BigNumberish, Uint256 } from '../../strk-types/lib.js'
import { addHexPrefix } from '../encode.js'
import { CairoFelt } from './felt.js'

export const UINT_128_MAX = (1n << 128n) - 1n
export const UINT_256_MAX = (1n << 256n) - 1n
export const UINT_256_MIN = 0n
export const UINT_256_LOW_MAX = 340282366920938463463374607431768211455n
export const UINT_256_HIGH_MAX = 340282366920938463463374607431768211455n
export const UINT_256_LOW_MIN = 0n
export const UINT_256_HIGH_MIN = 0n

export class CairoUint256 {
  public low: bigint

  public high: bigint

  static abiSelector = 'core::integer::u256'

  public constructor(bigNumberish: BigNumberish)

  public constructor(low: BigNumberish, high: BigNumberish)

  public constructor(uint256: Uint256)

  public constructor(...arr: any[]) {
    if (
      typeof arr[0] === 'object' &&
      arr.length === 1 &&
      'low' in arr[0] &&
      'high' in arr[0]
    ) {
      const props = CairoUint256.validateProps(arr[0].low, arr[0].high)
      this.low = props.low
      this.high = props.high
    } else if (arr.length === 1) {
      const bigInt = CairoUint256.validate(arr[0])
      this.low = bigInt & UINT_128_MAX
      this.high = bigInt >> 128n
    } else if (arr.length === 2) {
      const props = CairoUint256.validateProps(arr[0], arr[1])
      this.low = props.low
      this.high = props.high
    } else {
      throw Error('Incorrect constructor parameters')
    }
  }

  static validate(bigNumberish: BigNumberish) {
    const bigInt = BigInt(bigNumberish)
    if (bigInt < UINT_256_MIN)
      throw Error('bigNumberish is smaller than UINT_256_MIN')
    if (bigInt > UINT_256_MAX)
      throw new Error('bigNumberish is bigger than UINT_256_MAX')
    return bigInt
  }

  static validateProps(low: BigNumberish, high: BigNumberish) {
    const bigIntLow = BigInt(low)
    const bigIntHigh = BigInt(high)
    if (bigIntLow < UINT_256_LOW_MIN || bigIntLow > UINT_256_LOW_MAX) {
      throw new Error('low is out of range UINT_256_LOW_MIN - UINT_256_LOW_MAX')
    }
    if (bigIntHigh < UINT_256_HIGH_MIN || bigIntHigh > UINT_256_HIGH_MAX) {
      throw new Error(
        'high is out of range UINT_256_HIGH_MIN - UINT_256_HIGH_MAX',
      )
    }
    return { low: bigIntLow, high: bigIntHigh }
  }

  static isAbiType(abiType: string) {
    return abiType === CairoUint256.abiSelector
  }

  toBigInt() {
    return (this.high << 128n) + this.low
  }

  toUint256HexString() {
    return {
      low: addHexPrefix(this.low.toString(16)),
      high: addHexPrefix(this.high.toString(16)),
    }
  }

  toUint256DecimalString() {
    return {
      low: this.low.toString(10),
      high: this.high.toString(10),
    }
  }

  toApiRequest() {
    return [CairoFelt(this.low), CairoFelt(this.high)]
  }
}
