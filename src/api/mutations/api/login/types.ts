export interface Login_RequestBody {
  password: string;
  login_or_email: string;
}

export interface Login_Response {
  refresh: string;
  access: string;
}
