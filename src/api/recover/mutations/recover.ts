import { ENDPOINTS_CONFIG } from "api/endpoints";
import http from "api/http";
import { PureResponse } from "api/types";
import { AxiosError, AxiosResponse, CancelToken } from "axios";
import { useMutation, UseMutationOptions } from "react-query";

import {
  PasswordReset_ErrorBody,
  PasswordReset_RequestBody,
  PasswordReset_Response,
} from "../types";

type Data = AxiosResponse<PasswordReset_Response>;

type Error = AxiosError<PasswordReset_ErrorBody>;

interface Variables {
  data: PasswordReset_RequestBody;
}

function index(
  data: PasswordReset_RequestBody,
  cancelToken?: CancelToken
): PureResponse<PasswordReset_Response> {
  return http.post(ENDPOINTS_CONFIG.api.recover, data, { cancelToken });
}

export function useRecover(
  options?: Omit<UseMutationOptions<Data, Error, Variables>, "mutationFn">
) {
  return useMutation<Data, Error, Variables>(
    (variables) => index(variables.data),
    options
  );
}
