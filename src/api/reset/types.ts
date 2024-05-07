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
