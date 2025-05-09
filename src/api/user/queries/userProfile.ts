import { AxiosError } from "axios";
import { QueryFunction, useQuery, UseQueryOptions } from "react-query";

import { ENDPOINTS_CONFIG } from "@/api/endpoints";
import http from "@/api/http";

import { DetailUserProfile } from "../../handlers/user/types";

const url = ENDPOINTS_CONFIG.api.userProfile;
type QueryKey = [typeof url, string | undefined];

type Response = DetailUserProfile;

const getUserProfile: QueryFunction<Response, QueryKey> = async ({
  queryKey,
}) => {
  return (await http.get(url + queryKey[1] + "/")).data;
};

export const useUserProfile = <TData = Response>(
  slug?: string,
  options?: Omit<
    UseQueryOptions<Response, AxiosError, TData, QueryKey>,
    "queryKey" | "queryFn"
  >
) => {
  const { data, ...rest } = useQuery([url, slug], getUserProfile, options);
  return { data, ...rest };
};
