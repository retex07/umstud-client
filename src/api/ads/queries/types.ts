import { ENDPOINTS_CONFIG } from "api/endpoints";
import http from "api/http";
import { AxiosError } from "axios";
import { QueryFunction, useQuery, UseQueryOptions } from "react-query";

import { OptionSelect } from "../types";

const url = ENDPOINTS_CONFIG.api.ad.types;
type QueryKey = typeof url;

type Response = OptionSelect[];

const getTypes: QueryFunction<Response, QueryKey> = async () => {
  return (await http.get(url)).data;
};

export const useTypesAds = <TData = Response>(
  options?: Omit<
    UseQueryOptions<Response, AxiosError, TData, QueryKey>,
    "queryKey" | "queryFn"
  >
) => {
  const { data, ...rest } = useQuery(url, getTypes, options);
  return { data, ...rest };
};
