import { CancelToken } from "axios";

import { SignInWithEmail_RequestBody, SignInWithEmail_Response } from "./types";
import http from "../../config";
import { PureResponse } from "../../types";

export default function signInWithEmail(
  data: SignInWithEmail_RequestBody,
  cancelToken?: CancelToken
): PureResponse<SignInWithEmail_Response> {
  return http.post("auth/login/", data, { cancelToken });
}
