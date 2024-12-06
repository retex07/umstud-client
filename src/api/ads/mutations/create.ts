import { ENDPOINTS_CONFIG } from "api/endpoints";
import http from "api/http";
import { PureResponse } from "api/types";
import { AxiosError, AxiosResponse, CancelToken } from "axios";
import { useMutation, UseMutationOptions } from "react-query";

import { AdCreate, ValidKeysCreate } from "../types";

type Data = AxiosResponse<AdCreate>;

type Error = AxiosError<{ [key in ValidKeysCreate]: string[] }>;

interface Variables {
  data: AdCreate;
}

function adCreate(
  data: AdCreate,
  cancelToken?: CancelToken
): PureResponse<AdCreate> {
  return http.post(ENDPOINTS_CONFIG.api.ad.ads, data, { cancelToken });
}

export default function useCreateAd(
  options?: Omit<UseMutationOptions<Data, Error, Variables>, "mutationFn">
) {
  return useMutation<Data, Error, Variables>(
    (variables) => adCreate(variables.data),
    options
  );
}
