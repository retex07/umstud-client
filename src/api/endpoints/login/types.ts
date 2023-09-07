export interface SignInWithEmail_RequestBody {
  email: string;
  password: string;
}

export interface SignInWithEmail_Response {
  refresh: string;
  access: string;
}
