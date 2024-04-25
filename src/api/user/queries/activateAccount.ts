import { ENDPOINTS_CONFIG } from "api/endpoints";
import http from "api/http";
import { AxiosError } from "axios";
import { QueryFunction, useQuery, UseQueryOptions } from "react-query";

const url = ENDPOINTS_CONFIG.api.activateAccount;
type QueryKey = [typeof url, string, string];

type Response = unknown;

const activateAccount: QueryFunction<Response, QueryKey> = async ({
  queryKey,
}) => {
  return (await http.get(url + queryKey[1] + "/" + queryKey[2] + "/")).data;
};

export const useActivateAccount = <TData = Response>(
  uidb64: string,
  token: string,
  options?: Omit<
    UseQueryOptions<Response, AxiosError, TData, QueryKey>,
    "queryKey" | "queryFn"
  >
) => {
  const { data, ...rest } = useQuery(
    [url, uidb64, token],
    activateAccount,
    options
  );
  return { data, ...rest };
};
