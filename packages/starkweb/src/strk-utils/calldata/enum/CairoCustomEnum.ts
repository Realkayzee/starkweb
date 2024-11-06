import { isUndefined } from '../../../strk-utils/typed.js'

export type CairoEnumRaw = Record<string, any>

export class CairoCustomEnum {
  /**
   * direct readonly access to variants of the Cairo Custom Enum.
   * @returns a value of type any
   * @example
   * ```typescript
   * const successValue = myCairoEnum.variant.Success;
   */
  readonly variant: CairoEnumRaw

  /**
   * @param enumContent an object with the variants as keys and the content as value. Only one content shall be defined.
   */
  constructor(enumContent: CairoEnumRaw) {
    const variantsList = Object.values(enumContent)
    if (variantsList.length === 0) {
      throw new Error('This Enum must have at least 1 variant')
    }
    const nbActiveVariants = variantsList.filter(
      (content) => !isUndefined(content),
    ).length
    if (nbActiveVariants !== 1) {
      throw new Error('This Enum must have exactly one active variant')
    }
    this.variant = enumContent
  }

  /**
   *
   * @returns the content of the valid variant of a Cairo custom Enum.
   */
  public unwrap(): any {
    const variants = Object.values(this.variant)
    return variants.find((item) => !isUndefined(item))
  }

  /**
   *
   * @returns the name of the valid variant of a Cairo custom Enum.
   */
  public activeVariant(): string {
    const variants = Object.entries(this.variant)
    const activeVariant = variants.find((item) => !isUndefined(item[1]))
    return isUndefined(activeVariant) ? '' : activeVariant[0]
  }
}
