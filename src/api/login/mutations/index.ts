import { ENDPOINTS_CONFIG } from "api/endpoints";
import http from "api/http";
import { PureResponse } from "api/types";
import { AxiosError, AxiosResponse, CancelToken } from "axios";
import { useMutation, UseMutationOptions } from "react-query";

import {
  Login_RequestBody,
  Login_Response,
  Login_ErrorResponse,
} from "../types";

type Data = AxiosResponse<Login_Response>;

type Error = AxiosError<Login_ErrorResponse>;

interface Variables {
  data: Login_RequestBody;
}

function login(
  data: Login_RequestBody,
  cancelToken?: CancelToken
): PureResponse<Login_Response> {
  return http.post(ENDPOINTS_CONFIG.api.login, data, { cancelToken });
}

export default function useLogin(
  options?: Omit<UseMutationOptions<Data, Error, Variables>, "mutationFn">
) {
  return useMutation<Data, Error, Variables>(
    (variables) => login(variables.data),
    options
  );
}
