import type { Client } from '../../clients/createClient.js'
import type { Transport } from '../../clients/transports/createTransport.js'
import type { API_VERSION, SIGNATURE } from '../../types/components.js'

export type SignMessageParameters = {
  address: string
  statement: string
  uri: string
  nonce: string
  version: string
  chainId: string
  domain: string
  api_version?: API_VERSION
}

export type SignMessageReturnType = {
  signature: SIGNATURE
}

export type SignMessageErrorType = {
  code: number
  message: string
}

export async function signMessage(
  client: Client<Transport>,
  {
    address: sn_address,
    statement: sn_statement,
    uri: sn_uri,
    nonce: sn_nonce,
    version: sn_version,
    chainId: sn_chainId,
    domain: sn_domain,
    api_version,
  }: SignMessageParameters,
): Promise<SignMessageReturnType | SignMessageErrorType> {
  // const address = await client.account?.address
  const typedData = {
    types: {
      StarknetDomain: [
        { name: 'name', type: 'string' },
        { name: 'version', type: 'felt' },
        { name: 'chainId', type: 'felt' },
      ],
      Message: [
        { name: 'address', type: 'felt' },
        { name: 'statement', type: 'string' },
        { name: 'uri', type: 'string' },
        { name: 'nonce', type: 'string' },
      ],
    },
    primaryType: 'Message',
    domain: {
      name: sn_domain,
      version: sn_version,
      chainId: sn_chainId,
      revision: '1',
    },
    message: {
      address: sn_address,
      statement: sn_statement,
      uri: sn_uri,
      nonce: sn_nonce,
    },
  }
  return await client.request({
    method: 'wallet_signTypedData',
    params: {
      ...typedData,
      api_version,
    },
  })
}
