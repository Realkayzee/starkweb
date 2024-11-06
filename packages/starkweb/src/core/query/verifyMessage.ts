import type { QueryFunctionContext, QueryOptions } from "@tanstack/query-core";

import {
  type VerifyMessageErrorType,
  type VerifyMessageParameters,
  type VerifyMessageReturnType,
  verifyMessage,
} from "../actions/verifyMessage.js";
import type { Config } from "../createConfig.js";
import type { ScopeKeyParameter } from "../types/properties.js";
import type { UnionExactPartial } from "../types/utils.js";
import { filterQueryOptions } from "./utils.js";

export type VerifyMessageOptions = UnionExactPartial<
  VerifyMessageParameters & ScopeKeyParameter
>;

export function verifyMessageQueryKey(options: VerifyMessageOptions = {}) {
  return ['verifyMessage', filterQueryOptions(options)] as const;
}
export function verifyMessageQueryOptions<config extends Config>(
  config: config,
  options: VerifyMessageOptions = {}
) {
  return {
    queryKey: ["verifyMessage", filterQueryOptions(options)] as const,
    queryFn({ queryKey: [, options] }: QueryFunctionContext<VerifyMessageQueryKey>) {
      return verifyMessage(config, options as VerifyMessageParameters) 
    },
  } as const satisfies QueryOptions<
    VerifyMessageQueryFnData,
    VerifyMessageErrorType,
    VerifyMessageData,
    VerifyMessageQueryKey
  >;
}

export type VerifyMessageQueryFnData = VerifyMessageReturnType;

export type VerifyMessageData = VerifyMessageQueryFnData;


export type VerifyMessageQueryKey = ReturnType<typeof verifyMessageQueryKey>;
