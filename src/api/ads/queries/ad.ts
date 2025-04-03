import { AxiosError } from "axios";
import { QueryFunction, useQuery, UseQueryOptions } from "react-query";

import { ENDPOINTS_CONFIG } from "@/api/endpoints";
import http from "@/api/http";

import { AdGet } from "../types";

const url = ENDPOINTS_CONFIG.api.ad.ad;
type QueryKey = [typeof url, string];

type Response = AdGet;

const getAd: QueryFunction<Response, QueryKey> = async ({ queryKey }) => {
  return (await http.get(url + queryKey[1] + "/")).data;
};

export const useAdsItem = <TData = Response>(
  id: string,
  options?: Omit<
    UseQueryOptions<Response, AxiosError, TData, QueryKey>,
    "queryKey" | "queryFn"
  >
) => {
  const { data, ...rest } = useQuery([url, id], getAd, options);
  return { data, ...rest };
};
