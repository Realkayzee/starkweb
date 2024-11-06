// @ts-nocheck
import type { QueryOptions } from "@tanstack/query-core";

import {
  type VerifyTypedDataErrorType,
  type VerifyTypedDataParameters,
  type VerifyTypedDataReturnType,
  verifyTypedData,
} from "../actions/verifyTypedData.js";
import type { Config } from "../createConfig.js";
import type { ScopeKeyParameter } from "../types/properties.js";
import type { Evaluate, ExactPartial } from "../types/utils.js";
import { filterQueryOptions } from "./utils.js";

export type VerifyTypedDataOptions = Evaluate<
  ExactPartial<VerifyTypedDataParameters> & ScopeKeyParameter
>;

export function verifyTypedDataQueryOptions<config extends Config>(
  config: config,
  options: VerifyTypedDataOptions = {}
): VerifyTypedDataQueryOptions {
  return {
    queryFn({ queryKey }) {
      const { typedData, signature, address, scopeKey: _, ...parameters } = queryKey[1];
      if (!typedData || !signature || !address)
        throw new Error("typedData and signature are required");
      return verifyTypedData(config, {
        ...parameters,
        typedData,
        signature,
        address,
      });
    },
    queryKey: verifyTypedDataQueryKey(options),
  } as const satisfies QueryOptions<
    VerifyTypedDataQueryFnData,
    VerifyTypedDataErrorType,
    VerifyTypedDataData,
    VerifyTypedDataQueryKey
  >;
}

export type VerifyTypedDataQueryFnData = VerifyTypedDataReturnType;

export type VerifyTypedDataData = VerifyTypedDataQueryFnData;

export function verifyTypedDataQueryKey(options: VerifyTypedDataOptions): VerifyTypedDataQueryKey {
  return ["verifyTypedData", filterQueryOptions(options)] as const;
}

export type VerifyTypedDataQueryKey = readonly ['verifyTypedData', VerifyTypedDataOptions];
