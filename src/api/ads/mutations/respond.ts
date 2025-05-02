import { AxiosError, AxiosResponse, CancelToken } from "axios";
import { useMutation, UseMutationOptions } from "react-query";

import { ENDPOINTS_CONFIG } from "@/api/endpoints";
import http from "@/api/http";
import { PureResponse } from "@/api/types";

import { RespondBody } from "../../handlers/order/types";

type Data = AxiosResponse<RespondBody>;

type Error = AxiosError<{ [key in keyof RespondBody]: string[] }>;

interface Variables {
  data: RespondBody;
}

function adRespond(
  data: RespondBody,
  cancelToken?: CancelToken
): PureResponse<RespondBody> {
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
