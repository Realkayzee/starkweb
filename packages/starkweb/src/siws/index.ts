// biome-ignore lint/performance/noBarrelFile: entrypoint module
export {
  verifySiwsMessage,
  type VerifySiwsMessageParameters,
  type VerifySiwsMessageReturnType,
  type VerifySiwsMessageErrorType,
} from '../actions/siws/verifySiwsMessage.js'

export {
  verifySiwsData,
  type VerifySiwsDataParameters,
  type VerifySiwsDataReturnType,
  type VerifySiwsDataErrorType,
} from '../actions/siws/verifySiwsData.js'

export {
  createSiwsMessage,
  type CreateSiwsMessageParameters,
  type CreateSiwsMessageReturnType,
  type CreateSiwsMessageErrorType,
} from '../utils/siws/createSiwsMessage.js'

export {
  createSiwsData,
  type CreateSiwsDataParameters,
  type CreateSiwsDataReturnType,
  type CreateSiwsDataErrorType,
} from '../utils/siws/createSiwsData.js'

export { generateSiwsNonce } from '../utils/siws/generateSiwsNonce.js'
export { parseSiwsMessage } from '../utils/siws/parseSiwsMessage.js'

export {
  validateSiwsMessage,
  type ValidateSiwsMessageParameters,
  type ValidateSiwsMessageReturnType,
} from '../utils/siws/validateSiwsMessage.js'

export type { SiwsMessage } from '../utils/siws/types.js'

export {
  type SiwsInvalidMessageFieldErrorType,
  SiwsInvalidMessageFieldError,
} from '../errors/siws.js'
