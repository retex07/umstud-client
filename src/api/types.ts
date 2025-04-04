import { AxiosResponse } from "axios";
import { History } from "history";

import { ApiAuthHandlers, ApiUserHandlers, ApiOrderHandlers } from "./handlers";

export type PureResponse<T = unknown> = Promise<AxiosResponse<T>>;

export interface Api {
  user: ApiUserHandlers;
  auth: ApiAuthHandlers;
  order: ApiOrderHandlers;
}

export interface ExtraArguments {
  api: Api;
  history: History;
}
