import { Login_Response } from "../../api/mutations/api/login/types";

export type State = {
  user: Login_Response | null;
  accessToken: string | null;
  refreshToken: string | null;
};

export type LoginReducer = {
  access: string;
  refresh: string;
};
