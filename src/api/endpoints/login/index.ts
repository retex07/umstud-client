import http from "api/http";
import { PureResponse } from "api/types";
import { CancelToken } from "axios";

import {
  Login_RequestBody,
  Login_Response,
} from "../../mutations/api/login/types";

export default function signInWithEmail(
  data: Login_RequestBody,
  cancelToken?: CancelToken
): PureResponse<Login_Response> {
  return http.post("auth/login/", data, { cancelToken });
}
