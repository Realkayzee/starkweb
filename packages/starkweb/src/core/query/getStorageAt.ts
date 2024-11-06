import type { QueryOptions } from "@tanstack/query-core";

import {
  type GetStorageAtErrorType,
  type GetStorageAtParameters,
  type GetStorageAtReturnType,
  getStorageAt,
} from "../actions/getStorageAt.js";
import type { Config } from "../createConfig.js";
import type { ScopeKeyParameter } from "../types/properties.js";
import type { Evaluate, ExactPartial } from "../types/utils.js";
import { filterQueryOptions } from "./utils.js";

export type GetStorageAtOptions = Evaluate<
  ExactPartial<GetStorageAtParameters> & ScopeKeyParameter
>;

export function getStorageAtQueryOptions<config extends Config>(
  config: config,
  options: GetStorageAtOptions = {}
) {
  return {
    queryFn({ queryKey }) {
      const { contract_address, key, scopeKey: _, ...parameters } = queryKey[1];
      if (!contract_address || !key)
        throw new Error("contract_address and key are required");
      return getStorageAt(config, { ...parameters, contract_address, key });
    },
    queryKey: getStorageAtQueryKey(options),
  } as const satisfies QueryOptions<
    GetStorageAtQueryFnData,
    GetStorageAtErrorType,
    GetStorageAtData,
    GetStorageAtQueryKey
  >;
}

export type GetStorageAtQueryFnData = GetStorageAtReturnType;

export type GetStorageAtData = GetStorageAtQueryFnData;

export function getStorageAtQueryKey(options: GetStorageAtOptions) {
  return ["getStorageAt", filterQueryOptions(options)] as const;
}

export type GetStorageAtQueryKey = ReturnType<typeof getStorageAtQueryKey>;
