import { AxiosError, AxiosResponse, CancelToken } from "axios";
import { useMutation, UseMutationOptions } from "react-query";

import { ENDPOINTS_CONFIG } from "@/api/endpoints";
import http from "@/api/http";
import { PureResponse } from "@/api/types";

import { Respond } from "../types";

type Data = AxiosResponse<Respond>;

type Error = AxiosError<{ [key in keyof Respond]: string[] }>;

interface Variables {
  data: Respond;
}

function adRespond(
  data: Respond,
  cancelToken?: CancelToken
): PureResponse<Respond> {
  return http.post(ENDPOINTS_CONFIG.api.ad.respond, data, { cancelToken });
}

export default function useRespondAd(
  options?: Omit<UseMutationOptions<Data, Error, Variables>, "mutationFn">
) {
  return useMutation<Data, Error, Variables>(
    (variables) => adRespond(variables.data),
    options
  );
}
