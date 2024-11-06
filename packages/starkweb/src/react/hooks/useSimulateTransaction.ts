// @ts-nocheck
'use client'

import type { Abi } from '../../types/abi.js';
import type { ContractFunctionArgs, ContractFunctionName } from '../../types/contract.js';
import type {
  Config,

} from '../../core/createConfig.js'

import type { ConfigParameter, QueryParameter } from "../types/properties.js";
import { type UseQueryReturnType, useQuery } from "../utils/query.js";
import { useChainId } from "./useChainId.js";
import { useConfig } from "./useConfig.js";
import { useConnectorClient } from "./useConnectorClient.js";
import type { ResolvedRegister } from '../../core/types/register.js';
import type { SimulateTransactionErrorType } from '../../core/actions/public/simulateTransaction.js';
import type { SimulateTransactionData, SimulateTransactionOptions, SimulateTransactionQueryFnData, SimulateTransactionQueryKey } from '../../core/query/simulateTransaction.js';

export type UseSimulateTransactionParameters<
  abi extends Abi | readonly unknown[] = Abi,
  functionName extends ContractFunctionName<
    abi,
    "nonpayable" | "payable"
  > = ContractFunctionName<abi, "nonpayable" | "payable">,
  args extends ContractFunctionArgs<
    abi,
    "nonpayable" | "payable",
    functionName
  > = ContractFunctionArgs<abi, "nonpayable" | "payable", functionName>,
  config extends Config = Config,
  chainId extends config["chains"][number]["chain_id"] | undefined = undefined,
  selectData = SimulateTransactionData<abi, functionName, args, config, chainId>
> = SimulateTransactionOptions<abi, functionName, args, config, chainId> &
  ConfigParameter<config> &
  QueryParameter<
    SimulateTransactionQueryFnData<abi, functionName, args, config, chainId>,
    SimulateTransactionErrorType,
    selectData,
    SimulateTransactionQueryKey<abi, functionName, args, config, chainId>
  >;

export type UseSimulateTransactionReturnType<
  abi extends Abi | readonly unknown[] = Abi,
  functionName extends ContractFunctionName<
    abi,
    "nonpayable" | "payable"
  > = ContractFunctionName<abi, "nonpayable" | "payable">,
  args extends ContractFunctionArgs<
    abi,
    "nonpayable" | "payable",
    functionName
  > = ContractFunctionArgs<abi, "nonpayable" | "payable", functionName>,
  config extends Config = Config,
  chainId extends config["chains"][number]["chain_id"] | undefined = undefined,
  selectData = SimulateTransactionData<abi, functionName, args, config, chainId>
> = UseQueryReturnType<selectData, SimulateTransactionErrorType>;

export function useSimulateTransaction<
  const abi extends Abi | readonly unknown[],
  functionName extends ContractFunctionName<abi, "nonpayable" | "payable">,
  args extends ContractFunctionArgs<
    abi,
    "nonpayable" | "payable",
    functionName
  >,
  config extends Config = ResolvedRegister["config"],
  chainId extends config["chains"][number]["chain_id"] | undefined = undefined,
  selectData = SimulateTransactionData<abi, functionName, args, config, chainId>
>(
  parameters: UseSimulateTransactionParameters<
    abi,
    functionName,
    args,
    config,
    chainId,
    selectData
  > = {} as any
): UseSimulateTransactionReturnType<
  abi,
  functionName,
  args,
  config,
  chainId,
  selectData
> {
  const { abi, address, connector, functionName, query = {} } = parameters;

  const config = useConfig(parameters);
  const { data: connectorClient } = useConnectorClient({
    connector,
    query: { enabled: parameters.account === undefined },
  });
  const chainId = useChainId({ config });

  const options = simulateTransactionQueryOptions<
    config,
    abi,
    functionName,
    args,
    chainId
  >(config, {
    ...parameters,
    account: parameters.account ?? connectorClient?.account,
    chainId: parameters.chainId ?? chainId,
  });
  const enabled = Boolean(
    abi && address && functionName && (query.enabled ?? true)
  );

  return useQuery({ ...query, ...options, enabled });
}
