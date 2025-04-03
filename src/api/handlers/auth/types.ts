import { AxiosError } from "axios";

export interface LoginAction {
  data: Login_RequestBody;
  onError: (err: AxiosError<Login_ErrorResponse>) => void;
  onSuccess?: (data: Login_Response) => void;
}

export interface RegisterAction {
  data: Register_RequestBody;
  onError: (err: AxiosError<Register_ErrorBody>) => void;
  onSuccess?: (data: Register_Response) => void;
}

export interface RecoverAction {
  data: PasswordReset_RequestBody;
  onError: (err: AxiosError<PasswordReset_ErrorBody>) => void;
  onSuccess?: (data: PasswordReset_Response) => void;
}

export interface ResetAction {
  uidb64: string | null;
  token: string | null;
  data: PasswordResetConfirm_RequestBody;
  onError: (err: AxiosError<PasswordResetConfirm_ErrorBody>) => void;
  onSuccess?: (data: PasswordResetConfirm_Response) => void;
}

export interface Login_RequestBody {
  password: string;
  login_or_email: string;
}

export interface Login_Response {
  username: string;
  email: string;
  tokens: {
    refresh: string;
    access: string;
  };
}

export interface Login_ErrorResponse {
  [key: string]: string[];
}

export interface Register_RequestBody {
  first_name: string;
  last_name: string;
  username: string;
  password: string;
  password_confirm: string;
  email: string;
}

export interface Register_ErrorBody {
  first_name?: string[];
  last_name?: string[];
  username?: string[];
  password?: string[];
  password_confirm?: string[];
  email?: string[];
}

export interface Register_Response {
  message: string;
}

export interface PasswordReset_RequestBody {
  email: string;
}

export interface PasswordReset_Response {
  message: string;
}

export interface PasswordReset_ErrorBody {
  email: string[];
  message?: string;
}

export interface PasswordResetConfirm_RequestBody {
  new_password: string;
  confirm_password: string;
}

export interface PasswordResetConfirm_Response {
  message: string;
}

export interface PasswordResetConfirm_ErrorBody {
  confirm_password: string[];
  error?: string;
}
