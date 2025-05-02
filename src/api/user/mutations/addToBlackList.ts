import { AxiosError, AxiosResponse, CancelToken } from "axios";
import { useMutation, UseMutationOptions } from "react-query";

import { ENDPOINTS_CONFIG } from "@/api/endpoints";
import http from "@/api/http";
import { PureResponse } from "@/api/types";

import {
  CreateBlackList_ErrorBody,
  CreateBlackList_RequestBody,
  CreateBlackList_Response,
} from "../../handlers/user/types";

type Data = AxiosResponse<CreateBlackList_Response>;

type Error = AxiosError<CreateBlackList_ErrorBody>;

interface Variables {
  data: CreateBlackList_RequestBody;
}

function index(
  data: CreateBlackList_RequestBody,
  cancelToken?: CancelToken
): PureResponse<CreateBlackList_Response> {
  return http.post(ENDPOINTS_CONFIG.api.addToBlackList, data, {
    cancelToken,
  });
}

export function useAddToBlackList(
  options?: Omit<UseMutationOptions<Data, Error, Variables>, "mutationFn">
) {
  return useMutation<Data, Error, Variables>(
    (variables) => index(variables.data),
    options
  );
}
