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
