import type { ValuesType } from '../../../strk-types/helpers.js'
import { isUndefined } from '../../../strk-utils/typed.js'

export const CairoResultVariant = {
  Ok: 0,
  Err: 1,
} as const

export type CairoResultVariant = ValuesType<typeof CairoResultVariant>

export class CairoResult<T, U> {
  readonly Ok?: T | undefined

  readonly Err?: U | undefined

  constructor(variant: CairoResultVariant | number, resultContent: T | U) {
    if (!(variant in Object.values(CairoResultVariant))) {
      throw new Error(
        'Wrong variant! It should be CairoResultVariant.Ok or .Err.',
      )
    }
    if (variant === CairoResultVariant.Ok) {
      this.Ok = resultContent as T
      this.Err = undefined
    } else {
      this.Ok = undefined
      this.Err = resultContent as U
    }
  }

  /**
   *
   * @returns the content of the valid variant of a Cairo Result.
   */
  public unwrap(): T | U {
    if (!isUndefined(this.Ok)) {
      return this.Ok
    }
    if (!isUndefined(this.Err)) {
      return this.Err
    }
    throw new Error('Both Result.Ok and .Err are undefined. Not authorized.')
  }

  /**
   *
   * @returns true if the valid variant is 'Ok'.
   */
  public isOk(): boolean {
    return !isUndefined(this.Ok)
  }

  /**
   *
   * @returns true if the valid variant is 'isErr'.
   */
  public isErr(): boolean {
    return !isUndefined(this.Err)
  }
}
