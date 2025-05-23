import { AxiosError } from "axios";
import { QueryFunction, useQuery, UseQueryOptions } from "react-query";

import { ENDPOINTS_CONFIG } from "@/api/endpoints";
import http from "@/api/http";

import { Skill } from "../../handlers/user/types";

const url = ENDPOINTS_CONFIG.api.skills;
type QueryKey = typeof url;

type Response = Skill[];

const getSkills: QueryFunction<Response, QueryKey> = async () => {
  return (await http.get(url)).data;
};

export const useSkills = <TData = Response>(
  options?: Omit<
    UseQueryOptions<Response, AxiosError, TData, QueryKey>,
    "queryKey" | "queryFn"
  >
) => {
  const { data, ...rest } = useQuery(url, getSkills, options);
  return { data, ...rest };
};
