import { hexToBytes as hexToBytesNoble } from '@noble/curves/abstract/utils'
import type { BigNumberish } from '../strk-types/lib.js'
import { addHexPrefix } from './encode.js'

export function isHex(hex: string): boolean {
  return /^0x[0-9a-f]*$/i.test(hex)
}

export function removeHexPrefix(hex: string): string {
  return hex.replace(/^0x/i, '')
}

export function toBigInt(value: BigNumberish): bigint {
  return BigInt(value)
}

export function toHex(value: BigNumberish): string {
  return addHexPrefix(toBigInt(value).toString(16))
}

export function isStringWholeNumber(str: string): boolean {
  return /^\d+$/.test(str)
}

export function hexToBytes(str: string): Uint8Array {
  if (!isHex(str)) throw new Error(`${str} needs to be a hex-string`)

  let adaptedValue: string = removeHexPrefix(str)
  if (adaptedValue.length % 2 !== 0) {
    adaptedValue = `0${adaptedValue}`
  }
  return hexToBytesNoble(adaptedValue)
}

export function assertInRange(
  input: BigNumberish,
  lowerBound: BigNumberish,
  upperBound: BigNumberish,
  inputName = '',
) {
  const messageSuffix =
    inputName === '' ? 'invalid length' : `invalid ${inputName} length`
  const inputBigInt = BigInt(input)
  const lowerBoundBigInt = BigInt(lowerBound)
  const upperBoundBigInt = BigInt(upperBound)

  if (inputBigInt < lowerBoundBigInt || inputBigInt > upperBoundBigInt) {
    throw new Error(`Message not signable, ${messageSuffix}.`)
  }
}
