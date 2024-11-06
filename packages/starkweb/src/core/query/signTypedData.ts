import type { QueryFunctionContext, QueryOptions } from "@tanstack/query-core";

import {
  type SignTypedDataErrorType,
  type SignTypedDataParameters,
  type SignTypedDataReturnType,
  signTypedData,
} from "../actions/signTypedData.js";
import type { Config } from "../createConfig.js";
import type { ScopeKeyParameter } from "../types/properties.js";
import type { UnionExactPartial } from "../types/utils.js";
import { filterQueryOptions } from "./utils.js";

export type SignTypedDataOptions = UnionExactPartial<
  SignTypedDataParameters & ScopeKeyParameter
>;

export function signTypedDataQueryKey(options: SignTypedDataOptions = {}) {
  return ['signTypedData', filterQueryOptions(options)] as const;
}

export function signTypedDataQueryOptions<config extends Config>(
  config: config,
  options: SignTypedDataOptions = {}
) {
  return {
    queryKey: signTypedDataQueryKey(options),
    queryFn({ queryKey: [, options] }: QueryFunctionContext<SignTypedDataQueryKey>) {
      return signTypedData(config, options as SignTypedDataParameters);
    },
  } as const satisfies QueryOptions<
    SignTypedDataQueryFnData,
    SignTypedDataErrorType,
    SignTypedDataData,
    SignTypedDataQueryKey
  >;
}

export type SignTypedDataQueryFnData = SignTypedDataReturnType;

export type SignTypedDataData = SignTypedDataQueryFnData;

export type SignTypedDataQueryKey = ReturnType<typeof signTypedDataQueryKey>;
