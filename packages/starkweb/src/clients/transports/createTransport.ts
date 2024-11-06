import type { ErrorType } from '../../errors/utils.js'
import type { Chain } from '../../types/chain.js'
import type { SNIP1193RequestFn } from '../../types/snip1193.js'
import { buildRequest } from '../../utils/buildRequest.js'
import { uid as uid_ } from '../../utils/uid.js'
import type { ClientConfig } from '../createClient.js'

export type TransportConfig<
  TType extends string = string,
  TSNIP1193RequestFn extends SNIP1193RequestFn = SNIP1193RequestFn,
> = {
  /** The name of the transport. */
  name: string
  /** The key of the transport. */
  key: string
  /** The JSON-RPC request function that matches the EIP-1193 request spec. */
  request: TSNIP1193RequestFn
  /** The base delay (in ms) between retries. */
  retryDelay?: number | undefined
  /** The max number of times to retry. */
  retryCount?: number | undefined
  /** The timeout (in ms) for requests. */
  timeout?: number | undefined
  /** The type of the transport. */
  type: TType
}

export type Transport<
  TType extends string = string,
  TRpcAttributes = Record<string, any>,
  TSNIP1193RequestFn extends SNIP1193RequestFn = SNIP1193RequestFn,
> = <TChain extends Chain | undefined = Chain>({
  chain,
}: {
  chain?: TChain | undefined
  pollingInterval?: ClientConfig['pollingInterval'] | undefined
  retryCount?: TransportConfig['retryCount'] | undefined
  timeout?: TransportConfig['timeout'] | undefined
}) => {
  config: TransportConfig<TType>
  request: TSNIP1193RequestFn
  value?: TRpcAttributes | undefined
}

export type CreateTransportErrorType = ErrorType

/**
 * @description Creates an transport intended to be used with a client.
 */
export function createTransport<
  TType extends string,
  TRpcAttributes extends Record<string, any>,
>(
  {
    key,
    name,
    request,
    retryCount = 3,
    retryDelay = 150,
    timeout,
    type,
  }: TransportConfig<TType>,
  value?: TRpcAttributes | undefined,
): ReturnType<Transport<TType, TRpcAttributes>> {
  const uid = uid_()
  return {
    config: {
      key,
      name,
      request,
      retryCount,
      retryDelay,
      timeout,
      type,
    },
    request: buildRequest(request, { retryCount, retryDelay, uid }),
    value,
  }
}
