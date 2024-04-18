import { DetailUserProfile } from "api/user/types";

export type State = {
  user: DetailUserProfile | null;
  accessToken: string | null;
  refreshToken: string | null;
};

export type LoginReducer = {
  access: string;
  refresh: string;
};
