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
