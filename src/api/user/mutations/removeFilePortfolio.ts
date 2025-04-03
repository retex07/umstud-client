import { AxiosError, AxiosResponse, CancelToken } from "axios";
import { useMutation, UseMutationOptions } from "react-query";

import { ENDPOINTS_CONFIG } from "@/api/endpoints";
import http from "@/api/http";
import { PureResponse } from "@/api/types";

import {
  RemovePortfolioItem_ErrorBody,
  RemovePortfolioItem_Response,
} from "../types";

type Data = AxiosResponse<RemovePortfolioItem_Response>;

type Variables = {
  idFile: number;
};

type Error = AxiosError<RemovePortfolioItem_ErrorBody>;

function index(
  idFile: number,
  cancelToken?: CancelToken
): PureResponse<RemovePortfolioItem_Response> {
  return http.delete(ENDPOINTS_CONFIG.api.portfolio + idFile + "/", {
    cancelToken,
  });
}

export function useRemoveFilePortfolio(
  options?: Omit<UseMutationOptions<Data, Error, Variables>, "mutationFn">
) {
  return useMutation<Data, Error, Variables>(
    (variables) => index(variables.idFile),
    options
  );
}
