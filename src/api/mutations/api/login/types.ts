export interface Login_RequestBody {
  password: string;
  login: string;
}

export interface Login_Response {
  refresh: string;
  access: string;
}
