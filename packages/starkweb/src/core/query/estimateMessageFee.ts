import type { QueryOptions } from "@tanstack/query-core";

import {
  type EstimateMessageFeeErrorType,
  type EstimateMessageFeeParameters,
  type EstimateMessageFeeReturnType,
  estimateMessageFee,
} from "../actions/estimateMessageFee.js";
import type { Config } from "../createConfig.js";
import type { ScopeKeyParameter } from "../types/properties.js";
import type { ExactPartial } from "../types/utils.js";
import { filterQueryOptions } from "./utils.js";

export type EstimateMessageFeeOptions = ExactPartial<EstimateMessageFeeParameters> & ScopeKeyParameter;

export function estimateMessageFeeQueryOptions<config extends Config>(
  config: config,
  options: EstimateMessageFeeOptions = {}
) {
  return {
    async queryFn({ queryKey }) {
      const { scopeKey: _, ...parameters } = queryKey[1];
      return estimateMessageFee(config, {
        ...parameters,
        from_address: (parameters.from_address ??
          options.from_address) as `0x${string}`,
        to_address: (parameters.to_address ??
          options.to_address) as `0x${string}`,
        entry_point_selector: (parameters.entry_point_selector ??
          options.entry_point_selector) as `0x${string}`,
        payload: (parameters.payload ??
          options.payload) as `0x${string}`[],
      });
    },
    queryKey: estimateMessageFeeQueryKey(options),
  } as const satisfies QueryOptions<
    EstimateMessageFeeQueryFnData,
    EstimateMessageFeeErrorType,
    EstimateMessageFeeData,
    EstimateMessageFeeQueryKey
  >;
}

export type EstimateMessageFeeQueryFnData = EstimateMessageFeeReturnType;

export type EstimateMessageFeeData = EstimateMessageFeeQueryFnData;

export function estimateMessageFeeQueryKey(
  options: EstimateMessageFeeOptions = {}
) {
  return ["estimateMessageFee", filterQueryOptions(options)] as const;
}

export type EstimateMessageFeeQueryKey = ReturnType<
  typeof estimateMessageFeeQueryKey
>;
