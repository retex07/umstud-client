import { AxiosError, AxiosResponse, CancelToken } from "axios";
import { useMutation, UseMutationOptions } from "react-query";

import { ENDPOINTS_CONFIG } from "@/api/endpoints";
import http from "@/api/http";
import { PureResponse } from "@/api/types";

import {
  PortfolioItem_ErrorBody,
  PortfolioItem_Response,
} from "../../handlers/user/types";

type Data = AxiosResponse<PortfolioItem_Response>;

type Error = AxiosError<PortfolioItem_ErrorBody>;

interface Variables {
  data: FormData;
}

function index(
  data: FormData,
  cancelToken?: CancelToken
): PureResponse<PortfolioItem_Response> {
  return http.post(ENDPOINTS_CONFIG.api.portfolio, data, {
    cancelToken,
    headers: { "Content-Type": "multipart/form-data" },
  });
}

export function useAddPortfolio(
  options?: Omit<UseMutationOptions<Data, Error, Variables>, "mutationFn">
) {
  return useMutation<Data, Error, Variables>(
    (variables) => index(variables.data),
    options
  );
}
