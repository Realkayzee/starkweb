import { BaseError } from './base.js'

export type StarkwebProviderNotFoundErrorType = StarkwebProviderNotFoundError & {
  name: 'StarkwebProviderNotFoundError'
}
export class StarkwebProviderNotFoundError extends BaseError {
  override name = 'StarkwebProviderNotFoundError'
  constructor() {
    super('`useConfig` must be used within `StarkwebProvider`.', {
      docsPath: '/api/StarkwebProvider',
    })
  }
}
