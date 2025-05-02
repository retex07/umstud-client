import { AxiosError } from "axios";
import { QueryFunction, useQuery, UseQueryOptions } from "react-query";

import { ENDPOINTS_CONFIG } from "@/api/endpoints";
import http from "@/api/http";

import { DetailUserProfile } from "../../handlers/user/types";

const url = ENDPOINTS_CONFIG.api.profile;
type QueryKey = typeof url;

type Response = DetailUserProfile;

const getMeProfile: QueryFunction<Response, QueryKey> = async () => {
  return (await http.get(url)).data;
};

export const useMeProfile = <TData = Response>(
  options?: Omit<
    UseQueryOptions<Response, AxiosError, TData, QueryKey>,
    "queryKey" | "queryFn"
  >
) => {
  const { data, ...rest } = useQuery(url, getMeProfile, options);
  return { data, ...rest };
};
