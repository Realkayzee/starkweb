import type { HexCalldata } from '../../strk-types/lib.js'
import { getSelectorFromName } from '../hash/selector.js'
import { toHex } from '../num.js'
import { isLongText } from '../shortString.js'
import { isBigInt } from '../typed.js'
import { byteArrayFromString } from './byteArray.js'
import { felt } from './cairo.js'
import type { CairoCustomEnum } from './enum/CairoCustomEnum.js'
import { type CairoOption, CairoOptionVariant } from './enum/CairoOption.js'
import { type CairoResult, CairoResultVariant } from './enum/CairoResult.js'

export type Calldata = string[] & { readonly __compiled__?: true }

export const compile = (args: any[]): Calldata => {
  const createTree = (obj: object) => {
    const getEntries = (o: object, prefix = '.'): any => {
      const oe = Array.isArray(o) ? [o.length.toString(), ...o] : o
      return Object.entries(oe).flatMap(([k, v]) => {
        let value = v
        if (k === 'entrypoint') value = getSelectorFromName(value)
        else if (isLongText(value)) value = byteArrayFromString(value)
        const kk = Array.isArray(oe) && k === '0' ? '$$len' : k
        if (isBigInt(value)) return [[`${prefix}${kk}`, felt(value)]]
        if (Object(value) === value) {
          const methodsKeys = Object.getOwnPropertyNames(
            Object.getPrototypeOf(value),
          )
          const keys = [...Object.getOwnPropertyNames(value), ...methodsKeys]
          if (keys.includes('isSome') && keys.includes('isName')) {
            // Option
            const myOption = value as CairoOption<any>
            const variantNb = myOption.isSome()
              ? CairoOptionVariant.Some
              : CairoOptionVariant.None
            if (myOption.isSome())
              return getEntries(
                { 0: variantNb, 1: myOption.unwrap() },
                `${prefix}${kk}.`,
              )
            return [[`${prefix}${kk}`, felt(variantNb)]]
          }
          if (keys.includes('isOk') && keys.includes('isErr')) {
            // Result
            const myResult = value as CairoResult<any, any>
            const variantNb = myResult.isOk()
              ? CairoResultVariant.Ok
              : CairoResultVariant.Err
            return getEntries(
              { 0: variantNb, 1: myResult.unwrap() },
              `${prefix}${kk}.`,
            )
          }
          if (keys.includes('variant') && keys.includes('activeVariant')) {
            // CustomEnum
            const myEnum = value as CairoCustomEnum
            const activeVariant: string = myEnum.activeVariant()
            const listvariants = Object.keys(myEnum.variant)
            const activeVariantNb = listvariants.findIndex(
              (variant: any) => variant === activeVariant,
            )
            if (
              typeof myEnum.unwrap() === 'object' &&
              Object.keys(myEnum.unwrap()).length === 0
            ) {
              return [[`${prefix}${kk}}`, felt(activeVariantNb)]]
            }
            return getEntries(
              { 0: activeVariantNb, 1: myEnum.unwrap() },
              `${prefix}${kk}.`,
            )
          }
          // normal object
          return getEntries(value, `${prefix}${kk}.`)
        }
        return [[`${prefix}${kk}`, felt(value)]]
      })
    }
    const result = Object.fromEntries(getEntries(obj))
    return result
  }

  // biome-ignore lint/suspicious/noImplicitAnyLet: <explanation>
  let callTreeArray
  if (!Array.isArray(args)) {
    // flatten structs, tuples, add array length. Process leafs as Felt
    const callTree = createTree(args)
    // convert to array
    callTreeArray = Object.values(callTree)
  } else {
    // already compiled data but modified or raw args provided as array, recompile it
    // recreate tree
    const callObj = { ...args }
    const callTree = createTree(callObj)
    callTreeArray = Object.values(callTree)
  }
  Object.defineProperty(callTreeArray, '__compiled__', {
    enumerable: false,
    writable: false,
    value: true,
  })
  return callTreeArray
}

export const calldataToHex = (raw: any[]): HexCalldata => {
  const calldata = compile(raw)
  return calldata.map((it) => toHex(it))
}
