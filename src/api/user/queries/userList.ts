import { AxiosError } from "axios";
import { QueryFunction, useQuery, UseQueryOptions } from "react-query";

import { ENDPOINTS_CONFIG } from "@/api/endpoints";
import http from "@/api/http";

import { DetailUserProfile } from "../types";

const url = ENDPOINTS_CONFIG.api.userList;
type QueryKey = typeof url;

type Response = DetailUserProfile[];

const getUserList: QueryFunction<Response, QueryKey> = async () => {
  return (await http.get(url)).data;
};

export const useUserList = <TData = Response>(
  options?: Omit<
    UseQueryOptions<Response, AxiosError, TData, QueryKey>,
    "queryKey" | "queryFn"
  >
) => {
  const { data, ...rest } = useQuery(url, getUserList, options);
  return { data, ...rest };
};
