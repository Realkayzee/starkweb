import type { BigNumberish } from '../../strk-types/lib.js'
import { isHex, isStringWholeNumber } from '../num.js'
import { encodeShortString, isShortString, isText } from '../shortString.js'
import { isBigInt, isBoolean, isString } from '../typed.js'

export function CairoFelt(it: BigNumberish): string {
  // BN or number
  if (isBigInt(it) || Number.isInteger(it)) {
    return it.toString()
  }

  // Handling strings
  if (isString(it)) {
    // Hex strings
    if (isHex(it)) {
      return BigInt(it).toString()
    }
    // Text strings that must be short
    if (isText(it)) {
      if (!isShortString(it)) {
        throw new Error(
          `${it} is a long string > 31 chars. Please split it into an array of short strings.`,
        )
      }
      // Assuming encodeShortString returns a hex representation of the string
      return BigInt(encodeShortString(it)).toString()
    }
    // Whole numeric strings
    if (isStringWholeNumber(it)) {
      return it
    }
  }
  // bool to felt
  if (isBoolean(it)) {
    return `${+it}`
  }

  throw new Error(`${it} can't be computed by felt()`)
}
