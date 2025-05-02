import { AxiosError } from "axios";
import { QueryFunction, useQuery, UseQueryOptions } from "react-query";

import { ENDPOINTS_CONFIG } from "@/api/endpoints";
import http from "@/api/http";

import { BlackList } from "../../handlers/user/types";

const url = ENDPOINTS_CONFIG.api.blackList;
type QueryKey = typeof url;

type Response = BlackList[];

const getBlackList: QueryFunction<Response, QueryKey> = async () => {
  return (await http.get(url)).data;
};

export const useBlackList = <TData = Response>(
  options?: Omit<
    UseQueryOptions<Response, AxiosError, TData, QueryKey>,
    "queryKey" | "queryFn"
  >
) => {
  const { data, ...rest } = useQuery(url, getBlackList, options);
  return { data, ...rest };
};
