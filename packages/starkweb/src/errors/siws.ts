import { BaseError } from './base.js'

export type SiwsInvalidMessageFieldErrorType = SiwsInvalidMessageFieldError & {
  name: 'SiwsInvalidMessageFieldError'
}
export class SiwsInvalidMessageFieldError extends BaseError {
  override name = 'SiwsInvalidMessageFieldError'
  constructor(parameters: {
    docsPath?: string | undefined
    field: string
    metaMessages?: string[] | undefined
  }) {
    const { docsPath, field, metaMessages } = parameters
    super(`Invalid Sign-In with Starknet message field "${field}".`, {
      docsPath,
      docsSlug: 'TODO',
      metaMessages,
    })
  }
}
