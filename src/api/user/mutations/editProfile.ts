import { AxiosError, AxiosResponse, CancelToken } from "axios";
import { useMutation, UseMutationOptions } from "react-query";

import { ENDPOINTS_CONFIG } from "@/api/endpoints";
import http from "@/api/http";
import { PureResponse } from "@/api/types";

import { UserPut_ErrorBody, UserPut_Response } from "../types";

type Data = AxiosResponse<UserPut_Response>;

type Error = AxiosError<UserPut_ErrorBody>;

interface Variables {
  data: FormData;
}

function editProfile(
  data: FormData,
  cancelToken?: CancelToken
): PureResponse<UserPut_Response> {
  return http.put(ENDPOINTS_CONFIG.api.profile, data, {
    cancelToken,
    headers: { "Content-Type": "multipart/form-data" },
  });
}

export default function useEditProfile(
  options?: Omit<UseMutationOptions<Data, Error, Variables>, "mutationFn">
) {
  return useMutation<Data, Error, Variables>(
    (variables) => editProfile(variables.data),
    options
  );
}
