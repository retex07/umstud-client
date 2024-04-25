import { ENDPOINTS_CONFIG } from "api/endpoints";
import http from "api/http";
import { PureResponse } from "api/types";
import { AxiosError, AxiosResponse, CancelToken } from "axios";
import { useMutation, UseMutationOptions } from "react-query";

import {
  PasswordResetConfirm_ErrorBody,
  PasswordResetConfirm_RequestBody,
  PasswordResetConfirm_Response,
} from "../types";

type Data = AxiosResponse<PasswordResetConfirm_Response>;

type Error = AxiosError<PasswordResetConfirm_ErrorBody>;

interface Variables {
  data: PasswordResetConfirm_RequestBody;
}

function index(
  data: PasswordResetConfirm_RequestBody,
  uidb64: string,
  token: string,
  cancelToken?: CancelToken
): PureResponse<PasswordResetConfirm_Response> {
  return http.post(`${ENDPOINTS_CONFIG.api.reset}${uidb64}/${token}/`, data, {
    cancelToken,
  });
}

export function useReset(
  uidb64: string,
  token: string,
  options?: Omit<UseMutationOptions<Data, Error, Variables>, "mutationFn">
) {
  return useMutation<Data, Error, Variables>(
    (variables) => index(variables.data, uidb64, token),
    options
  );
}
