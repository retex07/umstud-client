import { ENDPOINTS_CONFIG } from "api/endpoints";
import http from "api/http";
import { PureResponse } from "api/types";
import { AxiosError, AxiosResponse, CancelToken } from "axios";
import { useMutation, UseMutationOptions } from "react-query";

import {
  RemoveUserBlackList_ErrorBody,
  RemoveUserBlackList_Response,
} from "../types";

type Data = AxiosResponse<RemoveUserBlackList_Response>;

type Variables = {
  idUser: number;
};

type Error = AxiosError<RemoveUserBlackList_ErrorBody>;

function index(
  idUser: number,
  cancelToken?: CancelToken
): PureResponse<RemoveUserBlackList_Response> {
  return http.post(ENDPOINTS_CONFIG.api.addToBlackList + idUser + "/", null, {
    cancelToken,
  });
}

export function useAddToBlackList(
  options?: Omit<UseMutationOptions<Data, Error, Variables>, "mutationFn">
) {
  return useMutation<Data, Error, Variables>(
    (variables) => index(variables.idUser),
    options
  );
}
