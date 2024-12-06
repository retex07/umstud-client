import { ENDPOINTS_CONFIG } from "api/endpoints";
import http from "api/http";
import { AxiosError } from "axios";
import { QueryFunction, useQuery, UseQueryOptions } from "react-query";

import { OptionSelect } from "../types";

const url = ENDPOINTS_CONFIG.api.ad.categories;
type QueryKey = typeof url;

type Response = OptionSelect[];

const getCategories: QueryFunction<Response, QueryKey> = async () => {
  return (await http.get(url)).data;
};

export const useCategoriesAds = <TData = Response>(
  options?: Omit<
    UseQueryOptions<Response, AxiosError, TData, QueryKey>,
    "queryKey" | "queryFn"
  >
) => {
  const { data, ...rest } = useQuery(url, getCategories, options);
  return { data, ...rest };
};
