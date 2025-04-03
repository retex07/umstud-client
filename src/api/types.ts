import { AxiosResponse } from "axios";
import { History } from "history";

import { ApiAuthHandlers, ApiUserHandlers } from "./handlers";

export type PureResponse<T = unknown> = Promise<AxiosResponse<T>>;

export interface Api {
  user: ApiUserHandlers;
  auth: ApiAuthHandlers;
}

export interface ExtraArguments {
  api: Api;
  history: History;
}
