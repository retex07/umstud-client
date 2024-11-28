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
