import { AxiosError } from "axios";
import { QueryFunction, useQuery, UseQueryOptions } from "react-query";

import { ENDPOINTS_CONFIG } from "@/api/endpoints";
import http from "@/api/http";

import { AdGet } from "../types";

const url = ENDPOINTS_CONFIG.api.ad.myOrders;
type QueryKey = typeof url;

type Response = AdGet[];

const getMyOrders: QueryFunction<Response, QueryKey> = async () => {
  return (await http.get(url)).data;
};

export const useMyOrders = <TData = Response>(
  options?: Omit<
    UseQueryOptions<Response, AxiosError, TData, QueryKey>,
    "queryKey" | "queryFn"
  >
) => {
  const { data, ...rest } = useQuery(url, getMyOrders, options);
  return { data, ...rest };
};
