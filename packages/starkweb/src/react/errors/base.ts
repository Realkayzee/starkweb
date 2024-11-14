import { BaseError as CoreError } from '../../core/errors/base.js'

import { getVersion } from '../utils/getVersion.js'

export type BaseErrorType = BaseError & { name: 'StarkwebError' }
export class BaseError extends CoreError {
  override name = 'StarkwebError'
  override get docsBaseUrl() {
    return 'https://starkweb.xyz/react'
  }
  override get version() {
    return getVersion()
  }
}
