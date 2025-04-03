import {
  Login_RequestBody,
  Login_Response,
  Register_RequestBody,
  Register_Response,
  PasswordReset_RequestBody,
  PasswordReset_Response,
  PasswordResetConfirm_RequestBody,
  PasswordResetConfirm_Response,
} from "./types";
import { ENDPOINTS_CONFIG } from "../../endpoints";
import http from "../../http";
import { PureResponse } from "../../types";

export type ApiAuthHandlers = {
  login: (data: Login_RequestBody) => PureResponse<Login_Response>;
  register: (data: Register_RequestBody) => PureResponse<Register_Response>;
  reset: (
    data: PasswordResetConfirm_RequestBody,
    uidb64: string,
    token: string
  ) => PureResponse<PasswordResetConfirm_Response>;
  recover: (
    data: PasswordReset_RequestBody
  ) => PureResponse<PasswordReset_Response>;
};

const API = ENDPOINTS_CONFIG.api;

export default function ApiAuth(): ApiAuthHandlers {
  const login = async (
    data: Login_RequestBody
  ): PureResponse<Login_Response> => {
    return (await http.post(API.login, data)).data;
  };

  const register = async (data: Register_RequestBody) => {
    return (await http.post(API.register, data)).data;
  };

  const recover = async (data: PasswordReset_RequestBody) => {
    return (await http.post(API.recover, data)).data;
  };

  const reset = async (
    data: PasswordResetConfirm_RequestBody,
    uidb64: string,
    token: string
  ) => {
    return (await http.post(`${API.reset}${uidb64}/${token}/`, data)).data;
  };

  return { login, register, recover, reset };
}
