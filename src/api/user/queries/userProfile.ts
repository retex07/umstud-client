import { ENDPOINTS_CONFIG } from "api/endpoints";
import http from "api/http";
import { AxiosError } from "axios";
import { QueryFunction, useQuery, UseQueryOptions } from "react-query";

import { DetailUserProfile } from "../types";

const url = ENDPOINTS_CONFIG.api.userProfile;
type QueryKey = [typeof url, string];

type Response = DetailUserProfile;

const getUserProfile: QueryFunction<Response, QueryKey> = async ({
  queryKey,
}) => {
  return (await http.get(url + queryKey[1] + "/")).data;
};

export const useUserProfile = <TData = Response>(
  slug: string,
  options?: Omit<
    UseQueryOptions<Response, AxiosError, TData, QueryKey>,
    "queryKey" | "queryFn"
  >
) => {
  const { data, ...rest } = useQuery([url, slug], getUserProfile, options);
  return { data, ...rest };
};
