import { ENDPOINTS_CONFIG } from "api/endpoints";
import http from "api/http";
import { PureResponse } from "api/types";
import { AxiosError, AxiosResponse, CancelToken } from "axios";
import { useMutation, UseMutationOptions } from "react-query";

import {
  Register_ErrorBody,
  Register_RequestBody,
  Register_Response,
} from "../types";

type Data = AxiosResponse<Register_Response>;

type Error = AxiosError<Register_ErrorBody>;

interface Variables {
  data: Register_RequestBody;
}

function index(
  data: Register_RequestBody,
  cancelToken?: CancelToken
): PureResponse<Register_Response> {
  return http.post(ENDPOINTS_CONFIG.api.register, data, { cancelToken });
}

export default function useRegister(
  options?: Omit<UseMutationOptions<Data, Error, Variables>, "mutationFn">
) {
  return useMutation<Data, Error, Variables>(
    (variables) => index(variables.data),
    options
  );
}
