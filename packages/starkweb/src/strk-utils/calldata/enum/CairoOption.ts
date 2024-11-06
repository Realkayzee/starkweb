import type { ValuesType } from '../../../strk-types/helpers.js'
import { isUndefined } from '../../../strk-utils/typed.js'

export const CairoOptionVariant = {
  Some: 0,
  None: 1,
} as const

export type CairoOptionVariant = ValuesType<typeof CairoOptionVariant>

export class CairoOption<T> {
  readonly Some?: T | undefined

  readonly None?: boolean | undefined

  constructor(variant: CairoOptionVariant | number, content?: T) {
    if (!(variant in Object.values(CairoOptionVariant))) {
      throw new Error(
        'Wrong variant! It should be CairoOptionVariant.Some or .None.',
      )
    }
    if (variant === CairoOptionVariant.Some) {
      if (isUndefined(content)) {
        throw new Error(
          'The creation of a Cairo Option with "Some" variant needs a content as input.',
        )
      }
      this.Some = content
      this.None = undefined
    } else {
      this.Some = undefined
      this.None = true
    }
  }

  /**
   *
   * @returns the content of the valid variant of a Cairo custom Enum.
   *  If None, returns 'undefined'.
   */
  public unwrap(): T | undefined {
    return this.None ? undefined : this.Some
  }

  /**
   *
   * @returns true if the valid variant is 'isSome'.
   */
  public isSome(): boolean {
    return !isUndefined(this.Some)
  }

  /**
   *
   * @returns true if the valid variant is 'isNone'.
   */
  public isNone(): boolean {
    return this.None === true
  }
}
