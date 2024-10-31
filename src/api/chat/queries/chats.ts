import { ENDPOINTS_CONFIG } from "api/endpoints";
import http from "api/http";
import { AxiosError } from "axios";
import { QueryFunction, useQuery, UseQueryOptions } from "react-query";

import { ChatRoom } from "../types";

const url = ENDPOINTS_CONFIG.api.chats.list;
type QueryKey = typeof url;

type Response = ChatRoom[];

const getChats: QueryFunction<Response, QueryKey> = async () => {
  return (await http.get(url)).data;
};

export const useChats = <TData = Response>(
  options?: Omit<
    UseQueryOptions<Response, AxiosError, TData, QueryKey>,
    "queryKey" | "queryFn"
  >
) => {
  const { data, ...rest } = useQuery(url, getChats, options);
  return { data, ...rest };
};
