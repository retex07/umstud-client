import http from "api/http";
import { PureResponse } from "api/types";
import { CancelToken } from "axios";

import { SignInWithEmail_RequestBody, SignInWithEmail_Response } from "./types";

export default function signInWithEmail(
  data: SignInWithEmail_RequestBody,
  cancelToken?: CancelToken
): PureResponse<SignInWithEmail_Response> {
  return http.post("auth/login/", data, { cancelToken });
}
