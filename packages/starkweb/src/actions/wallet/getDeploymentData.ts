import type { Client } from '../../clients/createClient.js'
import type { Transport } from '../../clients/transports/createTransport.js'
import type { Account } from '../../types/account.js'
import type { Chain } from '../../types/chain.js'
import type { API_VERSION } from '../../types/components.js'

export type GetDeploymentDataParameters = {
  api_version?: API_VERSION
}

export type GetDeploymentDataReturnType = {
  deployment_data: string
}

export type GetDeploymentDataErrorType = {
  code: number
  message: string
}

export async function getDeploymentData<
  TChain extends Chain | undefined,
  TAccount extends Account | undefined,
>(
  client: Client<Transport, TChain, TAccount>,
  { api_version }: GetDeploymentDataParameters,
): Promise<GetDeploymentDataReturnType | GetDeploymentDataErrorType> {
  return await client.request({
    method: 'wallet_deploymentData',
    params: {
      api_version,
    },
  })
}
