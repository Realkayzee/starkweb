import type { QueryOptions } from "@tanstack/query-core";

import {
  type GetTransactionReceiptErrorType,
  type GetTransactionReceiptParameters,
  getTransactionReceipt,
} from "../actions/getTransactionReceipt.js";
import type { GetTransactionReceiptReturnType } from "../actions/getTransactionReceipt.js";
import type { Config } from "../createConfig.js";
import type { ScopeKeyParameter } from "../types/properties.js";
import type { Evaluate, ExactPartial } from "../types/utils.js";
import { filterQueryOptions } from "./utils.js";

export type GetTransactionReceiptOptions = Evaluate<
  ExactPartial<GetTransactionReceiptParameters> & ScopeKeyParameter
>;

export function getTransactionReceiptQueryOptions<config extends Config>(
  config: config,
  options: GetTransactionReceiptOptions = {}
) {
  return {
    queryFn({ queryKey }) {
      const { transaction_hash, scopeKey: _, ...parameters } = queryKey[1];
      if (!transaction_hash) throw new Error("hash is required");
      return getTransactionReceipt(config, { ...parameters, transaction_hash });
    },
    queryKey: getTransactionReceiptQueryKey(options),
  } as const satisfies QueryOptions<
    GetTransactionReceiptQueryFnData,
    GetTransactionReceiptErrorType,
    GetTransactionReceiptData,
    GetTransactionReceiptQueryKey
  >;
}
export type GetTransactionReceiptQueryFnData = GetTransactionReceiptReturnType;

export type GetTransactionReceiptData = GetTransactionReceiptQueryFnData;

export function getTransactionReceiptQueryKey(
  options: GetTransactionReceiptOptions
) {
  return ["getTransactionReceipt", filterQueryOptions(options)] as const;
}

export type GetTransactionReceiptQueryKey = ReturnType<
  typeof getTransactionReceiptQueryKey
>;
