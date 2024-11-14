
"use client";

import type {
  Config,
  EstimateFeeErrorType,
  ResolvedRegister,
} from "starkweb/core";
import {
  type EstimateFeeData,
  type EstimateFeeOptions,
  type EstimateFeeQueryFnData,
  type EstimateFeeQueryKey,
  estimateFeeQueryOptions,
} from "starkweb/query";

import type { ConfigParameter, QueryParameter } from "../types/properties.js";
import { type UseQueryReturnType, useQuery } from "../utils/query.js";
import { useChainId } from "./useChainId.js";
import { useConfig } from "./useConfig.js";
import { useConnectorClient } from "./useConnectorClient.js";

export type UseEstimateFeeParameters<
  config extends Config = ResolvedRegister["config"],
  chainId extends config["chains"][number]["chain_id"] | undefined = undefined,
  selectData = EstimateFeeData
> = EstimateFeeOptions<config, chainId> &
  ConfigParameter<config> &
  QueryParameter<
    EstimateFeeQueryFnData,
    EstimateFeeErrorType,
    selectData,
    EstimateFeeQueryKey<config, chainId>
  >;

export type UseEstimateFeeReturnType<selectData = EstimateFeeData> =
  UseQueryReturnType<selectData, EstimateFeeErrorType>;

export function useEstimateFee<
  config extends Config = ResolvedRegister["config"],
  chainId extends config["chains"][number]["id"] | undefined = undefined,
  selectData = EstimateFeeData
>(
  parameters?: UseEstimateFeeParameters<config, chainId, selectData>
): UseEstimateFeeReturnType<selectData>;

export function useEstimateFee(
  parameters: UseEstimateFeeParameters = {}
): UseEstimateFeeReturnType {
  const { connector, query = {} } = parameters;

  const config = useConfig(parameters);
  const { data: connectorClient } = useConnectorClient({
    connector,
    query: { enabled: parameters.account === undefined },
  });
  const account = parameters.account ?? connectorClient?.account;
  const chainId = useChainId({ config });

  const options = estimateFeeQueryOptions(config, {
    ...parameters,
    account,
    chainId: parameters.chainId ?? chainId,
    connector,
  });
  const enabled = Boolean((account || connector) && (query.enabled ?? true));

  return useQuery({ ...query, ...options, enabled });
}
