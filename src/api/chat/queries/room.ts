import { ENDPOINTS_CONFIG } from "api/endpoints";
import http from "api/http";
import { AxiosError } from "axios";
import { QueryFunction, useQuery, UseQueryOptions } from "react-query";

import { ChatRoom } from "../types";

const url = ENDPOINTS_CONFIG.api.chats.list;
type QueryKey = [typeof url, string];

type Response = ChatRoom;

const getChatRoom: QueryFunction<Response, QueryKey> = async ({ queryKey }) => {
  return (await http.get(url + queryKey[1] + "/")).data;
};

export const useChatRoom = <TData = Response>(
  roomId: string,
  options?: Omit<
    UseQueryOptions<Response, AxiosError, TData, QueryKey>,
    "queryKey" | "queryFn"
  >
) => {
  const { data, ...rest } = useQuery([url, roomId], getChatRoom, options);
  return { data, ...rest };
};
