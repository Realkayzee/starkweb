import { keccak } from '@scure/starknet'
import { MASK_250 } from '../../strk-types/constants.js'
import type { BigNumberish } from '../../strk-types/lib.js'
import { addHexPrefix, utf8ToArray } from '../encode.js'
import { isHex, isStringWholeNumber, toHex } from '../num.js'
import { isBigInt, isNumber } from '../typed.js'

function keccakHex(str: string): string {
  return addHexPrefix(keccak(utf8ToArray(str)).toString(16))
}

export function starknetKeccak(str: string): bigint {
  const hash = BigInt(keccakHex(str))

  return hash & MASK_250
}

export function getSelectorFromName(funcName: string) {
  return toHex(starknetKeccak(funcName))
}

export function getSelector(value: string | BigNumberish) {
  if (isNumber(value) || isBigInt(value)) return toHex(value)
  if (isHex(value)) return value
  if (isStringWholeNumber(value)) return toHex(value)
  return getSelectorFromName(value)
}
