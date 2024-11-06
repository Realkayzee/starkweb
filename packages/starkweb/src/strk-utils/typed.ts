export function isString(value: unknown): value is string {
  return typeof value === 'string'
}

export function isBigInt(value: any): value is bigint {
  return typeof value === 'bigint'
}

export function isBoolean(value: unknown): value is boolean {
  return typeof value === 'boolean'
}

export const isUndefined = (value: unknown): value is undefined => {
  return typeof value === 'undefined' || value === undefined
}

export function isNumber(value: unknown): value is number {
  return typeof value === 'number'
}

export function isObject(item: unknown | undefined): boolean {
  return !!item && typeof item === 'object' && !Array.isArray(item)
}
