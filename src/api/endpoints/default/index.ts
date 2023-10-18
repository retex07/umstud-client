import http from "api/http";
import { PureResponse } from "api/types";
import { CancelToken } from "axios";

export function getExample(cancelToken?: CancelToken): PureResponse {
  return http.get(``, { cancelToken });
}
