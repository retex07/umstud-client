import { ENDPOINTS_CONFIG } from "api/endpoints";
import http from "api/http";
import { PureResponse } from "api/types";
import { AxiosError, AxiosResponse, CancelToken } from "axios";
import { useMutation, UseMutationOptions } from "react-query";

import { AdCreate, ValidKeysCreate, AdCreateResponse } from "../types";

type Data = AxiosResponse<AdCreateResponse>;

type Error = AxiosError<{ [key in ValidKeysCreate]: string[] }>;

interface Variables {
  data: AdCreate;
  adId: number;
}

function adUpdate(
  data: AdCreate,
  adId: number,
  cancelToken?: CancelToken
): PureResponse<AdCreateResponse> {
  return http.put(ENDPOINTS_CONFIG.api.ad.ads + adId + "/", data, {
    cancelToken,
  });
}

export default function useUpdateAd(
  options?: Omit<UseMutationOptions<Data, Error, Variables>, "mutationFn">
) {
  return useMutation<Data, Error, Variables>(
    (variables) => adUpdate(variables.data, variables.adId),
    options
  );
}
