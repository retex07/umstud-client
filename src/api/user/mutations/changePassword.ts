import { ENDPOINTS_CONFIG } from "api/endpoints";
import http from "api/http";
import { PureResponse } from "api/types";
import { AxiosError, AxiosResponse, CancelToken } from "axios";
import { useMutation, UseMutationOptions } from "react-query";

import {
  ChangePassword_ErrorBody,
  ChangePassword_RequestBody,
  UserPut_Response,
} from "../types";

type Data = AxiosResponse<UserPut_Response>;

type Error = AxiosError<ChangePassword_ErrorBody>;

interface Variables {
  data: ChangePassword_RequestBody;
}

function index(
  data: ChangePassword_RequestBody,
  cancelToken?: CancelToken
): PureResponse<UserPut_Response> {
  return http.post(ENDPOINTS_CONFIG.api.changePassword, data, {
    cancelToken,
  });
}

export function useChangePass(
  options?: Omit<UseMutationOptions<Data, Error, Variables>, "mutationFn">
) {
  return useMutation<Data, Error, Variables>(
    (variables) => index(variables.data),
    options
  );
}
