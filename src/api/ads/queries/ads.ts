import { ENDPOINTS_CONFIG } from "api/endpoints";
import http from "api/http";
import { AxiosError } from "axios";
import { QueryFunction, useQuery, UseQueryOptions } from "react-query";

import { AdGet } from "../types";

const url = ENDPOINTS_CONFIG.api.ad.ads;
type QueryKey = typeof url;

type Response = AdGet[];

const getAds: QueryFunction<Response, QueryKey> = async () => {
  return (await http.get(url)).data;
};

export const useAds = <TData = Response>(
  options?: Omit<
    UseQueryOptions<Response, AxiosError, TData, QueryKey>,
    "queryKey" | "queryFn"
  >
) => {
  const { data, ...rest } = useQuery(url, getAds, options);
  return { data, ...rest };
};
